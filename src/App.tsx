import { useCallback, useEffect, useState } from 'react';
import type {
  JourneyStage,
  JourneyState,
  LocalContextConfig,
  MediaItem,
} from './types/journey';
import { DEFAULT_MEDIA_ITEMS } from './data/mediaData';
import {
  advanceFromStage,
  canAccessStage,
  createInitialJourneyState,
  parseInitialStateWithSearch,
} from './utils/journeyState';
import { hasSupabaseEnvConfig } from './lib/supabase';
import { fetchPublishedMediaItems } from './services/supabaseService';
import {
  fireWelcomeConfettiOnce,
  SESSION_CONFETTI_KEYS,
} from './utils/confettiEffects';
import { JourneyProgress } from './components/JourneyProgress';
import { IntroSection } from './components/IntroSection';
import { FieldJournal } from './components/FieldJournal';
import { QuizSection } from './components/QuizSection';
import { KnowledgeLibrary } from './components/KnowledgeLibrary';
import { FinalDashboard } from './components/FinalDashboard';
import { AdminPortal } from './components/AdminPortal';

const JOURNEY_STORAGE_KEY = 'blue_trace_journey_state_v1';

function isAdminLocation(): boolean {
  const path = window.location.pathname.replace(/\/+$/, '');
  const params = new URLSearchParams(window.location.search);
  return path === '/admin' || params.get('admin') === '1';
}

