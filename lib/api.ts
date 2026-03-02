const SPORTSDB_BASE = `https://www.thesportsdb.com/api/v1/json/${process.env.THE_SPORTSDB_KEY || '1'}`;
const CRICKET_BASE = 'https://api.cricketdata.org/v1';

export type SportType = 'cricket' | 'football' | 'basketball' | 'tennis' | 'all';

export async function getLiveScores(sport: SportType) {
  try {
    const results: any[] = [];
    if (sport === 'all' || sport === 'football') {
      const res = await fetch(`${SPORTSDB_BASE}/latestsoccer.php`, { cache: 'no-store' });
      const data = await res.json();
      if (data.events) results.push(...data.events.map((e: any) => ({ ...e, sport: 'football', id: e.idEvent })));
    }
    if (sport === 'all' || sport === 'cricket') {
      const apiKey = process.env.CRICKET_API_KEY;
      if (apiKey && apiKey !== 'your_free_key_here') {
        const res = await fetch(`${CRICKET_BASE}/currentMatches?apikey=${apiKey}`, { cache: 'no-store' });
        const data = await res.json();
        if (data.data) results.push(...data.data.map((m: any) => ({ ...m, sport: 'cricket', id: m.id })));
      }
    }
    return results;
  } catch (error) {
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
    const res = await fetch(`${SPORTSDB_BASE}/lookupevent.php?id=${id}`);
    return await res.json();
  } catch (e) { return null; }
}
