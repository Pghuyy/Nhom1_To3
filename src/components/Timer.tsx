import { Clock } from 'lucide-react';
import { formatElapsedTime } from '../utils/journeyState';

interface TimerProps {
  elapsedSeconds: number;
  visible?: boolean;
  className?: string;
}

export function Timer({
  elapsedSeconds,
  visible = true,
  className = '',
}: TimerProps) {
  if (!visible) {
    return null;
  }

  const formatted = formatElapsedTime(elapsedSeconds);

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={`Thời gian làm bài Quiz: ${formatted}`}
      data-testid="quiz-timer"
      className={`liquid-glass inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-[#173B52] whitespace-nowrap shrink-0 ${className}`}
    >
      <span
        className="h-2 w-2 rounded-full bg-[#37BCE3] shrink-0"
        aria-hidden="true"
      />
      <Clock className="h-3.5 w-3.5 shrink-0 text-[#173B52]" aria-hidden="true" />
      <span className="font-mono-tabular tracking-tight">{formatted}</span>
    </div>
  );
}
