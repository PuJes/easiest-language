'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  XMarkIcon,
  PlusIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BookOpenIcon,
  DocumentArrowDownIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import FSIBadge from './FSIBadge';
import LanguageSelector from './LanguageSelector';
import { Language } from '@/lib/types/language';
import { getAllLanguages } from '@/lib/data/data-adapters';

interface LanguageComparisonProps {
  availableLanguages?: Language[];
  initialLanguages?: Language[];
}

const LanguageComparison: React.FC<LanguageComparisonProps> = memo(
  ({ availableLanguages, initialLanguages = [] }) => {
  const searchParams = useSearchParams(); // Get URL parameters
  const [allLanguages] = useState<Language[]>(() => availableLanguages || getAllLanguages());
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(initialLanguages);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<'overview' | 'detailed' | 'chart'>(
    'overview'
  );
  const [aiInsight, setAiInsight] = useState<string>('');

  // Read language IDs from URL parameters and initialize selected languages
  useEffect(() => {
    const languagesParam = searchParams.get('languages');
    if (languagesParam && languagesParam.trim()) {
      // Convert comma-separated language ID string to array
      const languageIds = languagesParam.split(',').map((id) => id.trim());
      // Find corresponding language objects by ID
      const languagesFromParams = languageIds
        .map((id) => allLanguages.find((lang) => lang.id === id))
        .filter((lang): lang is Language => lang !== undefined);

      // If valid languages are found, set them as selected
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

  const addLanguage = useCallback(
    (language: Language) => {
      if (selectedLanguages.length < 3 && !selectedLanguages.find((l) => l.id === language.id)) {
        setSelectedLanguages([...selectedLanguages, language]);
        setShowLanguageSelector(false);
      }
    },
    [selectedLanguages]
  );

  const removeLanguage = useCallback(
    (languageId: string) => {
      setSelectedLanguages(selectedLanguages.filter((l) => l.id !== languageId));
    },
    [selectedLanguages]
  );

  const generateAIInsight = useCallback(() => {
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
  }, [selectedLanguages]);

  const exportComparison = useCallback(() => {
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
        primaryRegions: l.regions.slice(0, 3),
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
  }, [selectedLanguages, aiInsight]);

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
            transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.3) }} // 限制最大延迟
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
                <span className="text-gray-600 dark:text-gray-400">Regions:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {language.regions.length}
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
              label: 'Primary Regions',
              key: 'geography',
              render: (lang: Language) => (
                <div className="flex flex-wrap gap-1">
                  {lang.regions.slice(0, 3).map((region) => (
                    <span
                      key={region}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                    >
                      {region}
                    </span>
                  ))}
                  {lang.regions.length > 3 && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                      +{lang.regions.length - 3} more
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
                  const maxHours = Math.max(...selectedLanguages.map((l) => l.fsi.hours || 0));
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
    <div className="w-full">
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
              onClick={() => setComparisonMode(mode.id as 'overview' | 'detailed' | 'chart')}
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

      {/* Language Selector Modal */}
      <LanguageSelector
        isOpen={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
        onSelect={addLanguage}
        availableLanguages={allLanguages}
        selectedLanguages={selectedLanguages}
        maxSelections={3}
      />
    </div>
  );
});

LanguageComparison.displayName = 'LanguageComparison';

export default LanguageComparison;
