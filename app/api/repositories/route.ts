import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { supabaseAdmin } from '@/lib/supabase/serverClient';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = supabaseAdmin;

    const { data: repositories, error } = await supabase
      .from('repositories')
      .select('*')
      .eq('user_id', session.user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching repositories:', error);
      return NextResponse.json(
        { error: 'Failed to fetch repositories' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: repositories || [] });
  } catch (error) {
    console.error('Error in repositories API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
