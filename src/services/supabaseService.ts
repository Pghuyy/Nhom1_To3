import type { Session } from '@supabase/supabase-js';
import type { MediaCategory, MediaItem } from '../types/journey';
import {
  getSupabaseClient,
  SUPABASE_IMAGE_BUCKET,
  SUPABASE_VIDEO_BUCKET,
} from '../lib/supabase';

interface DbMediaRow {
  id: string;
  title: string;
  description: string;
  media_type: 'image' | 'video';
  storage_path: string;
  category: string;
  captured_at: string | null;
  location: string | null;
  display_order: number;
  is_published: boolean;
  is_cover: boolean;
  created_at: string;
}

function getBucketForType(type: 'image' | 'video'): string {
  return type === 'video' ? SUPABASE_VIDEO_BUCKET : SUPABASE_IMAGE_BUCKET;
}

function resolvePublicMediaUrl(storagePath: string, type: 'image' | 'video'): string {
  if (/^https?:\/\//i.test(storagePath)) {
    return storagePath;
  }
  const client = getSupabaseClient();
  if (!client) return '';
  const bucket = getBucketForType(type);
  const { data } = client.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

function mapRowToMediaItem(row: DbMediaRow): MediaItem {
  const validCategories: MediaCategory[] = [
    'boi-canh',
    'chuan-bi',
    'hanh-dong',
    'thanh-qua',
  ];
  const category = validCategories.includes(row.category as MediaCategory)
    ? (row.category as MediaCategory)
    : 'hanh-dong';

  return {
    id: row.id,
    title: row.title,
    type: row.media_type,
    url: resolvePublicMediaUrl(row.storage_path, row.media_type),
    storagePath: row.storage_path,
    caption: row.description ?? '',
    category,
    capturedAt: row.captured_at ?? 'Hoạt động thực tế',
    location: row.location ?? 'Hiện trường thực địa',
    order: row.display_order ?? 0,
    isPublished: Boolean(row.is_published),
    isCover: Boolean(row.is_cover),
    isSample: false,
    storageSource: 'supabase',
    createdAt: row.created_at,
  };
}

/**
 * Public read: fetches only published media items (no login required).
 */
export async function fetchPublishedMediaItems(): Promise<MediaItem[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('media_items')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Không thể tải danh sách media công khai: ${error.message}`);
  }

  return ((data ?? []) as DbMediaRow[]).map(mapRowToMediaItem);
}

/**
 * Admin read: fetches all media items (published & hidden) when authenticated as admin.
 */
export async function fetchAllAdminMediaItems(): Promise<MediaItem[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('media_items')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Không thể tải dữ liệu quản trị: ${error.message}`);
  }

  return ((data ?? []) as DbMediaRow[]).map(mapRowToMediaItem);
}

export async function getCurrentAdminSession(): Promise<{
  session: Session | null;
  isAdmin: boolean;
}> {
  const client = getSupabaseClient();
  if (!client) return { session: null, isAdmin: false };

  const {
    data: { session },
  } = await client.auth.getSession();

  if (!session) {
    return { session: null, isAdmin: false };
  }

  const { data: adminRow, error } = await client
    .from('admin_users')
    .select('user_id')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (error || !adminRow) {
    return { session, isAdmin: false };
  }

  return { session, isAdmin: true };
}

export async function signInAdmin(email: string, password: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Chưa cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY.');
  }
  const { data, error } = await client.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error || !data.session) {
    throw new Error(error?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
  }

  const { data: adminRow, error: adminErr } = await client
    .from('admin_users')
    .select('user_id')
    .eq('user_id', data.session.user.id)
    .maybeSingle();

  if (adminErr || !adminRow) {
    await client.auth.signOut();
    throw new Error(
      'Tài khoản này chưa được cấp quyền quản trị trong bảng public.admin_users.'
    );
  }
}

export async function signOutAdmin(): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;
  await client.auth.signOut();
}

export async function uploadMediaToSupabase(params: {
  file: File;
  mediaType: 'image' | 'video';
  title: string;
  description: string;
  category: MediaCategory;
  capturedAt: string;
  location: string;
  displayOrder: number;
  isPublished: boolean;
}): Promise<MediaItem> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Chưa cấu hình kết nối Supabase.');
  }

  const bucket = getBucketForType(params.mediaType);
  const safeFileName = params.file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `moments/${Date.now()}_${Math.random().toString(36).slice(2, 7)}_${safeFileName}`;

  const { error: uploadError } = await client.storage
    .from(bucket)
    .upload(storagePath, params.file, {
      cacheControl: '3600',
      upsert: false,
      contentType: params.file.type || undefined,
    });

  if (uploadError) {
    throw new Error(`Upload file vào Storage thất bại: ${uploadError.message}`);
  }

  const { data: inserted, error: dbError } = await client
    .from('media_items')
    .insert({
      title: params.title,
      description: params.description,
      media_type: params.mediaType,
      storage_path: storagePath,
      category: params.category,
      captured_at: params.capturedAt,
      location: params.location,
      display_order: params.displayOrder,
      is_published: params.isPublished,
      is_cover: false,
    })
    .select('*')
    .single();

  if (dbError) {
    // Clean up orphaned Storage object if DB insert fails
    await client.storage.from(bucket).remove([storagePath]);
    throw new Error(`Lưu metadata vào Database thất bại: ${dbError.message}`);
  }

  return mapRowToMediaItem(inserted as DbMediaRow);
}

export async function updateMediaItemInSupabase(
  id: string,
  patch: Partial<{
    title: string;
    description: string;
    category: MediaCategory;
    captured_at: string;
    location: string;
    display_order: number;
    is_published: boolean;
    is_cover: boolean;
  }>
): Promise<MediaItem> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Chưa cấu hình kết nối Supabase.');
  }

  const { data, error } = await client
    .from('media_items')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Cập nhật thông tin thất bại: ${error.message}`);
  }

  return mapRowToMediaItem(data as DbMediaRow);
}

export async function setCoverMediaItemInSupabase(
  targetId: string,
  allIds: string[]
): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  if (allIds.length > 0) {
    await client
      .from('media_items')
      .update({ is_cover: false })
      .in('id', allIds);
  }
  const { error } = await client
    .from('media_items')
    .update({ is_cover: true })
    .eq('id', targetId);

  if (error) {
    throw new Error(`Không thể đặt ảnh đại diện: ${error.message}`);
  }
}

export async function deleteMediaItemFromSupabase(item: MediaItem): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Chưa cấu hình kết nối Supabase.');
  }

  const { error: dbError } = await client
    .from('media_items')
    .delete()
    .eq('id', item.id);

  if (dbError) {
    throw new Error(`Xóa bản ghi Database thất bại: ${dbError.message}`);
  }

  if (item.storagePath && !/^https?:\/\//i.test(item.storagePath)) {
    const bucket = getBucketForType(item.type);
    await client.storage.from(bucket).remove([item.storagePath]);
  }
}
