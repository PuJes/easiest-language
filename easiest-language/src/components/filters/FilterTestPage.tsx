/**
 * 筛选器测试页面
 * 用于测试所有筛选器组件的功能
 */

import React, { useState } from 'react';
import { FSICategoryFilter } from './FSICategoryFilter';
import { LanguageFamilyFilter } from './LanguageFamilyFilter';
import { GeographicRegionFilter } from './GeographicRegionFilter';
import { SmartSearchFilter } from './SmartSearchFilter';
import { useAdvancedFilter } from '../../lib/hooks/useAdvancedFilter';
import { Language, FSICategory } from '../../lib/types/language';

// 测试数据
const mockLanguages: Language[] = [
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    family: 'Indo-European',
    subfamily: 'Romance',
    writingSystem: 'Latin',
    fsi: {
      category: 1 as FSICategory,
      hours: 600,
      description: 'Easy',
      details: { grammar: 2, vocabulary: 3, pronunciation: 2, writing: 1, cultural: 2 },
    },
    difficulty: { overall: 3, grammar: 3, pronunciation: 2, vocabulary: 3 },
    speakers: 500000000,
    countries: ['Spain', 'Mexico', 'Argentina'],
    flagEmoji: '🇪🇸',
    color: '#28a745',
  },
  {
    id: 'chinese',
    name: 'Chinese',
    nativeName: '中文',
    family: 'Sino-Tibetan',
    subfamily: 'Sinitic',
    writingSystem: 'Chinese Characters',
    fsi: {
      category: 5 as FSICategory,
      hours: 2200,
      description: 'Very Hard',
      details: { grammar: 5, vocabulary: 5, pronunciation: 5, writing: 5, cultural: 5 },
    },
    difficulty: { overall: 9, grammar: 6, pronunciation: 8, vocabulary: 10 },
    speakers: 1400000000,
    countries: ['China', 'Taiwan', 'Singapore'],
    flagEmoji: '🇨🇳',
    color: '#6f42c1',
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    family: 'Indo-European',
    subfamily: 'Romance',
    writingSystem: 'Latin',
    fsi: {
      category: 2 as FSICategory,
      hours: 900,
      description: 'Medium',
      details: { grammar: 3, vocabulary: 3, pronunciation: 3, writing: 2, cultural: 3 },
    },
    difficulty: { overall: 5, grammar: 6, pronunciation: 4, vocabulary: 5 },
    speakers: 280000000,
    countries: ['France', 'Canada', 'Belgium'],
    flagEmoji: '🇫🇷',
    color: '#28a745',
  },
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    family: 'Japonic',
    subfamily: 'Sinitic',
    writingSystem: 'Chinese Characters',
    fsi: {
      category: 4 as FSICategory,
      hours: 1800,
      description: 'Hard',
      details: { grammar: 4, vocabulary: 5, pronunciation: 5, writing: 4, cultural: 4 },
    },
    difficulty: { overall: 8, grammar: 8, pronunciation: 7, vocabulary: 10 },
    speakers: 125000000,
    countries: ['Japan'],
    flagEmoji: '🇯🇵',
    color: '#6f42c1',
  },
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    family: 'Afro-Asiatic',
    subfamily: 'Semitic',
    writingSystem: 'Arabic',
    fsi: {
      category: 4 as FSICategory,
      hours: 1800,
      description: 'Hard',
      details: { grammar: 4, vocabulary: 5, pronunciation: 5, writing: 4, cultural: 4 },
    },
    difficulty: { overall: 8, grammar: 8, pronunciation: 7, vocabulary: 7 },
    speakers: 400000000,
    countries: ['Saudi Arabia', 'Egypt', 'Morocco'],
    flagEmoji: '🇸🇦',
    color: '#dc3545',
  },
];

