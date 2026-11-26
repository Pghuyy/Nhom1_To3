import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PROJECT_CONTENT } from '../data/journeyData';

interface IntroSectionProps {
  hasSavedProgress: boolean;
  onStart: () => void;
  onResume?: () => void;
}

export function IntroSection({
  hasSavedProgress,
  onStart,
  onResume,
}: IntroSectionProps) {
  const [heroImageError, setHeroImageError] = useState(false);

  return (
    <section
      aria-labelledby="intro-title"
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#F5FBFF] px-5 py-8 sm:px-10 sm:py-12 pt-safe pb-safe"
    >
      {/* Bright Cinematic Water Atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {!heroImageError ? (
          <img
            src={PROJECT_CONTENT.introHeroImage}
            alt="Ánh sáng tự nhiên xuyên qua mặt nước đại dương"
            referrerPolicy="no-referrer"
            onError={() => setHeroImageError(true)}
            className="h-full w-full object-cover opacity-30 animate-water-drift"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#DDF3FC] via-[#D7F4EA] to-[#F5FBFF]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5FBFF]/88 via-[#DDF3FC]/72 to-[#F5FBFF]/96" />
        <div
          className="absolute inset-0 animate-caustic-shimmer"
          style={{
            background:
              'radial-gradient(62% 48% at 18% 22%, rgba(185, 229, 245, 0.52) 0%, rgba(215, 244, 234, 0.35) 48%, rgba(245, 251, 255, 0) 100%), radial-gradient(48% 42% at 86% 74%, rgba(145, 213, 237, 0.34) 0%, rgba(245, 251, 255, 0) 100%)',
          }}
        />
      </div>

      {/* Top framing header */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-b border-[#B9E5F5] pb-4">
        <span className="font-display text-lg font-semibold tracking-tight text-[#173B52]">
          {PROJECT_CONTENT.brand}
        </span>
        <span className="text-xs font-medium text-[#557386] text-right">
          Chương 01 · Mở đầu
        </span>
      </div>

      {/* Center focal storytelling */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-4xl flex-col items-start py-10 sm:py-16">
        <p className="text-sm sm:text-base font-semibold tracking-wide text-[#557386]">
          {PROJECT_CONTENT.subtitle}
        </p>

        <h1
          id="intro-title"
          className="mt-4 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-[#173B52] sm:text-5xl lg:text-6xl"
          style={{ textWrap: 'balance' }}
        >
          {PROJECT_CONTENT.title}
        </h1>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onStart}
            className="liquid-glass-cta min-h-[54px] inline-flex items-center justify-center gap-3 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-[#173B52] transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B52]"
          >
            <span>{PROJECT_CONTENT.introCta}</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>

          {hasSavedProgress && onResume && (
            <button
              type="button"
              onClick={onResume}
              className="liquid-glass min-h-[54px] inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-[#173B52] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B52]"
            >
              Tiếp tục tiến trình trước đó
            </button>
          )}
        </div>
      </div>

      {/* Bottom quiet guide */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-2 border-t border-[#B9E5F5] pt-4 text-xs text-[#557386] sm:flex-row sm:items-center sm:justify-between">
        <span>01 Mở đầu · 02 Khoảnh khắc thực tế · 03 Thử thách · 04 Kho tri thức · 05 Tổng kết</span>
        <span>Trải nghiệm kể chuyện tương tác</span>
      </div>
    </section>
  );
}
