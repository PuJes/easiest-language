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
        {/* Additional content section */}
        <div className="max-w-4xl mx-auto mb-12">
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Why Compare Languages Before Learning?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choosing the right language to learn is a crucial decision that can impact your
              learning journey for years to come. By comparing languages based on official FSI
              difficulty ratings, you can make an informed decision that aligns with your goals,
              available time, and learning preferences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">⏰</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Time Investment
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compare study time requirements to choose a language that fits your schedule
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Learning Goals</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Match language difficulty with your learning objectives and career goals
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Global Impact</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consider speaker count and geographic distribution for maximum utility
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              How to Use This Language Comparison Tool
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Step 1: Select Languages
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Choose 2-3 languages you&apos;re considering learning. You can select from our
                  comprehensive database of 50+ languages with official FSI difficulty ratings.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Click &quot;Add Language to Compare&quot; button</li>
                  <li>Browse through available languages</li>
                  <li>Select up to 3 languages for comparison</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Step 2: Analyze Results
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Review the comparison across multiple dimensions including difficulty, study time,
                  speaker count, and business value.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Compare FSI difficulty categories</li>
                  <li>Analyze study time requirements</li>
                  <li>Consider global speaker distribution</li>
                  <li>Evaluate business and career opportunities</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

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