export const FilterTestPage: React.FC = () => {
  const {
    filterState,
    setFSICategories,
    setLanguageFamilies,
    setRegions,
    setSearchQuery,
    resetFilters,
    getFilterStats,
  } = useAdvancedFilter(mockLanguages);

  const [searchResults, setSearchResults] = useState<any[]>([]);

  // 应用筛选
  const filteredLanguages = getFilterStats().filteredLanguages;

  // 统计数据
  const fsiCounts = mockLanguages.reduce(
    (acc, lang) => {
      acc[lang.fsi.category] = (acc[lang.fsi.category] || 0) + 1;
      return acc;
    },
    {} as Record<FSICategory, number>
  );

  const familyCounts = mockLanguages.reduce(
    (acc, lang) => {
      acc[lang.family] = (acc[lang.family] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const regionCounts = mockLanguages.reduce(
    (acc, lang) => {
      // 根据国家推断区域
      const region = getRegionFromCountries(lang.regions);
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // 辅助函数：根据国家推断区域
  function getRegionFromCountries(countries: string[]): string {
    const regionMap: Record<string, string> = {
      Spain: 'Europe',
      France: 'Europe',
      Germany: 'Europe',
      China: 'Asia',
      Japan: 'Asia',
      Taiwan: 'Asia',
      Singapore: 'Asia',
      'Saudi Arabia': 'Middle East',
      Egypt: 'Middle East',
      Morocco: 'Middle East',
      Mexico: 'North America',
      Argentina: 'South America',
      Canada: 'North America',
      Belgium: 'Europe',
    };

    for (const country of countries) {
      if (regionMap[country]) {
        return regionMap[country];
      }
    }
    return 'Other';
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">筛选器测试页面</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>总语言数: {mockLanguages.length}</span>
            <span>筛选后: {filteredLanguages.length}</span>
            <span>
              活跃筛选:{' '}
              {
                Object.keys(filterState).filter((key) =>
                  Array.isArray(filterState[key as keyof typeof filterState])
                    ? (filterState[key as keyof typeof filterState] as any[]).length > 0
                    : filterState[key as keyof typeof filterState] !== ''
                ).length
              }
            </span>
            {Object.keys(filterState).some((key) =>
              Array.isArray(filterState[key as keyof typeof filterState])
                ? (filterState[key as keyof typeof filterState] as any[]).length > 0
                : filterState[key as keyof typeof filterState] !== ''
            ) && (
              <button
                onClick={resetFilters}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                重置筛选
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 筛选器面板 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 智能搜索 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">智能搜索</h2>
              <SmartSearchFilter
                searchQuery={filterState.searchQuery}
                onSearchChange={setSearchQuery}
                languages={mockLanguages}
                onSearchResults={setSearchResults}
                showSuggestions={true}
                maxSuggestions={5}
              />
              {searchResults.length > 0 && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  搜索结果: {searchResults.length} 个匹配
                </div>
              )}
            </div>

            {/* FSI难度等级筛选 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <FSICategoryFilter
                selectedCategories={filterState.fsiCategories}
                availableCategories={[0, 1, 2, 3, 4, 5]}
                onChange={setFSICategories}
              />
            </div>

            {/* 语言家族筛选 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <LanguageFamilyFilter
                selectedFamilies={filterState.languageFamilies}
                availableFamilies={['Indo-European', 'Sino-Tibetan', 'Japonic', 'Afro-Asiatic']}
                onChange={setLanguageFamilies}
                familyCounts={familyCounts}
                showSearch={true}
                maxVisible={4}
              />
            </div>

            {/* 地理区域筛选 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <GeographicRegionFilter
                selectedRegions={filterState.regions}
                availableRegions={['Europe', 'Asia', 'Africa']}
                onChange={setRegions}
                regionCounts={regionCounts}
                viewMode="list"
              />
            </div>
          </div>

          {/* 结果展示 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                筛选结果 ({filteredLanguages.length})
              </h2>

              {filteredLanguages.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-lg mb-2">没有找到匹配的语言</p>
                  <p className="text-sm">尝试调整筛选条件</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLanguages.map((language) => (
                    <div
                      key={language.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {language.flagEmoji} {language.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language.nativeName}
                          </p>
                        </div>
                        <span
                          className={`
                          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${
                            language.fsi.category <= 2
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : language.fsi.category <= 3
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }
                        `}
                        >
                          FSI-{language.fsi.category}
                        </span>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>
                          <span className="font-medium">家族:</span> {language.family}
                        </p>
                        <p>
                          <span className="font-medium">区域:</span>{' '}
                          {getRegionFromCountries(language.regions)}
                        </p>
                        <p>
                          <span className="font-medium">学习时长:</span> {language.fsi.hours}小时
                        </p>
                        <p>
                          <span className="font-medium">使用人数:</span>{' '}
                          {(language.speakers / 1000000).toFixed(0)}M
                        </p>
                        <p>
                          <span className="font-medium">主要国家:</span>{' '}
                          {language.regions.slice(0, 2).join(', ')}
                        </p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          FSI {language.fsi.category}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {language.family}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 筛选状态调试 */}
            <div className="mt-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                筛选状态 (调试信息)
              </h3>
              <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                {JSON.stringify(filterState, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
