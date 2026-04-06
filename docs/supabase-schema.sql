-- ============================================================
-- WORKA — Supabase SQL Schema
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  email       text,
  avatar_url  text,
  created_at  timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data->>'name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- TASK THEMES
-- ============================================================
create table public.themes (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid references public.profiles(id) on delete cascade not null,
  label      text not null,
  color      text not null,
  accent     text not null,
  emoji      text not null,
  created_at timestamptz default now()
);

-- ============================================================
-- TASKS
-- ============================================================
create table public.tasks (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid references public.profiles(id) on delete cascade not null,
  theme_id            uuid references public.themes(id) on delete set null,
  title               text not null,
  date                date not null default current_date,
  time                time not null,
  duration            text,
  status              text not null default 'pending' check (status in ('pending', 'completed')),
  priority            text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  recurrence          text check (recurrence in ('daily', 'weekly', 'monthly')),
  completed_at        timestamptz,
  created_at          timestamptz default now()
);

-- ============================================================
-- ARCHIVED TASKS
-- ============================================================
create table public.archived_tasks (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  task_data   jsonb not null,
  archived_at timestamptz default now()
);

-- ============================================================
-- OBJECTIVES
-- ============================================================
create table public.objectives (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references public.profiles(id) on delete cascade not null,
  theme_id     uuid references public.themes(id) on delete set null,
  title        text not null,
  progress     numeric(4,3) not null default 0 check (progress >= 0 and progress <= 1),
  due_date     date,
  status       text not null default 'pending' check (status in ('pending', 'completed')),
  image        text,
  completed_at timestamptz,
  created_at   timestamptz default now()
);

-- ============================================================
-- ARCHIVED OBJECTIVES
-- ============================================================
create table public.archived_objectives (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid references public.profiles(id) on delete cascade not null,
  objective_data jsonb not null,
  archived_at    timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles           enable row level security;
alter table public.themes             enable row level security;
alter table public.tasks              enable row level security;
alter table public.archived_tasks     enable row level security;
alter table public.objectives         enable row level security;
alter table public.archived_objectives enable row level security;

-- profiles: read/update own only
create policy "own profile" on public.profiles
  using (id = auth.uid());

-- themes
create policy "own themes" on public.themes
  using (user_id = auth.uid());

-- tasks
create policy "own tasks" on public.tasks
  using (user_id = auth.uid());

-- archived_tasks
create policy "own archived tasks" on public.archived_tasks
  using (user_id = auth.uid());

-- objectives
create policy "own objectives" on public.objectives
  using (user_id = auth.uid());

-- archived_objectives
create policy "own archived objectives" on public.archived_objectives
  using (user_id = auth.uid());

-- ============================================================
-- USEFUL INDEXES
-- ============================================================
create index on public.tasks (user_id, date);
create index on public.objectives (user_id, status);
