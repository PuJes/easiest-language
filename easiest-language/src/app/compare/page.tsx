import { Suspense } from 'react';
import LanguageComparison from '@/components/LanguageComparison';
import InternalLinks from '@/components/InternalLinks';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { generateBreadcrumbs } from '@/lib/utils/breadcrumb-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Difficulty Comparison | Easiest Language',
  description:
    'Compare different languages side-by-side for learning difficulty, time estimates, and characteristics. Based on official FSI data to help you choose the best language learning path.',
  keywords: [
    'language comparison',
    'language difficulty comparison',
    'FSI language comparison',
    'easiest languages to learn',
    'language learning time',
    'language difficulty analysis',
  ],
  openGraph: {
    title: 'Language Difficulty Comparison | Easiest Language',
    description:
      'Compare different languages side-by-side for learning difficulty, time estimates, and characteristics. Based on official FSI data to help you choose the best language learning path.',
    url: 'https://easiestlanguage.site/compare',
    siteName: 'Easiest Language to Learn',
    images: [
      {
        url: '/og?type=compare',
        width: 1200,
        height: 630,
        alt: 'Language Learning Difficulty Comparison',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Language Difficulty Comparison | Easiest Language',
    description:
      'Compare different languages side-by-side for learning difficulty, time estimates, and characteristics. Based on official FSI data to help you choose the best language learning path.',
    images: ['/og?type=compare'],
  },
  alternates: {
    canonical: '/compare',
  },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 页面标题 */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb Navigation with integrated back button */}
          <BreadcrumbNavigation
            items={generateBreadcrumbs.compare()}
            showBackButton={true}
            backButtonLabel="Back to Home"
            backButtonHref="/home"
          />

          <div className="text-center mt-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Language Learning Difficulty Comparison
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Compare different languages side-by-side for learning difficulty, time estimates, and
              characteristics based on official FSI data to help you choose the best language
              learning path
            </p>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageComparison />
        </Suspense>

        {/* 内部链接区域 */}
        <div className="mt-16">
          <InternalLinks
            pageType="compare"
            showLearningResources={true}
            showComparisonLinks={true}
            customTitle="More Language Comparisons and Learning Resources"
          />
        </div>
      </div>
    </div>
  );
}
