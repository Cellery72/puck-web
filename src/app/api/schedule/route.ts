import { NextResponse } from 'next/server';
import { NHLEService } from '@/services/nhleService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    const nhleService = NHLEService.getInstance();
    
    // If date is provided, use it, otherwise get current schedule
    const schedule = date 
      ? await nhleService.getScheduleByDate(date)
      : await nhleService.getScheduleNow();
      
    const standings = await nhleService.getStandingsNow();
    
    return NextResponse.json({ schedule, standings });
  } catch (error) {
    console.error('Error fetching NHL data:', error);
    return NextResponse.json({ error: 'Failed to fetch NHL data' }, { status: 500 });
  }
} 