function loadSavedJourneyState(): JourneyState {
  let parsed: Partial<JourneyState> | null = null;
  try {
    const raw = localStorage.getItem(JOURNEY_STORAGE_KEY);
    if (raw) {
      parsed = JSON.parse(raw) as Partial<JourneyState>;
    }
  } catch {
    parsed = null;
  }
  return parseInitialStateWithSearch(window.location.search, parsed);
}

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => isAdminLocation());
  const [journeyState, setJourneyState] = useState<JourneyState>(() =>
    loadSavedJourneyState()
  );
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(DEFAULT_MEDIA_ITEMS);
  const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(() =>
    hasSupabaseEnvConfig()
  );
  const [mediaFetchError, setMediaFetchError] = useState<string | null>(null);

  const supabaseReady = hasSupabaseEnvConfig();

  // Fire welcome confetti once per session when the user starts the application
  useEffect(() => {
    if (isAdminRoute) return;
    const timerId = window.setTimeout(() => {
      fireWelcomeConfettiOnce(SESSION_CONFETTI_KEYS.appStart);
    }, 280);
    return () => window.clearTimeout(timerId);
  }, [isAdminRoute]);

  // Run subtle 1s quiz elapsed timer only while user is actively taking the Quiz
  useEffect(() => {
    if (
      isAdminRoute ||
      journeyState.currentStage !== 'quiz' ||
      journeyState.quizSubmitted
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setJourneyState((prev) => {
        if (prev.currentStage !== 'quiz' || prev.quizSubmitted) {
          return prev;
        }
        return {
          ...prev,
          quizElapsedSeconds: (prev.quizElapsedSeconds ?? 0) + 1,
        };
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isAdminRoute, journeyState.currentStage, journeyState.quizSubmitted]);

  // Sync SPA /admin navigation on browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminRoute(isAdminLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Persist journey progression safely
  useEffect(() => {
    try {
      localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(journeyState));
    } catch {
      // Ignore storage quota errors
    }
  }, [journeyState]);

  const loadPublicMedia = useCallback(async () => {
    if (!supabaseReady) {
      setMediaItems(DEFAULT_MEDIA_ITEMS);
      setIsLoadingMedia(false);
      setMediaFetchError(null);
      return;
    }

    setIsLoadingMedia(true);
    setMediaFetchError(null);
    try {
      const published = await fetchPublishedMediaItems();
      setMediaItems(published.length > 0 ? published : DEFAULT_MEDIA_ITEMS);
    } catch {
      setMediaItems(DEFAULT_MEDIA_ITEMS);
      setMediaFetchError(
        'Không thể kết nối dữ liệu Supabase lúc này, đang hiển thị bộ tư liệu dự phòng.'
      );
    } finally {
      setIsLoadingMedia(false);
    }
  }, [supabaseReady]);

  useEffect(() => {
    void loadPublicMedia();
  }, [loadPublicMedia]);

  const openAdminRoute = () => {
    window.history.pushState(null, '', '/admin');
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const exitAdminRoute = () => {
    window.history.pushState(null, '', '/');
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (isAdminRoute) {
    return (
      <AdminPortal
        onExitAdmin={exitAdminRoute}
        onMediaSynced={() => {
          void loadPublicMedia();
        }}
      />
    );
  }

  const navigateToStage = (stage: JourneyStage) => {
    if (!canAccessStage(stage, journeyState)) return;
    setJourneyState((prev) => ({
      ...prev,
      currentStage: stage,
    }));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleStartFromIntro = () => {
    setJourneyState((prev) => {
      const next = advanceFromStage(prev, 'intro');
      return {
        ...next,
        currentStage: 'field-journal',
      };
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleResumeProgress = () => {
    const highestUnlocked: JourneyStage = canAccessStage('dashboard', journeyState)
      ? 'dashboard'
      : canAccessStage('knowledge-library', journeyState)
        ? 'knowledge-library'
        : canAccessStage('quiz', journeyState)
          ? 'quiz'
          : 'field-journal';
    navigateToStage(highestUnlocked);
  };

  const handleCompleteFieldJournal = () => {
    setJourneyState((prev) => advanceFromStage(prev, 'field-journal'));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleSelectQuizAnswer = (questionId: string, optionIndex: number) => {
    setJourneyState((prev) => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: optionIndex,
      },
    }));
  };

  const handleConfirmQuizAnswer = (questionId: string) => {
    setJourneyState((prev) => ({
      ...prev,
      quizConfirmedIds: prev.quizConfirmedIds.includes(questionId)
        ? prev.quizConfirmedIds
        : [...prev.quizConfirmedIds, questionId],
    }));
  };

  const handleFinishQuiz = () => {
    setJourneyState((prev) => ({
      ...prev,
      quizSubmitted: true,
    }));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleRetryQuiz = () => {
    setJourneyState((prev) => ({
      ...prev,
      quizAnswers: {},
      quizConfirmedIds: [],
      quizSubmitted: false,
      quizElapsedSeconds: 0,
    }));
  };

  const handleContinueToLibrary = () => {
    setJourneyState((prev) => advanceFromStage(prev, 'quiz'));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleUpdateLocalContext = (nextContext: LocalContextConfig) => {
    setJourneyState((prev) => ({
      ...prev,
      localContext: nextContext,
    }));
  };

  const handleMarkArticleRead = (articleId: string) => {
    setJourneyState((prev) => ({
      ...prev,
      readArticleIds: prev.readArticleIds.includes(articleId)
        ? prev.readArticleIds
        : [...prev.readArticleIds, articleId],
    }));
  };

  const handleCompleteLibrary = () => {
    setJourneyState((prev) => advanceFromStage(prev, 'knowledge-library'));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleToggleCommittedAction = (actionId: string) => {
    setJourneyState((prev) => {
      const exists = prev.committedActionIds.includes(actionId);
      return {
        ...prev,
        committedActionIds: exists
          ? prev.committedActionIds.filter((id) => id !== actionId)
          : [...prev.committedActionIds, actionId],
      };
    });
  };

  const handleRestartJourney = () => {
    setJourneyState((prev) => ({
      ...createInitialJourneyState(),
      localContext: prev.localContext,
    }));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const hasPreviousProgress = journeyState.completedStages.length > 0;

  return (
    <div
      data-stage={journeyState.currentStage}
      className="min-h-[100dvh] bg-[#F5FBFF] text-[#173B52] flex flex-col"
    >
      <JourneyProgress
        state={journeyState}
        onSelectStage={navigateToStage}
        onRestartJourney={handleRestartJourney}
      />

      <main className="flex-1">
        {journeyState.currentStage === 'intro' && (
          <IntroSection
            hasSavedProgress={hasPreviousProgress}
            onStart={handleStartFromIntro}
            onResume={handleResumeProgress}
          />
        )}

        {journeyState.currentStage === 'field-journal' && (
          <>
            {mediaFetchError && (
              <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
                <p className="rounded-2xl border border-[#B9E5F5] bg-[#DDF3FC] px-4 py-2.5 text-xs text-[#173B52]">
                  {mediaFetchError}
                </p>
              </div>
            )}
            {isLoadingMedia ? (
              <div className="mx-auto flex min-h-[50dvh] max-w-6xl items-center justify-center px-4 text-sm text-[#557386]">
                Đang tải tư liệu phóng sự...
              </div>
            ) : (
              <FieldJournal
                items={mediaItems}
                isSupabaseReady={supabaseReady}
                onCompleteStage={handleCompleteFieldJournal}
              />
            )}
          </>
        )}

        {journeyState.currentStage === 'quiz' && (
          <QuizSection
            answers={journeyState.quizAnswers}
            confirmedIds={journeyState.quizConfirmedIds}
            submitted={journeyState.quizSubmitted}
            elapsedSeconds={journeyState.quizElapsedSeconds ?? 0}
            localContext={journeyState.localContext}
            onUpdateLocalContext={handleUpdateLocalContext}
            onSelectAnswer={handleSelectQuizAnswer}
            onConfirmAnswer={handleConfirmQuizAnswer}
            onFinishQuiz={handleFinishQuiz}
            onRetryQuiz={handleRetryQuiz}
            onContinueToLibrary={handleContinueToLibrary}
            onBackToJournal={() => navigateToStage('field-journal')}
          />
        )}

        {journeyState.currentStage === 'knowledge-library' && (
          <KnowledgeLibrary
            readArticleIds={journeyState.readArticleIds}
            onMarkArticleRead={handleMarkArticleRead}
            onCompleteStage={handleCompleteLibrary}
          />
        )}

        {journeyState.currentStage === 'dashboard' && (
          <FinalDashboard
            state={journeyState}
            mediaItems={mediaItems}
            onNavigateStage={navigateToStage}
            onToggleAction={handleToggleCommittedAction}
            onRestartJourney={handleRestartJourney}
          />
        )}
      </main>

      {journeyState.currentStage !== 'intro' && (
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-t border-[#B9E5F5]/70 px-4 py-4 text-xs text-[#557386] sm:px-6 pb-safe">
          <span>BLUE TRACE · Dự án hoạt động trải nghiệm của nhóm 1, tổ 3</span>
          <button
            type="button"
            onClick={openAdminRoute}
            className="min-h-[44px] inline-flex items-center rounded-full px-3 py-2 font-medium text-[#557386] underline-offset-4 transition-colors hover:text-[#173B52] hover:underline"
          >
            Quản trị tư liệu
          </button>
        </div>
      )}
    </div>
  );
}
