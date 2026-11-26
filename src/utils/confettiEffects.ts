import confetti from 'canvas-confetti';

const WATER_CONFETTI_COLORS = [
  '#91D5ED',
  '#B9E5F5',
  '#D7F4EA',
  '#37BCE3',
  '#4FD1A5',
  '#FFD166',
];

export const SESSION_CONFETTI_KEYS = {
  appStart: 'blue_trace_confetti_app_start_v1',
  quizReach: 'blue_trace_confetti_quiz_reach_v1',
} as const;

const memorySessionEvents = new Set<string>();

export function canPlayConfetti(): boolean {
  if (typeof window === 'undefined') return false;
  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return false;
  }
  return true;
}

function hasSessionEventFired(eventKey: string): boolean {
  if (memorySessionEvents.has(eventKey)) return true;
  if (typeof window !== 'undefined') {
    try {
      return window.sessionStorage.getItem(eventKey) === '1';
    } catch {
      return false;
    }
  }
  return false;
}

function markSessionEventFired(eventKey: string): void {
  memorySessionEvents.add(eventKey);
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem(eventKey, '1');
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }
}

export function resetSessionConfettiEvents(): void {
  memorySessionEvents.clear();
  if (typeof window !== 'undefined') {
    try {
      Object.values(SESSION_CONFETTI_KEYS).forEach((key) => {
        window.sessionStorage.removeItem(key);
      });
    } catch {
      // Ignore storage errors
    }
  }
}

function safeFire(options: confetti.Options): void {
  if (!canPlayConfetti()) return;
  try {
    void confetti({
      disableForReducedMotion: true,
      colors: WATER_CONFETTI_COLORS,
      zIndex: 60,
      ...options,
    });
  } catch {
    // Ignore canvas unavailability in non-graphic environments
  }
}

export function fireWelcomeConfetti(): void {
  safeFire({
    particleCount: 42,
    spread: 68,
    startVelocity: 32,
    origin: { x: 0.2, y: 0.65 },
  });
  if (typeof window !== 'undefined') {
    window.setTimeout(() => {
      safeFire({
        particleCount: 42,
        spread: 68,
        startVelocity: 32,
        origin: { x: 0.8, y: 0.65 },
      });
    }, 160);
  }
}

/**
 * Fires fireWelcomeConfetti() at most once per browser session for a given event key.
 * Returns true if the burst was triggered on this call, false if already triggered in this session.
 */
export function fireWelcomeConfettiOnce(
  eventKey: string,
  fireFn: () => void = fireWelcomeConfetti
): boolean {
  if (hasSessionEventFired(eventKey)) {
    return false;
  }
  markSessionEventFired(eventKey);
  fireFn();
  return true;
}

export function fireQuizAnswerConfetti(isCorrect: boolean): void {
  if (isCorrect) {
    safeFire({
      particleCount: 55,
      spread: 70,
      startVelocity: 36,
      origin: { x: 0.5, y: 0.68 },
    });
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        safeFire({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0.15, y: 0.72 },
        });
        safeFire({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 0.85, y: 0.72 },
        });
      }, 120);
    }
  } else {
    safeFire({
      particleCount: 24,
      spread: 52,
      startVelocity: 24,
      scalar: 0.85,
      origin: { x: 0.5, y: 0.72 },
    });
  }
}

export function fireQuizCompleteConfetti(): void {
  safeFire({
    particleCount: 65,
    angle: 60,
    spread: 65,
    origin: { x: 0.15, y: 0.75 },
  });
  safeFire({
    particleCount: 65,
    angle: 120,
    spread: 65,
    origin: { x: 0.85, y: 0.75 },
  });
  if (typeof window !== 'undefined') {
    window.setTimeout(() => {
      safeFire({
        particleCount: 50,
        spread: 90,
        startVelocity: 38,
        origin: { x: 0.5, y: 0.45 },
      });
    }, 220);
  }
}
