import { MetadataRoute } from 'next';

/**
 * 生成robots.txt文件
 * 控制搜索引擎爬虫的访问权限
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/', // 允许访问根目录
          '/_next/static/', // 允许所有Next.js静态资源
        ],
        disallow: [
          '/admin/', // 禁止访问管理页面
          '/api/', // 禁止访问API路由
          '/static/', // 禁止访问静态文件目录
        ],
      },
      {
        userAgent: 'GPTBot', // 禁止ChatGPT爬虫
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // 禁止ChatGPT用户代理
        disallow: '/',
      },
      {
        userAgent: 'CCBot', // 禁止Common Crawl
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai', // 禁止Anthropic AI
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web', // 禁止Claude Web
        disallow: '/',
      },
    ],
    sitemap: 'https://easiestlanguage.site/sitemap.xml', // 您的实际域名
    host: 'https://easiestlanguage.site', // 您的实际域名
  };
}
