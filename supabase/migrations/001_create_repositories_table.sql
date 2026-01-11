-- Create repositories table
CREATE TABLE IF NOT EXISTS public.repositories (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  github_id BIGINT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  description TEXT,
  language TEXT,
  stars INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  is_private BOOLEAN DEFAULT false,
  html_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_repositories_user_id ON public.repositories(user_id);

-- Create index on github_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_repositories_github_id ON public.repositories(github_id);

-- Enable Row Level Security
ALTER TABLE public.repositories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own repositories
CREATE POLICY "Users can read own repositories" 
  ON public.repositories 
  FOR SELECT 
  USING (auth.uid()::text = user_id);

-- Create policy to allow users to insert their own repositories
CREATE POLICY "Users can insert own repositories" 
  ON public.repositories 
  FOR INSERT 
  WITH CHECK (auth.uid()::text = user_id);

-- Create policy to allow users to update their own repositories
CREATE POLICY "Users can update own repositories" 
  ON public.repositories 
  FOR UPDATE 
  USING (auth.uid()::text = user_id);

-- Create policy to allow users to delete their own repositories
CREATE POLICY "Users can delete own repositories" 
  ON public.repositories 
  FOR DELETE 
  USING (auth.uid()::text = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_repositories_updated_at 
  BEFORE UPDATE ON public.repositories 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();
