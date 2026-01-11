import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { supabaseAdmin } from '@/lib/supabase/serverClient';
import { createOctokit } from '@/lib/github';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = supabaseAdmin;
    const octokit = createOctokit(session.accessToken);

    // Fetch repositories from GitHub
    const { data: githubRepos } = await octokit.rest.repos.listForAuthenticatedUser({
      per_page: 100,
      sort: 'updated',
    });

    // Prepare repositories data for database
    const repositoriesData = githubRepos.map((repo) => ({
      user_id: session.user.id,
      github_id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      is_private: repo.private,
      html_url: repo.html_url,
      updated_at: repo.updated_at,
    }));

    // Upsert repositories (insert or update if exists)
    const { data, error } = await supabase
      .from('repositories')
      .upsert(repositoriesData, {
        onConflict: 'github_id',
        ignoreDuplicates: false,
      })
      .select();

    if (error) {
      console.error('Error syncing repositories:', error);
      return NextResponse.json(
        { error: 'Failed to sync repositories', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${githubRepos.length} repositories`,
      count: githubRepos.length,
      data,
    });
  } catch (error) {
    console.error('Error in sync repositories API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
