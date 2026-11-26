import test from 'node:test';
import assert from 'node:assert/strict';
import {
  advanceFromStage,
  calculateQuizScore,
  canAccessStage,
  createInitialJourneyState,
  filterArticles,
  parseInitialStateWithSearch,
  reorderMediaItems,
  setCoverMediaItem,
} from './journeyState';
import type { Article, MediaItem, QuizQuestion } from '../types/journey';

test('dashboard is strictly locked until all four earlier stages are completed', () => {
  let state = createInitialJourneyState();
  assert.equal(canAccessStage('intro', state), true);
  assert.equal(canAccessStage('field-journal', state), false);
  assert.equal(canAccessStage('dashboard', state), false);

  state = advanceFromStage(state, 'intro');
  assert.equal(state.currentStage, 'field-journal');
  assert.equal(canAccessStage('field-journal', state), true);
  assert.equal(canAccessStage('quiz', state), false);

  state = advanceFromStage(state, 'field-journal');
  state = advanceFromStage(state, 'quiz');
  assert.equal(state.currentStage, 'knowledge-library');
  assert.equal(canAccessStage('dashboard', state), false);

  state = advanceFromStage(state, 'knowledge-library');
  assert.equal(state.currentStage, 'dashboard');
  assert.equal(canAccessStage('dashboard', state), true);
  assert.equal(canAccessStage('field-journal', state), true);
});

test('autostart=1 skips intro cleanly into field-journal without losing saved data', () => {
  const state = parseInitialStateWithSearch('?autostart=1', null);
  assert.equal(state.currentStage, 'field-journal');
  assert.equal(state.completedStages.includes('intro'), true);
});

test('reloading with tampered unreached dashboard stage falls back safely to intro', () => {
  const state = parseInitialStateWithSearch('', {
    currentStage: 'dashboard',
    completedStages: ['intro'],
  });
  assert.equal(state.currentStage, 'intro');
});

test('calculateQuizScore computes accurate totals and per-question correctness', () => {
  const sampleQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      topicNumber: 1,
      topicLabel: 'Vai trò',
      question: 'Câu 1',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1,
      explanation: 'Giải thích 1',
    },
    {
      id: 'q2',
      topicNumber: 2,
      topicLabel: 'Thực trạng',
      question: 'Câu 2',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 2,
      explanation: 'Giải thích 2',
    },
  ];

  const summary = calculateQuizScore(sampleQuestions, { q1: 1, q2: 0 });
  assert.equal(summary.score, 1);
  assert.equal(summary.total, 2);
  assert.equal(summary.percentage, 50);
  assert.equal(summary.answeredCount, 2);
  assert.equal(summary.resultsByQuestionId.q1, true);
  assert.equal(summary.resultsByQuestionId.q2, false);
});

test('filterArticles filters by group code and Vietnamese query text', () => {
  const sampleArticles: Article[] = [
    {
      id: 'a1',
      groupCode: 'A',
      groupTitle: 'Môi trường',
      title: 'Khái niệm hệ sinh thái nước',
      subtitle: 'Vai trò nền tảng',
      summary: 'Tóm tắt',
      readTimeMinutes: 3,
      imageUrl: '/x.jpg',
      imageCaption: 'Cap',
      sections: [],
      references: [],
    },
    {
      id: 'b1',
      groupCode: 'C',
      groupTitle: 'Thực trạng',
      title: 'Rác thải nhựa đô thị',
      subtitle: 'Kênh rạch chịu áp lực',
      summary: 'Tóm tắt 2',
      readTimeMinutes: 4,
      imageUrl: '/y.jpg',
      imageCaption: 'Cap 2',
      sections: [],
      references: [],
    },
  ];

  assert.equal(filterArticles(sampleArticles, 'ALL', '').length, 2);
  assert.equal(filterArticles(sampleArticles, 'C', '').length, 1);
  assert.equal(filterArticles(sampleArticles, 'ALL', 'nhựa')[0].id, 'b1');
});

test('reorderMediaItems and setCoverMediaItem update order and cover deterministically', () => {
  const base: MediaItem[] = [
    {
      id: 'm1',
      title: 'Một',
      type: 'image',
      url: '/1.jpg',
      caption: '1',
      category: 'boi-canh',
      capturedAt: '2026',
      location: 'VN',
      order: 0,
      isPublished: true,
      isCover: true,
      storageSource: 'sample',
    },
    {
      id: 'm2',
      title: 'Hai',
      type: 'image',
      url: '/2.jpg',
      caption: '2',
      category: 'hanh-dong',
      capturedAt: '2026',
      location: 'VN',
      order: 1,
      isPublished: true,
      isCover: false,
      storageSource: 'sample',
    },
  ];

  const reordered = reorderMediaItems(base, 1, 'up');
  assert.equal(reordered[0].id, 'm2');
  assert.equal(reordered[0].order, 0);
  assert.equal(reordered[1].id, 'm1');
  assert.equal(reordered[1].order, 1);

  const covered = setCoverMediaItem(reordered, 'm2');
  assert.equal(covered[0].isCover, true);
  assert.equal(covered[1].isCover, false);
});
