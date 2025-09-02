/**
 * 文化信息数据
 * 为主要语言提供真实的文化背景信息
 *
 * 数据结构说明：
 * - overview: 文化概述
 * - businessUse: 商务用途描述
 * - entertainment: 娱乐文化形式
 * - cuisine: 饮食文化特色
 */

export interface CultureInfo {
  overview: string;
  businessUse: string;
  entertainment: string[];
  cuisine: string[];
  culturalInfo?: {
    businessUse: number;
    travelValue: number;
    culturalRichness: number;
    onlinePresence: number;
  };
}

/**
 * 主要语言的文化信息数据
 * 按语言ID索引，包含真实的文化内容
 *
 * ⚠️ 此文件由数据管理系统自动生成，请勿手动编辑
 * 最后更新时间: 2025-09-02T09:08:11.644Z
 */
export const CULTURE_DATA: Record<string, CultureInfo> = {
  test: {
    overview: '这是一个测试语言的文化概述',
    businessUse: '这是一个测试语言的商务用途描述',
    entertainment: ['测试音乐', '测试电影'],
    cuisine: ['测试美食', '测试饮品'],
  },
  es: {
    overview: 'Spanish is a fascinating language with rich cultural heritage...',
    businessUse: 'Spanish is valuable for international business...',
    entertainment: ['Flamenco', 'Spanish Cinema', 'Bullfighting'],
    cuisine: ['Paella', 'Tapas', 'Gazpacho'],
    culturalInfo: {
      businessUse: 4,
      travelValue: 5,
      culturalRichness: 5,
      onlinePresence: 4,
    },
  },
};

/**
 * 获取指定语言的文化信息
 * @param languageId 语言ID
 * @returns 文化信息对象，如果不存在则返回默认值
 */
export function getCultureInfo(languageId: string): CultureInfo {
  return (
    CULTURE_DATA[languageId] || {
      overview: `${languageId} is a fascinating language with unique cultural characteristics. Learning it opens doors to new perspectives and cultural experiences.`,
      businessUse: `${languageId} can be valuable for international business, especially in regions where it's widely spoken.`,
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
    }
  );
}

/**
 * 检查指定语言是否有自定义文化信息
 * @param languageId 语言ID
 * @returns 是否有自定义文化信息
 */
export function hasCustomCultureInfo(languageId: string): boolean {
  return languageId in CULTURE_DATA;
}

/**
 * 获取所有有自定义文化信息的语言ID列表
 * @returns 语言ID数组
 */
export function getLanguagesWithCustomCulture(): string[] {
  return Object.keys(CULTURE_DATA);
}
