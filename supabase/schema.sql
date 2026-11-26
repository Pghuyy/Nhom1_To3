-- ============================================================================
-- BLUE TRACE – SUPABASE DATABASE, STORAGE & ROW LEVEL SECURITY (RLS) SCHEMA
-- Chạy toàn bộ tập lệnh này trong Supabase Dashboard -> SQL Editor
-- ============================================================================

-- 0. Extension cần thiết cho UUID
create extension if not exists pgcrypto;

-- 1. Bảng quản trị viên (chỉ những tài khoản được thêm vào bảng này mới có quyền sửa/xóa/upload)
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create policy "Admins can read own admin_users record"
  on public.admin_users
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Hàm tiện ích kiểm tra quyền quản trị
create or replace function public.is_blue_trace_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

-- 2. Bảng media_items (lưu metadata ảnh & video thực tế)
create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  media_type text not null check (media_type in ('image', 'video')),
  storage_path text not null,
  category text not null default 'hanh-dong',
  captured_at text,
  location text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.media_items enable row level security;

-- Người xem công khai chỉ được đọc media đã xuất bản
create policy "Public read published media_items"
  on public.media_items
  for select
  to anon, authenticated
  using (is_published = true or public.is_blue_trace_admin());

-- Chỉ quản trị viên được phép thêm, sửa, xóa media_items
create policy "Admin insert media_items"
  on public.media_items
  for insert
  to authenticated
  with check (public.is_blue_trace_admin());

create policy "Admin update media_items"
  on public.media_items
  for update
  to authenticated
  using (public.is_blue_trace_admin())
  with check (public.is_blue_trace_admin());

create policy "Admin delete media_items"
  on public.media_items
  for delete
  to authenticated
  using (public.is_blue_trace_admin());

-- 3. Bảng articles (lưu kho bài luận)
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  excerpt text not null,
  content jsonb not null default '[]'::jsonb,
  cover_image text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.articles enable row level security;

create policy "Public read published articles"
  on public.articles
  for select
  to anon, authenticated
  using (is_published = true or public.is_blue_trace_admin());

create policy "Admin manage articles"
  on public.articles
  for all
  to authenticated
  using (public.is_blue_trace_admin())
  with check (public.is_blue_trace_admin());

-- 4. Bảng quiz_questions (quản lý câu hỏi trắc nghiệm)
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  topic_number integer not null,
  topic_label text not null,
  question text not null,
  options jsonb not null,
  correct_index integer not null check (correct_index between 0 and 3),
  explanation text not null,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.quiz_questions enable row level security;

create policy "Public read published quiz_questions"
  on public.quiz_questions
  for select
  to anon, authenticated
  using (is_published = true or public.is_blue_trace_admin());

create policy "Admin manage quiz_questions"
  on public.quiz_questions
  for all
  to authenticated
  using (public.is_blue_trace_admin())
  with check (public.is_blue_trace_admin());

-- 5. Storage Buckets (blue-trace-images & blue-trace-videos)
insert into storage.buckets (id, name, public)
values
  ('blue-trace-images', 'blue-trace-images', true),
  ('blue-trace-videos', 'blue-trace-videos', true)
on conflict (id) do update set public = true;

-- Chính sách Storage:
-- Ai cũng có thể xem tệp công khai trong 2 bucket
create policy "Public read blue-trace media objects"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id in ('blue-trace-images', 'blue-trace-videos'));

-- Chỉ Admin mới được upload, sửa hoặc xóa file trong Storage
create policy "Admin upload blue-trace media objects"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id in ('blue-trace-images', 'blue-trace-videos')
    and public.is_blue_trace_admin()
  );

create policy "Admin update blue-trace media objects"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id in ('blue-trace-images', 'blue-trace-videos')
    and public.is_blue_trace_admin()
  )
  with check (
    bucket_id in ('blue-trace-images', 'blue-trace-videos')
    and public.is_blue_trace_admin()
  );

create policy "Admin delete blue-trace media objects"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id in ('blue-trace-images', 'blue-trace-videos')
    and public.is_blue_trace_admin()
  );

-- ============================================================================
-- BƯỚC CUỐI QUAN TRỌNG SAU KHI TẠO USER ADMIN TRONG AUTHENTICATION -> USERS:
-- Thay YOUR_ADMIN_USER_UUID và email của bạn rồi chạy dòng sau:
--
-- insert into public.admin_users (user_id, email)
-- values ('YOUR_ADMIN_USER_UUID', 'your-email@example.com');
-- ============================================================================
