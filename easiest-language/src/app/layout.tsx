import type { Metadata } from 'next'; // 页面元数据类型
import './globals.css'; // 全局样式（含 Tailwind v4）

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
