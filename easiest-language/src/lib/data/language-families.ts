import type { Language } from '../types';
import { FSI_LANGUAGE_DATA } from './languages';

/**
 * 语言家族分类信息
 */
export interface LanguageFamily {
  /** 家族ID */
  id: string;
  /** 家族英文名称 */
  name: string;
  /** 家族中文名称 */
  nameZh: string;
  /** 家族描述 */
  description: string;
  /** 子家族列表 */
  subfamilies: string[];
  /** 家族内语言数量 */
  languageCount: number;
  /** 家族平均难度 */
  averageDifficulty: number;
  /** 家族代表性语言ID列表 */
  representativeLanguages: string[];
  /** 家族地理分布 */
  regions: string[];
}

/**
 * 完整的语言家族数据
 */
export const LANGUAGE_FAMILIES: LanguageFamily[] = [
  {
    id: 'indo-european',
    name: 'Indo-European',
    nameZh: '印欧语系',
    description: '世界上分布最广、使用人数最多的语系，包括欧洲大部分语言和南亚部分语言',
    subfamilies: ['Romance', 'Germanic', 'Slavic', 'Indo-Aryan', 'Iranian', 'Hellenic', 'Baltic'],
    languageCount: 0, // 将由计算函数填充
    averageDifficulty: 0, // 将由计算函数填充
    representativeLanguages: ['en', 'es', 'fr', 'de', 'ru', 'hi'],
    regions: ['Europe', 'South Asia', 'North America', 'South America'],
  },
  {
    id: 'sino-tibetan',
    name: 'Sino-Tibetan',
    nameZh: '汉藏语系',
    description: '世界第二大语系，主要包括汉语和藏缅语族',
    subfamilies: ['Sinitic'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['zh', 'yue'],
    regions: ['East Asia'],
  },
  {
    id: 'afro-asiatic',
    name: 'Afro-Asiatic',
    nameZh: '亚非语系',
    description: '主要分布在北非和西亚的语系，包括闪族语言和含族语言',
    subfamilies: ['Semitic', 'Chadic'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['ar', 'he', 'am', 'hau'],
    regions: ['Middle East', 'Africa'],
  },
  {
    id: 'niger-congo',
    name: 'Niger-Congo',
    nameZh: '尼日尔-刚果语系',
    description: '非洲最大的语系，包括班图语族和众多西非语言',
    subfamilies: ['Bantu', 'Volta-Niger'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['sw', 'yo', 'zu'],
    regions: ['Africa'],
  },
  {
    id: 'austronesian',
    name: 'Austronesian',
    nameZh: '南岛语系',
    description: '主要分布在东南亚岛屿和太平洋地区的语系',
    subfamilies: ['Malayo-Polynesian'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['id', 'ms'],
    regions: ['Southeast Asia', 'Oceania'],
  },
  {
    id: 'japonic',
    name: 'Japonic',
    nameZh: '日本语系',
    description: '主要包括日语的独立语系',
    subfamilies: ['Japanese'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['ja'],
    regions: ['East Asia'],
  },
  {
    id: 'koreanic',
    name: 'Koreanic',
    nameZh: '朝鲜语系',
    description: '主要包括朝鲜语/韩语的独立语系',
    subfamilies: ['Korean'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['ko'],
    regions: ['East Asia'],
  },
  {
    id: 'turkic',
    name: 'Turkic',
    nameZh: '突厥语系',
    description: '分布在中亚、西亚和东欧的语系',
    subfamilies: ['Southwestern'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['tr'],
    regions: ['Asia', 'Europe'],
  },
  {
    id: 'uralic',
    name: 'Uralic',
    nameZh: '乌拉尔语系',
    description: '主要分布在北欧和东欧的语系',
    subfamilies: ['Finnic', 'Ugric'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['fi', 'hu', 'et'],
    regions: ['Europe'],
  },
  {
    id: 'dravidian',
    name: 'Dravidian',
    nameZh: '达罗毗荼语系',
    description: '主要分布在南印度的语系',
    subfamilies: ['Southern', 'South-Central'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['ta', 'te'],
    regions: ['South Asia'],
  },
  {
    id: 'mongolic',
    name: 'Mongolic',
    nameZh: '蒙古语系',
    description: '主要包括蒙古语族的语系',
    subfamilies: ['Mongolic'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['mn'],
    regions: ['Asia'],
  },
  {
    id: 'kra-dai',
    name: 'Kra-Dai',
    nameZh: '壮侗语系',
    description: '主要分布在东南亚大陆的语系',
    subfamilies: ['Tai'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['th'],
    regions: ['Southeast Asia'],
  },
  {
    id: 'austroasiatic',
    name: 'Austroasiatic',
    nameZh: '南亚语系',
    description: '主要分布在东南亚大陆的语系',
    subfamilies: ['Vietic'],
    languageCount: 0,
    averageDifficulty: 0,
    representativeLanguages: ['vi'],
    regions: ['Southeast Asia'],
  },
];

/**
 * 根据语言数据计算语言家族统计信息
 */
export function calculateLanguageFamilyStats(): LanguageFamily[] {
  const languages = FSI_LANGUAGE_DATA.languages;

  return LANGUAGE_FAMILIES.map((family) => {
    // 查找属于该家族的语言
    const familyLanguages = languages.filter(
      (lang) => lang.family.toLowerCase().replace(/[^a-z]/g, '-') === family.id
    );

    // 计算平均难度
    const averageDifficulty =
      familyLanguages.length > 0
        ? familyLanguages.reduce((sum, lang) => sum + lang.difficulty.overall, 0) /
          familyLanguages.length
        : 0;

    return {
      ...family,
      languageCount: familyLanguages.length,
      averageDifficulty: Math.round(averageDifficulty * 10) / 10, // 保留一位小数
    };
  });
}

/**
 * 获取指定家族的所有语言
 */
export function getLanguagesByFamily(familyId: string): Language[] {
  const languages = FSI_LANGUAGE_DATA.languages;
  const family = LANGUAGE_FAMILIES.find((f) => f.id === familyId);

  if (!family) return [];

  return languages.filter((lang) => lang.family.toLowerCase().replace(/[^a-z]/g, '-') === familyId);
}

/**
 * 根据难度排序的语言家族
 */
export function getLanguageFamiliesByDifficulty(): LanguageFamily[] {
  const familiesWithStats = calculateLanguageFamilyStats();
  return familiesWithStats
    .filter((f) => f.languageCount > 0)
    .sort((a, b) => a.averageDifficulty - b.averageDifficulty);
}

/**
 * 语言家族颜色映射（用于UI显示）
 */
export const FAMILY_COLORS: Record<string, string> = {
  'indo-european': '#3b82f6', // 蓝色 - 最大语系
  'sino-tibetan': '#ef4444', // 红色 - 汉语系
  'afro-asiatic': '#f59e0b', // 橙色 - 亚非语系
  'niger-congo': '#10b981', // 绿色 - 尼日尔-刚果语系
  austronesian: '#8b5cf6', // 紫色 - 南岛语系
  japonic: '#e11d48', // 玫红色 - 日语系
  koreanic: '#06b6d4', // 青色 - 朝鲜语系
  turkic: '#84cc16', // 青绿色 - 突厥语系
  uralic: '#6366f1', // 靛蓝色 - 乌拉尔语系
  dravidian: '#d946ef', // 品红色 - 达罗毗荼语系
  mongolic: '#f97316', // 橙红色 - 蒙古语系
  'kra-dai': '#14b8a6', // 蓝绿色 - 壮侗语系
  austroasiatic: '#a855f7', // 紫罗兰色 - 南亚语系
};

/**
 * 获取语言家族的颜色
 */
export function getFamilyColor(familyId: string): string {
  return FAMILY_COLORS[familyId] || '#6b7280'; // 默认灰色
}

export default LANGUAGE_FAMILIES;
