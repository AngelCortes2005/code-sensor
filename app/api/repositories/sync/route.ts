import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { GitHubService } from '@/lib/services/githubService';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const githubService = new GitHubService(
      session.accessToken as string,
      session.user.id
    );

    const result = await githubService.syncRepositories();

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.count} repositories`,
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in sync repositories API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
