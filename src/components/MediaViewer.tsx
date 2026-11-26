import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { MediaItem } from '../types/journey';
import { MEDIA_CATEGORY_LABELS } from '../data/mediaData';

interface MediaViewerProps {
  items: MediaItem[];
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}

export function MediaViewer({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}: MediaViewerProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const current = items[activeIndex];

  useEffect(() => {
    setImgFailed(false);
  }, [current?.id, current?.url]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        onChangeIndex(activeIndex - 1);
      }
      if (e.key === 'ArrowRight' && activeIndex < items.length - 1) {
        onChangeIndex(activeIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, items.length, onChangeIndex, onClose]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Trình xem toàn màn hình: ${current.title}`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0B2233]/95 backdrop-blur-md pt-safe pb-safe"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-[#91D5ED]/25 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="font-mono-tabular text-xs font-semibold text-[#91D5ED]">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(items.length).padStart(2, '0')} ·{' '}
            {MEDIA_CATEGORY_LABELS[current.category]}
          </p>
          <h2 className="truncate text-sm font-semibold text-[#F5FBFF] sm:text-base">
            {current.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng trình xem toàn màn hình"
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full border border-[#91D5ED]/45 bg-[#173B52]/85 text-[#F5FBFF] transition-colors hover:border-[#91D5ED] hover:bg-[#173B52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91D5ED]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Center Media */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-3 py-4 sm:px-10">
        {current.type === 'video' ? (
          <video
            key={current.url}
            src={current.url}
            controls
            playsInline
            className="max-h-[68dvh] max-w-full rounded-2xl bg-black object-contain"
          />
        ) : !imgFailed && current.url ? (
          <img
            src={current.url}
            alt={current.caption || current.title}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="max-h-[68dvh] max-w-full rounded-2xl object-contain"
          />
        ) : (
          <div className="flex h-64 w-full max-w-xl flex-col items-center justify-center rounded-3xl border border-[#91D5ED]/40 bg-[#173B52] p-6 text-center">
            <p className="text-sm font-medium text-[#F5FBFF]">{current.title}</p>
            <p className="mt-2 text-xs text-[#DDF3FC]">
              Không thể tải tệp hình ảnh. Vui lòng kiểm tra hoặc cập nhật lại trong trang Quản trị.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Caption & Controls */}
      <div className="border-t border-[#91D5ED]/25 bg-[#0F2A3E]/90 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-relaxed text-[#F5FBFF]">
              {current.caption}
            </p>
            <p className="mt-1 text-xs text-[#B9E5F5]">
              {current.capturedAt} · {current.location}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled={activeIndex <= 0}
              onClick={() => onChangeIndex(activeIndex - 1)}
              aria-label="Khoảnh khắc trước"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 rounded-full border border-[#91D5ED]/45 bg-[#173B52] px-4 text-xs font-medium text-[#F5FBFF] transition-colors hover:border-[#91D5ED] disabled:opacity-35 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Trước</span>
            </button>

            <button
              type="button"
              disabled={activeIndex >= items.length - 1}
              onClick={() => onChangeIndex(activeIndex + 1)}
              aria-label="Khoảnh khắc tiếp theo"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 rounded-full border border-[#91D5ED]/45 bg-[#173B52] px-4 text-xs font-medium text-[#F5FBFF] transition-colors hover:border-[#91D5ED] disabled:opacity-35 disabled:cursor-not-allowed"
            >
              <span>Tiếp</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
