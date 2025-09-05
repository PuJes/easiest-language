import LanguageList from '@/components/LanguageList';
import InternalLinks from '@/components/InternalLinks';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { generateBreadcrumbs } from '@/lib/utils/breadcrumb-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Languages - Complete Language Database | FSI Difficulty Ratings',
  description: 'Explore all 50+ languages with official FSI difficulty ratings for English speakers. Compare learning time, difficulty levels, and find your perfect language to learn.',
  keywords: [
    'all languages',
    'language database',
    'FSI difficulty ratings',
    'language comparison',
    'easiest languages to learn',
    'language learning guide',
    'foreign language difficulty',
    'language learning time'
  ],
  openGraph: {
    title: 'All Languages - Complete Language Database',
    description: 'Explore all 50+ languages with official FSI difficulty ratings for English speakers.',
    url: 'https://easiestlanguage.site/languages',
    siteName: 'Easiest Language to Learn',
    images: [
      {
        url: '/og?type=languages',
        width: 1200,
        height: 630,
        alt: 'All Languages - Complete Language Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Languages - Complete Language Database',
    description: 'Explore all 50+ languages with official FSI difficulty ratings for English speakers.',
    images: ['/og?type=languages'],
  },
  alternates: {
    canonical: '/languages',
  },
};

export default function LanguagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb Navigation with integrated back button */}
          <BreadcrumbNavigation 
            items={generateBreadcrumbs.languages()} 
            showBackButton={true}
            backButtonLabel="Back to Home"
            backButtonHref="/home"
          />
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Complete Language Database</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Explore all 50+ languages with FSI difficulty ratings optimized for English speakers
          </p>
        </div>

        {/* Additional content section */}
        <div className="max-w-4xl mx-auto mb-16">
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding FSI Language Difficulty Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The Foreign Service Institute (FSI) has classified languages into 5 categories based on the time 
              required for native English speakers to achieve professional working proficiency. This classification 
              is based on decades of research and real-world teaching experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">Category I</div>
                <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">600-750 hours</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Easiest for English speakers</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">Category II</div>
                <div className="text-sm text-green-700 dark:text-green-300 mb-2">900 hours</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Relatively easy</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">Category III</div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">1100 hours</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Moderately difficult</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">Category IV</div>
                <div className="text-sm text-orange-700 dark:text-orange-300 mb-2">1800 hours</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Challenging</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">Category V</div>
                <div className="text-sm text-red-700 dark:text-red-300 mb-2">2200 hours</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Most challenging</div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              How to Choose the Right Language for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Consider Your Goals</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>Career advancement and business opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>Travel and cultural exploration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>Personal interest and heritage connection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>Academic or research requirements</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Evaluate Your Resources</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Available study time per week</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Access to learning resources and materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Opportunities for practice and immersion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Budget for courses, books, and tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Language Learning Tips and Strategies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Consistent Practice</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Regular daily practice, even for just 15-30 minutes, is more effective than 
                  occasional long study sessions.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎧</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Immerse Yourself</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Listen to music, watch movies, and read books in your target language to 
                  improve comprehension and cultural understanding.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Practice Speaking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Find language exchange partners or join conversation groups to practice 
                  speaking and build confidence.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Language List */}
        <LanguageList />
        
        {/* 内部链接区域 */}
        <div className="mt-16">
          <InternalLinks 
            pageType="languages"
            showLearningResources={true}
            showComparisonLinks={true}
            customTitle="More Language Learning Resources"
          />
        </div>
      </div>
    </div>
  );
}
