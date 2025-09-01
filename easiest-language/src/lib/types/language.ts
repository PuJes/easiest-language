/**
 * FSI (Foreign Service Institute) language difficulty categories
 * Category I (600-750h): Languages closely related to English
 * Category II (900h): Languages with some linguistic differences
 * Category III (1100h): Languages with significant differences
 * Category IV (1800h): Languages with major differences
 * Category V (2200h): Languages exceptionally difficult for English speakers
 */
export type FSICategory = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Language difficulty scores (1-10 scale)
 */
export interface LanguageDifficulty {
  /** Overall difficulty score (1-10) */
  overall: number;
  /** Grammar complexity score (1-10) */
  grammar: number;
  /** Pronunciation difficulty score (1-10) */
  pronunciation: number;
  /** Vocabulary difficulty score (1-10) */
  vocabulary: number;
}

/**
 * FSI learning time and category information
 */
export interface FSIInfo {
  /** FSI difficulty category (0=native, 1-5=increasing difficulty) */
  category: FSICategory;
  /** Learning hours according to FSI standards */
  hours: number;
  /** Description of the difficulty level */
  description: string;
  /** Hour range (for ranges like 600-750h) */
  hoursRange?: [number, number];
}

/**
 * Core language information structure (MVP version)
 * 优化为MVP版本，确保所有必要字段都简化为最核心内容
 */
export interface Language {
  /** Unique language identifier (ISO 639-1 code when available) */
  id: string;
  /** English name of the language */
  name: string;
  /** Native name of the language */
  nativeName: string;
  /** Countries where this language is primarily spoken */
  countries: string[];
  /** FSI difficulty and learning time information */
  fsi: FSIInfo;
  /** Detailed difficulty breakdown */
  difficulty: LanguageDifficulty;
  /** Language family (e.g., "Indo-European", "Sino-Tibetan") */
  family: string;
  /** Language subfamily (e.g., "Romance", "Germanic") */
  subfamily: string;
  /** Writing system used (e.g., "Latin", "Arabic", "Chinese Characters") */
  writingSystem: string;
  /** Number of native speakers worldwide */
  speakers: number;
  /** Flag emoji representing the primary country */
  flagEmoji: string;
  /** Color code for visual representation */
  color: string;
}

/**
 * MVP简化版语言接口（用于快速开发和测试）
 */
export interface LanguageMVP {
  /** 语言ID */
  id: string;
  /** 英文名称 */
  name: string;
  /** 本地名称 */
  nativeName: string;
  /** 主要使用国家（简化为1-3个主要国家） */
  countries: string[];
  /** FSI难度等级 (0-5) */
  difficulty: number;
  /** 学习小时数 */
  hours: number;
  /** 语言家族 */
  family: string;
  /** 使用人数 */
  speakers: number;
  /** 代表性国旗 */
  flagEmoji: string;
  /** 显示颜色 */
  color: string;
}

/**
 * Country to language mapping information
 */
export interface CountryLanguageData {
  /** Primary language spoken in the country */
  primary: string;
  /** Secondary languages spoken in the country */
  secondary: string[];
  /** All languages associated with the country */
  languages: string[];
  /** Geographic region where the country is located */
  region: string;
  /** Average difficulty score for languages in this country */
  difficulty_avg: number;
}

/**
 * Complete language dataset structure
 */
export interface LanguageData {
  /** Array of all language objects */
  languages: Language[];
}

/**
 * Country to language mapping structure
 */
export interface CountryLanguageMapping {
  [countryName: string]: CountryLanguageData;
}

/**
 * Language learning resource information
 */
export interface LearningResource {
  /** Resource title */
  title: string;
  /** Resource type (app, book, course, etc.) */
  type: 'app' | 'book' | 'course' | 'website' | 'video' | 'podcast';
  /** Resource URL if available */
  url?: string;
  /** Description of the resource */
  description: string;
  /** Whether the resource is free */
  free: boolean;
  /** User rating (1-5 stars) */
  rating?: number;
}

/**
 * Language search and filter options
 */
export interface LanguageFilters {
  /** Filter by language family */
  family?: string;
  /** Filter by geographic region */
  region?: string;
  /** Filter by FSI category */
  fsiCategory?: FSICategory;
  /** Filter by difficulty range (min-max overall difficulty) */
  difficultyRange?: [number, number];
  /** Filter by learning time range (min-max hours) */
  hoursRange?: [number, number];
  /** Filter by minimum number of speakers */
  minSpeakers?: number;
}

/**
 * Language sorting options
 */
export type LanguageSortBy =
  | 'name'
  | 'difficulty-asc'
  | 'difficulty-desc'
  | 'hours-asc'
  | 'hours-desc'
  | 'speakers-asc'
  | 'speakers-desc';

/**
 * Language recommendation quiz result
 */
export interface LanguageRecommendation {
  /** Recommended language */
  language: Language;
  /** Match percentage (0-100) */
  matchPercentage: number;
  /** Reasons for the recommendation */
  reasons: string[];
  /** Estimated learning time for the user */
  estimatedHours: number;
}

/**
 * User quiz answers for language recommendation
 */
export interface QuizAnswers {
  /** User's native language */
  nativeLanguage: string;
  /** Languages user already knows */
  knownLanguages: string[];
  /** Available study time per week (in hours) */
  studyTimePerWeek: number;
  /** Learning goals */
  goals: ('travel' | 'business' | 'culture' | 'immigration' | 'academic')[];
  /** Preferred regions of interest */
  regions: string[];
  /** Difficulty preference */
  difficultyPreference: 'easy' | 'moderate' | 'challenging';
}
