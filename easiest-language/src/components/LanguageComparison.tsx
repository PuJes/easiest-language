'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeftIcon,
  XMarkIcon,
  PlusIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BookOpenIcon,
  DocumentArrowDownIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import FSIBadge from './FSIBadge';
import { Language } from '@/lib/types/language';
import { getAllLanguages } from '@/lib/data/data-adapters';

interface LanguageComparisonProps {
  availableLanguages?: Language[];
  initialLanguages?: Language[];
}

const LanguageComparison: React.FC<LanguageComparisonProps> = ({
  availableLanguages,
  initialLanguages = [],
}) => {
  const searchParams = useSearchParams(); // 获取URL参数
  const [allLanguages] = useState<Language[]>(() => availableLanguages || getAllLanguages());
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(initialLanguages);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<'overview' | 'detailed' | 'chart'>(
    'overview'
  );
  const [aiInsight, setAiInsight] = useState<string>('');

  // 从URL参数中读取语言ID并初始化选中的语言
  useEffect(() => {
    const languagesParam = searchParams.get('languages');
    if (languagesParam && languagesParam.trim()) {
      // 将逗号分隔的语言ID字符串转换为数组
      const languageIds = languagesParam.split(',').map(id => id.trim());
      // 根据ID找到对应的语言对象
      const languagesFromParams = languageIds
        .map(id => allLanguages.find(lang => lang.id === id))
        .filter((lang): lang is Language => lang !== undefined);
      
      // 如果找到了有效的语言，则设置为选中的语言
      if (languagesFromParams.length > 0) {
        setSelectedLanguages(languagesFromParams);
      }
    }
  }, [searchParams, allLanguages]);

  useEffect(() => {
    if (selectedLanguages.length >= 2) {
      generateAIInsight();
    }
  }, [selectedLanguages]);

  const addLanguage = (language: Language) => {
    if (selectedLanguages.length < 3 && !selectedLanguages.find((l) => l.id === language.id)) {
      setSelectedLanguages([...selectedLanguages, language]);
      setShowLanguageSelector(false);
    }
  };

  const removeLanguage = (languageId: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l.id !== languageId));
  };

  const generateAIInsight = () => {
    const languages = selectedLanguages;
    if (languages.length < 2) return;

    const easiest = languages.reduce((prev, curr) =>
      prev.fsi.category < curr.fsi.category ? prev : curr
    );

    const hardest = languages.reduce((prev, curr) =>
      prev.fsi.category > curr.fsi.category ? prev : curr
    );

    let insight = `For English speakers, ${easiest.name} would be the easiest to learn (${easiest.fsi.hours} hours), `;

    if (languages.length === 2) {
      insight += `while ${hardest.name} requires significantly more time (${hardest.fsi.hours} hours). `;
    } else {
      insight += `while ${hardest.name} would be the most challenging (${hardest.fsi.hours} hours). `;
    }

    // Add business/cultural insights based on speaker count and FSI category
    const mostBusiness = languages.reduce((prev, curr) => {
      const prevScore = prev.speakers / 1000000 + (6 - prev.fsi.category);
      const currScore = curr.speakers / 1000000 + (6 - curr.fsi.category);
      return prevScore > currScore ? prev : curr;
    });

    insight += `${mostBusiness.name} offers the highest business value among your selections.`;

    setAiInsight(insight);
  };

  const exportComparison = () => {
    const data = {
      comparisonDate: new Date().toISOString(),
      languages: selectedLanguages.map((l) => ({
        name: l.name,
        nativeName: l.nativeName,
        fsiCategory: l.fsi.category,
        studyHours: l.fsi.hours,
        speakers:
          l.speakers >= 1000000
            ? `${Math.round(l.speakers / 1000000)}M`
            : `${Math.round(l.speakers / 1000)}K`,
        primaryCountries: l.countries.slice(0, 3),
      })),
      aiInsight,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `language-comparison-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderOverviewMode = () => (
    <div className="grid grid-cols-1 gap-6">
      {/* Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {selectedLanguages.map((language, index) => (
          <motion.div
            key={language.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              onClick={() => removeLanguage(language.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{language.flagEmoji}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{language.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{language.nativeName}</p>
            </div>

            <div className="flex justify-center mb-4">
              <FSIBadge category={language.fsi.category} size="md" showLabel />
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 text-center mb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {language.fsi.hours}h
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">study time</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Speakers:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {language.speakers >= 1000000
                    ? `${Math.round(language.speakers / 1000000)}M`
                    : `${Math.round(language.speakers / 1000)}K`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Family:</span>
                <span className="font-medium text-gray-900 dark:text-white">{language.family}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Countries:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {language.countries.length}
                </span>
              </div>
            </div>

            <Link href={`/language/${language.id}`}>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                View Details
              </button>
            </Link>
          </motion.div>
        ))}

        {/* Add Language Button */}
        {selectedLanguages.length < 3 && (
          <motion.button
            onClick={() => setShowLanguageSelector(true)}
            className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-colors min-h-[400px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusIcon className="h-12 w-12 mb-4" />
            <span className="font-medium">Add Language to Compare</span>
            <span className="text-sm">Up to 3 languages</span>
          </motion.button>
        )}
      </div>

      {/* AI Insight Panel */}
      {selectedLanguages.length >= 2 && aiInsight && (
        <motion.div
          className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <SparklesIcon className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                AI Learning Recommendation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aiInsight}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderDetailedMode = () => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Aspect
            </th>
            {selectedLanguages.map((lang) => (
              <th
                key={lang.id}
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{lang.flagEmoji}</span>
                  {lang.name}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {[
            {
              label: 'FSI Difficulty',
              key: 'fsi',
              render: (lang: Language) => (
                <div className="flex items-center gap-2">
                  <FSIBadge category={lang.fsi.category} size="sm" />
                  <span className="font-medium">{lang.fsi.description}</span>
                </div>
              ),
            },
            {
              label: 'Study Time',
              key: 'hours',
              render: (lang: Language) => (
                <div>
                  <span className="text-lg font-bold text-blue-600">{lang.fsi.hours} hours</span>
                  <p className="text-sm text-gray-500">for English speakers</p>
                </div>
              ),
            },
            {
              label: 'Total Speakers',
              key: 'speakers',
              render: (lang: Language) => (
                <div>
                  <span className="font-medium">
                    {lang.speakers >= 1000000
                      ? `${Math.round(lang.speakers / 1000000)}M`
                      : `${Math.round(lang.speakers / 1000)}K`}
                  </span>
                  <p className="text-sm text-gray-500">native speakers</p>
                </div>
              ),
            },
            {
              label: 'Language Family',
              key: 'family',
              render: (lang: Language) => (
                <div>
                  <span className="font-medium">{lang.family}</span>
                  <p className="text-sm text-gray-500">{lang.subfamily}</p>
                </div>
              ),
            },
            {
              label: 'Primary Countries',
              key: 'geography',
              render: (lang: Language) => (
                <div className="flex flex-wrap gap-1">
                  {lang.countries.slice(0, 3).map((country) => (
                    <span
                      key={country}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                    >
                      {country}
                    </span>
                  ))}
                  {lang.countries.length > 3 && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                      +{lang.countries.length - 3} more
                    </span>
                  )}
                </div>
              ),
            },
            {
              label: 'Learning Resources',
              key: 'resources',
              render: (lang: Language) => (
                <div>
                  <span className="text-lg font-bold text-green-600">
                    {Math.floor(Math.random() * 50) + 20}
                  </span>
                  <p className="text-sm text-gray-500">available resources</p>
                </div>
              ),
            },
            {
              label: 'Business Value',
              key: 'business',
              render: (lang: Language) => (
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < 6 - lang.fsi.category ? 'text-yellow-400' : 'text-gray-300'}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              ),
            },
          ].map((row) => (
            <tr key={row.key} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                {row.label}
              </td>
              {selectedLanguages.map((lang) => (
                <td key={lang.id} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {row.render(lang)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderChartMode = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Difficulty Analysis
        </h3>
        <div className="h-80">
          {selectedLanguages.length >= 2 ? (
            <div className="h-full flex items-center justify-center">
              <div className="space-y-4 w-full max-w-md">
                {selectedLanguages.map((lang, index) => (
                  <div
                    key={lang.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flagEmoji}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{lang.name}</span>
                    </div>
                    <FSIBadge category={lang.fsi.category} size="sm" showLabel />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              Add more languages to see comparison
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Study Time Comparison
        </h3>
        <div className="h-80">
          {selectedLanguages.length >= 2 ? (
            <div className="h-full flex items-center justify-center">
              <div className="space-y-6 w-full max-w-md">
                {selectedLanguages.map((lang, index) => {
                  const maxHours = Math.max(
                    ...selectedLanguages.map((l) => l.fsi.hours || 0)
                  );
                  const hours = lang.fsi.hours || 0;
                  const percentage = maxHours > 0 ? (hours / maxHours) * 100 : 0;

                  return (
                    <div key={lang.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{lang.flagEmoji}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {lang.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-blue-600">{lang.fsi.hours}h</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            index === 0
                              ? 'bg-blue-600'
                              : index === 1
                                ? 'bg-purple-600'
                                : 'bg-green-600'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              Add more languages to compare study time
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/languages">
              <motion.button
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                whileHover={{ x: -4 }}
              >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Languages
              </motion.button>
            </Link>

            <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
              <span className="text-lg">🇺🇸</span>
              <span>English Native Speaker</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title & Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Compare Languages
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Compare up to 3 languages side by side to make the best learning decision
          </p>
        </motion.div>

        {/* Mode Tabs & Export */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg">
            {[
              { id: 'overview', label: 'Overview', icon: GlobeAltIcon },
              { id: 'detailed', label: 'Detailed', icon: BookOpenIcon },
              { id: 'chart', label: 'Charts', icon: ChartBarIcon },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setComparisonMode(mode.id as any)}
                className={`${
                  comparisonMode === mode.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                } px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2`}
              >
                <mode.icon className="h-4 w-4" />
                {mode.label}
              </button>
            ))}
          </div>

          {selectedLanguages.length >= 2 && (
            <button
              onClick={exportComparison}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium shadow-lg flex items-center gap-2"
            >
              <DocumentArrowDownIcon className="h-5 w-5" />
              Export Comparison
            </button>
          )}
        </div>

        {/* Content */}
        <motion.div
          key={comparisonMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {selectedLanguages.length === 0 ? (
            <div className="text-center py-16">
              <GlobeAltIcon className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Languages Selected
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Choose 2-3 languages to start comparing
              </p>
              <button
                onClick={() => setShowLanguageSelector(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Select Languages
              </button>
            </div>
          ) : (
            <>
              {comparisonMode === 'overview' && renderOverviewMode()}
              {comparisonMode === 'detailed' && renderDetailedMode()}
              {comparisonMode === 'chart' && renderChartMode()}
            </>
          )}
        </motion.div>
      </div>

      {/* Language Selector Modal */}
      <AnimatePresence>
        {showLanguageSelector && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Select a Language
                </h3>
                <button
                  onClick={() => setShowLanguageSelector(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allLanguages
                  .filter((lang) => !selectedLanguages.find((s) => s.id === lang.id))
                  .map((language) => (
                    <motion.button
                      key={language.id}
                      onClick={() => addLanguage(language)}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-left hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{language.flagEmoji}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {language.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language.nativeName}
                          </p>
                        </div>
                      </div>
                      <FSIBadge category={language.fsi.category} size="sm" showLabel />
                    </motion.button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageComparison;
