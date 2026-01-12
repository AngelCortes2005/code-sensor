import { createOctokit } from '@/lib/github';
import { supabaseAdmin } from '@/lib/supabase/serverClient';

export class GitHubService {
  private octokit;
  private userId: string;

  constructor(token: string, userId: string) {
    this.octokit = createOctokit(token);
    this.userId = userId;
  }

  /**
   * Syncs user repositories from GitHub to Supabase
   */
  async syncRepositories() {
    try {
      // Obtener repos de GitHub
      const { data: repos } = await this.octokit.repos.listForAuthenticatedUser({
        sort: 'updated',
        per_page: 100,
        visibility: 'all',
      });

      if (!repos || repos.length === 0) {
        return { success: true, count: 0, message: 'No repositories found' };
      }

      // Preparar datos para Supabase
      const reposToInsert = repos.map(repo => ({
        user_id: this.userId,
        github_id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        is_private: repo.private,
        html_url: repo.html_url,
        updated_at: new Date().toISOString(),
      }));

      // Insertar/Actualizar en Supabase
      const { data, error } = await supabaseAdmin
        .from('repositories')
        .upsert(reposToInsert, {
          onConflict: 'github_id',
          ignoreDuplicates: false,
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return { 
        success: true, 
        count: repos.length,
        data 
      };
    } catch (error) {
      console.error('Error syncing repositories:', error);
      throw error;
    }
  }

  /**
   * Gets user repositories from Supabase
   */
  async getRepositories() {
    try {
      // Get repositories with their latest analysis
      const { data: repos, error: reposError } = await supabaseAdmin
        .from('repositories')
        .select('*')
        .eq('user_id', this.userId)
        .order('stars', { ascending: false });

      if (reposError) throw reposError;

      if (!repos || repos.length === 0) {
        return [];
      }

      // Get latest analysis for each repository
      const repoIds = repos.map(r => r.id);
      const { data: analyses, error: analysesError } = await supabaseAdmin
        .from('repository_analyses')
        .select('repository_id, overall_score, quality_score, security_score, structure_score, analysis_data, created_at')
        .in('repository_id', repoIds)
        .order('created_at', { ascending: false });

      if (analysesError) {
        console.error('Error fetching analyses:', analysesError);
        // Continue without analyses
      }

      // Map latest analysis to each repository
      const analysisMap = new Map();
      if (analyses) {
        analyses.forEach(analysis => {
          if (!analysisMap.has(analysis.repository_id)) {
            analysisMap.set(analysis.repository_id, analysis);
          }
        });
      }

      // Combine repos with their latest analysis
      const reposWithAnalysis = repos.map(repo => {
        const latestAnalysis = analysisMap.get(repo.id);
        return {
          ...repo,
          latest_score: latestAnalysis?.overall_score,
          latest_analysis: latestAnalysis || undefined,
        };
      });

      return reposWithAnalysis;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  /**
   * Obtiene un repositorio específico
   */
  async getRepository(repoId: number) {
    try {
      const { data, error } = await supabaseAdmin
        .from('repositories')
        .select('*')
        .eq('id', repoId)
        .eq('user_id', this.userId)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error fetching repository:', error);
      throw error;
    }
  }

  /**
   * Obtiene el contenido de un repositorio de GitHub
   */
  async getRepositoryContent(owner: string, repo: string, path = '') {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path,
      });

      return data;
    } catch (error) {
      console.error('Error fetching repository content:', error);
      throw error;
    }
  }

  /**
   * Obtiene los lenguajes de un repositorio
   */
  async getRepositoryLanguages(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.repos.listLanguages({
        owner,
        repo,
      });

      return data;
    } catch (error) {
      console.error('Error fetching languages:', error);
      throw error;
    }
  }

  /**
   * Obtiene información detallada de un repositorio desde GitHub
   */
  async getRepositoryDetails(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.repos.get({
        owner,
        repo,
      });

      return data;
    } catch (error) {
      console.error('Error fetching repository details:', error);
      throw error;
    }
  }
}