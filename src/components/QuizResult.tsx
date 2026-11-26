import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import type { QuizQuestion } from '../types/journey';
import { calculateQuizScore } from '../utils/journeyState';
import { PROJECT_CONTENT } from '../data/journeyData';

interface QuizResultProps {
  questions: QuizQuestion[];
  answers: Record<string, number>;
  onRetry: () => void;
  onContinueToLibrary: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export function QuizResult({
  questions,
  answers,
  onRetry,
  onContinueToLibrary,
}: QuizResultProps) {
  const summary = calculateQuizScore(questions, answers);

  const feedbackText =
    summary.score === summary.total
      ? 'Bạn nắm rất vững các kiến thức cốt lõi từ vai trò nguồn nước đến giải pháp thực tế.'
      : summary.score >= 3
        ? 'Bạn đã có nền tảng nhận thức tốt. Hãy xem lại phần giải thích bên dưới và khám phá thêm ở Kho Tri Thức.'
        : 'Một số khái niệm về chu trình và nguyên nhân ô nhiễm nước còn dễ nhầm lẫn. Kho Tri Thức ở chương tiếp theo sẽ giúp bạn hệ thống lại rõ ràng hơn.';

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <div className="liquid-glass rounded-3xl bg-gradient-to-br from-[#DDF3FC]/90 via-[#FFFFFF]/95 to-[#D7F4EA]/90 p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-[#557386]">
          Tổng kết thử thách kiến thức
        </p>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-semibold tabular-nums text-[#173B52] sm:text-6xl">
                {summary.score}/{summary.total}
              </span>
              <span className="font-mono-tabular text-sm font-semibold text-[#173B52]">
                ({summary.percentage}% chính xác)
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#557386] sm:text-base">
              {feedbackText}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row shrink-0">
            <button
              type="button"
              onClick={onRetry}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full border border-[#B9E5F5] bg-white px-5 py-3 text-xs font-medium text-[#173B52] transition-colors hover:border-[#91D5ED] hover:bg-[#DDF3FC]"
            >
              <RotateCcw className="h-4 w-4 text-[#173B52]" aria-hidden="true" />
              <span>Làm lại bài quiz</span>
            </button>

            <button
              type="button"
              onClick={onContinueToLibrary}
              className="liquid-glass-cta min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-semibold text-[#173B52] transition-all active:scale-[0.98]"
            >
              <span>{PROJECT_CONTENT.quizCompleteCta}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Review Breakdown */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#173B52]">
          Đối chiếu đáp án và giải thích
        </h2>

        {questions.map((q) => {
          const userChoice = answers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-3xl border border-[#B9E5F5]/80 bg-white p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(23,59,82,0.08)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#557386]">
                  Câu 0{q.topicNumber} · {q.topicLabel}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-semibold ${
                    isCorrect ? 'text-[#125C45]' : 'text-[#7F2F1D]'
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <span>Chính xác</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Chưa chính xác</span>
                    </>
                  )}
                </span>
              </div>

              <h3 className="mt-2 text-base font-semibold leading-snug text-[#173B52]">
                {q.question}
              </h3>

              <div className="mt-3 space-y-1 text-xs sm:text-sm text-[#557386]">
                <p>
                  Lựa chọn của bạn:{' '}
                  <span className="font-medium text-[#173B52]">
                    {typeof userChoice === 'number'
                      ? `${OPTION_LETTERS[userChoice]}. ${q.options[userChoice]}`
                      : 'Chưa chọn'}
                  </span>
                </p>
                {!isCorrect && (
                  <p>
                    Đáp án đúng:{' '}
                    <span className="font-semibold text-[#173B52]">
                      {OPTION_LETTERS[q.correctIndex]}. {q.options[q.correctIndex]}
                    </span>
                  </p>
                )}
              </div>

              <p className="mt-3 border-t border-[#DDF3FC] pt-3 text-xs leading-relaxed text-[#557386] sm:text-sm">
                {q.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
