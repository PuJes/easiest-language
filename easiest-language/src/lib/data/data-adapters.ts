/**
 * 数据适配层 - 统一不同数据源的接口
 * 解决硬编码数据和类型不一致问题
 */

import { Language, FSIInfo, LanguageDifficulty, FSICategory } from '../types';
import { FSI_LANGUAGE_DATA } from './languages';
import { LEARNING_RESOURCES_BY_LANGUAGE } from './learning-resources';
import { getCultureInfo } from './culture-data';

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
      (rawLanguage.id as string) || (rawLanguage.name as string).toLowerCase().replace(/\s+/g, '-'),
    name: rawLanguage.name as string,
    nativeName:
      (rawLanguage.localName as string) ||
      (rawLanguage.nativeName as string) ||
      (rawLanguage.name as string),
    regions: (rawLanguage.regions as string[]) || [],
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
    subfamily: (rawLanguage.subfamily as string) || (rawLanguage.family as string) || 'Unknown',
    writingSystem:
      (rawLanguage.writingSystem as string) || (rawLanguage.writing_system as string) || 'Latin',
    speakers: (rawLanguage.speakers as number) || (rawLanguage.speakersTotal as number) || 0,
    flagEmoji: (rawLanguage.flag as string) || (rawLanguage.flagEmoji as string) || '🏳️',
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
    .map((lang) => adaptLanguageData(lang as unknown as Record<string, unknown>));
}

/**
 * 获取所有语言数据（适配后）
 */
export function getAllLanguages(): Language[] {
  return FSI_LANGUAGE_DATA.languages.map((lang) =>
    adaptLanguageData(lang as unknown as Record<string, unknown>)
  );
}

/**
 * 根据ID获取语言详情
 * 只匹配精确的语言ID，避免重复路由问题
 */
