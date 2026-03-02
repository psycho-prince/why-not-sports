import { NextResponse } from 'next/server';
import { getLiveScores, SportType } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sport = (searchParams.get('sport') || 'all') as SportType;

  try {
    const data = await getLiveScores(sport);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch live scores' }, { status: 500 });
  }
}
