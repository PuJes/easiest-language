'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GlobeAltIcon, 
  ChartBarIcon, 
  BookOpenIcon,
  AcademicCapIcon,
  LanguageIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Language } from '@/lib/types/language';
import { getAllLanguages } from '@/lib/data/data-adapters';

interface FooterLinksProps {
  /** Current language for context-aware recommendations */
  currentLanguage?: Language;
  /** Whether to show popular languages section */
  showPopularLanguages?: boolean;
  /** Whether to show difficulty categories section */
  showDifficultyCategories?: boolean;
  /** Whether to show language families section */
  showLanguageFamilies?: boolean;
  /** Whether to show learning resources section */
  showLearningResources?: boolean;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Footer Links Component
 * Provides comprehensive internal linking in footer area for better SEO
 */
const FooterLinks: React.FC<FooterLinksProps> = ({
  currentLanguage,
  showPopularLanguages = true,
  showDifficultyCategories = true,
  showLanguageFamilies = true,
  showLearningResources = true,
  className = '',
}) => {
  // Get all languages for recommendations
  const allLanguages = getAllLanguages();
  
  // Get popular languages (most speakers)
  const popularLanguages = allLanguages
    .sort((a, b) => b.speakers.total - a.speakers.total)
    .slice(0, 6);

  // Get languages by difficulty category
  const getLanguagesByCategory = (category: number) => 
    allLanguages.filter(lang => lang.fsi.category === category);

  // Get languages by family
  const getLanguagesByFamily = (family: string) =>
    allLanguages.filter(lang => lang.family.toLowerCase().includes(family.toLowerCase()));

  return (
    <footer className={`bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Popular Languages Section */}
          {showPopularLanguages && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5 text-blue-600" />
                Popular Languages
              </h3>
              <div className="space-y-2">
                {popularLanguages.map((lang) => (
                  <Link
                    key={lang.id}
                    href={`/language/${lang.id}`}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.flagEmoji}</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {lang.name}
                      </span>
                    </div>
                    <ArrowRightIcon className="h-3 w-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Difficulty Categories Section */}
          {showDifficultyCategories && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-green-600" />
                By Difficulty
              </h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((category) => {
                  const categoryLanguages = getLanguagesByCategory(category);
                  const categoryName = category === 1 ? 'Easiest' :
                                    category === 2 ? 'Relatively Easy' :
                                    category === 3 ? 'Moderately Difficult' :
                                    category === 4 ? 'Challenging' : 'Very Challenging';
                  
                  return (
                    <Link
                      key={category}
                      href="/languages"
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {category === 1 ? '🟢' : 
                           category === 2 ? '🟡' : 
                           category === 3 ? '🟠' : 
                           category === 4 ? '🔴' : '🔥'}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400">
                            Category {category}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {categoryLanguages.length} languages
                          </div>
                        </div>
                      </div>
                      <ArrowRightIcon className="h-3 w-3 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Language Families Section */}
          {showLanguageFamilies && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <LanguageIcon className="h-5 w-5 text-purple-600" />
                Language Families
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Romance', icon: '💕', family: 'romance' },
                  { name: 'Germanic', icon: '⚡', family: 'germanic' },
                  { name: 'Slavic', icon: '🌲', family: 'slavic' },
                  { name: 'Sino-Tibetan', icon: '🏮', family: 'sino-tibetan' },
                  { name: 'Afro-Asiatic', icon: '🕌', family: 'afro-asiatic' },
                ].map((family) => {
                  const familyLanguages = getLanguagesByFamily(family.family);
                  
                  return (
                    <Link
                      key={family.family}
                      href="/languages"
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{family.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                            {family.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {familyLanguages.length} languages
                          </div>
                        </div>
                      </div>
                      <ArrowRightIcon className="h-3 w-3 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Learning Resources Section */}
          {showLearningResources && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-orange-600" />
                Learning Resources
              </h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏠</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                      Language Quiz
                    </span>
                  </div>
                  <ArrowRightIcon className="h-3 w-3 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                </Link>
                
                <Link
                  href="/languages"
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📋</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                      All Languages
                    </span>
                  </div>
                  <ArrowRightIcon className="h-3 w-3 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                </Link>
                
                <Link
                  href="/compare"
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚖️</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                      Compare Languages
                    </span>
                  </div>
                  <ArrowRightIcon className="h-3 w-3 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                </Link>
                
                <Link
                  href="/compare?languages=spanish,french,german"
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇪🇺</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                      European Languages
                    </span>
                  </div>
                  <ArrowRightIcon className="h-3 w-3 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom section with copyright and additional links */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 Easiest Language to Learn. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="/privacy" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/contact" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLinks;