export function getLanguageById(id: string): Language | null {
  const rawLanguage = FSI_LANGUAGE_DATA.languages.find((lang) => {
    return lang.id === id; // 只匹配精确的ID，避免名称匹配导致的重复路由
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
    app: resources.filter((r) => r.type === 'app'),
    book: resources.filter((r) => r.type === 'book'),
    course: resources.filter((r) => r.type === 'course'),
    website: resources.filter((r) => r.type === 'website'),
    video: resources.filter((r) => r.type === 'video'),
    podcast: resources.filter((r) => r.type === 'podcast'),
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
    primaryRegions: string[];
    secondaryRegions: string[];
    continents: string[];
  };
  learningResources: {
    app: Array<{ title: string; type: string; url?: string; description: string; free: boolean }>;
    book: Array<{ title: string; type: string; url?: string; description: string; free: boolean }>;
    course: Array<{
      title: string;
      type: string;
      url?: string;
      description: string;
      free: boolean;
    }>;
    website: Array<{
      title: string;
      type: string;
      url?: string;
      description: string;
      free: boolean;
    }>;
    video: Array<{ title: string; type: string; url?: string; description: string; free: boolean }>;
    podcast: Array<{
      title: string;
      type: string;
      url?: string;
      description: string;
      free: boolean;
    }>;
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

  // 验证语言数据完整性
  if (!baseLanguage.id || !baseLanguage.name || !baseLanguage.fsi || 
      baseLanguage.fsi.category === undefined || baseLanguage.fsi.hours === undefined) {
    console.warn(`Invalid language data for ID: ${id}`);
    return null;
  }

  const validCategory = baseLanguage.fsi.category; // 获取语言的FSI分类

  return {
    ...baseLanguage,
    // 格式化speakers数据为详细结构
    speakers: {
      native: formatSpeakerCount(calculateNativeSpeakers(baseLanguage.speakers, baseLanguage.id)), // 根据语言类型计算母语使用者
      total: formatSpeakerCount(baseLanguage.speakers),
      rank: calculateSpeakerRank(baseLanguage.speakers), // 根据使用人数计算排名
    },
    // 使用flagEmoji作为flag属性
    flag: baseLanguage.flagEmoji,
    geography: {
      primaryRegions: baseLanguage.regions.slice(0, 3),
      secondaryRegions: baseLanguage.regions.slice(3),
      continents: getLanguageContinents(baseLanguage.regions),
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
    // 使用真实的文化信息数据
    culture: getCultureInfo(id),
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
 * 根据语言类型计算母语使用者数量
 */
function calculateNativeSpeakers(totalSpeakers: number, languageId: string): number {
  // 不同语言的母语使用者比例不同
  const nativeRatios: { [key: string]: number } = {
    zh: 0.95, // 中文主要是母语使用者
    en: 0.25, // 英语很多是第二语言使用者
    es: 0.85, // 西班牙语主要是母语使用者
    hi: 0.9, // 印地语主要是母语使用者
    ar: 0.8, // 阿拉伯语主要是母语使用者
    pt: 0.85, // 葡萄牙语主要是母语使用者
    bn: 0.9, // 孟加拉语主要是母语使用者
    ru: 0.85, // 俄语主要是母语使用者
    ja: 0.95, // 日语主要是母语使用者
    pa: 0.9, // 旁遮普语主要是母语使用者
    de: 0.8, // 德语主要是母语使用者
    ko: 0.95, // 韩语主要是母语使用者
    fr: 0.6, // 法语很多是第二语言使用者
    tr: 0.9, // 土耳其语主要是母语使用者
    vi: 0.95, // 越南语主要是母语使用者
    it: 0.9, // 意大利语主要是母语使用者
    th: 0.95, // 泰语主要是母语使用者
    ur: 0.85, // 乌尔都语主要是母语使用者
    pl: 0.95, // 波兰语主要是母语使用者
    fa: 0.9, // 波斯语主要是母语使用者
  };

  const ratio = nativeRatios[languageId] || 0.8; // 默认80%
  return Math.floor(totalSpeakers * ratio);
}

/**
 * 根据使用人数计算全球排名
 */
function calculateSpeakerRank(speakers: number): number {
  // 更精确的排名计算
  if (speakers >= 1100000000) return 1; // 中文
  if (speakers >= 1300000000) return 1; // 英语
  if (speakers >= 500000000) return 3; // 西班牙语、印地语等
  if (speakers >= 300000000) return 4; // 阿拉伯语、孟加拉语等
  if (speakers >= 200000000) return 5; // 葡萄牙语、俄语等
  if (speakers >= 100000000) return 6; // 日语、德语等
  if (speakers >= 50000000) return 7; // 法语、意大利语等
  if (speakers >= 10000000) return 8; // 其他主要语言
  return 9; // 较小语言
}

/**
 * 根据地区列表推断大陆
 */
function getLanguageContinents(regions: string[]): string[] {
  // 更完整的地区-大陆映射
  const continentMap: { [key: string]: string } = {
    // 欧洲
    Spain: 'Europe',
    France: 'Europe',
    Germany: 'Europe',
    Italy: 'Europe',
    'United Kingdom': 'Europe',
    Poland: 'Europe',
    Romania: 'Europe',
    Netherlands: 'Europe',
    Sweden: 'Europe',
    Norway: 'Europe',
    Denmark: 'Europe',
    Finland: 'Europe',
    Greece: 'Europe',
    'Czech Republic': 'Europe',
    Slovakia: 'Europe',
    Croatia: 'Europe',
    Bulgaria: 'Europe',
    Latvia: 'Europe',
    Lithuania: 'Europe',
    Slovenia: 'Europe',
    Ukraine: 'Europe',
    Estonia: 'Europe',
    Hungary: 'Europe',
    Austria: 'Europe',
    Switzerland: 'Europe',
    Belgium: 'Europe',
    Portugal: 'Europe',
    Ireland: 'Europe',
    'San Marino': 'Europe',
    'Vatican City': 'Europe',
    Liechtenstein: 'Europe',
    Luxembourg: 'Europe',
    Andorra: 'Europe',
    Cyprus: 'Europe',
    Moldova: 'Europe',
    Belarus: 'Europe',
    Kazakhstan: 'Europe',
    Kyrgyzstan: 'Europe',
    Russia: 'Europe',

    // 亚洲
    China: 'Asia',
    Japan: 'Asia',
    'South Korea': 'Asia',
    'North Korea': 'Asia',
    India: 'Asia',
    Thailand: 'Asia',
    Vietnam: 'Asia',
    Indonesia: 'Asia',
    Malaysia: 'Asia',
    Singapore: 'Asia',
    Philippines: 'Asia',
    Taiwan: 'Asia',
    'Hong Kong': 'Asia',
    Macau: 'Asia',
    Bangladesh: 'Asia',
    Pakistan: 'Asia',
    'Sri Lanka': 'Asia',
    Mongolia: 'Asia',
    Turkey: 'Asia',
    Iran: 'Asia',
    Afghanistan: 'Asia',
    Tajikistan: 'Asia',
    Israel: 'Asia',
    'Saudi Arabia': 'Asia',
    Egypt: 'Asia',
    Iraq: 'Asia',
    Jordan: 'Asia',
    Lebanon: 'Asia',
    Syria: 'Asia',
    'United Arab Emirates': 'Asia',
    Brunei: 'Asia',

    // 北美洲
    'United States of America': 'North America',
    Canada: 'North America',
    Mexico: 'North America',

    // 南美洲
    Brazil: 'South America',
    Argentina: 'South America',
    Colombia: 'South America',
    Peru: 'South America',
    Venezuela: 'South America',
    Chile: 'South America',
    Ecuador: 'South America',
    Bolivia: 'South America',
    Paraguay: 'South America',
    Uruguay: 'South America',
    Guyana: 'South America',
    Suriname: 'South America',

    // 非洲
    Nigeria: 'Africa',
    'South Africa': 'Africa',
    Ethiopia: 'Africa',
    Tanzania: 'Africa',
    Kenya: 'Africa',
    Uganda: 'Africa',
    'Democratic Republic of the Congo': 'Africa',
    Algeria: 'Africa',
    Morocco: 'Africa',
    Tunisia: 'Africa',
    Senegal: 'Africa',
    'Ivory Coast': 'Africa',
    Angola: 'Africa',
    Mozambique: 'Africa',
    'Cape Verde': 'Africa',
    Namibia: 'Africa',
    Benin: 'Africa',
    Niger: 'Africa',

    // 大洋洲
    Australia: 'Oceania',
    'New Zealand': 'Oceania',
    Fiji: 'Oceania',
    'Papua New Guinea': 'Oceania',
  };

  const continents = regions
    .map((region) => continentMap[region])
    .filter(Boolean)
    .filter((continent, index, arr) => arr.indexOf(continent) === index);

  return continents.length > 0 ? continents : ['Unknown'];
}
