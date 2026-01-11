# 🚀 Configuración Rápida para ver Repositorios

## ⚠️ IMPORTANTE: Debes configurar la base de datos primero

### Paso 1: Crear la tabla en Supabase

1. **Ve a tu proyecto de Supabase**: https://supabase.com/dashboard/project/hubpusmedmykkwyegjhq

2. **Abre el SQL Editor**:
   - Click en el menú lateral izquierdo en "SQL Editor"
   - Click en "+ New query"

3. **Ejecuta esta SQL** (copia y pega):

```sql
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_repositories_user_id ON public.repositories(user_id);
CREATE INDEX IF NOT EXISTS idx_repositories_github_id ON public.repositories(github_id);

-- Enable Row Level Security
ALTER TABLE public.repositories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own repositories" 
  ON public.repositories FOR SELECT 
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own repositories" 
  ON public.repositories FOR INSERT 
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own repositories" 
  ON public.repositories FOR UPDATE 
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own repositories" 
  ON public.repositories FOR DELETE 
  USING (auth.uid()::text = user_id);

-- Create trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_repositories_updated_at 
  BEFORE UPDATE ON public.repositories 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();
```

4. **Click en "Run"** o presiona `Ctrl + Enter`

5. **Verifica que se creó**: Ve a "Table Editor" y deberías ver la tabla `repositories`

### Paso 2: Reinicia el servidor de desarrollo

```bash
# Detén el servidor si está corriendo (Ctrl + C)
# Luego inícialo de nuevo
npm run dev
```

### Paso 3: Usa la aplicación

1. **Inicia sesión** con tu cuenta de GitHub
2. **Ve al Dashboard**
3. **Click en "Sync Repositories"** para cargar tus repos desde GitHub
4. **¡Listo!** Ahora deberías ver tus repositorios

## 🔍 Verificar que todo funciona

Después de hacer sync, puedes verificar en Supabase:
1. Ve a "Table Editor"
2. Selecciona la tabla `repositories`
3. Deberías ver tus repositorios listados

## 📁 Estructura de la API

Ya creé estas rutas API automáticamente:
- `GET /api/repositories` - Obtiene todos los repos del usuario
- `POST /api/repositories/sync` - Sincroniza repos desde GitHub

## 🐛 Si algo no funciona

1. **Verifica las variables de entorno** en `.env.local`
2. **Revisa la consola del navegador** para errores
3. **Revisa los logs del servidor** en la terminal
4. **Verifica que la tabla existe** en Supabase Table Editor
