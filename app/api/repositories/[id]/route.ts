import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { GitHubService } from '@/lib/services/githubService';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || !session?.accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { id } = await params;
    const repoId = parseInt(id);
    
    if (isNaN(repoId)) {
      return NextResponse.json(
        { error: 'Invalid repository ID' }, 
        { status: 400 }
      );
    }

    const githubService = new GitHubService(
      session.accessToken,
      session.user.id
    );

    const repository = await githubService.getRepository(repoId);

    if (!repository) {
      return NextResponse.json(
        { error: 'Repository not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      data: repository
    });

  } catch (error) {
    console.error('Fetch repository error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repository' }, 
      { status: 500 }
    );
  }
}