-- The Living Church Website 2026 - Supabase starter schema

create extension if not exists "uuid-ossp";

create type member_role as enum ('member_pending', 'member_active', 'staff', 'admin');
create type waiver_status as enum ('not_started', 'started', 'completed', 'expired', 'manual_review');
create type approval_status as enum ('pending', 'approved', 'rejected', 'suspended');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  first_name text,
  last_name text,
  phone text,
  role member_role not null default 'member_pending',
  approval approval_status not null default 'pending',
  waiver waiver_status not null default 'not_started',
  smartwaiver_participant_id text,
  smartwaiver_signed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.member_events (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  event_type text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.admin_audit_log (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.profiles(id),
  action text not null,
  target_type text,
  target_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.member_events enable row level security;
alter table public.admin_audit_log enable row level security;

create policy "Users can view own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own basic profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Staff can view profiles"
on public.profiles for select
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('staff', 'admin')
  )
);
