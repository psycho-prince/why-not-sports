import { NextResponse } from 'next/server';
import { getLiveScores, SportType } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sport = (searchParams.get('sport') || 'all') as SportType;

  try {
    const data = await getLiveScores(sport);
    // Explicitly disabling server-side caching for the API route itself
    // to ensure client fetches get fresh (or revalidated) data.
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Failed to fetch live scores' }, { status: 500 });
  }
}
