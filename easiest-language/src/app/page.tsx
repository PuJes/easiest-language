import Link from 'next/link';
import MVPDemo from '@/components/MVPDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            🌍 Easiest Languages to Learn
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Discover the best language learning path based on FSI difficulty ratings for English
            speakers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <Link href="/home">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Homepage</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Hero section with FSI quiz and featured languages
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">
                  Explore →
                </div>
              </div>
            </Link>

            <Link href="/languages">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Languages List
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Browse all 50+ languages with FSI difficulty ratings
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">
                  Explore →
                </div>
              </div>
            </Link>

            <Link href="/language/spanish">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Language Detail
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Comprehensive language info with radar charts
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">
                  Explore →
                </div>
              </div>
            </Link>

            <Link href="/compare">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Comparison</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Side-by-side language analysis with AI insights
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">
                  Explore →
                </div>
              </div>
            </Link>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Languages Preview
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get a quick preview of our language difficulty analysis. Visit the Languages List for
              the complete collection.
            </p>
          </div>
        </div>

        <MVPDemo />
      </div>
    </div>
  );
}
