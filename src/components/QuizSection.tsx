import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  XCircle,
} from 'lucide-react';
import type { LocalContextConfig } from '../types/journey';
import { buildQuizQuestions } from '../data/quizData';
import { QuizResult } from './QuizResult';

interface QuizSectionProps {
  answers: Record<string, number>;
  confirmedIds: string[];
  submitted: boolean;
  localContext: LocalContextConfig;
  onUpdateLocalContext: (next: LocalContextConfig) => void;
  onSelectAnswer: (questionId: string, optionIndex: number) => void;
  onConfirmAnswer: (questionId: string) => void;
  onFinishQuiz: () => void;
  onRetryQuiz: () => void;
  onContinueToLibrary: () => void;
  onBackToJournal: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export function QuizSection({
  answers,
  confirmedIds,
  submitted,
  localContext,
  onUpdateLocalContext,
  onSelectAnswer,
  onConfirmAnswer,
  onFinishQuiz,
  onRetryQuiz,
  onContinueToLibrary,
  onBackToJournal,
}: QuizSectionProps) {
  const questions = useMemo(
    () => buildQuizQuestions(localContext),
    [localContext]
  );

  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    const firstUnconfirmed = questions.findIndex(
      (q) => !confirmedIds.includes(q.id)
    );
    return firstUnconfirmed >= 0 ? firstUnconfirmed : 0;
  });

  const [editingLocal, setEditingLocal] = useState(false);

  const currentQuestion = questions[currentIdx] ?? questions[0];
  const selectedOption = answers[currentQuestion.id];
  const isConfirmed = confirmedIds.includes(currentQuestion.id);
  const isCorrect =
    isConfirmed && selectedOption === currentQuestion.correctIndex;

  const progressPercent = ((currentIdx + 1) / questions.length) * 100;

  const handleNextStep = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onFinishQuiz();
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    onRetryQuiz();
  };

  return (
    <section
      aria-labelledby="quiz-heading"
      className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10 pb-safe"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-[#B9E5F5] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#557386]">
            Chương 03 · Thử thách 5 câu hỏi nhận thức
          </p>
          <h1
            id="quiz-heading"
            className="mt-1.5 font-display text-2xl font-semibold text-[#173B52] sm:text-3xl"
          >
            Bạn hiểu bao nhiêu về nguồn nước quanh mình?
          </h1>
        </div>

        <button
          type="button"
          onClick={onBackToJournal}
          className="min-h-[44px] inline-flex items-center gap-1.5 self-start rounded-full border border-[#B9E5F5] bg-white px-4 py-2 text-xs font-medium text-[#173B52] transition-colors hover:border-[#91D5ED] hover:bg-[#DDF3FC] sm:self-auto shrink-0"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#173B52]" aria-hidden="true" />
          <span>Quay lại Nhật ký</span>
        </button>
      </div>

      {/* Local context customizer toggle for Question 2 */}
      <div className="mt-4">
        <button
          type="button"
          aria-expanded={editingLocal}
          onClick={() => setEditingLocal((prev) => !prev)}
          className="min-h-[44px] inline-flex items-center gap-2 rounded-full bg-[#DDF3FC]/75 px-4 py-2 text-xs font-semibold text-[#173B52] transition-colors hover:bg-[#DDF3FC]"
        >
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>
            {editingLocal
              ? 'Ẩn phần tùy chỉnh dữ liệu địa phương (Câu 2)'
              : `Tùy chỉnh ngữ cảnh địa phương cho Câu 2 (${localContext.locationName})`}
          </span>
        </button>

        {editingLocal && (
          <div className="liquid-glass mt-3 space-y-3 rounded-3xl p-5">
            <p className="text-xs text-[#557386]">
              Dữ liệu câu hỏi về địa phương có thể chỉnh sửa trực tiếp theo nơi trường bạn thực hiện dự án, tránh dùng số liệu ước đoán thiếu căn cứ.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="local-place"
                  className="block text-[11px] font-semibold text-[#557386]"
                >
                  Tên khu vực / Phường / Xã / Trường
                </label>
                <input
                  id="local-place"
                  type="text"
                  value={localContext.locationName}
                  onChange={(e) =>
                    onUpdateLocalContext({
                      ...localContext,
                      locationName: e.target.value,
                    })
                  }
                  className="mt-1 min-h-[42px] w-full rounded-2xl border border-[#B9E5F5] bg-[#F5FBFF] px-3.5 py-2 text-xs text-[#173B52] focus:border-[#91D5ED] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="local-water"
                  className="block text-[11px] font-semibold text-[#557386]"
                >
                  Tên kênh / sông / ao hồ khảo sát
                </label>
                <input
                  id="local-water"
                  type="text"
                  value={localContext.waterBodyName}
                  onChange={(e) =>
                    onUpdateLocalContext({
                      ...localContext,
                      waterBodyName: e.target.value,
                    })
                  }
                  className="mt-1 min-h-[42px] w-full rounded-2xl border border-[#B9E5F5] bg-[#F5FBFF] px-3.5 py-2 text-xs text-[#173B52] focus:border-[#91D5ED] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="local-obs"
                className="block text-[11px] font-semibold text-[#557386]"
              >
                Ghi nhận thực tế của nhóm (hiển thị trong phần giải thích Câu 2)
              </label>
              <textarea
                id="local-obs"
                rows={2}
                value={localContext.localObservation}
                onChange={(e) =>
                  onUpdateLocalContext({
                    ...localContext,
                    localObservation: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-2xl border border-[#B9E5F5] bg-[#F5FBFF] px-3.5 py-2 text-xs text-[#173B52] focus:border-[#91D5ED] focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Active Quiz OR Result Summary */}
      <div className="mt-6">
        {submitted ? (
          <QuizResult
            questions={questions}
            answers={answers}
            onRetry={handleRetry}
            onContinueToLibrary={onContinueToLibrary}
          />
        ) : (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#173B52]">
                  Chủ đề {currentQuestion.topicNumber}: {currentQuestion.topicLabel}
                </span>
                <span className="font-mono-tabular font-semibold text-[#557386]">
                  {currentIdx + 1} / {questions.length}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#DDF3FC]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#91D5ED] to-[#B9E5F5] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-3xl border border-[#B9E5F5]/80 bg-white p-5 sm:p-8 shadow-[0_12px_36px_-14px_rgba(23,59,82,0.1)]">
              <h2 className="font-display text-lg font-semibold leading-snug text-[#173B52] sm:text-xl">
                {currentQuestion.question}
              </h2>

              <div
                role="radiogroup"
                aria-label={`Các phương án cho câu ${currentIdx + 1}`}
                className="mt-5 space-y-3"
              >
                {currentQuestion.options.map((opt, optIndex) => {
                  const isSelected = selectedOption === optIndex;
                  const isCorrectOpt = optIndex === currentQuestion.correctIndex;

                  let stateStyle =
                    'border-[#B9E5F5] bg-[#F5FBFF] text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC]/60';

                  if (isConfirmed) {
                    if (isCorrectOpt) {
                      stateStyle =
                        'border-[#86D9BE] bg-[#D7F4EA] text-[#173B52]';
                    } else if (isSelected && !isCorrectOpt) {
                      stateStyle =
                        'border-[#F0B2A1] bg-[#FDEEE9] text-[#7F2F1D]';
                    } else {
                      stateStyle =
                        'border-[#DDF3FC] bg-[#F5FBFF] text-[#557386]';
                    }
                  } else if (isSelected) {
                    stateStyle =
                      'border-[#91D5ED] bg-[#DDF3FC] text-[#173B52]';
                  }

                  return (
                    <button
                      key={OPTION_LETTERS[optIndex]}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={isConfirmed}
                      onClick={() =>
                        onSelectAnswer(currentQuestion.id, optIndex)
                      }
                      className={`min-h-[54px] w-full flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B52] ${stateStyle}`}
                    >
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono-tabular text-xs font-semibold ${
                          isSelected
                            ? 'bg-[#91D5ED] text-[#173B52]'
                            : 'bg-[#DDF3FC] text-[#173B52]'
                        }`}
                      >
                        {OPTION_LETTERS[optIndex]}
                      </span>
                      <span className="flex-1 text-sm leading-relaxed">
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback & Explanation */}
              {isConfirmed && (
                <div
                  role="status"
                  className={`mt-5 rounded-2xl border p-4 ${
                    isCorrect
                      ? 'border-[#86D9BE] bg-[#D7F4EA]'
                      : 'border-[#F0B2A1] bg-[#FDEEE9]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    {isCorrect ? (
                      <>
                        <CheckCircle2
                          className="h-4 w-4 text-[#125C45]"
                          aria-hidden="true"
                        />
                        <span className="text-[#125C45]">
                          Chính xác · Lựa chọn phù hợp
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle
                          className="h-4 w-4 text-[#7F2F1D]"
                          aria-hidden="true"
                        />
                        <span className="text-[#7F2F1D]">
                          Chưa chính xác · Đáp án đúng là {OPTION_LETTERS[currentQuestion.correctIndex]}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#173B52] sm:text-sm">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(currentIdx - 1)}
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-full border border-[#B9E5F5] bg-white px-5 py-2.5 text-xs font-medium text-[#173B52] hover:border-[#91D5ED] hover:bg-[#DDF3FC] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Câu trước</span>
                </button>

                {!isConfirmed ? (
                  <button
                    type="button"
                    disabled={typeof selectedOption !== 'number'}
                    onClick={() => onConfirmAnswer(currentQuestion.id)}
                    className="liquid-glass-cta min-h-[48px] inline-flex items-center justify-center rounded-full px-7 py-3 text-xs font-semibold text-[#173B52] transition-all active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed"
                  >
                    Xác nhận đáp án
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="liquid-glass-cta min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-semibold text-[#173B52] transition-all active:scale-[0.98]"
                  >
                    <span>
                      {currentIdx < questions.length - 1
                        ? 'Câu tiếp theo'
                        : 'Xem kết quả tổng kết'}
                    </span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
