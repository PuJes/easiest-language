import Link from 'next/link';
import dynamic from 'next/dynamic';
import InternalLinks from '@/components/InternalLinks';

// Dynamic import of MVPDemo component for code splitting optimization
const MVPDemo = dynamic(() => import('@/components/MVPDemo'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />,
});

export const metadata = {
  title: 'Language Learning Guide - FSI Data for English Speakers | Easiest Language',
  description: 'Comprehensive guide to language learning difficulty based on official FSI standards. Discover the easiest languages to learn for English speakers with scientific data.',
  keywords: 'language learning guide,FSI language difficulty,English speakers,easiest languages,language study time,foreign language learning',
  openGraph: {
    title: 'Language Learning Guide - FSI Data for English Speakers',
    description: 'Comprehensive guide to language learning difficulty based on official FSI standards',
    url: 'https://easiestlanguage.site/home',
    siteName: 'Easiest Language to Learn',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Language Learning Guide - FSI Data for English Speakers',
    description: 'Comprehensive guide to language learning difficulty based on official FSI standards',
  },
};

export default function HomePage() {
  // Homepage structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Easiest Language to Learn",
    "description": "Discover the easiest languages to learn based on official FSI standards for English speakers",
    "url": "https://easiestlanguage.site",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://easiestlanguage.site/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Easiest Language to Learn",
      "url": "https://easiestlanguage.site"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Easiest Languages to Learn",
      "description": "Languages ranked by difficulty for English speakers based on FSI standards",
      "numberOfItems": 50,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Language",
            "name": "Spanish",
            "description": "FSI Category 1 - Easiest for English speakers"
          }
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "item": {
            "@type": "Language",
            "name": "French",
            "description": "FSI Category 1 - Easiest for English speakers"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Language", 
            "name": "German",
            "description": "FSI Category 2 - Relatively easy for English speakers"
          }
        }
      ]
    }
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
          </div>

          {/* Additional content section */}
          <div className="max-w-4xl mx-auto mb-16">
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What is FSI Language Difficulty Classification?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The FSI (Foreign Service Institute) language difficulty classification is the world's most authoritative 
                language learning difficulty assessment system. Based on the time required for native English speakers 
                to learn different languages, it categorizes languages into 5 difficulty levels.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This system was developed by the U.S. Department of State's Foreign Service Institute, which has been 
                training diplomats and government officials in foreign languages for over 70 years. The classification 
                is based on extensive research and real-world teaching experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Category I (600-750 hours)</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Easiest languages for English speakers</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Category II (900 hours)</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">Relatively easy languages</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Category III (1100 hours)</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">Moderately difficult languages</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Category IV-V (1800-2200 hours)</h3>
                  <p className="text-sm text-red-700 dark:text-red-300">Most challenging languages</p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                How to Choose the Right Language for You?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                When choosing a language to learn, consider multiple factors: learning time, personal interests, 
                career requirements, and cultural connections. Our platform provides the most accurate language 
                learning difficulty analysis based on FSI data.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">⏰</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Time Investment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Consider how much time you can dedicate to learning. FSI categories help you estimate 
                    the commitment required.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personal Goals</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Think about why you want to learn a language. Travel, work, family connections, 
                    or personal interest all matter.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🌍</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cultural Connection</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Languages with cultural connections to your background or interests are often 
                    easier to learn and maintain.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Trust Our Language Difficulty Analysis?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our platform is built on decades of research and real-world language teaching experience. 
                We combine official FSI data with modern learning insights to provide you with the most 
                accurate and up-to-date language difficulty assessments.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Based on official FSI data from the U.S. Department of State</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Updated with modern language learning research and methodologies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Comprehensive analysis of 50+ major world languages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Detailed breakdown of grammar, pronunciation, and cultural challenges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Personalized recommendations based on your learning goals</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Link href="/">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group h-64 flex flex-col border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🏠</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Landing Page</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center flex-grow leading-relaxed mb-4">
                  Interactive quiz and featured languages
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium text-sm rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/languages">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group h-64 flex flex-col border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📋</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Languages List</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center flex-grow leading-relaxed mb-4">
                  Browse all 50+ languages with FSI difficulty ratings
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium text-sm rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors duration-300">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/compare">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group h-64 flex flex-col border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">⚖️</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Comparison</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center flex-grow leading-relaxed mb-4">
                  Side-by-side language analysis with AI insights
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium text-sm rounded-full group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors duration-300">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          </div>

        </div>

        <MVPDemo />
        
        {/* 内部链接区域 */}
        <div className="mt-16">
          <InternalLinks 
            pageType="home"
            showLearningResources={true}
            showComparisonLinks={true}
            customTitle="Explore More Language Learning Resources"
          />
        </div>
      </div>
    </>
  );
}
