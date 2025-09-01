/**
 * 测试数据Mock - 为测试环境提供统一的Mock数据
 * 遵循KISS原则：提供简单、一致的测试数据
 * DRY原则：集中管理所有测试数据，避免重复
 */

import type { LanguageMVP } from '../types/language';

// Mock语言数据 - 覆盖不同难度等级和语系
export const mockLanguages: LanguageMVP[] = [
  {
    id: 'test-1',
    name: 'Spanish',
    nativeName: 'Español',
    difficulty: 1,
    weeksToLearn: 24,
    family: 'Indo-European',
    speakers: 500000000,
    countries: ['Spain', 'Mexico', 'Argentina'],
  },
  {
    id: 'test-2',
    name: 'French',
    nativeName: 'Français',
    difficulty: 1,
    weeksToLearn: 30,
    family: 'Indo-European',
    speakers: 280000000,
    countries: ['France', 'Canada', 'Belgium'],
  },
  {
    id: 'test-3',
    name: 'Mandarin Chinese',
    nativeName: '普通话',
    difficulty: 4,
    weeksToLearn: 88,
    family: 'Sino-Tibetan',
    speakers: 918000000,
    countries: ['China', 'Taiwan', 'Singapore'],
  },
  {
    id: 'test-4',
    name: 'Arabic',
    nativeName: 'العربية',
    difficulty: 4,
    weeksToLearn: 88,
    family: 'Afro-Asiatic',
    speakers: 422000000,
    countries: ['Saudi Arabia', 'Egypt', 'UAE'],
  },
  {
    id: 'test-5',
    name: 'Japanese',
    nativeName: '日本語',
    difficulty: 4,
    weeksToLearn: 88,
    family: 'Japonic',
    speakers: 125000000,
    countries: ['Japan'],
  },
];

// Mock国家数据
export const mockCountries = [
  { code: 'ES', name: 'Spain', languages: ['Spanish'] },
  { code: 'MX', name: 'Mexico', languages: ['Spanish'] },
  { code: 'FR', name: 'France', languages: ['French'] },
  { code: 'CN', name: 'China', languages: ['Mandarin Chinese'] },
  { code: 'JP', name: 'Japan', languages: ['Japanese'] },
];

// Mock语言家族数据
export const mockLanguageFamilies = [
  {
    name: 'Indo-European',
    description: 'The largest language family in the world',
    languages: ['Spanish', 'French', 'English', 'German'],
    regions: ['Europe', 'Americas', 'South Asia'],
  },
  {
    name: 'Sino-Tibetan',
    description: 'Second largest language family',
    languages: ['Mandarin Chinese', 'Cantonese', 'Tibetan'],
    regions: ['East Asia', 'Southeast Asia'],
  },
];

// Mock学习资源数据
export const mockLearningResources = [
  {
    languageId: 'test-1',
    type: 'app',
    name: 'Duolingo',
    url: 'https://duolingo.com',
    description: 'Free language learning app',
    rating: 4.5,
  },
  {
    languageId: 'test-2',
    type: 'book',
    name: 'First French Reader',
    url: 'https://example.com',
    description: 'Classic French learning book',
    rating: 4.2,
  },
];

// 测试用的空数据和错误数据
export const emptyMockData = {
  languages: [],
  countries: [],
  families: [],
  resources: [],
};

export const invalidMockData = {
  languages: [
    // 缺少必需字段的无效数据
    {
      id: 'invalid-1',
      name: 'Invalid Language',
      // 缺少其他必需字段
    },
  ],
};

// API响应Mock
export const mockApiResponses = {
  success: {
    data: mockLanguages,
    status: 'success',
    message: 'Data retrieved successfully',
  },
  error: {
    data: null,
    status: 'error',
    message: 'Failed to retrieve data',
  },
  empty: {
    data: [],
    status: 'success',
    message: 'No data found',
  },
};

// 测试用的异步函数Mock
export const createAsyncMock = <T>(data: T, delay = 100) => {
  return jest.fn().mockImplementation(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(data), delay);
      })
  );
};

// 错误Mock
export const createErrorMock = (error: string, delay = 100) => {
  return jest.fn().mockImplementation(
    () =>
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error(error)), delay);
      })
  );
};

// 本地存储Mock
export const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

// 全局Mock设置函数
export const setupGlobalMocks = () => {
  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });

  // Mock fetch
  global.fetch = jest.fn();

  // Mock console方法（避免测试时的噪音）
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
};

// 清理Mock的函数
export const cleanupMocks = () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
};
