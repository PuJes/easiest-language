'use client';

import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import FSIBadge from './FSIBadge';
import { Language } from '@/lib/types/language';
import { getAllLanguages } from '@/lib/data/data-adapters';

interface LanguageListProps {
  availableLanguages?: Language[];
}

const LanguageList: React.FC<LanguageListProps> = memo(({
  availableLanguages,
}) => {
  const [allLanguages] = useState<Language[]>(() => availableLanguages || getAllLanguages());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'speakers'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20); // 初始只显示20个语言卡片

  // Filtering and sorting logic - 优化性能，减少不必要的重新计算
  const filteredAndSortedLanguages = useMemo(() => {
    let filtered = allLanguages.filter(language => {
      const matchesSearch = language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           language.nativeName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             language.fsi.category.toString() === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'difficulty':
          comparison = a.fsi.category - b.fsi.category;
          break;
        case 'speakers':
          comparison = b.speakers - a.speakers;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [allLanguages, searchTerm, selectedCategory, sortBy, sortOrder]);

  // 只显示可见的语言卡片，实现虚拟滚动效果
  const visibleLanguages = useMemo(() => {
    return filteredAndSortedLanguages.slice(0, visibleCount);
  }, [filteredAndSortedLanguages, visibleCount]);

  // 加载更多语言
  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 20, filteredAndSortedLanguages.length));
  }, [filteredAndSortedLanguages.length]);

  // Get category statistics
  const categoryStats = useMemo(() => {
    const stats: { [key: number]: number } = {};
    allLanguages.forEach(lang => {
      stats[lang.fsi.category] = (stats[lang.fsi.category] || 0) + 1;
    });
    return stats;
  }, [allLanguages]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
    setSortOrder('asc');
    setVisibleCount(20); // 重置可见数量
  }, []);

  return (
    <div className="w-full">
      {/* Search and filter bar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FunnelIcon className="h-5 w-5" />
            Filter
          </button>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Difficulty category filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Categories</option>
                    {Object.entries(categoryStats).map(([category, count]) => (
                      <option key={category} value={category}>
                        Category {category} ({count} languages)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort by */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'difficulty' | 'speakers')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="name">By Name</option>
                    <option value="difficulty">By Difficulty</option>
                    <option value="speakers">By Speakers</option>
                  </select>
                </div>

                {/* Sort order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort Order
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortOrder('asc')}
                      className={`flex-1 px-3 py-2 rounded-lg transition-colors ${
                        sortOrder === 'asc'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <ArrowUpIcon className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => setSortOrder('desc')}
                      className={`flex-1 px-3 py-2 rounded-lg transition-colors ${
                        sortOrder === 'desc'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <ArrowDownIcon className="h-4 w-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Clear filters button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Language grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleLanguages.map((language, index) => (
          <motion.div
            key={language.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }} // 限制最大延迟
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Link href={`/language/${language.id}`}>
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {language.flagEmoji}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {language.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {language.nativeName}
                </p>

                <div className="flex justify-center mb-4">
                  <FSIBadge category={language.fsi.category} size="md" showLabel />
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Study Time:</span>
                    <span className="font-medium">{language.fsi.hours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speakers:</span>
                    <span className="font-medium">
                      {language.speakers ? (
                        language.speakers > 1000000000
                          ? `${(language.speakers / 1000000000).toFixed(1)}B`
                          : language.speakers > 1000000
                          ? `${(language.speakers / 1000000).toFixed(1)}M`
                          : language.speakers > 1000
                          ? `${(language.speakers / 1000).toFixed(1)}K`
                          : language.speakers.toLocaleString()
                      ) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Family:</span>
                    <span className="font-medium">{language.family}</span>
                  </div>
                </div>

                <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  View Details →
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredAndSortedLanguages.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Load More Languages ({filteredAndSortedLanguages.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* No results message */}
      {filteredAndSortedLanguages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No matching languages found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please try adjusting your search criteria or filters
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
});

export default LanguageList;
