export type JourneyStage =
  | 'intro'
  | 'field-journal'
  | 'quiz'
  | 'knowledge-library'
  | 'dashboard';

export type MediaType = 'image' | 'video';

export type MediaCategory =
  | 'boi-canh'
  | 'chuan-bi'
  | 'hanh-dong'
  | 'thanh-qua';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  url: string;
  storagePath?: string;
  caption: string;
  category: MediaCategory;
  capturedAt: string;
  location: string;
  order: number;
  isPublished: boolean;
  isCover?: boolean;
  isSample?: boolean;
  storageSource: 'sample' | 'supabase';
  createdAt?: string;
}

export interface QuizQuestion {
  id: string;
  topicNumber: number;
  topicLabel: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  isLocalEditable?: boolean;
}

export interface LocalContextConfig {
  locationName: string;
  waterBodyName: string;
  localObservation: string;
}

export interface QuizSubmission {
  answers: Record<string, number>;
  confirmedIds: string[];
  score: number;
  total: number;
  completedAt: string;
}

export type ArticleGroupCode = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  highlight?: string;
}

export interface Article {
  id: string;
  groupCode: ArticleGroupCode;
  groupTitle: string;
  title: string;
  subtitle: string;
  summary: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageCaption: string;
  sections: ArticleSection[];
  references: string[];
}

export interface JourneyState {
  currentStage: JourneyStage;
  completedStages: JourneyStage[];
  quizAnswers: Record<string, number>;
  quizConfirmedIds: string[];
  quizSubmitted: boolean;
  quizElapsedSeconds?: number;
  readArticleIds: string[];
  committedActionIds: string[];
  localContext: LocalContextConfig;
}
