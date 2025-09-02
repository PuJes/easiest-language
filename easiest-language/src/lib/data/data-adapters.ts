/**
 * 数据适配层 - 统一不同数据源的接口
 * 解决硬编码数据和类型不一致问题
 */

import { Language, FSIInfo, LanguageDifficulty, FSICategory } from '../types';
import { FSI_LANGUAGE_DATA } from './languages';
import { LEARNING_RESOURCES_BY_LANGUAGE } from './learning-resources';

/**
 * 根据FSI类别生成默认的详细难度评分
 * 用于确保所有语言都有完整的difficulty details数据
 */
function generateFSIDetails(category: FSICategory) {
  const baseScores = {
    0: { grammar: 1, vocabulary: 1, pronunciation: 1, writing: 1, cultural: 1 }, // 母语
    1: { grammar: 2, vocabulary: 3, pronunciation: 2, writing: 1, cultural: 2 }, // 最容易
    2: { grammar: 3, vocabulary: 3, pronunciation: 3, writing: 2, cultural: 3 }, // 相对容易
    3: { grammar: 4, vocabulary: 4, pronunciation: 4, writing: 3, cultural: 4 }, // 中等难度
    4: { grammar: 4, vocabulary: 5, pronunciation: 5, writing: 4, cultural: 4 }, // 困难
    5: { grammar: 5, vocabulary: 5, pronunciation: 5, writing: 5, cultural: 5 }, // 最困难
  };

  return baseScores[category] || baseScores[3]; // 默认为中等难度
}

/**
 * 确保FSI类别在有效范围内
 */
function validateFSICategory(category: unknown): FSICategory {
  const numCategory = typeof category === 'number' ? category : parseInt(String(category)) || 0;
  return Math.max(0, Math.min(5, numCategory)) as FSICategory;
}

/**
 * 将原始语言数据转换为标准Language接口
 */
export function adaptLanguageData(rawLanguage: Record<string, unknown>): Language {
  // 安全的类型转换和访问
  const fsi = rawLanguage.fsi as Record<string, unknown> | undefined;
  const rawCategory = fsi?.category || rawLanguage.difficulty || 0;
  const validCategory = validateFSICategory(rawCategory);

  return {
    id:
      (rawLanguage.id as string) ||
      (rawLanguage.name as string).toLowerCase().replace(/\s+/g, '-'),
    name: rawLanguage.name as string,
    nativeName:
      (rawLanguage.localName as string) ||
      (rawLanguage.nativeName as string) ||
      (rawLanguage.name as string),
    countries: (rawLanguage.countries as string[]) || [],
    fsi: {
      category: validCategory,
      hours: (fsi?.hours as number) || (rawLanguage.hours as number) || 0,
      description: (fsi?.description as string) || getFSIDescription(validCategory),
      hoursRange: fsi?.hoursRange as [number, number] | undefined,
      // 确保details字段正确传递，如果不存在则生成默认值
      details: (fsi?.details as Record<string, number>) || generateFSIDetails(validCategory),
    } as FSIInfo,
    difficulty:
      (rawLanguage.difficulty_scores as LanguageDifficulty) ||
      ({
        overall: validCategory,
        grammar: ((fsi?.details as Record<string, unknown>)?.grammar as number) || 5,
        pronunciation: ((fsi?.details as Record<string, unknown>)?.pronunciation as number) || 5,
        vocabulary: ((fsi?.details as Record<string, unknown>)?.vocabulary as number) || 5,
      } as LanguageDifficulty),
    family: (rawLanguage.family as string) || 'Unknown',
    subfamily:
      (rawLanguage.subfamily as string) ||
      (rawLanguage.family as string) ||
      'Unknown',
    writingSystem:
      (rawLanguage.writingSystem as string) ||
      (rawLanguage.writing_system as string) ||
      'Latin',
    speakers:
      (rawLanguage.speakers as number) || (rawLanguage.speakersTotal as number) || 0,
    flagEmoji:
      (rawLanguage.flag as string) || (rawLanguage.flagEmoji as string) || '🏳️',
    color: (rawLanguage.color as string) || getFSIColor(validCategory),
  };
}

