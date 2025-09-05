'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import FSIBadge from './FSIBadge';
import { Language } from '@/lib/types/language';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (language: Language) => void;
  availableLanguages: Language[];
  selectedLanguages: Language[];
  maxSelections?: number;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  availableLanguages,
  selectedLanguages,
  maxSelections = 3,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // 筛选可用的语言
  const filteredLanguages = useMemo(() => {
    return availableLanguages.filter((lang: Language) => {
      const isNotSelected = !selectedLanguages.find((s) => s.id === lang.id);
      const matchesSearch =
        searchTerm === '' ||
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        lang.fsi.category.toString() === selectedDifficulty;

      return isNotSelected && matchesSearch && matchesDifficulty;
    });
  }, [availableLanguages, selectedLanguages, searchTerm, selectedDifficulty]);

  const handleSelect = useCallback(
    (language: Language) => {
      if (selectedLanguages.length < maxSelections) {
        onSelect(language);
        setSearchTerm('');
        setSelectedDifficulty('all');
      }
    },
    [onSelect, selectedLanguages.length, maxSelections]
  );

  const handleClose = useCallback(() => {
    setSearchTerm('');
    setSelectedDifficulty('all');
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-5xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
          >
            {/* 模态框头部 */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Select a Language to Compare
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Choose up to {maxSelections} languages for detailed comparison
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* 搜索和筛选栏 */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* 搜索框 */}
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search languages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* 难度筛选 */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white min-w-[150px]"
                >
                  <option value="all">All Difficulties</option>
                  <option value="1">Easy (Category I)</option>
                  <option value="2">Moderate (Category II)</option>
                  <option value="3">Hard (Category III)</option>
                  <option value="4">Very Hard (Category IV)</option>
                  <option value="5">Extreme (Category V)</option>
                </select>
              </div>

              {/* 结果统计 */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredLanguages.length} languages
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedDifficulty !== 'all' && ` in Category ${selectedDifficulty}`}
              </div>
            </div>

            {/* 语言网格 */}
            <div className="overflow-y-auto max-h-[50vh] pr-2 scrollbar-light">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLanguages.map((language) => (
                  <motion.button
                    key={language.id}
                    onClick={() => handleSelect(language)}
                    className="group bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 text-left hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                          {language.flagEmoji}
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {language.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language.nativeName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {language.speakers >= 1000000
                            ? `${Math.round(language.speakers / 1000000)}M speakers`
                            : `${Math.round(language.speakers / 1000)}K speakers`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <FSIBadge category={language.fsi.category} size="sm" showLabel />
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {language.fsi.hours}h study time
                      </div>
                    </div>

                    {/* 悬停时显示添加按钮 */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add to Comparison
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* 无结果提示 */}
              {filteredLanguages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No languages found
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedDifficulty('all');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSelector;
