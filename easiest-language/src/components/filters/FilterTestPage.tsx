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
    region: 'Europe',
    fsi: { category: 1 as FSICategory, hours: 600, weeks: 24 },
    difficulty: { overall: 3, reasoning: 'Simple grammar' },
    speakers: 500000000,
    countries: ['Spain', 'Mexico', 'Argentina'],
    highlights: ['Easy pronunciation', 'Romance language'],
    flagEmoji: '🇪🇸',
    script: 'Latin',
  },
  {
    id: 'chinese',
    name: 'Chinese',
    nativeName: '中文',
    family: 'Sino-Tibetan',
    region: 'Asia',
    fsi: { category: 5 as FSICategory, hours: 2200, weeks: 88 },
    difficulty: { overall: 9, reasoning: 'Complex writing system' },
    speakers: 1400000000,
    countries: ['China', 'Taiwan', 'Singapore'],
    highlights: ['Tonal language', 'Logographic script'],
    flagEmoji: '🇨🇳',
    script: 'Chinese',
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    family: 'Indo-European',
    region: 'Europe',
    fsi: { category: 2 as FSICategory, hours: 900, weeks: 36 },
    difficulty: { overall: 5, reasoning: 'Complex grammar' },
    speakers: 280000000,
    countries: ['France', 'Canada', 'Belgium'],
    highlights: ['Romance language', 'Nasal sounds'],
    flagEmoji: '🇫🇷',
    script: 'Latin',
  },
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    family: 'Japonic',
    region: 'Asia',
    fsi: { category: 4 as FSICategory, hours: 1800, weeks: 72 },
    difficulty: { overall: 8, reasoning: 'Complex writing system' },
    speakers: 125000000,
    countries: ['Japan'],
    highlights: ['Three writing systems', 'Honorific system'],
    flagEmoji: '🇯🇵',
    script: 'Japanese',
  },
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    family: 'Afro-Asiatic',
    region: 'Africa',
    fsi: { category: 4 as FSICategory, hours: 1800, weeks: 72 },
    difficulty: { overall: 8, reasoning: 'Right-to-left script' },
    speakers: 400000000,
    countries: ['Saudi Arabia', 'Egypt', 'Morocco'],
    highlights: ['Right-to-left', 'Semitic language'],
    flagEmoji: '🇸🇦',
    script: 'Arabic',
    rtl: true,
  },
];

export const FilterTestPage: React.FC = () => {
  const {
    filterState,
    updateFilter,
    resetFilters,
    applyFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useAdvancedFilter();

  const [searchResults, setSearchResults] = useState<any[]>([]);

  // 应用筛选
  const filteredLanguages = applyFilters(mockLanguages).languages;

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
    {} as Record<LanguageFamily, number>
  );

  const regionCounts = mockLanguages.reduce(
    (acc, lang) => {
      acc[lang.region] = (acc[lang.region] || 0) + 1;
      return acc;
    },
    {} as Record<GeographicRegion, number>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">筛选器测试页面</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>总语言数: {mockLanguages.length}</span>
            <span>筛选后: {filteredLanguages.length}</span>
            <span>活跃筛选: {activeFilterCount}</span>
            {hasActiveFilters && (
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
                onSearchChange={(query) => updateFilter({ searchQuery: query })}
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
                onChange={(categories) => updateFilter({ fsiCategories: categories })}
              />
            </div>

            {/* 语言家族筛选 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <LanguageFamilyFilter
                selectedFamilies={filterState.languageFamilies}
                availableFamilies={['Indo-European', 'Sino-Tibetan', 'Japonic', 'Afro-Asiatic']}
                onChange={(families) => updateFilter({ languageFamilies: families })}
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
                onChange={(regions) => updateFilter({ regions })}
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
                          <span className="font-medium">区域:</span> {language.region}
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
                          {language.countries.slice(0, 2).join(', ')}
                        </p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {language.highlights.slice(0, 2).map((highlight) => (
                          <span
                            key={highlight}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {highlight}
                          </span>
                        ))}
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