/**
 * 获取FSI类别的描述
 */
function getFSIDescription(category: FSICategory): string {
  const descriptions = {
    0: 'Native Language',
    1: 'Easiest for English Speakers',
    2: 'Moderate Difficulty',
    3: 'Significant Difficulty',
    4: 'Hard for English Speakers',
    5: 'Hardest for English Speakers',
  };
  return descriptions[category];
}

/**
 * 获取FSI类别的颜色
 */
function getFSIColor(category: FSICategory): string {
  const colors = {
    0: '#6c757d', // Native - gray
    1: '#22c55e', // Easy - green
    2: '#eab308', // Moderate - yellow
    3: '#f97316', // Significant - orange
    4: '#ef4444', // Hard - red
    5: '#a855f7', // Hardest - purple
  };
  return colors[category];
}

/**
 * 获取精选语言（用于首页展示）
 */
export function getFeaturedLanguages(): Language[] {
  // 从真实数据中选择4种代表性语言
  const featuredIds = ['spanish', 'french', 'german', 'mandarin'];

  return FSI_LANGUAGE_DATA.languages
    .filter((lang) => {
      const langId = lang.name.toLowerCase().replace(/\s+/g, '-');
      return featuredIds.some((id) => langId.includes(id) || lang.name.toLowerCase().includes(id));
    })
    .slice(0, 4)
    .map(lang => adaptLanguageData(lang as unknown as Record<string, unknown>));
}

/**
 * 获取所有语言数据（适配后）
 */
export function getAllLanguages(): Language[] {
  return FSI_LANGUAGE_DATA.languages.map(lang => adaptLanguageData(lang as unknown as Record<string, unknown>));
}

/**
 * 根据ID获取语言详情
 */
export function getLanguageById(id: string): Language | null {
  const rawLanguage = FSI_LANGUAGE_DATA.languages.find((lang) => {
    const langId = lang.name.toLowerCase().replace(/\s+/g, '-');
    return langId === id || lang.id === id;
  });

  return rawLanguage ? adaptLanguageData(rawLanguage as unknown as Record<string, unknown>) : null;
}

/**
 * 获取指定语言的学习资源，按类型分组
 */
export function getLearningResourcesForLanguage(languageId: string) {
  const resources = LEARNING_RESOURCES_BY_LANGUAGE[languageId] || [];
  
  // 按资源类型分组
  const groupedResources = {
    app: resources.filter(r => r.type === 'app'),
    book: resources.filter(r => r.type === 'book'),
    course: resources.filter(r => r.type === 'course'),
    website: resources.filter(r => r.type === 'website'),
    video: resources.filter(r => r.type === 'video'),
    podcast: resources.filter(r => r.type === 'podcast'),
  };

  return groupedResources;
}

/**
 * 获取语言的详细学习信息（用于详情页）
 */
export interface ExtendedLanguageDetail extends Omit<Language, 'speakers'> {
  // 提供更详细的speakers结构
  speakers: {
    native: string;
    total: string;
    rank: number;
  };
  // 添加flag属性
  flag: string;
  geography: {
    primaryCountries: string[];
    secondaryCountries: string[];
    continents: string[];
  };
  learningResources: {
    app: Array<{ title: string; type: string; url?: string; description: string; free: boolean }>;
    book: Array<{ title: string; type: string; url?: string; description: string; free: boolean }>;
    course: Array<{ title: string; type: string; url?: string; description: string; free: boolean }>;
    website: Array<{ title: string; type: string; url?: string; description: string; free: boolean }>;
    video: Array<{ title: string; type: string; url?: string; description: string; free: boolean }>;
    podcast: Array<{ title: string; type: string; url?: string; description: string; free: boolean }>;
  };
  culture: {
    overview: string;
    businessUse: string;
    entertainment: string[];
    cuisine: string[];
  };
  culturalInfo: {
    businessUse: number;
    travelValue: number;
    culturalRichness: number;
    onlinePresence: number;
  };
}

