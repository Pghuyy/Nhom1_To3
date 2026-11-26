import { Lock, RotateCcw } from 'lucide-react';
import type { JourneyStage, JourneyState } from '../types/journey';
import { canAccessStage, STAGE_LABELS, STAGE_ORDER } from '../utils/journeyState';

interface JourneyProgressProps {
  state: JourneyState;
  onSelectStage: (stage: JourneyStage) => void;
  onRestartJourney?: () => void;
}

export function JourneyProgress({
  state,
  onSelectStage,
  onRestartJourney,
}: JourneyProgressProps) {
  if (state.currentStage === 'intro') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#B9E5F5] bg-[#F5FBFF]/88 backdrop-blur-md pt-safe">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectStage('intro')}
          className="font-display text-sm sm:text-base font-semibold tracking-tight text-[#173B52] transition-colors hover:text-[#237B9E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B52] whitespace-nowrap shrink-0 min-h-[44px] flex items-center"
        >
          BLUE TRACE
        </button>

        {/* Zone 2: Guided 5-stage progress navigation */}
        <nav
          aria-label="Tiến trình hành trình 5 chương"
          className="flex items-center gap-0.5 sm:gap-2"
        >
          {STAGE_ORDER.map((stage) => {
            const info = STAGE_LABELS[stage];
            const isCurrent = state.currentStage === stage;
            const isCompleted = state.completedStages.includes(stage);
            const accessible = canAccessStage(stage, state);

            return (
              <button
                key={stage}
                type="button"
                disabled={!accessible}
                onClick={() => accessible && onSelectStage(stage)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`${info.title}${!accessible ? ' (Chưa mở khóa)' : ''}`}
                className={`min-h-[44px] min-w-[34px] sm:min-w-[40px] px-1.5 sm:px-2.5 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B52] ${
                  isCurrent
                    ? 'text-[#173B52] border-b-2 border-[#91D5ED] font-semibold'
                    : accessible
                      ? isCompleted
                        ? 'text-[#173B52] hover:text-[#237B9E]'
                        : 'text-[#557386] hover:text-[#173B52]'
                      : 'text-[#557386]/40 cursor-not-allowed'
                }`}
              >
                <span className="font-mono-tabular">{info.code}</span>
                <span className="hidden md:inline">{info.short}</span>
                {!accessible && (
                  <Lock className="hidden sm:block h-3 w-3 shrink-0 opacity-60" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single contextual action */}
        <div className="flex items-center shrink-0">
          {state.currentStage === 'dashboard' && onRestartJourney ? (
            <button
              type="button"
              onClick={onRestartJourney}
              aria-label="Bắt đầu lại hành trình"
              className="min-h-[44px] px-3.5 py-2 flex items-center gap-2 rounded-full border border-[#B9E5F5] bg-white text-xs font-medium text-[#173B52] transition-colors hover:border-[#91D5ED] hover:bg-[#DDF3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B52] whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5 shrink-0 text-[#173B52]" aria-hidden="true" />
              <span className="hidden sm:inline">Làm lại</span>
            </button>
          ) : (
            <span className="hidden sm:inline font-mono-tabular text-xs font-medium text-[#557386] whitespace-nowrap shrink-0">
              {STAGE_LABELS[state.currentStage].code} / 05
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
