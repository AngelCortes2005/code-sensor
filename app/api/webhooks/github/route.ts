import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/serverClient';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Verify GitHub webhook signature
    const signature = request.headers.get('x-hub-signature-256');
    const body = await request.text();
    
    if (signature && process.env.GITHUB_WEBHOOK_SECRET) {
      const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
        .update(body)
        .digest('hex');
      
      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(body);
    const event = request.headers.get('x-github-event');

    console.log('Webhook received:', event, payload.repository?.full_name);

    // Handle push events
    if (event === 'push') {
      const { repository, pusher, ref } = payload;
      
      // Only process pushes to main/master branch
      if (!ref.includes('main') && !ref.includes('master')) {
        return NextResponse.json({ message: 'Ignored non-main branch push' });
      }

      const supabase = supabaseAdmin;

      // Find repository in database
      const { data: repo } = await supabase
        .from('repositories')
        .select('id, user_email, webhook_enabled')
        .eq('github_id', repository.id)
        .single();

      if (!repo || !repo.webhook_enabled) {
        return NextResponse.json({ message: 'Webhook not enabled for this repository' });
      }

      // Trigger analysis
      const analysisResponse = await fetch(
        `${process.env.NEXTAUTH_URL}/api/repositories/${repo.id}/analyze`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!analysisResponse.ok) {
        throw new Error('Failed to trigger analysis');
      }

      // Create webhook log
      await supabase.from('webhook_logs').insert({
        repository_id: repo.id,
        event_type: event,
        payload: payload,
        triggered_by: pusher.name || pusher.email,
        status: 'completed',
      });

      return NextResponse.json({
        message: 'Analysis triggered successfully',
        repository: repository.full_name,
      });
    }

    // Handle pull request events
    if (event === 'pull_request') {
      const { action, pull_request, repository } = payload;

      if (action !== 'opened' && action !== 'synchronize') {
        return NextResponse.json({ message: 'Ignored PR action' });
      }

      const supabase = supabaseAdmin;

      const { data: repo } = await supabase
        .from('repositories')
        .select('id, webhook_enabled')
        .eq('github_id', repository.id)
        .single();

      if (!repo || !repo.webhook_enabled) {
        return NextResponse.json({ message: 'Webhook not enabled' });
      }

      // Trigger analysis for PR
      await fetch(
        `${process.env.NEXTAUTH_URL}/api/repositories/${repo.id}/analyze`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      await supabase.from('webhook_logs').insert({
        repository_id: repo.id,
        event_type: `${event}:${action}`,
        payload: payload,
        triggered_by: pull_request.user.login,
        status: 'completed',
      });

      return NextResponse.json({
        message: 'PR analysis triggered',
        pr: pull_request.number,
      });
    }

    return NextResponse.json({ message: 'Event received' });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GitHub webhook endpoint' });
}