/**
 * 获取语言的扩展详情数据
 */
export function getLanguageDetailData(id: string): ExtendedLanguageDetail | null {
  const baseLanguage = getLanguageById(id);
  if (!baseLanguage) return null;

  const validCategory = baseLanguage.fsi.category; // 获取语言的FSI分类

  return {
    ...baseLanguage,
    // 格式化speakers数据为详细结构
    speakers: {
      native: formatSpeakerCount(Math.floor(baseLanguage.speakers * 0.7)), // 估算母语使用者为总数的70%
      total: formatSpeakerCount(baseLanguage.speakers),
      rank: calculateSpeakerRank(baseLanguage.speakers), // 根据使用人数计算排名
    },
    // 使用flagEmoji作为flag属性
    flag: baseLanguage.flagEmoji,
    geography: {
      primaryCountries: baseLanguage.countries.slice(0, 3),
      secondaryCountries: baseLanguage.countries.slice(3),
      continents: getLanguageContinents(baseLanguage.countries),
    },
    // 从真实的学习资源数据中获取
    learningResources: getLearningResourcesForLanguage(id),
    // 生成组件需要的culturalInfo数据
    culturalInfo: {
      businessUse: Math.min(5, validCategory + 1), // 基于难度计算商务价值
      travelValue: Math.min(5, Math.max(1, 6 - validCategory)), // 旅游价值与难度成反比
      culturalRichness: 4, // 默认文化丰富度
      onlinePresence: Math.min(5, baseLanguage.speakers > 100000000 ? 5 : 3), // 基于使用人数
    },
    // 生成组件需要的culture数据
    culture: {
      overview: `${baseLanguage.name} is a fascinating language with unique cultural characteristics. Learning it opens doors to new perspectives and cultural experiences.`,
      businessUse: `${baseLanguage.name} can be valuable for international business, especially in regions where it's widely spoken.`,
      entertainment: [
        'Local Music',
        'Traditional Arts',
        'Cultural Festivals',
        'Local Cinema',
        'Traditional Games',
      ],
      cuisine: [
        'Traditional Dishes',
        'Local Specialties',
        'Street Food',
        'Regional Cuisine',
        'Local Beverages',
      ],
    },
  };
}

/**
 * 格式化使用人数显示
 */
function formatSpeakerCount(count: number): string {
  if (count >= 1000000000) {
    return `${(count / 1000000000).toFixed(1)}B`;
  } else if (count >= 1000000) {
    return `${(count / 1000000).toFixed(0)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`;
  }
  return count.toString();
}

/**
 * 根据使用人数计算全球排名
 */
function calculateSpeakerRank(speakers: number): number {
  // 简化实现：基于使用人数给出大致排名
  if (speakers >= 1000000000) return 1; // 中文
  if (speakers >= 500000000) return 2; // 英语、西班牙语等
  if (speakers >= 250000000) return 3; // 阿拉伯语、葡萄牙语等
  if (speakers >= 100000000) return 4; // 俄语、日语等
  if (speakers >= 50000000) return 5; // 德语、法语等
  if (speakers >= 10000000) return 6; // 其他主要语言
  return 7; // 较小语言
}

/**
 * 根据国家列表推断大陆
 */
function getLanguageContinents(countries: string[]): string[] {
  // 简化实现，实际项目中可以建立完整的国家-大陆映射
  const continentMap: { [key: string]: string } = {
    Spain: 'Europe',
    Mexico: 'North America',
    France: 'Europe',
    Germany: 'Europe',
    China: 'Asia',
    Japan: 'Asia',
    Italy: 'Europe',
    Brazil: 'South America',
  };

  const continents = countries
    .map((country) => continentMap[country])
    .filter(Boolean)
    .filter((continent, index, arr) => arr.indexOf(continent) === index);

  return continents.length > 0 ? continents : ['Unknown'];
}