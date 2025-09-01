'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FSIBadge from './FSIBadge';
import { Language } from '@/lib/types/language';

interface LanguageCardProps {
  language: Language;
  showCompareButton?: boolean;
  onCompare?: (language: Language) => void;
  onViewDetails?: (language: Language) => void;
  className?: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({
  language,
  showCompareButton = true,
  onCompare,
  onViewDetails,
  className = '',
}) => {
  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCompare?.(language);
  };

  const handleViewDetails = () => {
    onViewDetails?.(language);
  };

  // 卡片样式 - 增强版本
  const cardStyles =
    'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 transition-all duration-300 cursor-pointer hover:border-blue-500 hover:shadow-lg min-h-[280px]';

  // 格式化使用人数
  const formatSpeakers = (speakers: number): string => {
    if (speakers >= 1000000000) {
      return `${(speakers / 1000000000).toFixed(1)}B`;
    } else if (speakers >= 1000000) {
      return `${(speakers / 1000000).toFixed(0)}M`;
    } else if (speakers >= 1000) {
      return `${(speakers / 1000).toFixed(0)}K`;
    }
    return speakers.toString();
  };

  // 格式化学习时长
  const formatLearningHours = (): string => {
    const fsiData = language.fsi;
    if (fsiData.category === 0) return 'Native';
    if (fsiData.hoursRange) {
      const [min, max] = fsiData.hoursRange;
      return min === max ? `${min} hours` : `${min}-${max} hours`;
    }
    return `${fsiData.hours} hours`;
  };

  return (
    <motion.div
      className={`${cardStyles} ${className}`}
      onClick={handleViewDetails}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      layout
    >
      {/* 头部：语言名称和FSI徽章 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{language.name}</h3>
            <FSIBadge category={language.fsi.category} size="md" showLabel={true} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {language.nativeName}
          </p>
        </div>

        {/* 对比按钮 */}
        {showCompareButton && (
          <motion.button
            className="px-3 py-1 text-sm text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium"
            onClick={handleCompare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Compare
          </motion.button>
        )}
      </div>

      {/* 核心信息网格 */}
      <div className="space-y-4">
        {/* FSI学习时长 - 重点展示 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">📚</span>
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              FSI Study Time
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatLearningHours()}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">for English speakers</div>
        </div>

        {/* 统计信息行 */}
        <div className="grid grid-cols-2 gap-3">
          {/* 使用人数 */}
          <div className="text-center p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="text-lg mb-1">👥</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatSpeakers(language.speakers)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">speakers</div>
          </div>

          {/* 国家数量 */}
          <div className="text-center p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="text-lg mb-1">🌍</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {language.countries.length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">countries</div>
          </div>
        </div>

        {/* 语言家族和主要国家 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">🏛️</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">{language.family}</span> family
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-sm mt-0.5">🗺️</span>
            <div className="flex-1">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Spoken in:{' '}
                <span className="font-medium">
                  {language.countries.slice(0, 3).join(', ')}
                  {language.countries.length > 3 && `, +${language.countries.length - 3} more`}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作区 */}
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Click for details</div>

          {/* 难度指示条 - 更美观的设计 */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 mr-1">Difficulty:</span>
            {Array.from({ length: 5 }, (_, i) => {
              const isActive = i < language.fsi.category;
              const colors = ['#6c757d', '#22c55e', '#eab308', '#f97316', '#ef4444', '#a855f7'];
              return (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    isActive ? 'opacity-100' : 'opacity-30'
                  }`}
                  style={{
                    backgroundColor: isActive ? colors[language.fsi.category] : '#d1d5db',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageCard;
