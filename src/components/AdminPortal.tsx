import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  Eye,
  EyeOff,
  ImagePlus,
  Lock,
  LogOut,
  ShieldCheck,
  Star,
  Trash2,
  Video,
} from 'lucide-react';
import type { MediaCategory, MediaItem } from '../types/journey';
import { MEDIA_CATEGORY_LABELS } from '../data/mediaData';
import { getSupabaseEnvStatus } from '../lib/supabase';
import {
  deleteMediaItemFromSupabase,
  fetchAllAdminMediaItems,
  getCurrentAdminSession,
  setCoverMediaItemInSupabase,
  signInAdmin,
  signOutAdmin,
  updateMediaItemInSupabase,
  uploadMediaToSupabase,
} from '../services/supabaseService';

interface AdminPortalProps {
  onExitAdmin: () => void;
  onMediaSynced: () => void;
}

export function AdminPortal({ onExitAdmin, onMediaSynced }: AdminPortalProps) {
  const envStatus = getSupabaseEnvStatus();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  // Login state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Media items management state
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadAdminData = async () => {
    setLoadingItems(true);
    setActionError(null);
    try {
      const list = await fetchAllAdminMediaItems();
      setItems(list);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Không thể tải dữ liệu từ Supabase.'
      );
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    let active = true;
    if (!envStatus.configured) {
      setCheckingAuth(false);
      return;
    }

    getCurrentAdminSession()
      .then(({ session, isAdmin: verified }) => {
        if (!active) return;
        setIsAdmin(verified);
        setAdminEmail(session?.user?.email ?? null);
        if (verified) {
          void loadAdminData();
        }
      })
      .finally(() => {
        if (active) setCheckingAuth(false);
      });

    return () => {
      active = false;
    };
  }, [envStatus.configured]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      await signInAdmin(emailInput, passwordInput);
      const { session, isAdmin: verified } = await getCurrentAdminSession();
      setIsAdmin(verified);
      setAdminEmail(session?.user?.email ?? null);
      setPasswordInput('');
      if (verified) {
        await loadAdminData();
      }
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : 'Đăng nhập không thành công.'
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setIsAdmin(false);
    setAdminEmail(null);
    setItems([]);
  };

  const handleUploadFiles = async (
    fileList: FileList | null,
    mediaType: 'image' | 'video'
  ) => {
    if (!fileList || fileList.length === 0) return;
    setActionError(null);
    setActionStatus(null);
    setUploading(true);

    try {
      const files = Array.from(fileList);
      let nextOrder = items.length;
      let uploadedCount = 0;

      for (const file of files) {
        const matches =
          mediaType === 'image'
            ? file.type.startsWith('image/')
            : file.type.startsWith('video/');
        if (!matches) {
          throw new Error(
            `Tệp "${file.name}" không đúng định dạng ${
              mediaType === 'image' ? 'hình ảnh' : 'video'
            }.`
          );
        }

        const cleanTitle =
          file.name.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ') ||
          (mediaType === 'image' ? 'Ảnh thực tế' : 'Video thực tế');

        await uploadMediaToSupabase({
          file,
          mediaType,
          title: cleanTitle,
          description: 'Khoảnh khắc thực tế của nhóm.',
          category: 'hanh-dong',
          capturedAt: new Date().toLocaleDateString('vi-VN'),
          location: 'Hiện trường thực địa',
          displayOrder: nextOrder++,
          isPublished: true,
        });
        uploadedCount += 1;
      }

      await loadAdminData();
      onMediaSynced();
      setActionStatus(
        `Đã tải lên thành công ${uploadedCount} tệp vào Supabase Storage và xuất bản công khai.`
      );
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Upload thất bại.'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateField = async (
    id: string,
    patch: Partial<{
      title: string;
      description: string;
      category: MediaCategory;
      captured_at: string;
      location: string;
      is_published: boolean;
    }>
  ) => {
    setActionError(null);
    try {
      const updated = await updateMediaItemInSupabase(id, patch);
      setItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
      onMediaSynced();
      setActionStatus('Đã lưu thay đổi lên Supabase.');
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Không thể cập nhật dữ liệu.'
      );
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const copy = [...items];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);

    setItems(copy.map((item, idx) => ({ ...item, order: idx })));

    try {
      await Promise.all(
        copy.map((item, idx) =>
          updateMediaItemInSupabase(item.id, { display_order: idx })
        )
      );
      onMediaSynced();
      setActionStatus('Đã cập nhật thứ tự hiển thị.');
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Không thể đổi thứ tự.'
      );
      await loadAdminData();
    }
  };

  const handleSetCover = async (id: string) => {
    try {
      await setCoverMediaItemInSupabase(
        id,
        items.map((i) => i.id)
      );
      setItems((prev) => prev.map((it) => ({ ...it, isCover: it.id === id })));
      onMediaSynced();
      setActionStatus('Đã cập nhật ảnh đại diện dự án.');
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Không thể đặt ảnh đại diện.'
      );
    }
  };

  const handleDelete = async (item: MediaItem) => {
    setActionError(null);
    try {
      await deleteMediaItemFromSupabase(item);
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      onMediaSynced();
      setActionStatus(`Đã xóa "${item.title}" khỏi Storage và Database.`);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Không thể xóa mục này.'
      );
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F5FBFF] text-[#173B52] px-4 py-6 sm:px-6 sm:py-10 pb-safe">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B9E5F5] pb-4">
          <div>
            <p className="text-xs font-semibold text-[#557386]">
              BLUE TRACE · TRANG QUẢN TRỊ NỘI DUNG
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-[#173B52] sm:text-3xl">
              Quản lý Ảnh và Video Công Khai
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="min-h-[44px] inline-flex items-center gap-2 rounded-full border border-[#B9E5F5] bg-white px-4 py-2 text-xs font-medium text-[#173B52] hover:bg-[#DDF3FC]"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span>Đăng xuất</span>
              </button>
            )}
            <button
              type="button"
              onClick={onExitAdmin}
              className="min-h-[44px] inline-flex items-center gap-2 rounded-full bg-[#DDF3FC] px-4 py-2 text-xs font-semibold text-[#173B52] hover:bg-[#B9E5F5]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Quay lại website công khai</span>
            </button>
          </div>
        </div>

        {/* Case 1: Supabase env vars not configured yet */}
        {!envStatus.configured ? (
          <div className="rounded-3xl border border-[#B9E5F5] bg-white p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#173B52]" aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl font-semibold text-[#173B52]">
                  Chưa cấu hình biến môi trường Supabase
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#557386]">
                  Để ảnh và video bạn upload hiển thị công khai cho tất cả mọi người truy cập liên kết (và được bảo vệ bằng Row Level Security), vui lòng hoàn tất cấu hình Supabase theo 6 bước dưới đây (xem hướng dẫn chi tiết 8 bước trong <code className="font-mono-tabular">SUPABASE_SETUP.md</code>). Không tự động giả lập upload cục bộ.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F5FBFF] border border-[#B9E5F5] p-4 sm:p-5 text-xs sm:text-sm space-y-2 text-[#173B52]">
              <p className="font-semibold">Trạng thái hiện tại:</p>
              <p>VITE_SUPABASE_URL: {envStatus.urlPresent ? 'Đã có' : 'Chưa thiết lập'}</p>
              <p>VITE_SUPABASE_ANON_KEY: {envStatus.anonKeyPresent ? 'Đã có' : 'Chưa thiết lập'}</p>
            </div>

            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[#173B52]">
              <li>Tạo Supabase project mới tại supabase.com.</li>
              <li>Tạo 2 Storage buckets công khai: <code className="font-mono-tabular bg-[#DDF3FC] px-1.5 py-0.5 rounded">blue-trace-images</code> và <code className="font-mono-tabular bg-[#DDF3FC] px-1.5 py-0.5 rounded">blue-trace-videos</code>.</li>
              <li>Chạy toàn bộ tập lệnh trong file <code className="font-mono-tabular bg-[#DDF3FC] px-1.5 py-0.5 rounded">supabase/schema.sql</code> ở Supabase SQL Editor.</li>
              <li>Tạo tài khoản Admin trong <strong>Authentication → Users</strong> và thêm UID vào bảng <code className="font-mono-tabular bg-[#DDF3FC] px-1.5 py-0.5 rounded">public.admin_users</code>.</li>
              <li>Điền <code className="font-mono-tabular bg-[#DDF3FC] px-1.5 py-0.5 rounded">VITE_SUPABASE_URL</code> và <code className="font-mono-tabular bg-[#DDF3FC] px-1.5 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> vào file <code className="font-mono-tabular bg-[#DDF3FC] px-1.5 py-0.5 rounded">.env</code> (tuyệt đối không đưa <code className="font-mono-tabular">service_role</code> key vào frontend).</li>
              <li>Khởi chạy lại website, vào lại <code className="font-mono-tabular bg-[#DDF3FC] px-1.5 py-0.5 rounded">/admin</code> và đăng nhập để upload ảnh/video.</li>
            </ol>
          </div>
        ) : checkingAuth ? (
          <div className="rounded-3xl border border-[#B9E5F5] bg-white p-10 text-center text-sm text-[#557386]">
            Đang kiểm tra phiên đăng nhập quản trị...
          </div>
        ) : !isAdmin ? (
          /* Case 2: Real Supabase Auth Admin Login */
          <form
            onSubmit={(e) => void handleLogin(e)}
            className="mx-auto max-w-md rounded-3xl border border-[#B9E5F5] bg-white p-6 sm:p-8 shadow-xs space-y-5"
          >
            <div className="flex items-center gap-2.5">
              <Lock className="h-5 w-5 text-[#173B52]" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-[#173B52]">
                Đăng nhập Quản trị viên
              </h2>
            </div>

            <p className="text-xs leading-relaxed text-[#557386]">
              Chỉ tài khoản được xác thực qua Supabase Auth và có mặt trong bảng <code className="font-mono-tabular">admin_users</code> mới có quyền upload, chỉnh sửa hoặc xóa tư liệu công khai.
            </p>

            {authError && (
              <div
                role="alert"
                className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-900"
              >
                {authError}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-semibold text-[#173B52]"
                >
                  Email quản trị viên
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="nhom1to3@example.com"
                  className="mt-1 min-h-[44px] w-full rounded-xl border border-[#B9E5F5] bg-[#F5FBFF] px-3.5 py-2 text-sm text-[#173B52] focus:border-[#173B52] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold text-[#173B52]"
                >
                  Mật khẩu
                </label>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="mt-1 min-h-[44px] w-full rounded-xl border border-[#B9E5F5] bg-[#F5FBFF] px-3.5 py-2 text-sm text-[#173B52] focus:border-[#173B52] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="liquid-glass-cta min-h-[48px] w-full rounded-full text-sm font-semibold text-[#173B52] disabled:opacity-50"
            >
              {authLoading ? 'Đang xác thực...' : 'Đăng nhập quản trị'}
            </button>
          </form>
        ) : (
          /* Case 3: Authenticated Admin Workspace */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#D7F4EA] px-4 py-3 text-xs font-medium text-[#173B52]">
              <span>Đã đăng nhập quản trị: {adminEmail}</span>
              <span>Lưu trữ thực tế: Supabase Storage + Database</span>
            </div>

            {actionError && (
              <div
                role="alert"
                className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-900"
              >
                {actionError}
              </div>
            )}

            {actionStatus && (
              <div
                role="status"
                className="flex items-center gap-2 rounded-2xl border border-[#91D5ED] bg-[#DDF3FC] px-4 py-3 text-xs font-medium text-[#173B52]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{actionStatus}</span>
              </div>
            )}

            {/* Upload Actions */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="min-h-[56px] flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#91D5ED] bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-[#173B52] hover:bg-[#DDF3FC]">
                <ImagePlus className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>{uploading ? 'Đang upload lên Supabase...' : 'Upload nhiều ảnh thực tế'}</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  onChange={(e) => {
                    void handleUploadFiles(e.target.files, 'image');
                    e.target.value = '';
                  }}
                  className="sr-only"
                />
              </label>

              <label className="min-h-[56px] flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#91D5ED] bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-[#173B52] hover:bg-[#DDF3FC]">
                <Video className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>{uploading ? 'Đang upload lên Supabase...' : 'Upload video hoạt động'}</span>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  disabled={uploading}
                  onChange={(e) => {
                    void handleUploadFiles(e.target.files, 'video');
                    e.target.value = '';
                  }}
                  className="sr-only"
                />
              </label>
            </div>

            {/* Items List */}
            {loadingItems ? (
              <div className="rounded-3xl border border-[#B9E5F5] bg-white p-8 text-center text-sm text-[#557386]">
                Đang tải danh sách tư liệu từ Supabase...
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-3xl border border-[#B9E5F5] bg-white p-8 text-center text-sm text-[#557386]">
                Chưa có ảnh hoặc video nào trong bảng <code className="font-mono-tabular">media_items</code>. Hãy tải lên ở phía trên.
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <AdminMediaRow
                    key={item.id}
                    item={item}
                    index={idx}
                    total={items.length}
                    onSave={(patch) => void handleUpdateField(item.id, patch)}
                    onMove={(dir) => void handleReorder(idx, dir)}
                    onSetCover={() => void handleSetCover(item.id)}
                    onDelete={() => void handleDelete(item)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface AdminMediaRowProps {
  item: MediaItem;
  index: number;
  total: number;
  onSave: (
    patch: Partial<{
      title: string;
      description: string;
      category: MediaCategory;
      captured_at: string;
      location: string;
      is_published: boolean;
    }>
  ) => void;
  onMove: (dir: 'up' | 'down') => void;
  onSetCover: () => void;
  onDelete: () => void;
}

function AdminMediaRow({
  item,
  index,
  total,
  onSave,
  onMove,
  onSetCover,
  onDelete,
}: AdminMediaRowProps) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.caption);
  const [category, setCategory] = useState<MediaCategory>(item.category);
  const [capturedAt, setCapturedAt] = useState(item.capturedAt);
  const [location, setLocation] = useState(item.location);

  return (
    <div className="rounded-3xl border border-[#B9E5F5] bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full shrink-0 md:w-52">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#102A3C]">
            {item.type === 'video' ? (
              <video
                src={item.url}
                controls
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={item.url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <p className="mt-2 font-mono-tabular text-[11px] text-[#557386]">
            #{String(index + 1).padStart(2, '0')} · {item.type === 'video' ? 'Video' : 'Ảnh'} · {item.isPublished ? 'Đang công khai' : 'Đang ẩn'}
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-semibold text-[#557386]">
                Tiêu đề
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 min-h-[42px] w-full rounded-xl border border-[#B9E5F5] bg-[#F5FBFF] px-3 py-2 text-sm text-[#173B52]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#557386]">
                Phân đoạn
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MediaCategory)}
                className="mt-1 min-h-[42px] w-full rounded-xl border border-[#B9E5F5] bg-[#F5FBFF] px-3 py-2 text-sm text-[#173B52]"
              >
                {Object.entries(MEDIA_CATEGORY_LABELS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#557386]">
              Mô tả / Chú thích
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#B9E5F5] bg-[#F5FBFF] px-3 py-2 text-sm text-[#173B52]"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="text"
              aria-label="Thời gian"
              value={capturedAt}
              onChange={(e) => setCapturedAt(e.target.value)}
              className="min-h-[40px] rounded-xl border border-[#B9E5F5] bg-[#F5FBFF] px-3 py-1.5 text-xs text-[#173B52]"
            />
            <input
              type="text"
              aria-label="Địa điểm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="min-h-[40px] rounded-xl border border-[#B9E5F5] bg-[#F5FBFF] px-3 py-1.5 text-xs text-[#173B52]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() =>
                onSave({
                  title,
                  description,
                  category,
                  captured_at: capturedAt,
                  location,
                })
              }
              className="min-h-[44px] rounded-full bg-[#91D5ED] px-4 py-2 text-xs font-semibold text-[#173B52] hover:bg-[#B9E5F5]"
            >
              Lưu chỉnh sửa
            </button>

            <button
              type="button"
              onClick={() => onSave({ is_published: !item.isPublished })}
              className="min-h-[44px] inline-flex items-center gap-1.5 rounded-full border border-[#B9E5F5] bg-[#F5FBFF] px-3.5 py-2 text-xs font-medium text-[#173B52] hover:bg-[#DDF3FC]"
            >
              {item.isPublished ? (
                <>
                  <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Ẩn khỏi trang công khai</span>
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Xuất bản công khai</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onSetCover}
              className={`min-h-[44px] inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium ${
                item.isCover
                  ? 'border-[#91D5ED] bg-[#D7F4EA] text-[#173B52]'
                  : 'border-[#B9E5F5] bg-[#F5FBFF] text-[#557386]'
              }`}
            >
              <Star className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{item.isCover ? 'Ảnh đại diện' : 'Đặt đại diện'}</span>
            </button>

            <button
              type="button"
              disabled={index === 0}
              onClick={() => onMove('up')}
              aria-label="Di chuyển lên"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full border border-[#B9E5F5] bg-white text-[#173B52] disabled:opacity-35"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              disabled={index === total - 1}
              onClick={() => onMove('down')}
              aria-label="Di chuyển xuống"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full border border-[#B9E5F5] bg-white text-[#173B52] disabled:opacity-35"
            >
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onDelete}
              aria-label={`Xóa ${item.title}`}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full border border-rose-300 bg-rose-50 text-rose-800 hover:bg-rose-100"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
