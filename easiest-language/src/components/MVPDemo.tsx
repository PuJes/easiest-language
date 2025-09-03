'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LanguageCard from './LanguageCard';
import StatsDashboard from './StatsDashboard';
import FSIBadge from './FSIBadge';
import { Language } from '@/lib/types/language';
import { getAllLanguages } from '../lib/data/data-adapters';

const MVPDemo: React.FC = () => {
  const router = useRouter(); // 添加路由钩子
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // 加载语言数据
  useEffect(() => {
    try {
      const allLanguages = getAllLanguages();
      setLanguages(allLanguages);
    } catch (error) {
      console.error('Failed to load languages:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 筛选逻辑
  const filteredLanguages = languages
    .filter((lang) => {
      if (selectedDifficulty.length === 0) return true;
      return selectedDifficulty.includes(lang.fsi.category);
    })
    .filter((lang) => {
      if (!search) return true;
      const keyword = search.toLowerCase();
      return (
        lang.name.toLowerCase().includes(keyword) || lang.nativeName.toLowerCase().includes(keyword)
      );
    });

  const handleCompare = (language: Language) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(language.id)) {
        return prev.filter((id) => id !== language.id);
      } else if (prev.length < 3) {
        return [...prev, language.id];
      } else {
        alert('Maximum 3 languages can be compared');
        return prev;
      }
    });
  };

  const handleViewDetails = (language: Language) => {
    // 导航到语言详情页
    window.location.href = `/language/${language.id}`;
  };

  /**
   * 处理开始对比功能
   * 将选中的语言ID作为URL参数传递到对比页面
   */
  const handleStartComparison = () => {
    if (selectedLanguages.length < 2) {
      alert('Please select at least 2 languages for comparison');
      return;
    }

    // 构建URL参数，将选中的语言ID用逗号分隔
    const languageIds = selectedLanguages.join(',');
    // 使用Next.js路由跳转到对比页面，并传递语言ID参数
    router.push(`/compare?languages=${languageIds}`);
  };

  const toggleDifficultyFilter = (category: number) => {
    setSelectedDifficulty((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* 头部 */}
      <motion.header
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Easiest Languages
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Smart language learning difficulty analysis based on FSI data for English speakers
              </p>
            </div>

            {/* 英语母语优势说明 */}
            <div className="text-right">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <span className="text-lg">🇺🇸</span>
                  <div>
                    <p className="font-semibold text-sm">English Native Speaker</p>
                    <p className="text-xs opacity-90">FSI difficulty ratings optimized for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧统计面板 */}
          <motion.aside
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatsDashboard
              languages={languages}
              filteredLanguages={filteredLanguages}
              className="mb-6"
            />

            {/* 快速筛选 */}
            <motion.div
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Filters
              </h3>

              <div className="space-y-3">
                {/* 搜索框 */}
                <input
                  type="text"
                  placeholder="Search languages..."
                  className="w-full mb-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  data-testid="search-input"
                />
                {/* 搜索建议 */}
                {search.length >= 2 && (
                  <div
                    className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm"
                    data-testid="search-suggestions"
                  >
                    {languages
                      .filter((l) =>
                        [l.name, l.nativeName].some((t) =>
                          t.toLowerCase().includes(search.toLowerCase())
                        )
                      )
                      .slice(0, 5)
                      .map((l) => (
                        <div key={l.id} className="py-1 px-2">
                          {l.name}
                        </div>
                      ))}
                  </div>
                )}
                {/* 清除搜索 */}
                {search && (
                  <button
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-md text-gray-600 dark:text-gray-300"
                    onClick={() => setSearch('')}
                    data-testid="search-clear"
                  >
                    Clear Search
                  </button>
                )}
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Difficulty Levels
                </label>

                {[
                  { category: 1, label: 'Easy (I)', color: '#22c55e' },
                  { category: 2, label: 'Moderate (II)', color: '#eab308' },
                  { category: 3, label: 'Medium (III)', color: '#f97316' },
                  { category: 4, label: 'Hard (IV)', color: '#ef4444' },
                  { category: 5, label: 'Hardest (V)', color: '#a855f7' },
                ].map(({ category, label, color }) => (
                  <motion.button
                    key={category}
                    onClick={() => toggleDifficultyFilter(category)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      selectedDifficulty.includes(category)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid={`fsi-category-${category}-checkbox`}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                  </motion.button>
                ))}
              </div>

              {/* 重置按钮 */}
              {selectedDifficulty.length > 0 && (
                <motion.button
                  onClick={() => setSelectedDifficulty([])}
                  className="mt-4 w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="clear-filters"
                >
                  Clear Filters
                </motion.button>
              )}
            </motion.div>
          </motion.aside>

          {/* 主内容区 */}
          <main className="lg:col-span-3">
            {/* 选中的对比语言 */}
            <AnimatePresence>
              {selectedLanguages.length > 0 && (
                <motion.div
                  className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  data-testid="comparison-list"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Comparison List ({selectedLanguages.length}/3)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedLanguages.map((langId) => {
                          const lang = languages.find((l) => l.id === langId);
                          return lang ? (
                            <div
                              key={langId}
                              className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1 rounded-md border"
                            >
                              <FSIBadge category={lang.fsi.category} size="sm" showLabel={false} />
                              <span className="text-sm font-medium">{lang.name}</span>
                              <button
                                onClick={() => handleCompare(lang)}
                                className="text-red-500 hover:text-red-700 ml-1"
                                data-testid="comparison-remove"
                              >
                                ×
                              </button>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <button
                      onClick={handleStartComparison} // 使用新的处理函数
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      data-testid="start-comparison"
                    >
                      Start Comparison
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 语言卡片网格 */}
            {loading ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="grid gap-6 grid-cols-1 md:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <AnimatePresence>
                  {filteredLanguages.map((language, index) => (
                    <motion.div
                      key={language.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      layout
                    >
                      <LanguageCard
                        language={language}
                        onCompare={handleCompare}
                        onViewDetails={handleViewDetails}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* 空状态 */}
            {filteredLanguages.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                data-testid="empty-state"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No languages found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filter criteria
                </p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MVPDemo;
