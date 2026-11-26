import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Maximize2,
  MoveRight,
  Pause,
  Play,
} from 'lucide-react';
import type { MediaCategory, MediaItem } from '../types/journey';
import { PROJECT_CONTENT } from '../data/journeyData';
import {
  MEDIA_CATEGORY_LABELS,
  MEDIA_CATEGORY_SHORT,
} from '../data/mediaData';
import { MediaViewer } from './MediaViewer';

interface FieldJournalProps {
  items: MediaItem[];
  isSupabaseReady: boolean;
  onCompleteStage: () => void;
}

export function FieldJournal({
  items,
  isSupabaseReady,
  onCompleteStage,
}: FieldJournalProps) {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory | 'ALL'>('ALL');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [reachedLastSlide, setReachedLastSlide] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [brokenImageIds, setBrokenImageIds] = useState<Record<string, boolean>>({});

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const dragStateRef = useRef<{
    isDown: boolean;
    startX: number;
    scrollLeft: number;
    hasDragged: boolean;
  }>({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasDragged: false,
  });

  const filteredItems = useMemo(() => {
    const sorted = [...items]
      .filter((item) => item.isPublished)
      .sort((a, b) => a.order - b.order);
    if (selectedCategory === 'ALL') return sorted;
    return sorted.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // Reset scroll & active index when switching category filter
  useEffect(() => {
    setActiveSlideIndex(0);
    setReachedLastSlide(filteredItems.length <= 1);
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [selectedCategory, filteredItems.length]);

  // Track which slide is centered during horizontal swipe / trackpad scroll
  const handleScroll = () => {
    const container = scrollerRef.current;
    if (!container || filteredItems.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((el, idx) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(elCenter - containerCenter);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestIndex = idx;
      }
    });

    setActiveSlideIndex(closestIndex);

    const nearScrollEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 40;
    if (closestIndex >= filteredItems.length - 1 || nearScrollEnd) {
      setReachedLastSlide(true);
    }
  };

  // Desktop mouse drag-to-scroll support
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const target = e.target as HTMLElement;
    if (target.closest('button, video, a, input')) return;

    const container = scrollerRef.current;
    if (!container) return;
    dragStateRef.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: container.scrollLeft,
      hasDragged: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    const container = scrollerRef.current;
    if (!drag.isDown || !container) return;
    const deltaX = e.clientX - drag.startX;
    if (Math.abs(deltaX) > 6) {
      drag.hasDragged = true;
    }
    container.scrollLeft = drag.scrollLeft - deltaX;
  };

  const handlePointerUp = () => {
    dragStateRef.current.isDown = false;
    window.setTimeout(() => {
      dragStateRef.current.hasDragged = false;
    }, 60);
  };

  const toggleVideoPlay = (id: string) => {
    const vid = videoRefs.current[id];
    if (!vid) return;
    if (vid.paused) {
      void vid.play();
    } else {
      vid.pause();
    }
  };

  const hasOnlySamples =
    items.length > 0 && items.every((item) => item.isSample);

  return (
    <section
      aria-labelledby="journal-heading"
      className="mx-auto w-full max-w-7xl py-6 sm:py-10 pb-safe"
    >
      {/* Editorial Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 border-b border-[#B9E5F5] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#557386]">
              Chương 02 · Phóng sự ảnh và tư liệu hiện trường
            </p>
            <h1
              id="journal-heading"
              className="mt-1.5 font-display text-2xl font-semibold leading-tight text-[#173B52] sm:text-3xl lg:text-4xl"
            >
              Nhật ký hành động thực tế
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#557386]">
              {hasOnlySamples
                ? 'Bộ tư liệu minh họa quy trình khảo sát, chuẩn bị và hành động thực tế vì nguồn nước sạch.'
                : 'Những khoảnh khắc thực tế được nhóm ghi lại trực tiếp trong quá trình hành động vì môi trường nước.'}
            </p>
          </div>

          <div className="font-mono-tabular text-xs font-semibold text-[#173B52] shrink-0">
            {filteredItems.length > 0
              ? `Khoảnh khắc ${String(activeSlideIndex + 1).padStart(2, '0')} / ${String(filteredItems.length).padStart(2, '0')}`
              : '00 / 00'}
          </div>
        </div>

        {/* Category Filter Tabs + Subtle Swipe Hint */}
        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Phân đoạn nhật ký hoạt động"
            className="flex flex-wrap items-center gap-1.5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'ALL'}
              onClick={() => setSelectedCategory('ALL')}
              className={`min-h-[44px] rounded-full px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'ALL'
                  ? 'bg-[#91D5ED] text-[#173B52] font-semibold shadow-xs'
                  : 'bg-white border border-[#B9E5F5] text-[#557386] hover:text-[#173B52] hover:border-[#91D5ED]'
              }`}
            >
              Tất cả ({items.filter((i) => i.isPublished).length})
            </button>
            {(Object.keys(MEDIA_CATEGORY_SHORT) as MediaCategory[]).map((cat) => {
              const count = items.filter(
                (item) => item.isPublished && item.category === cat
              ).length;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[44px] rounded-full px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#91D5ED] text-[#173B52] font-semibold shadow-xs'
                      : 'bg-white border border-[#B9E5F5] text-[#557386] hover:text-[#173B52] hover:border-[#91D5ED]'
                  }`}
                >
                  {MEDIA_CATEGORY_SHORT[cat]} ({count})
                </button>
              );
            })}
          </div>

          {/* Swipe Guidance Hint */}
          {filteredItems.length > 1 && (
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#DDF3FC]/80 px-3.5 py-2 text-xs font-medium text-[#173B52] lg:self-auto">
              <span>Trượt sang phải để khám phá những khoảnh khắc tiếp theo.</span>
              <MoveRight
                className="h-4 w-4 shrink-0 text-[#173B52] animate-swipe-nudge"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Swipe Gallery */}
      {filteredItems.length === 0 ? (
        <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[#B9E5F5] bg-white p-8 text-center">
            <p className="text-sm font-medium text-[#173B52]">
              Chưa có tư liệu công khai nào trong phân đoạn này.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className="mt-4 min-h-[44px] rounded-full bg-[#DDF3FC] px-5 py-2.5 text-xs font-semibold text-[#173B52] hover:bg-[#B9E5F5]"
            >
              Xem tất cả khoảnh khắc
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            aria-label="Dòng ảnh và video nhật ký vuốt ngang"
            className="gallery-scroll flex w-full cursor-grab active:cursor-grabbing gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-10 pb-5"
          >
            {filteredItems.map((item, idx) => {
              const isPlaying = playingVideoId === item.id;
              return (
                <article
                  key={item.id}
                  ref={(el) => {
                    slideRefs.current[idx] = el;
                  }}
                  className="snap-center shrink-0 w-[86vw] sm:w-[76vw] md:w-[660px] lg:w-[760px] flex flex-col justify-between rounded-3xl border border-[#B9E5F5]/80 bg-white p-3.5 sm:p-5 shadow-[0_12px_36px_-14px_rgba(23,59,82,0.12)] transition-transform duration-300"
                >
                  {/* Large Media Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-[#102A3C]/5">
                    <div className="relative aspect-[16/10] w-full">
                      {item.type === 'video' ? (
                        <video
                          ref={(el) => {
                            videoRefs.current[item.id] = el;
                          }}
                          src={item.url}
                          controls
                          playsInline
                          preload="metadata"
                          onPlay={() => setPlayingVideoId(item.id)}
                          onPause={() =>
                            setPlayingVideoId((prev) =>
                              prev === item.id ? null : prev
                            )
                          }
                          className="h-full w-full bg-[#102A3C] object-contain"
                        />
                      ) : !brokenImageIds[item.id] && item.url ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (!dragStateRef.current.hasDragged) {
                              setViewerIndex(idx);
                            }
                          }}
                          aria-label={`Xem toàn màn hình: ${item.title}`}
                          className="group relative block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B52]"
                        >
                          <img
                            src={item.url}
                            alt={item.caption || item.title}
                            referrerPolicy="no-referrer"
                            loading={idx <= 1 ? 'eager' : 'lazy'}
                            draggable={false}
                            onError={() =>
                              setBrokenImageIds((prev) => ({
                                ...prev,
                                [item.id]: true,
                              }))
                            }
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        </button>
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-[#EAF6FC] p-6 text-center">
                          <p className="text-sm font-medium text-[#173B52]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-[#557386]">
                            Chưa tải được hình ảnh. Vui lòng kiểm tra kết nối mạng hoặc đường dẫn lưu trữ.
                          </p>
                        </div>
                      )}

                      {/* Fullscreen expand button */}
                      <button
                        type="button"
                        onClick={() => setViewerIndex(idx)}
                        aria-label={`Mở toàn màn hình ${item.title}`}
                        className="liquid-glass absolute right-3 top-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full text-[#173B52] transition-colors hover:bg-white"
                      >
                        <Maximize2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* Caption, Sequence & Video Play/Pause Control (NO Next button) */}
                  <div className="mt-4 space-y-2 px-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#557386]">
                        <span className="font-mono-tabular font-semibold text-[#173B52]">
                          {String(idx + 1).padStart(2, '0')} /{' '}
                          {String(filteredItems.length).padStart(2, '0')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-[#173B52]">
                          {MEDIA_CATEGORY_LABELS[item.category]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.capturedAt}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.location}</span>
                      </div>

                      {item.type === 'video' && (
                        <button
                          type="button"
                          onClick={() => toggleVideoPlay(item.id)}
                          className="min-h-[44px] inline-flex items-center gap-1.5 rounded-full border border-[#B9E5F5] bg-[#DDF3FC] px-4 py-2 text-xs font-semibold text-[#173B52] hover:bg-[#B9E5F5]"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Tạm dừng</span>
                            </>
                          ) : (
                            <>
                              <Play className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Phát video</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <h2 className="font-display text-lg font-semibold text-[#173B52] sm:text-xl">
                      {item.title}
                    </h2>

                    <p className="text-sm leading-relaxed text-[#557386] sm:text-[15px]">
                      {item.caption}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Slide Position Progress Bar (read-only visual cue, zero Next button) */}
          <div className="mx-auto mt-3 flex max-w-xs items-center justify-center gap-1.5 px-4">
            {filteredItems.map((item, idx) => (
              <span
                key={item.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeSlideIndex
                    ? 'w-7 bg-[#173B52]'
                    : 'w-2 bg-[#B9E5F5]'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Independent Transition Screen — Only Revealed After Reaching the Last Slide */}
      {reachedLastSlide && filteredItems.length > 0 && (
        <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
          <div className="liquid-glass rounded-3xl bg-gradient-to-br from-[#DDF3FC]/85 via-[#FFFFFF]/90 to-[#D7F4EA]/85 p-7 sm:p-12 text-center">
            <p className="font-mono-tabular text-xs font-semibold tracking-wide text-[#557386]">
              ĐÃ XEM HẾT NHẬT KÝ HOẠT ĐỘNG
            </p>
            <blockquote
              className="mx-auto mt-4 max-w-2xl font-display text-2xl font-semibold leading-relaxed text-[#173B52] sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              “{PROJECT_CONTENT.journalTransitionQuote}”
            </blockquote>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#557386]">
              {PROJECT_CONTENT.journalTransitionSubnote}
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onCompleteStage}
                className="liquid-glass-cta min-h-[56px] w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-sm font-semibold tracking-wide text-[#173B52] transition-all active:scale-[0.98]"
              >
                <span>{PROJECT_CONTENT.journalTransitionCta}</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {viewerIndex !== null && filteredItems.length > 0 && (
        <MediaViewer
          items={filteredItems}
          activeIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onChangeIndex={(nextIdx) => setViewerIndex(nextIdx)}
        />
      )}
    </section>
  );
}
