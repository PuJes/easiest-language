// Re-export all language-related types for easier imports
export type {
  FSICategory,
  LanguageDifficulty,
  FSIInfo,
  Language,
  RegionLanguageData,
  LanguageData,
  RegionLanguageMapping,
  LearningResource,
  LanguageFilters,
  LanguageSortBy,
  LanguageRecommendation,
  QuizAnswers,
} from './language';

// Additional utility types for the application
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface Statistics {
  totalLanguages: number;
  averageDifficulty: number;
  easiestLanguages: string[];
  hardestLanguages: string[];
  languagesByRegion: Record<string, number>;
  languagesByFamily: Record<string, number>;
}
