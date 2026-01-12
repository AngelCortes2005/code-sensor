import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import { supabaseAdmin } from '@/lib/supabase/serverClient';
import { createOctokit } from '@/lib/github';
import { analyzeRepository } from '@/lib/services/aiAnalysisService';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const repositoryId = resolvedParams.id;

    // Get repository information
    const { data: repo, error: repoError } = await supabaseAdmin
      .from('repositories')
      .select('*')
      .eq('id', repositoryId)
      .eq('user_id', session.user.id)
      .single();

    if (repoError || !repo) {
      return NextResponse.json(
        { error: 'Repository not found' },
        { status: 404 }
      );
    }

    // Create GitHub client
    const octokit = createOctokit(session.accessToken);

    // Get repository content
    const [owner, repoName] = repo.full_name.split('/');

    // Obtener README
    let readme = '';
    try {
      const { data: readmeData } = await octokit.rest.repos.getReadme({
        owner,
        repo: repoName,
      });
      readme = Buffer.from(readmeData.content, 'base64').toString('utf-8');
    } catch (error) {
      console.log('No README found');
    }

    // Obtener archivos principales
    const { data: tree } = await octokit.rest.git.getTree({
      owner,
      repo: repoName,
      tree_sha: 'HEAD',
      recursive: 'true',
    });

    // Filtrar archivos importantes (limitar a archivos relevantes)
    const importantExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.rs', '.php'];
    const importantFiles = tree.tree
      .filter(item => 
        item.type === 'blob' && 
        item.path &&
        importantExtensions.some(ext => item.path!.endsWith(ext)) &&
        !item.path.includes('node_modules') &&
        !item.path.includes('dist') &&
        !item.path.includes('build')
      )
      .slice(0, 15); // Limitar a 15 archivos

    // Obtener contenido de archivos
    const filesContent = await Promise.all(
      importantFiles.map(async (file) => {
        try {
          const { data } = await octokit.rest.repos.getContent({
            owner,
            repo: repoName,
            path: file.path!,
          });

          if ('content' in data) {
            return {
              path: file.path!,
              content: Buffer.from(data.content, 'base64').toString('utf-8'),
              language: file.path!.split('.').pop(),
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      })
    );

    const validFiles = filesContent.filter(f => f !== null);

    // Get package.json if exists
    let packageJson = null;
    try {
      const { data: pkgData } = await octokit.rest.repos.getContent({
        owner,
        repo: repoName,
        path: 'package.json',
      });
      if ('content' in pkgData) {
        packageJson = JSON.parse(Buffer.from(pkgData.content, 'base64').toString('utf-8'));
      }
    } catch (error) {
      console.log('No package.json found');
    }

    // Perform AI analysis
    const analysis = await analyzeRepository(repo.name, {
      files: validFiles,
      readme,
      packageJson,
    });

    // Save analysis result
    const { data: analysisRecord, error: saveError } = await supabaseAdmin
      .from('repository_analyses')
      .insert({
        repository_id: repositoryId,
        user_id: session.user.id,
        quality_score: analysis.quality.score,
        security_score: analysis.security.score,
        structure_score: analysis.structure.score,
        overall_score: analysis.overall_score,
        analysis_data: analysis,
        status: 'completed',
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving analysis:', saveError);
      return NextResponse.json(
        { error: 'Failed to save analysis' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      analysis: analysisRecord,
    });

  } catch (error) {
    console.error('Error analyzing repository:', error);
    return NextResponse.json(
      { error: 'Failed to analyze repository', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET - Get existing analyses
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const repositoryId = resolvedParams.id;

    const { data: analyses, error } = await supabaseAdmin
      .from('repository_analyses')
      .select('*')
      .eq('repository_id', repositoryId)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch analyses' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: analyses || [] });

  } catch (error) {
    console.error('Error fetching analyses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
