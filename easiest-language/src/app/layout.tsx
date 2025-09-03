import type { Metadata } from 'next'; // 页面元数据类型
import Script from 'next/script'; // Next.js Script组件，用于优化脚本加载
import './globals.css'; // 全局样式（含 Tailwind v4）
import PerformanceMonitor from '@/components/PerformanceMonitor'; // 性能监控组件

export const metadata: Metadata = {
  title: {
    template: '%s | Easiest Language to Learn',
    default: 'Easiest Language to Learn - FSI Data Guide for English Speakers',
  },
  description:
    'Discover the easiest languages to learn based on official FSI standards. Compare 50+ languages with scientific difficulty ratings, learning time estimates, and personalized recommendations for English speakers.',
  keywords: [
    'easiest language to learn',
    'FSI difficulty ratings',
    'language learning for English speakers',
    'foreign language difficulty',
    'language learning time',
    'best language to learn',
    'FSI category',
    'language comparison',
    'language learning guide',
  ],
  authors: [{ name: 'Easiest Language Team' }],
  creator: 'Easiest Language to Learn',
  publisher: 'Easiest Language to Learn',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://easiestlanguage.site'), // 您的实际域名
  alternates: {
    canonical: '/',
  },
  // 添加icon配置
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico', // 明确指定shortcut icon
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Easiest Language to Learn - FSI Data Guide',
    description: 'Scientific data-driven language learning recommendations for English speakers',
    url: 'https://easiestlanguage.site',
    siteName: 'Easiest Language to Learn',
    images: [
      {
        url: '/og?type=homepage', // 动态生成首页OG图片
        width: 1200,
        height: 630,
        alt: 'Easiest Language to Learn - FSI Data Guide',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easiest Language to Learn - FSI Data Guide',
    description: 'Discover the easiest languages to learn with scientific FSI ratings',
    images: ['/og?type=homepage'],
    creator: '@easiestlanguage', // 您的Twitter账号
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // 请替换为您的Google Search Console验证码
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 字体预加载 - 优化字体加载性能 */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* DNS 预解析 - 提前解析外部域名 */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        {/* 关键资源预连接 */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className={`antialiased`}>
        {/* Google Analytics 代码 - 使用Next.js Script组件优化加载性能 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8W1P7Z2D9D"
          strategy="afterInteractive" // 在页面交互后加载，优化性能
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8W1P7Z2D9D');
          `}
        </Script>
        {children}
        {/* 性能监控组件 - 监控 Core Web Vitals */}
        <PerformanceMonitor />
      </body>
    </html>
  );
}
