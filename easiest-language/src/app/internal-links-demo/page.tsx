import InternalLinksDemo from '@/components/InternalLinksDemo';
import { getLanguageDetailData } from '@/lib/data/data-adapters';

export const metadata = {
  title: 'Internal Links Demo - Enhanced SEO Components',
  description: 'Demonstration of breadcrumb navigation, footer links, and tag cloud components for improved internal linking and SEO.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalLinksDemoPage() {
  // Get a sample language for demonstration
  const sampleLanguage = getLanguageDetailData('spanish');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Internal Links Enhancement Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Demonstration of three new internal linking components designed to improve SEO and user experience
          </p>
        </div>

        <InternalLinksDemo
          currentLanguage={sampleLanguage}
          pageType="language-detail"
          showAll={true}
        />

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Implementation Guide
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              These components are designed to be easily integrated into your existing pages. 
              Each component is self-contained and can be used independently or together.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Key Features:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>BreadcrumbNavigation</strong> - Hierarchical navigation with internal links</li>
              <li><strong>FooterLinks</strong> - Comprehensive footer linking for better SEO</li>
              <li><strong>TagCloud</strong> - Tag-based navigation with filtering capabilities</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
              SEO Benefits:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Increases internal link count from ~15 to 50+ links</li>
              <li>Improves page hierarchy and navigation structure</li>
              <li>Enhances content discoverability through multiple pathways</li>
              <li>Provides contextual and relevant internal linking</li>
            </ul>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> This is a demo page. In production, integrate these components 
                into your actual pages following the examples in the README-InternalLinks.md file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
