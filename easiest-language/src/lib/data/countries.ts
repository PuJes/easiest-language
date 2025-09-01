import type { CountryLanguageMapping, CountryLanguageData, Language } from '../types';

/**
 * 国家到语言映射关系
 * 基于FSI语言数据建立的完整映射表
 */
export const COUNTRY_LANGUAGE_MAPPING: CountryLanguageMapping = {
  // 北美洲
  'United States of America': {
    primary: 'en', // English
    secondary: ['es'], // Spanish
    languages: ['en', 'es'],
    region: 'North America',
    difficulty_avg: 0,
  },

  Canada: {
    primary: 'en',
    secondary: ['fr'],
    languages: ['en', 'fr'],
    region: 'North America',
    difficulty_avg: 0,
  },

  Mexico: {
    primary: 'es',
    secondary: [],
    languages: ['es'],
    region: 'North America',
    difficulty_avg: 3,
  },

  // 南美洲
  Brazil: {
    primary: 'pt',
    secondary: [],
    languages: ['pt'],
    region: 'South America',
    difficulty_avg: 3,
  },

  Argentina: {
    primary: 'es',
    secondary: [],
    languages: ['es'],
    region: 'South America',
    difficulty_avg: 3,
  },

  Colombia: {
    primary: 'es',
    secondary: [],
    languages: ['es'],
    region: 'South America',
    difficulty_avg: 3,
  },

  Peru: {
    primary: 'es',
    secondary: [],
    languages: ['es'],
    region: 'South America',
    difficulty_avg: 3,
  },

  Venezuela: {
    primary: 'es',
    secondary: [],
    languages: ['es'],
    region: 'South America',
    difficulty_avg: 3,
  },

  Chile: {
    primary: 'es',
    secondary: [],
    languages: ['es'],
    region: 'South America',
    difficulty_avg: 3,
  },

  Ecuador: {
    primary: 'es',
    secondary: [],
    languages: ['es'],
    region: 'South America',
    difficulty_avg: 3,
  },

  // 欧洲
  Spain: {
    primary: 'es',
    secondary: ['ca'], // 加泰罗尼亚语
    languages: ['es', 'ca'],
    region: 'Europe',
    difficulty_avg: 3,
  },

  France: {
    primary: 'fr',
    secondary: [],
    languages: ['fr'],
    region: 'Europe',
    difficulty_avg: 4,
  },

  Italy: {
    primary: 'it',
    secondary: [],
    languages: ['it'],
    region: 'Europe',
    difficulty_avg: 3,
  },

  Portugal: {
    primary: 'pt',
    secondary: [],
    languages: ['pt'],
    region: 'Europe',
    difficulty_avg: 3,
  },

  Germany: {
    primary: 'de',
    secondary: [],
    languages: ['de'],
    region: 'Europe',
    difficulty_avg: 5,
  },

  Netherlands: {
    primary: 'nl',
    secondary: [],
    languages: ['nl'],
    region: 'Europe',
    difficulty_avg: 3,
  },

  Sweden: {
    primary: 'sv',
    secondary: [],
    languages: ['sv'],
    region: 'Europe',
    difficulty_avg: 3,
  },

  Norway: {
    primary: 'no',
    secondary: [],
    languages: ['no'],
    region: 'Europe',
    difficulty_avg: 3,
  },

  Poland: {
    primary: 'pl',
    secondary: [],
    languages: ['pl'],
    region: 'Europe',
    difficulty_avg: 6,
  },

  'Russian Federation': {
    primary: 'ru',
    secondary: [],
    languages: ['ru'],
    region: 'Europe/Asia',
    difficulty_avg: 6,
  },

  Romania: {
    primary: 'ro',
    secondary: [],
    languages: ['ro'],
    region: 'Europe',
    difficulty_avg: 4,
  },

  Turkey: {
    primary: 'tr',
    secondary: [],
    languages: ['tr'],
    region: 'Europe/Asia',
    difficulty_avg: 5,
  },

  Austria: {
    primary: 'de',
    secondary: [],
    languages: ['de'],
    region: 'Europe',
    difficulty_avg: 5,
  },

  Switzerland: {
    primary: 'de',
    secondary: ['fr', 'it'],
    languages: ['de', 'fr', 'it'],
    region: 'Europe',
    difficulty_avg: 4,
  },

  Belgium: {
    primary: 'nl',
    secondary: ['fr'],
    languages: ['nl', 'fr'],
    region: 'Europe',
    difficulty_avg: 3.5,
  },

  'United Kingdom': {
    primary: 'en',
    secondary: [],
    languages: ['en'],
    region: 'Europe',
    difficulty_avg: 0,
  },

  Ireland: {
    primary: 'en',
    secondary: [],
    languages: ['en'],
    region: 'Europe',
    difficulty_avg: 0,
  },

  // 亚洲
  China: {
    primary: 'zh',
    secondary: ['yue', 'mn'], // 添加蒙古语
    languages: ['zh', 'yue', 'mn'],
    region: 'Asia',
    difficulty_avg: 8.3, // 调整平均难度
  },

  Japan: {
    primary: 'ja',
    secondary: [],
    languages: ['ja'],
    region: 'Asia',
    difficulty_avg: 9,
  },

  'South Korea': {
    primary: 'ko',
    secondary: [],
    languages: ['ko'],
    region: 'Asia',
    difficulty_avg: 7,
  },

  India: {
    primary: 'hi',
    secondary: ['bn', 'en', 'ur', 'ta', 'te'], // 添加泰米尔语和泰卢固语
    languages: ['hi', 'bn', 'en', 'ur', 'ta', 'te'],
    region: 'Asia',
    difficulty_avg: 4, // 调整平均难度
  },

  Indonesia: {
    primary: 'id',
    secondary: [],
    languages: ['id'],
    region: 'Asia',
    difficulty_avg: 3,
  },

  Malaysia: {
    primary: 'ms',
    secondary: ['en'],
    languages: ['ms', 'en'],
    region: 'Asia',
    difficulty_avg: 1.5,
  },

  Thailand: {
    primary: 'th',
    secondary: [],
    languages: ['th'],
    region: 'Asia',
    difficulty_avg: 6,
  },

  Vietnam: {
    primary: 'vi',
    secondary: [],
    languages: ['vi'],
    region: 'Asia',
    difficulty_avg: 6,
  },

  Iran: {
    primary: 'fa',
    secondary: [],
    languages: ['fa'],
    region: 'Asia',
    difficulty_avg: 5,
  },

  Pakistan: {
    primary: 'ur',
    secondary: ['en'],
    languages: ['ur', 'en'],
    region: 'Asia',
    difficulty_avg: 3,
  },

  Bangladesh: {
    primary: 'bn',
    secondary: ['en'],
    languages: ['bn', 'en'],
    region: 'Asia',
    difficulty_avg: 2.5,
  },

  Israel: {
    primary: 'he',
    secondary: ['ar'],
    languages: ['he', 'ar'],
    region: 'Asia',
    difficulty_avg: 7,
  },

  Singapore: {
    primary: 'en',
    secondary: ['zh', 'ms', 'ta'], // 添加泰米尔语
    languages: ['en', 'zh', 'ms', 'ta'],
    region: 'Asia',
    difficulty_avg: 2.25, // 调整平均难度
  },

  Taiwan: {
    primary: 'zh',
    secondary: [],
    languages: ['zh'],
    region: 'Asia',
    difficulty_avg: 9,
  },

  'Hong Kong': {
    primary: 'yue',
    secondary: ['en', 'zh'],
    languages: ['yue', 'en', 'zh'],
    region: 'Asia',
    difficulty_avg: 6,
  },

  // 中东
  'Saudi Arabia': {
    primary: 'ar',
    secondary: [],
    languages: ['ar'],
    region: 'Middle East',
    difficulty_avg: 8,
  },

  Egypt: {
    primary: 'ar',
    secondary: [],
    languages: ['ar'],
    region: 'Middle East/Africa',
    difficulty_avg: 8,
  },

  Iraq: {
    primary: 'ar',
    secondary: [],
    languages: ['ar'],
    region: 'Middle East',
    difficulty_avg: 8,
  },

  Jordan: {
    primary: 'ar',
    secondary: [],
    languages: ['ar'],
    region: 'Middle East',
    difficulty_avg: 8,
  },

  Lebanon: {
    primary: 'ar',
    secondary: ['fr'],
    languages: ['ar', 'fr'],
    region: 'Middle East',
    difficulty_avg: 6,
  },

  Syria: {
    primary: 'ar',
    secondary: [],
    languages: ['ar'],
    region: 'Middle East',
    difficulty_avg: 8,
  },

  'United Arab Emirates': {
    primary: 'ar',
    secondary: ['en'],
    languages: ['ar', 'en'],
    region: 'Middle East',
    difficulty_avg: 4,
  },

  // 非洲
  Nigeria: {
    primary: 'en',
    secondary: ['hau', 'yo'], // 添加豪萨语和约鲁巴语
    languages: ['en', 'hau', 'yo'],
    region: 'Africa',
    difficulty_avg: 1.3, // 调整平均难度
  },

  'South Africa': {
    primary: 'en',
    secondary: ['af', 'zu'], // 南非荷兰语和祖鲁语
    languages: ['en', 'af', 'zu'],
    region: 'Africa',
    difficulty_avg: 1.3, // 调整平均难度
  },

  Tanzania: {
    primary: 'sw',
    secondary: ['en'],
    languages: ['sw', 'en'],
    region: 'Africa',
    difficulty_avg: 2,
  },

  Kenya: {
    primary: 'sw',
    secondary: ['en'],
    languages: ['sw', 'en'],
    region: 'Africa',
    difficulty_avg: 2,
  },

  Uganda: {
    primary: 'en',
    secondary: ['sw'],
    languages: ['en', 'sw'],
    region: 'Africa',
    difficulty_avg: 0,
  },

  Algeria: {
    primary: 'ar',
    secondary: ['fr'],
    languages: ['ar', 'fr'],
    region: 'Africa',
    difficulty_avg: 6,
  },

  Morocco: {
    primary: 'ar',
    secondary: ['fr'],
    languages: ['ar', 'fr'],
    region: 'Africa',
    difficulty_avg: 6,
  },

  Tunisia: {
    primary: 'ar',
    secondary: ['fr'],
    languages: ['ar', 'fr'],
    region: 'Africa',
    difficulty_avg: 6,
  },

  Senegal: {
    primary: 'fr',
    secondary: [],
    languages: ['fr'],
    region: 'Africa',
    difficulty_avg: 4,
  },

  'Ivory Coast': {
    primary: 'fr',
    secondary: [],
    languages: ['fr'],
    region: 'Africa',
    difficulty_avg: 4,
  },

  'Democratic Republic of the Congo': {
    primary: 'fr',
    secondary: ['sw'],
    languages: ['fr', 'sw'],
    region: 'Africa',
    difficulty_avg: 4,
  },

  Angola: {
    primary: 'pt',
    secondary: [],
    languages: ['pt'],
    region: 'Africa',
    difficulty_avg: 3,
  },

  Mozambique: {
    primary: 'pt',
    secondary: [],
    languages: ['pt'],
    region: 'Africa',
    difficulty_avg: 3,
  },

  // 大洋洲
  Australia: {
    primary: 'en',
    secondary: [],
    languages: ['en'],
    region: 'Oceania',
    difficulty_avg: 0,
  },

  'New Zealand': {
    primary: 'en',
    secondary: [],
    languages: ['en'],
    region: 'Oceania',
    difficulty_avg: 0,
  },

  // 其他
  Kazakhstan: {
    primary: 'ru',
    secondary: [],
    languages: ['ru'],
    region: 'Asia',
    difficulty_avg: 6,
  },

  Belarus: {
    primary: 'ru',
    secondary: [],
    languages: ['ru'],
    region: 'Europe',
    difficulty_avg: 6,
  },

  Kyrgyzstan: {
    primary: 'ru',
    secondary: [],
    languages: ['ru'],
    region: 'Asia',
    difficulty_avg: 6,
  },

  Moldova: {
    primary: 'ro',
    secondary: ['ru'],
    languages: ['ro', 'ru'],
    region: 'Europe',
    difficulty_avg: 5,
  },

  Cyprus: {
    primary: 'el', // 希腊语是主要语言
    secondary: ['tr', 'en'], // 土耳其语和英语
    languages: ['el', 'tr', 'en'],
    region: 'Europe',
    difficulty_avg: 3.7, // 调整平均难度
  },

  Finland: {
    primary: 'fi', // 芬兰语是主要语言
    secondary: ['sv'], // 瑞典语是官方语言
    languages: ['fi', 'sv'],
    region: 'Europe',
    difficulty_avg: 3.5, // 调整平均难度
  },

  Luxembourg: {
    primary: 'de',
    secondary: ['fr'],
    languages: ['de', 'fr'],
    region: 'Europe',
    difficulty_avg: 4.5,
  },

  Liechtenstein: {
    primary: 'de',
    secondary: [],
    languages: ['de'],
    region: 'Europe',
    difficulty_avg: 5,
  },

  'San Marino': {
    primary: 'it',
    secondary: [],
    languages: ['it'],
    region: 'Europe',
    difficulty_avg: 3,
  },

  'Vatican City': {
    primary: 'it',
    secondary: [],
    languages: ['it'],
    region: 'Europe',
    difficulty_avg: 3,
  },

  Suriname: {
    primary: 'nl',
    secondary: [],
    languages: ['nl'],
    region: 'South America',
    difficulty_avg: 3,
  },

  Brunei: {
    primary: 'ms',
    secondary: ['en'],
    languages: ['ms', 'en'],
    region: 'Asia',
    difficulty_avg: 1.5,
  },

  Afghanistan: {
    primary: 'fa',
    secondary: [],
    languages: ['fa'],
    region: 'Asia',
    difficulty_avg: 5,
  },

  Tajikistan: {
    primary: 'fa',
    secondary: ['ru'],
    languages: ['fa', 'ru'],
    region: 'Asia',
    difficulty_avg: 5.5,
  },

  Cuba: {
    primary: 'es',
    secondary: [],
    languages: ['es'],
    region: 'North America',
    difficulty_avg: 3,
  },

  Guatemala: {
    primary: 'es',
    secondary: [],
    languages: ['es'],
    region: 'North America',
    difficulty_avg: 3,
  },

  'Cape Verde': {
    primary: 'pt',
    secondary: [],
    languages: ['pt'],
    region: 'Africa',
    difficulty_avg: 3,
  },

  Macau: {
    primary: 'yue',
    secondary: ['zh', 'pt'],
    languages: ['yue', 'zh', 'pt'],
    region: 'Asia',
    difficulty_avg: 7,
  },

  'North Korea': {
    primary: 'ko',
    secondary: [],
    languages: ['ko'],
    region: 'Asia',
    difficulty_avg: 7,
  },

  // === 补充的新国家 ===

  // 欧洲新增国家
  Andorra: {
    primary: 'ca',
    secondary: ['es', 'fr'],
    languages: ['ca', 'es', 'fr'],
    region: 'Europe',
    difficulty_avg: 3.3,
  },

  Denmark: {
    primary: 'da',
    secondary: [],
    languages: ['da'],
    region: 'Europe',
    difficulty_avg: 3,
  },

  Hungary: {
    primary: 'hu',
    secondary: [],
    languages: ['hu'],
    region: 'Europe',
    difficulty_avg: 5,
  },

  Estonia: {
    primary: 'et',
    secondary: [],
    languages: ['et'],
    region: 'Europe',
    difficulty_avg: 4,
  },

  Greece: {
    primary: 'el',
    secondary: [],
    languages: ['el'],
    region: 'Europe',
    difficulty_avg: 5,
  },

  'Czech Republic': {
    primary: 'cs',
    secondary: [],
    languages: ['cs'],
    region: 'Europe',
    difficulty_avg: 6,
  },

  Slovakia: {
    primary: 'sk',
    secondary: [],
    languages: ['sk'],
    region: 'Europe',
    difficulty_avg: 6,
  },

  Croatia: {
    primary: 'hr',
    secondary: [],
    languages: ['hr'],
    region: 'Europe',
    difficulty_avg: 6,
  },

  Bulgaria: {
    primary: 'bg',
    secondary: [],
    languages: ['bg'],
    region: 'Europe',
    difficulty_avg: 6,
  },

  Latvia: {
    primary: 'lv',
    secondary: [],
    languages: ['lv'],
    region: 'Europe',
    difficulty_avg: 5,
  },

  Lithuania: {
    primary: 'lt',
    secondary: [],
    languages: ['lt'],
    region: 'Europe',
    difficulty_avg: 6,
  },

  Slovenia: {
    primary: 'sl',
    secondary: [],
    languages: ['sl'],
    region: 'Europe',
    difficulty_avg: 6,
  },

  Ukraine: {
    primary: 'uk',
    secondary: [],
    languages: ['uk'],
    region: 'Europe',
    difficulty_avg: 6,
  },

  // 亚洲新增国家
  Mongolia: {
    primary: 'mn',
    secondary: [],
    languages: ['mn'],
    region: 'Asia',
    difficulty_avg: 5,
  },

  'Sri Lanka': {
    primary: 'ta',
    secondary: ['en'],
    languages: ['ta', 'en'],
    region: 'Asia',
    difficulty_avg: 3,
  },

  // 非洲新增国家
  Ethiopia: {
    primary: 'am',
    secondary: [],
    languages: ['am'],
    region: 'Africa',
    difficulty_avg: 6,
  },

  Niger: {
    primary: 'hau',
    secondary: ['fr'],
    languages: ['hau', 'fr'],
    region: 'Africa',
    difficulty_avg: 4,
  },

  Benin: {
    primary: 'fr',
    secondary: ['yo'],
    languages: ['fr', 'yo'],
    region: 'Africa',
    difficulty_avg: 4,
  },

  Namibia: {
    primary: 'af',
    secondary: ['en'],
    languages: ['af', 'en'],
    region: 'Africa',
    difficulty_avg: 1.5,
  },
};

