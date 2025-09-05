/**
 * 高级筛选系统类型定义
 * 基于现有Language接口扩展筛选功能
 */

import { FSICategory, Language } from './language';

/**
 * 筛选状态接口
 */
export interface FilterState {
  /** FSI难度等级筛选 */
  fsiCategories: FSICategory[];
  /** 语言家族筛选 */
  languageFamilies: string[];
  /** 地理区域筛选 */
  regions: string[];
  /** 搜索查询字符串 */
  searchQuery: string;
  /** 难度范围筛选 [最小值, 最大值] */
  difficultyRange: [number, number];
  /** 学习时长范围筛选 [最小小时, 最大小时] */
  learningTimeRange: [number, number];
  /** 使用人数范围筛选 [最小人数, 最大人数] */
  speakersRange: [number, number];
  /** 是否激活筛选 */
  isActive: boolean;
}

/**
 * 筛选器配置接口
 */
export interface FilterConfig {
  /** 可用的FSI等级选项 */
  availableFSICategories: FSICategory[];
  /** 可用的语言家族选项 */
  availableLanguageFamilies: string[];
  /** 可用的地理区域选项 */
  availableRegions: string[];
  /** 难度范围的最小最大值 */
  difficultyBounds: [number, number];
  /** 学习时长范围的最小最大值 */
  learningTimeBounds: [number, number];
  /** 使用人数范围的最小最大值 */
  speakersBounds: [number, number];
}

/**
 * 筛选结果接口
 */
export interface FilterResult {
  /** 筛选后的语言列表 */
  filteredLanguages: Language[];
  /** 筛选结果数量 */
  totalCount: number;
  /** 应用的筛选条件摘要 */
  appliedFilters: FilterSummary;
  /** 筛选执行时间（毫秒） */
  executionTime: number;
}

/**
 * 筛选条件摘要
 */
export interface FilterSummary {
  /** FSI等级筛选摘要 */
  fsiCategories: string;
  /** 语言家族筛选摘要 */
  families: string;
  /** 地理区域筛选摘要 */
  regions: string;
  /** 搜索关键词 */
  searchQuery: string;
  /** 是否有范围筛选 */
  hasRangeFilters: boolean;
}

/**
 * 搜索配置接口
 */
export interface SearchConfig {
  /** 搜索字段权重配置 */
  fieldWeights: {
    name: number;
    nativeName: number;
    family: number;
    countries: number;
  };
  /** 模糊匹配阈值 (0-1) */
  threshold: number;
  /** 最大搜索结果数量 */
  maxResults: number;
  /** 搜索防抖延迟（毫秒） */
  debounceDelay: number;
}

/**
 * 搜索结果接口
 */
export interface SearchResult {
  /** 匹配的语言 */
  language: Language;
  /** 匹配分数 (0-1) */
  score: number;
  /** 匹配的字段 */
  matchedFields: string[];
  /** 高亮的匹配文本 */
  highlights: SearchHighlight[];
}

/**
 * 搜索高亮接口
 */
export interface SearchHighlight {
  /** 字段名 */
  field: string;
  /** 高亮的文本片段 */
  snippet: string;
  /** 高亮位置 [开始, 结束] */
  positions: [number, number][];
}

/**
 * 筛选器类型枚举
 */
export enum FilterType {
  FSI_CATEGORY = 'fsiCategory',
  LANGUAGE_FAMILY = 'languageFamily',
  REGION = 'region',
  DIFFICULTY_RANGE = 'difficultyRange',
  LEARNING_TIME_RANGE = 'learningTimeRange',
  SPEAKERS_RANGE = 'speakersRange',
  SEARCH = 'search',
}

/**
 * 筛选操作类型
 */
export type FilterAction =
  | { type: 'SET_FSI_CATEGORIES'; payload: FSICategory[] }
  | { type: 'SET_LANGUAGE_FAMILIES'; payload: string[] }
  | { type: 'SET_REGIONS'; payload: string[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_DIFFICULTY_RANGE'; payload: [number, number] }
  | { type: 'SET_LEARNING_TIME_RANGE'; payload: [number, number] }
  | { type: 'SET_SPEAKERS_RANGE'; payload: [number, number] }
  | { type: 'RESET_FILTERS' }
  | { type: 'CLEAR_FILTER'; payload: FilterType };

/**
 * 默认筛选状态
 */
export const DEFAULT_FILTER_STATE: FilterState = {
  fsiCategories: [],
  languageFamilies: [],
  regions: [],
  searchQuery: '',
  difficultyRange: [1, 10],
  learningTimeRange: [0, 3000],
  speakersRange: [0, 2000000000],
  isActive: false,
};

/**
 * 默认搜索配置
 */
export const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  fieldWeights: {
    name: 1.0,
    nativeName: 0.8,
    family: 0.6,
    regions: 0.4,
  },
  threshold: 0.3,
  maxResults: 50,
  debounceDelay: 300,
};
