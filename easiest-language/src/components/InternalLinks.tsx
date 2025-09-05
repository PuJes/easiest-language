'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpenIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import { Language } from '@/lib/types/language';

// 辅助函数：验证语言数据完整性
function validateLanguageData(language: Language): boolean {
  return !!(
    language &&
    language.id &&
    language.name &&
    language.fsi &&
    language.fsi.category !== undefined &&
    language.fsi.hours !== undefined &&
    language.family &&
    language.subfamily &&
    language.writingSystem &&
    language.flagEmoji
  );
}

interface InternalLinksProps {
  /** 当前语言对象，用于推荐相关语言 */
  currentLanguage?: Language;
  /** 相关语言列表，基于语言家族、难度等级等推荐 */
  relatedLanguages?: Language[];
  /** 页面类型，用于显示不同的链接组合 */
  pageType?: 'language-detail' | 'compare' | 'languages' | 'home';
  /** 是否显示学习资源链接 */
  showLearningResources?: boolean;
  /** 是否显示比较功能链接 */
  showComparisonLinks?: boolean;
  /** 自定义标题 */
  customTitle?: string;
  /** 是否显示热门语言链接 */
  showPopularLanguages?: boolean;
}

/**
 * 内部链接组件 - 用于提升SEO和用户体验
 * 提供相关语言推荐、学习资源链接、页面导航等功能
 */
const InternalLinks: React.FC<InternalLinksProps> = ({
  currentLanguage,
  relatedLanguages = [],
  pageType = 'language-detail',
  showLearningResources = true,
  showComparisonLinks = true,
  showPopularLanguages = true,
  customTitle,
}) => {
  // 根据页面类型生成不同的链接内容
  const getPageSpecificLinks = () => {
    switch (pageType) {
      case 'language-detail':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <LanguageIcon className="h-5 w-5 text-blue-600" />
              Related Languages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedLanguages
                .filter(lang => validateLanguageData(lang)) // 过滤掉无效的语言数据
                .slice(0, 6)
                .map((lang) => (
                <Link
                  key={lang.id}
                  href={`/language/${lang.id}`}
                  className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flagEmoji}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {lang.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        FSI Category {lang.fsi.category} • {lang.fsi.hours} hours
                      </div>
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        );

      case 'compare':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-green-600" />
              Popular Language Comparisons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/compare?languages=spanish,french"
                className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇪🇸🇫🇷</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                      Spanish vs French
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Two easiest languages to learn
                    </div>
                  </div>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              </Link>

              <Link
                href="/compare?languages=german,italian"
                className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇩🇪🇮🇹</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                      German vs Italian
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      European language difficulty comparison
                    </div>
                  </div>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              </Link>

              <Link
                href="/compare?languages=chinese,japanese"
                className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇨🇳🇯🇵</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                      Chinese vs Japanese
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Asian language challenge comparison
                    </div>
                  </div>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              </Link>

              <Link
                href="/compare?languages=arabic,russian"
                className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇸🇦🇷🇺</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                      Arabic vs Russian
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Most challenging languages comparison
                    </div>
                  </div>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              </Link>
            </div>
          </div>
        );

      case 'languages':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <GlobeAltIcon className="h-5 w-5 text-purple-600" />
              Quick Navigation by Difficulty
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Link
                href="/languages?category=1"
                className="group flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🟢</span>
                  <div>
                    <div className="font-medium text-blue-900 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      Category I Languages
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Easiest to learn (600-750 hours)
                    </div>
                  </div>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </Link>

              <Link
                href="/languages?category=2"
                className="group flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🟡</span>
                  <div>
                    <div className="font-medium text-green-900 dark:text-green-100 group-hover:text-green-600 dark:group-hover:text-green-400">
                      Category II Languages
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Relatively easy (900 hours)
                    </div>
                  </div>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-green-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              </Link>

              <Link
                href="/languages?category=3"
                className="group flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🟠</span>
                  <div>
                    <div className="font-medium text-yellow-900 dark:text-yellow-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
                      Category III Languages
                    </div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      Moderately difficult (1100 hours)
                    </div>
                  </div>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-yellow-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors" />
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // 通用导航链接
  const getGeneralNavigationLinks = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <GlobeAltIcon className="h-5 w-5 text-indigo-600" />
        Site Navigation
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/"
          className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏠</span>
            <div>
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Home
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Language learning difficulty analysis
              </div>
            </div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
        </Link>

        <Link
          href="/languages"
          className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                All Languages
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Complete language database
              </div>
            </div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
        </Link>

        <Link
          href="/compare"
          className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <div>
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Language Comparison
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Side-by-side language difficulty analysis
              </div>
            </div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
        </Link>
      </div>
    </div>
  );

  // 热门语言链接
  const getPopularLanguagesLinks = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <ChartBarIcon className="h-5 w-5 text-red-600" />
        Popular Languages
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Link
          href="/language/es"
          className="group flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-600 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇪🇸</span>
            <div>
              <div className="font-medium text-red-900 dark:text-red-100 group-hover:text-red-600 dark:group-hover:text-red-400">
                Spanish
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">FSI Category I</div>
            </div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-red-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
        </Link>

        <Link
          href="/language/fr"
          className="group flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇫🇷</span>
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                French
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">FSI Category I</div>
            </div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </Link>

        <Link
          href="/language/de"
          className="group flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇩🇪</span>
            <div>
              <div className="font-medium text-yellow-900 dark:text-yellow-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
                German
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">FSI Category II</div>
            </div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-yellow-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors" />
        </Link>

        <Link
          href="/language/chinese"
          className="group flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-600 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇨🇳</span>
            <div>
              <div className="font-medium text-red-900 dark:text-red-100 group-hover:text-red-600 dark:group-hover:text-red-400">
                Chinese
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">FSI Category V</div>
            </div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-red-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
        </Link>
      </div>
    </div>
  );

  // 学习资源链接
  const getLearningResourcesLinks = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <BookOpenIcon className="h-5 w-5 text-orange-600" />
        Learning Resources
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/compare?languages=es,fr,de"
          className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇪🇺</span>
            <div>
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
                European Languages Comparison
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Spanish, French, German comparison
              </div>
            </div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
        </Link>

        <Link
          href="/compare?languages=chinese,japanese,korean"
          className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌏</span>
            <div>
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
                Asian Languages Comparison
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Chinese, Japanese, Korean comparison
              </div>
            </div>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <AcademicCapIcon className="h-6 w-6 text-blue-600" />
          {customTitle || 'Related Recommendations'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explore more language learning resources and related pages
        </p>
      </div>

      <div className="space-y-8">
        {/* 页面特定链接 */}
        {getPageSpecificLinks()}

        {/* 热门语言链接 */}
        {showPopularLanguages && getPopularLanguagesLinks()}

        {/* 通用导航链接 */}
        {getGeneralNavigationLinks()}

        {/* 学习资源链接 */}
        {showLearningResources && getLearningResourcesLinks()}
      </div>
    </div>
  );
};

export default InternalLinks;
