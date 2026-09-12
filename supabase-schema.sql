-- ============================================================
-- AKTU CONNECT — Supabase Schema
-- Run this ENTIRE file once in: Supabase Dashboard > SQL Editor
-- (Uses Supabase's built-in Auth, so real signup/login works
--  out of the box — no extra auth provider needed.)
-- ============================================================

-- 1. PLAYER STATS — one row per user (created at onboarding)
create table if not exists player_stats (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text default 'Player',
  email text,
  semester integer default 1,
  branch text default 'CSE',
  target_cgpa integer default 7,
  goal text default 'Not set',
  avatar_url text,

  level integer default 1,
  total_xp integer default 0,

  streak_days integer default 0,
  last_study_date date,

  quests_completed integer default 0,
  focus_sessions_completed integer default 0,
  total_focus_minutes integer default 0,

  study_boost_date date,        -- tracks the daily "+10 XP study boost" button

  created_at timestamp with time zone default now()
);

alter table player_stats enable row level security;

-- Everyone can READ everyone's stats (needed for the leaderboard)
drop policy if exists "Anyone can view stats" on player_stats;
create policy "Anyone can view stats"
  on player_stats for select
  using (true);

-- Only the owner can create/update their own row
drop policy if exists "Users insert own stats" on player_stats;
create policy "Users insert own stats"
  on player_stats for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users update own stats" on player_stats;
create policy "Users update own stats"
  on player_stats for update
  using (auth.uid() = user_id);


-- 2. QUESTS — each quest has a JSON list of tasks (title, xp, completed)
create table if not exists quests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  icon text default '📘',
  deadline text,
  tasks jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now()
);

alter table quests enable row level security;

drop policy if exists "Users manage own quests" on quests;
create policy "Users manage own quests"
  on quests for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- 3. LEADERBOARD VIEW — top players by XP (safe, read-only, no emails leaked)
create or replace view leaderboard as
  select user_id, name, level, total_xp, streak_days
  from player_stats
  order by total_xp desc;

-- Done! After running this, go to Project Settings > API and copy your
-- Project URL + anon public key into config.js
