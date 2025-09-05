import { MetadataRoute } from 'next'
import { getAllLanguages } from '@/lib/data/data-adapters'

/**
 * 生成网站地图
 * 包含所有主要页面和语言详情页
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = getAllLanguages();
  const baseUrl = 'https://easiestlanguage.site'; // 您的实际域名
  
  // 语言详情页
  const languagePages = languages.map((lang) => ({
    url: `${baseUrl}/language/${lang.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 主要页面
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/languages`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  return [...mainPages, ...languagePages];
}