/**
 * 根据FSI难度计算国家颜色
 */
export function getCountryColor(countryName: string): string {
  const countryData = COUNTRY_LANGUAGE_MAPPING[countryName];
  if (!countryData) {
    return '#94a3b8'; // 默认灰色
  }

  const avgDifficulty = countryData.difficulty_avg;

  // FSI 难度配色方案
  if (avgDifficulty === 0) return '#6c757d'; // 英语母语 - 灰色
  if (avgDifficulty <= 3) return '#28a745'; // Category I - 绿色 (容易)
  if (avgDifficulty <= 4) return '#ffc107'; // Category II - 黄色 (相对容易)
  if (avgDifficulty <= 6) return '#fd7e14'; // Category III - 橙色 (中等)
  if (avgDifficulty <= 7) return '#dc3545'; // Category IV - 红色 (困难)
  if (avgDifficulty <= 9) return '#6f42c1'; // Category V - 紫色 (最困难)

  return '#94a3b8'; // 默认
}

/**
 * 获取国家的详细语言信息
 */
export function getCountryLanguageInfo(
  countryName: string,
  languageData: { languages: Language[] }
): (Omit<CountryLanguageData, 'languages'> & { languages: Language[] }) | null {
  const countryData = COUNTRY_LANGUAGE_MAPPING[countryName];
  if (!countryData) return null;

  const languages = countryData.languages
    .map((langId) => {
      return languageData.languages.find((lang) => lang.id === langId);
    })
    .filter((lang): lang is Language => Boolean(lang));

  return {
    ...countryData,
    languages: languages,
  };
}

export default COUNTRY_LANGUAGE_MAPPING;
