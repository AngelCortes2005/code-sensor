import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { GitHubService } from '@/lib/services/githubService';

export async function GET() {
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

    const repositories = await githubService.getRepositories();

    return NextResponse.json({ data: repositories });
  } catch (error) {
    console.error('Error in repositories API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
