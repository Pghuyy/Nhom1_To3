import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  CheckSquare,
  RotateCcw,
  Square,
} from 'lucide-react';
import type {
  JourneyStage,
  JourneyState,
  MediaItem,
} from '../types/journey';
import { ARTICLES } from '../data/articleData';
import { PRACTICAL_ACTIONS, PROJECT_CONTENT } from '../data/journeyData';
import { buildQuizQuestions } from '../data/quizData';
import { calculateQuizScore } from '../utils/journeyState';
import { MediaViewer } from './MediaViewer';

interface FinalDashboardProps {
  state: JourneyState;
  mediaItems: MediaItem[];
  onNavigateStage: (stage: JourneyStage) => void;
  onToggleAction: (actionId: string) => void;
  onRestartJourney: () => void;
}

export function FinalDashboard({
  state,
  mediaItems,
  onNavigateStage,
  onToggleAction,
  onRestartJourney,
}: FinalDashboardProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [brokenImageIds, setBrokenImageIds] = useState<Record<string, boolean>>({});

  const questions = useMemo(
    () => buildQuizQuestions(state.localContext),
    [state.localContext]
  );
  const quizSummary = useMemo(
    () => calculateQuizScore(questions, state.quizAnswers),
    [questions, state.quizAnswers]
  );

  const sortedMedia = useMemo(
    () =>
      [...mediaItems]
        .filter((item) => item.isPublished)
        .sort((a, b) => a.order - b.order),
    [mediaItems]
  );

  const coverItem =
    sortedMedia.find((item) => item.isCover) ?? sortedMedia[0] ?? null;

  return (
    <section
      aria-labelledby="dashboard-heading"
      className="mx-auto w-full max-w-6xl space-y-10 px-4 py-6 sm:px-6 sm:py-10 pb-safe"
    >
      {/* Hero Summary */}
      <div className="liquid-glass rounded-3xl bg-gradient-to-br from-[#DDF3FC]/85 via-[#FFFFFF]/95 to-[#D7F4EA]/85 p-6 sm:p-9">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-[#557386]">
              Chương 05 · Tổng kết hành trình BLUE TRACE
            </p>
            <h1
              id="dashboard-heading"
              className="font-display text-2xl font-semibold leading-tight text-[#173B52] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Từ khoảnh khắc hiện trường đến trách nhiệm giữ gìn nguồn nước
            </h1>
            <p className="text-sm leading-relaxed text-[#557386] sm:text-base">
              {PROJECT_CONTENT.dashboardOverview}
            </p>
            <p className="border-t border-[#B9E5F5] pt-4 text-sm italic leading-relaxed text-[#173B52]">
              “{PROJECT_CONTENT.dashboardCoreMessage}”
            </p>
          </div>

          <div className="lg:col-span-5">
            {coverItem ? (
              <div className="overflow-hidden rounded-3xl border border-[#B9E5F5] bg-white shadow-xs">
                {coverItem.type === 'video' ? (
                  <video
                    src={coverItem.url}
                    controls
                    playsInline
                    className="aspect-[4/3] w-full bg-[#102A3C] object-contain"
                  />
                ) : !brokenImageIds[coverItem.id] ? (
                  <img
                    src={coverItem.url}
                    alt={coverItem.caption}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setBrokenImageIds((prev) => ({
                        ...prev,
                        [coverItem.id]: true,
                      }))
                    }
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-[#DDF3FC] p-4 text-xs text-[#557386]">
                    {coverItem.title}
                  </div>
                )}
                <p className="border-t border-[#DDF3FC] px-4 py-2.5 text-xs font-medium text-[#557386]">
                  Ảnh đại diện dự án · {coverItem.title}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Summary Metrics Row */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#B9E5F5] pt-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-[#557386]">Tư liệu thực tế</p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-[#173B52]">
              {sortedMedia.length} mục
            </p>
          </div>
          <div>
            <p className="text-xs text-[#557386]">Kết quả Quiz</p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-[#173B52]">
              {quizSummary.score}/{quizSummary.total}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#557386]">Bài luận đã đọc</p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-[#173B52]">
              {state.readArticleIds.length}/{ARTICLES.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#557386]">Cam kết hành động</p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-[#173B52]">
              {state.committedActionIds.length}/{PRACTICAL_ACTIONS.length}
            </p>
          </div>
        </div>
      </div>

      {/* Field Moments Recap */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-[#173B52] sm:text-2xl">
              Nhật ký hình ảnh và video
            </h2>
            <p className="mt-1 text-xs text-[#557386] sm:text-sm">
              Nhấn vào từng tư liệu để xem toàn màn hình hoặc quay lại Chương 02 để vuốt xem lại hành trình.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateStage('field-journal')}
            className="min-h-[44px] inline-flex items-center gap-1.5 self-start rounded-full bg-[#DDF3FC] px-4 py-2 text-xs font-semibold text-[#173B52] transition-colors hover:bg-[#B9E5F5] sm:self-auto"
          >
            <span>Mở lại Nhật ký hành động</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sortedMedia.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setViewerIndex(idx)}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#B9E5F5]/80 bg-white text-left shadow-[0_8px_24px_-12px_rgba(23,59,82,0.08)] transition-colors hover:border-[#91D5ED]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#DDF3FC]">
                {item.type === 'video' ? (
                  <div className="flex h-full w-full items-center justify-center bg-[#DDF3FC] text-xs font-mono-tabular font-semibold text-[#173B52]">
                    VIDEO · NHẤN ĐỂ PHÁT
                  </div>
                ) : !brokenImageIds[item.id] ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() =>
                      setBrokenImageIds((prev) => ({
                        ...prev,
                        [item.id]: true,
                      }))
                    }
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-3 text-xs text-[#557386]">
                    {item.title}
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-mono-tabular text-[11px] font-semibold text-[#557386]">
                  #{String(idx + 1).padStart(2, '0')} · {item.capturedAt}
                </p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold text-[#173B52]">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Two-Column Synthesis: Quiz + Knowledge Library */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quiz Card */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#B9E5F5]/80 bg-white p-6 shadow-[0_8px_24px_-12px_rgba(23,59,82,0.08)]">
          <div>
            <p className="text-xs font-semibold text-[#557386]">
              Thử thách kiến thức (5 câu)
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-[#173B52]">
              Điểm số của bạn: {quizSummary.score} / {quizSummary.total} ({quizSummary.percentage}%)
            </h2>
            <p className="mt-2 text-xs text-[#557386] sm:text-sm">
              Khu vực liên hệ thực tế: {state.localContext.locationName}.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => onNavigateStage('quiz')}
              className="min-h-[44px] inline-flex items-center gap-1.5 rounded-full border border-[#B9E5F5] bg-[#F5FBFF] px-4 py-2 text-xs font-semibold text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC]"
            >
              <span>Xem lại đáp án hoặc làm lại Quiz</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Articles Card */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#B9E5F5]/80 bg-white p-6 shadow-[0_8px_24px_-12px_rgba(23,59,82,0.08)]">
          <div>
            <p className="text-xs font-semibold text-[#557386]">
              Kho tri thức (6 chuyên mục A–F)
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-[#173B52]">
              Đã đọc {state.readArticleIds.length} / {ARTICLES.length} bài luận chuyên đề
            </h2>
            <ul className="mt-3 space-y-1.5 text-xs text-[#557386]">
              {ARTICLES.slice(0, 3).map((art) => (
                <li key={art.id} className="flex items-center gap-2 truncate">
                  <Check
                    className={`h-3.5 w-3.5 shrink-0 ${
                      state.readArticleIds.includes(art.id)
                        ? 'text-[#125C45]'
                        : 'text-[#557386]/45'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="truncate">{art.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => onNavigateStage('knowledge-library')}
              className="min-h-[44px] inline-flex items-center gap-1.5 rounded-full border border-[#B9E5F5] bg-[#F5FBFF] px-4 py-2 text-xs font-semibold text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC]"
            >
              <span>Quay lại Kho Tri Thức</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Practical Actions Checklist */}
      <div className="space-y-5">
        <div className="border-b border-[#B9E5F5] pb-4">
          <p className="text-xs font-semibold text-[#557386]">
            Hành động thiết thực có thể làm ngay
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-[#173B52] sm:text-2xl">
            Chọn những việc bạn cam kết thực hiện sau buổi hôm nay
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {PRACTICAL_ACTIONS.map((action) => {
            const checked = state.committedActionIds.includes(action.id);
            return (
              <button
                key={action.id}
                type="button"
                aria-pressed={checked}
                onClick={() => onToggleAction(action.id)}
                className={`min-h-[68px] flex items-start gap-3.5 rounded-3xl border p-4 text-left transition-colors shadow-xs ${
                  checked
                    ? 'border-[#91D5ED] bg-[#D7F4EA]/75'
                    : 'border-[#B9E5F5]/80 bg-white hover:border-[#91D5ED]'
                }`}
              >
                {checked ? (
                  <CheckSquare
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#173B52]"
                    aria-hidden="true"
                  />
                ) : (
                  <Square
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#557386]"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <p className="text-xs font-semibold text-[#557386]">{action.scope}</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#173B52]">
                    {action.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#557386]">
                    {action.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter Return Links & Closing Reflection */}
      <footer className="liquid-glass space-y-8 rounded-3xl bg-gradient-to-br from-[#DDF3FC]/85 via-[#FFFFFF]/95 to-[#D7F4EA]/85 p-7 sm:p-10 text-center">
        <blockquote
          className="mx-auto max-w-2xl font-display text-xl font-medium italic leading-relaxed text-[#173B52] sm:text-2xl"
          style={{ textWrap: 'balance' }}
        >
          “{PROJECT_CONTENT.dashboardClosingQuote}”
        </blockquote>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigateStage('intro')}
            className="min-h-[44px] rounded-full border border-[#B9E5F5] bg-white px-4 py-2 text-xs font-medium text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC]"
          >
            Chương 01 · Mở đầu
          </button>
          <button
            type="button"
            onClick={() => onNavigateStage('field-journal')}
            className="min-h-[44px] rounded-full border border-[#B9E5F5] bg-white px-4 py-2 text-xs font-medium text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC]"
          >
            Chương 02 · Nhật ký
          </button>
          <button
            type="button"
            onClick={() => onNavigateStage('quiz')}
            className="min-h-[44px] rounded-full border border-[#B9E5F5] bg-white px-4 py-2 text-xs font-medium text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC]"
          >
            Chương 03 · Thử thách
          </button>
          <button
            type="button"
            onClick={() => onNavigateStage('knowledge-library')}
            className="min-h-[44px] rounded-full border border-[#B9E5F5] bg-white px-4 py-2 text-xs font-medium text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC]"
          >
            Chương 04 · Tri thức
          </button>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onRestartJourney}
            className="liquid-glass-cta min-h-[50px] inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-semibold text-[#173B52] transition-all active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Bắt đầu lại toàn bộ hành trình</span>
          </button>
        </div>
      </footer>

      {viewerIndex !== null && sortedMedia.length > 0 && (
        <MediaViewer
          items={sortedMedia}
          activeIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onChangeIndex={(next) => setViewerIndex(next)}
        />
      )}
    </section>
  );
}
