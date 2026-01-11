# Supabase Setup

## Database Schema

Este proyecto utiliza Supabase como base de datos. A continuación se detallan las instrucciones para configurar la base de datos.

## Setup Instructions

### 1. Crear el proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Copia la URL y la Anon Key del proyecto

### 2. Configurar las variables de entorno

Las variables ya están configuradas en `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 3. Ejecutar las migraciones

#### Opción A: Usando el SQL Editor en Supabase Dashboard

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **SQL Editor**
3. Copia el contenido de `supabase/migrations/001_create_repositories_table.sql`
4. Pégalo en el editor y ejecuta

#### Opción B: Usando Supabase CLI (Recomendado)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Vincular tu proyecto
supabase link --project-ref your-project-ref

# Ejecutar migraciones
supabase db push
```

## Estructura de la Base de Datos

### Tabla: `repositories`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | BIGSERIAL | ID único del repositorio (auto-incremento) |
| `user_id` | TEXT | ID del usuario propietario |
| `github_id` | BIGINT | ID del repositorio en GitHub (único) |
| `name` | TEXT | Nombre del repositorio |
| `full_name` | TEXT | Nombre completo (owner/repo) |
| `description` | TEXT | Descripción del repositorio |
| `language` | TEXT | Lenguaje principal |
| `stars` | INTEGER | Número de estrellas |
| `forks` | INTEGER | Número de forks |
| `is_private` | BOOLEAN | Si el repositorio es privado |
| `html_url` | TEXT | URL del repositorio en GitHub |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Fecha de última actualización |

## Row Level Security (RLS)

La tabla tiene RLS habilitado con las siguientes políticas:

- Los usuarios solo pueden leer sus propios repositorios
- Los usuarios solo pueden insertar sus propios repositorios
- Los usuarios solo pueden actualizar sus propios repositorios
- Los usuarios solo pueden eliminar sus propios repositorios

## Índices

- `idx_repositories_user_id`: Índice en `user_id` para consultas rápidas
- `idx_repositories_github_id`: Índice en `github_id` para búsquedas rápidas

## Triggers

- `update_repositories_updated_at`: Actualiza automáticamente el campo `updated_at` cuando se modifica un registro
