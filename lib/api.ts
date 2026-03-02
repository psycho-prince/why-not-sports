const SPORTSDB_BASE = `https://www.thesportsdb.com/api/v1/json/${process.env.THE_SPORTSDB_KEY || '1'}`;
const CRICKET_BASE = 'https://api.cricketdata.org/v1';

export async function getLiveFootball() {
  try {
    const res = await fetch(`${SPORTSDB_BASE}/latestsoccer.php`, { next: { revalidate: 30 } });
    return await res.json();
  } catch (e) { return { events: [] }; }
}

export async function getCricketMatches() {
  const apiKey = process.env.CRICKET_API_KEY;
  try {
    const res = await fetch(`${CRICKET_BASE}/currentMatches?apikey=${apiKey}`, { next: { revalidate: 30 } });
    return await res.json();
  } catch (e) { return { data: [] }; }
}

export async function getCricketMatchDetail(id: string) {
  const apiKey = process.env.CRICKET_API_KEY;
  try {
    const res = await fetch(`${CRICKET_BASE}/match_info?apikey=${apiKey}&id=${id}`);
    return await res.json();
  } catch (e) { return null; }
}
