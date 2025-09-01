/**
 * 数据适配层 - 统一不同数据源的接口
 * 解决硬编码数据和类型不一致问题
 */

import { Language, FSIInfo, LanguageDifficulty, FSICategory } from '../types';
import { FSI_LANGUAGE_DATA } from './languages';

/**
 * 确保FSI类别在有效范围内
 */
function validateFSICategory(category: any): FSICategory {
  const numCategory = typeof category === 'number' ? category : parseInt(category) || 0;
  return Math.max(0, Math.min(5, numCategory)) as FSICategory;
}

/**
 * 将原始语言数据转换为标准Language接口
 */
export function adaptLanguageData(rawLanguage: Record<string, any>): Language {
  const rawCategory = rawLanguage.fsi?.category || rawLanguage.difficulty || 0;
  const validCategory = validateFSICategory(rawCategory);

  return {
    id: rawLanguage.id || rawLanguage.name.toLowerCase().replace(/\s+/g, '-'),
    name: rawLanguage.name,
    nativeName: rawLanguage.localName || rawLanguage.nativeName || rawLanguage.name,
    countries: rawLanguage.countries || [],
    fsi: {
      category: validCategory,
      hours: rawLanguage.fsi?.hours || rawLanguage.hours || 0,
      description: rawLanguage.fsi?.description || getFSIDescription(validCategory),
      hoursRange: rawLanguage.fsi?.hoursRange,
    } as FSIInfo,
    difficulty:
      rawLanguage.difficulty_scores ||
      ({
        overall: validCategory,
        grammar: rawLanguage.fsi?.details?.grammar || 5,
        pronunciation: rawLanguage.fsi?.details?.pronunciation || 5,
        vocabulary: rawLanguage.fsi?.details?.vocabulary || 5,
      } as LanguageDifficulty),
    family: rawLanguage.family || 'Unknown',
    subfamily: rawLanguage.subfamily || rawLanguage.family || 'Unknown',
    writingSystem: rawLanguage.writingSystem || rawLanguage.writing_system || 'Latin',
    speakers: rawLanguage.speakers || rawLanguage.speakersTotal || 0,
    flagEmoji: rawLanguage.flag || rawLanguage.flagEmoji || '🏳️',
    color: rawLanguage.color || getFSIColor(validCategory),
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
    .map(adaptLanguageData);
}

/**
 * 获取所有语言数据（适配后）
 */
export function getAllLanguages(): Language[] {
  return FSI_LANGUAGE_DATA.languages.map(adaptLanguageData);
}

/**
 * 根据ID获取语言详情
 */
export function getLanguageById(id: string): Language | null {
  const rawLanguage = FSI_LANGUAGE_DATA.languages.find((lang) => {
    const langId = lang.name.toLowerCase().replace(/\s+/g, '-');
    return langId === id || lang.id === id;
  });

  return rawLanguage ? adaptLanguageData(rawLanguage) : null;
}

/**
 * 获取语言的详细学习信息（用于详情页）
 */
export interface ExtendedLanguageDetail extends Language {
  geography: {
    primaryCountries: string[];
    secondaryCountries: string[];
    continents: string[];
  };
  learningResources: {
    beginner: Array<{ title: string; type: string; url?: string; description: string }>;
    intermediate: Array<{ title: string; type: string; url?: string; description: string }>;
    advanced: Array<{ title: string; type: string; url?: string; description: string }>;
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

  return {
    ...baseLanguage,
    geography: {
      primaryCountries: baseLanguage.countries.slice(0, 3),
      secondaryCountries: baseLanguage.countries.slice(3),
      continents: getLanguageContinents(baseLanguage.countries),
    },
    learningResources: generateLearningResources(baseLanguage.name),
    culturalInfo: {
      businessUse: Math.min(10, Math.round((baseLanguage.speakers / 100000000) * 10)),
      travelValue: Math.min(10, baseLanguage.countries.length),
      culturalRichness: 6 + Math.round(Math.random() * 4),
      onlinePresence: Math.min(10, Math.round((baseLanguage.speakers / 50000000) * 10)),
    },
  };
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

/**
 * 生成学习资源数据
 */
function generateLearningResources(languageName: string) {
  return {
    beginner: [
      {
        title: `Duolingo ${languageName}`,
        type: 'App',
        url: 'https://duolingo.com',
        description: 'Free language learning app with gamification',
      },
      {
        title: `${languageName} Grammar Basics`,
        type: 'Book',
        description: 'Essential grammar rules and exercises',
      },
    ],
    intermediate: [
      {
        title: `Babbel ${languageName}`,
        type: 'App',
        url: 'https://babbel.com',
        description: 'Conversation-focused language learning',
      },
      {
        title: `${languageName} News Podcasts`,
        type: 'Podcast',
        description: 'Listen to current events in target language',
      },
    ],
    advanced: [
      {
        title: `${languageName} Literature`,
        type: 'Book',
        description: 'Classic and contemporary literature',
      },
      {
        title: `Native ${languageName} Media`,
        type: 'Website',
        description: 'News websites, TV shows, and films',
      },
    ],
  };
}
