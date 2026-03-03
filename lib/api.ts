const SPORTSDB_BASE = `https://www.thesportsdb.com/api/v1/json/${process.env.THE_SPORTSDB_KEY || '1'}`;
const CRICKET_BASE = 'https://api.cricketdata.org/v1';
const FOOTBALL_API_BASE = 'https://v3.football.api-sports.io';

export type SportType = 'cricket' | 'football' | 'basketball' | 'tennis' | 'all';

// --- API-Football Types ---
export interface FootballFixture {
  fixture: {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: { first: number | null; second: number | null };
    venue: { id: number | null; name: string; city: string };
    status: { long: string; short: string; elapsed: number | null };
  };
  league: { id: number; name: string; country: string; logo: string; flag: string; season: number; round: string };
  teams: {
    home: { id: number; name: string; logo: string; winner: boolean | null };
    away: { id: number; name: string; logo: string; winner: boolean | null };
  };
  goals: { home: number | null; away: number | null };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
    extratime: { home: number | null; away: number | null };
    penalty: { home: number | null; away: number | null };
  };
}

export interface UnifiedMatch {
  id: string;
  sport: SportType;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  homeScore: number | string;
  awayScore: number | string;
  status: string;
  elapsed?: number;
  league: string;
  leagueLogo?: string;
  isLive: boolean;
  timestamp: number;
}

// --- Fetchers ---

async function fetchWithNoStore(url: string, options: RequestInit = {}) {
  // Always fetch fresh for live data
  return fetch(url, {
    ...options,
    cache: 'no-store',
  });
}

export async function getLiveScores(sport: SportType): Promise<UnifiedMatch[]> {
  const results: UnifiedMatch[] = [];

  try {
    // 1. Football (API-Football V3)
    if (sport === 'all' || sport === 'football') {
      const fbKey = process.env.API_FOOTBALL_KEY;
      if (fbKey && fbKey !== 'your_key_here') {
        // Step 1: Try Live matches first
        let res = await fetchWithNoStore(`${FOOTBALL_API_BASE}/fixtures?live=all`, {
          headers: { 'x-apisports-key': fbKey }
        });
        let data = await res.json();
        
        // Step 2: Fallback to today's fixtures if no live
        if (!data.response || data.response.length === 0) {
          const today = new Date().toISOString().split('T')[0];
          res = await fetchWithNoStore(`${FOOTBALL_API_BASE}/fixtures?date=${today}`, {
            headers: { 'x-apisports-key': fbKey }
          });
          data = await res.json();
        }

        // Step 3: Extreme fallback to next 10 fixtures if today is empty
        if (!data.response || data.response.length === 0) {
          res = await fetchWithNoStore(`${FOOTBALL_API_BASE}/fixtures?next=10`, {
             headers: { 'x-apisports-key': fbKey }
          });
          data = await res.json();
        }

        if (data.response) {
          results.push(...data.response.map((f: FootballFixture) => ({
            id: f.fixture.id.toString(),
            sport: 'football',
            homeTeam: f.teams.home.name,
            awayTeam: f.teams.away.name,
            homeLogo: f.teams.home.logo,
            awayLogo: f.teams.away.logo,
            homeScore: f.goals.home ?? 0,
            awayScore: f.goals.away ?? 0,
            status: f.fixture.status.long,
            elapsed: f.fixture.status.elapsed ?? undefined,
            league: f.league.name,
            leagueLogo: f.league.logo,
            isLive: ['1H', 'HT', '2H', 'ET', 'P', 'BT'].includes(f.fixture.status.short),
            timestamp: f.fixture.timestamp
          })));
        }
      }
    }

    // 2. Cricket (CricketData.org)
    if (sport === 'all' || sport === 'cricket') {
      const apiKey = process.env.CRICKET_API_KEY;
      if (apiKey && apiKey !== 'your_free_key_here') {
        const res = await fetchWithNoStore(`${CRICKET_BASE}/currentMatches?apikey=${apiKey}`);
        const data = await res.json();
        if (data.data) {
          results.push(...data.data.map((m: any) => ({
            id: m.id,
            sport: 'cricket',
            homeTeam: m.teams?.[0] || 'Team A',
            awayTeam: m.teams?.[1] || 'Team B',
            homeScore: m.score?.[0]?.r || 0,
            awayScore: m.score?.[1]?.r || 0,
            status: m.status,
            league: m.matchType?.toUpperCase() || "International",
            isLive: m.matchStarted && !m.matchEnded,
            timestamp: new Date(m.dateTimeGMT).getTime() / 1000
          })));
        }
      }
    }

    return results.sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0));
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function getMatchDetail(id: string, sport: string) {
  try {
    if (sport === 'cricket') {
      const apiKey = process.env.CRICKET_API_KEY;
      const res = await fetch(`${CRICKET_BASE}/match_info?apikey=${apiKey}&id=${id}`);
      return await res.json();
    }
    
    const fbKey = process.env.API_FOOTBALL_KEY;
    if (sport === 'football' && fbKey) {
       const res = await fetch(`${FOOTBALL_API_BASE}/fixtures?id=${id}`, {
         headers: { 'x-apisports-key': fbKey },
         cache: 'no-store'
       });
       const data = await res.json();
       return data.response?.[0] || null;
    }

    const res = await fetch(`${SPORTSDB_BASE}/lookupevent.php?id=${id}`);
    return await res.json();
  } catch (e) { return null; }
}

export async function getRecentHighlights(): Promise<UnifiedMatch[]> {
  try {
    const fbKey = process.env.API_FOOTBALL_KEY;
    if (!fbKey) return [];

    // Fetch finished matches from the last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];

    const res = await fetch(`${FOOTBALL_API_BASE}/fixtures?date=${dateStr}&status=FT`, {
      headers: { 'x-apisports-key': fbKey },
      next: { revalidate: 3600 } // Highlights can be cached longer
    });
    const data = await res.json();

    if (!data.response) return [];

    return data.response.slice(0, 10).map((f: FootballFixture) => ({
      id: f.fixture.id.toString(),
      sport: 'football',
      homeTeam: f.teams.home.name,
      awayTeam: f.teams.away.name,
      homeLogo: f.teams.home.logo,
      awayLogo: f.teams.away.logo,
      homeScore: f.goals.home ?? 0,
      awayScore: f.goals.away ?? 0,
      status: 'Finished',
      league: f.league.name,
      leagueLogo: f.league.logo,
      isLive: false,
      timestamp: f.fixture.timestamp
    }));
  } catch (e) {
    return [];
  }
}
