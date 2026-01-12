import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import { supabaseAdmin } from '@/lib/supabase/serverClient';

// GET webhook configuration for a repository
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const supabase = supabaseAdmin;

    const { data: repo, error } = await supabase
      .from('repositories')
      .select('id, name, webhook_enabled, webhook_events')
      .eq('id', resolvedParams.id)
      .eq('user_email', session.user.email)
      .single();

    if (error || !repo) {
      return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
    }

    return NextResponse.json({
      webhookEnabled: repo.webhook_enabled || false,
      webhookEvents: repo.webhook_events || ['push', 'pull_request'],
      webhookUrl: `${process.env.NEXTAUTH_URL}/api/webhooks/github`,
    });

  } catch (error) {
    console.error('Get webhook config error:', error);
    return NextResponse.json(
      { error: 'Failed to get webhook configuration' },
      { status: 500 }
    );
  }
}

// POST - Enable/disable webhook for a repository
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const body = await request.json();
    const { enabled, events } = body;

    const supabase = supabaseAdmin;

    // Update webhook configuration
    const { data, error } = await supabase
      .from('repositories')
      .update({
        webhook_enabled: enabled,
        webhook_events: events || ['push', 'pull_request'],
        updated_at: new Date().toISOString(),
      })
      .eq('id', resolvedParams.id)
      .eq('user_email', session.user.email)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: enabled ? 'Webhook enabled' : 'Webhook disabled',
      repository: data,
    });

  } catch (error) {
    console.error('Update webhook config error:', error);
    return NextResponse.json(
      { error: 'Failed to update webhook configuration' },
      { status: 500 }
    );
  }
}
