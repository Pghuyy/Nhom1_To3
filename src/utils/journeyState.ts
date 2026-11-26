import type {
  Article,
  ArticleGroupCode,
  JourneyStage,
  JourneyState,
  LocalContextConfig,
  MediaItem,
  QuizQuestion,
} from '../types/journey';

export const STAGE_ORDER: readonly JourneyStage[] = [
  'intro',
  'field-journal',
  'quiz',
  'knowledge-library',
  'dashboard',
] as const;

export const STAGE_LABELS: Record<JourneyStage, { code: string; short: string; title: string }> = {
  intro: {
    code: '01',
    short: 'Mở đầu',
    title: 'Chương 01 · Mở đầu hành trình',
  },
  'field-journal': {
    code: '02',
    short: 'Nhật ký',
    title: 'Chương 02 · Khoảnh khắc thực tế',
  },
  quiz: {
    code: '03',
    short: 'Thử thách',
    title: 'Chương 03 · Thử thách kiến thức',
  },
  'knowledge-library': {
    code: '04',
    short: 'Tri thức',
    title: 'Chương 04 · Kho tri thức',
  },
  dashboard: {
    code: '05',
    short: 'Tổng kết',
    title: 'Chương 05 · Tổng kết hành trình',
  },
};

export const DEFAULT_LOCAL_CONTEXT: LocalContextConfig = {
  locationName: 'Địa phương nơi nhóm sinh sống và học tập',
  waterBodyName: 'kênh rạch, ao hồ và nhánh sông gần khu dân cư',
  localObservation:
    'Rác thải nhựa sinh hoạt, túi ni-lông và nước thải chưa qua xử lý vẫn xuất hiện tại một số đoạn bờ kênh, cống thoát nước sau những đợt mưa lớn.',
};

export function createInitialJourneyState(): JourneyState {
  return {
    currentStage: 'intro',
    completedStages: [],
    quizAnswers: {},
    quizConfirmedIds: [],
    quizSubmitted: false,
    quizElapsedSeconds: 0,
    readArticleIds: [],
    committedActionIds: [],
    localContext: { ...DEFAULT_LOCAL_CONTEXT },
  };
}

export function getStageIndex(stage: JourneyStage): number {
  return STAGE_ORDER.indexOf(stage);
}

/**
 * Guided linear journey check:
 * - Intro is always accessible.
 * - Any stage already completed or whose immediately preceding stage is completed is accessible.
 * - Dashboard (05) strictly requires all four prior stages to be completed.
 */
export function canAccessStage(stage: JourneyStage, state: JourneyState): boolean {
  if (stage === 'intro') return true;
  if (state.completedStages.includes(stage)) {
    return true;
  }
  const idx = getStageIndex(stage);
  if (idx <= 0) return true;
  if (stage === 'dashboard') {
    return (
      state.completedStages.includes('intro') &&
      state.completedStages.includes('field-journal') &&
      state.completedStages.includes('quiz') &&
      state.completedStages.includes('knowledge-library')
    );
  }
  const prevStage = STAGE_ORDER[idx - 1];
  return state.completedStages.includes(prevStage);
}

export function advanceFromStage(
  state: JourneyState,
  fromStage: JourneyStage
): JourneyState {
  const idx = getStageIndex(fromStage);
  const completedStages = state.completedStages.includes(fromStage)
    ? state.completedStages
    : [...state.completedStages, fromStage];

  const nextStage =
    idx >= 0 && idx < STAGE_ORDER.length - 1
      ? STAGE_ORDER[idx + 1]
      : fromStage;

  return {
    ...state,
    completedStages,
    currentStage: nextStage,
  };
}

export function parseInitialStateWithSearch(
  search: string,
  saved: Partial<JourneyState> | null
): JourneyState {
  const base = createInitialJourneyState();
  const merged: JourneyState = saved
    ? {
        ...base,
        ...saved,
        completedStages: Array.isArray(saved.completedStages)
          ? saved.completedStages
          : [],
        quizAnswers:
          saved.quizAnswers && typeof saved.quizAnswers === 'object'
            ? saved.quizAnswers
            : {},
        quizConfirmedIds: Array.isArray(saved.quizConfirmedIds)
          ? saved.quizConfirmedIds
          : [],
        quizElapsedSeconds:
          typeof saved.quizElapsedSeconds === 'number' &&
          Number.isFinite(saved.quizElapsedSeconds) &&
          saved.quizElapsedSeconds >= 0
            ? Math.floor(saved.quizElapsedSeconds)
            : 0,
        readArticleIds: Array.isArray(saved.readArticleIds)
          ? saved.readArticleIds
          : [],
        committedActionIds: Array.isArray(saved.committedActionIds)
          ? saved.committedActionIds
          : [],
        localContext: saved.localContext
          ? { ...DEFAULT_LOCAL_CONTEXT, ...saved.localContext }
          : { ...DEFAULT_LOCAL_CONTEXT },
      }
    : base;

  const params = new URLSearchParams(search);
  if (params.get('autostart') === '1' && merged.currentStage === 'intro') {
    return advanceFromStage(merged, 'intro');
  }

  if (!canAccessStage(merged.currentStage, merged)) {
    return {
      ...merged,
      currentStage: 'intro',
    };
  }

  return merged;
}

export interface QuizScoreSummary {
  score: number;
  total: number;
  percentage: number;
  answeredCount: number;
  resultsByQuestionId: Record<string, boolean>;
}

export function calculateQuizScore(
  questions: readonly QuizQuestion[],
  answers: Record<string, number>
): QuizScoreSummary {
  const resultsByQuestionId: Record<string, boolean> = {};
  let score = 0;
  let answeredCount = 0;

  for (const q of questions) {
    const selected = answers[q.id];
    if (typeof selected === 'number') {
      answeredCount += 1;
      const isCorrect = selected === q.correctIndex;
      resultsByQuestionId[q.id] = isCorrect;
      if (isCorrect) score += 1;
    } else {
      resultsByQuestionId[q.id] = false;
    }
  }

  const total = questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return {
    score,
    total,
    percentage,
    answeredCount,
    resultsByQuestionId,
  };
}

export function filterArticles(
  articles: readonly Article[],
  groupCode: ArticleGroupCode | 'ALL',
  query: string
): Article[] {
  const normalizedQuery = query.trim().toLowerCase();
  return articles.filter((article) => {
    const matchesGroup =
      groupCode === 'ALL' || article.groupCode === groupCode;
    if (!matchesGroup) return false;
    if (!normalizedQuery) return true;
    return (
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.subtitle.toLowerCase().includes(normalizedQuery) ||
      article.summary.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function reorderMediaItems(
  items: readonly MediaItem[],
  index: number,
  direction: 'up' | 'down'
): MediaItem[] {
  const sorted = [...items].sort((a, b) => a.order - b.order);
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || index >= sorted.length) return sorted;
  if (targetIndex < 0 || targetIndex >= sorted.length) return sorted;

  const swapped = [...sorted];
  const [moved] = swapped.splice(index, 1);
  swapped.splice(targetIndex, 0, moved);

  return swapped.map((item, idx) => ({
    ...item,
    order: idx,
  }));
}

export function setCoverMediaItem(
  items: readonly MediaItem[],
  targetId: string
): MediaItem[] {
  return items.map((item) => ({
    ...item,
    isCover: item.id === targetId,
  }));
}

export function formatElapsedTime(totalSeconds: number): string {
  const safeSeconds =
    typeof totalSeconds === 'number' && Number.isFinite(totalSeconds) && totalSeconds > 0
      ? Math.floor(totalSeconds)
      : 0;
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
