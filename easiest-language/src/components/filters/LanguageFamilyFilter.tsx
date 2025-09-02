/**
 * 语言家族筛选器组件
 *
 * 提供语言家族的多选筛选功能
 */

import React, { useState, useMemo } from 'react';
// import { LanguageFamily } from '../../lib/types/language';

interface LanguageFamilyFilterProps {
  /** 当前选中的语言家族 */
  selectedFamilies: string[];

  /** 可用的语言家族选项 */
  availableFamilies: string[];

  /** 选择变化回调 */
  onChange: (families: string[]) => void;

  /** 各家族的语言数量统计 */
  familyCounts?: Record<string, number>;

  /** 是否禁用 */
  disabled?: boolean;

  /** 自定义样式类名 */
  className?: string;

  /** 是否显示搜索框 */
  showSearch?: boolean;

  /** 最大显示数量（超出则折叠） */
  maxVisible?: number;
}

/**
 * 语言家族信息配置
 */
const LANGUAGE_FAMILY_INFO: Record<
  string,
  {
    label: string;
    description: string;
    examples: string[];
    color: string;
  }
> = {
  'Indo-European': {
    label: 'Indo-European',
    description: 'The largest language family, including most European languages',
    examples: ['English', 'Spanish', 'French', 'German', 'Russian'],
    color: '#3b82f6',
  },
  'Sino-Tibetan': {
    label: 'Sino-Tibetan',
    description: 'Second largest family, including Chinese and Tibetan languages',
    examples: ['Mandarin', 'Cantonese', 'Tibetan', 'Burmese'],
    color: '#ef4444',
  },
  'Niger-Congo': {
    label: 'Niger-Congo',
    description: 'Largest African language family',
    examples: ['Swahili', 'Yoruba', 'Igbo', 'Zulu'],
    color: '#10b981',
  },
  'Afro-Asiatic': {
    label: 'Afro-Asiatic',
    description: 'Languages of North Africa and Middle East',
    examples: ['Arabic', 'Hebrew', 'Amharic', 'Hausa'],
    color: '#f59e0b',
  },
  'Trans-New Guinea': {
    label: 'Trans-New Guinea',
    description: 'Languages of New Guinea highlands',
    examples: ['Dani', 'Enga', 'Melpa'],
    color: '#8b5cf6',
  },
  Austronesian: {
    label: 'Austronesian',
    description: 'Languages of Southeast Asia and Pacific',
    examples: ['Indonesian', 'Tagalog', 'Malay', 'Hawaiian'],
    color: '#06b6d4',
  },
  Japonic: {
    label: 'Japonic',
    description: 'Japanese and related languages',
    examples: ['Japanese', 'Ryukyuan'],
    color: '#ec4899',
  },
  Koreanic: {
    label: 'Koreanic',
    description: 'Korean and related languages',
    examples: ['Korean', 'Middle Korean'],
    color: '#84cc16',
  },
  Dravidian: {
    label: 'Dravidian',
    description: 'Languages of South India',
    examples: ['Tamil', 'Telugu', 'Kannada', 'Malayalam'],
    color: '#f97316',
  },
  Altaic: {
    label: 'Altaic',
    description: 'Disputed family including Turkic, Mongolic',
    examples: ['Turkish', 'Mongolian', 'Kazakh'],
    color: '#6366f1',
  },
  'Tai-Kadai': {
    label: 'Tai-Kadai',
    description: 'Languages of Southeast Asia',
    examples: ['Thai', 'Lao', 'Zhuang'],
    color: '#14b8a6',
  },
  'Hmong-Mien': {
    label: 'Hmong-Mien',
    description: 'Languages of China and Southeast Asia',
    examples: ['Hmong', 'Mien'],
    color: '#a855f7',
  },
  Ainu: {
    label: 'Ainu',
    description: 'Indigenous language of Japan',
    examples: ['Ainu'],
    color: '#64748b',
  },
};

export const LanguageFamilyFilter: React.FC<LanguageFamilyFilterProps> = ({
  selectedFamilies,
  availableFamilies,
  onChange,
  familyCounts = {},
  disabled = false,
  className = '',
  showSearch = true,
  maxVisible = 8,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * 筛选后的语言家族列表
   */
  const filteredFamilies = useMemo(() => {
    let filtered = availableFamilies;

    // 搜索筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((family) => {
        const info = LANGUAGE_FAMILY_INFO[family];
        return (
          info.label.toLowerCase().includes(query) ||
          info.description.toLowerCase().includes(query) ||
          info.examples.some((example) => example.toLowerCase().includes(query))
        );
      });
    }

    // 按语言数量排序（如果有统计数据）
    if (Object.keys(familyCounts).length > 0) {
      filtered.sort((a, b) => (familyCounts[b] || 0) - (familyCounts[a] || 0));
    }

    return filtered;
  }, [availableFamilies, searchQuery, familyCounts]);

  /**
   * 显示的语言家族列表（考虑折叠）
   */
  const visibleFamilies = useMemo(() => {
    if (isExpanded || filteredFamilies.length <= maxVisible) {
      return filteredFamilies;
    }
    return filteredFamilies.slice(0, maxVisible);
  }, [filteredFamilies, isExpanded, maxVisible]);

  /**
   * 处理单个家族的选择/取消选择
   */
  const handleFamilyToggle = (family: string) => {
    if (disabled) return;

    const isSelected = selectedFamilies.includes(family);

    if (isSelected) {
      // 取消选择
      onChange(selectedFamilies.filter((f) => f !== family));
    } else {
      // 添加选择
      onChange([...selectedFamilies, family].sort());
    }
  };

  /**
   * 清除所有选择
   */
  const handleClearAll = () => {
    if (disabled) return;
    onChange([]);
  };

  /**
   * 处理搜索输入
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  /**
   * 处理键盘事件
   */
  const handleKeyDown = (event: React.KeyboardEvent, family: string) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleFamilyToggle(family);
    }
  };

  // 如果没有可用家族，显示空状态
  if (availableFamilies.length === 0) {
    return (
      <div className={`p-4 text-center text-gray-500 ${className}`}>
        <p>No language families available</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 标题和清除按钮 */}
      <div className="flex items-center justify-between">
        <h3
          id="family-filter-title"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          Language Family
        </h3>
        {selectedFamilies.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {selectedFamilies.length}
            </span>
            <button
              onClick={handleClearAll}
              disabled={disabled}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* 搜索框 */}
      {showSearch && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search language families..."
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={disabled}
            className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* 语言家族选项 */}
      <div role="group" aria-labelledby="family-filter-title" className="space-y-2">
        {visibleFamilies.map((family) => {
          const info = LANGUAGE_FAMILY_INFO[family];
          const isSelected = selectedFamilies.includes(family);
          const count = familyCounts[family] || 0;

          return (
            <label
              key={family}
              className={`
                flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {/* 颜色指示器 */}
              <div
                data-testid="family-color-indicator"
                className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5"
                style={{ backgroundColor: info.color }}
                aria-hidden="true"
              />

              {/* 复选框 */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleFamilyToggle(family)}
                onKeyDown={(e) => handleKeyDown(e, family)}
                disabled={disabled}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-0.5"
                aria-describedby={`family-${family}-description`}
              />

              {/* 家族信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {info.label}
                  </span>
                  {count > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {count} languages
                    </span>
                  )}
                </div>
                <p
                  id={`family-${family}-description`}
                  className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                >
                  {info.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Examples: {info.examples.join(', ')}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {/* 展开/折叠按钮 */}
      {filteredFamilies.length > maxVisible && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          disabled={disabled}
          className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 disabled:opacity-50"
        >
          {isExpanded
            ? `Show less (${filteredFamilies.length - maxVisible} hidden)`
            : `Show ${filteredFamilies.length - maxVisible} more`}
        </button>
      )}

      {/* 搜索无结果 */}
      {searchQuery && filteredFamilies.length === 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>No families found for "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 mt-1"
          >
            Clear search
          </button>
        </div>
      )}

      {/* 选择摘要 */}
      {selectedFamilies.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Selected:</span>{' '}
            {selectedFamilies.map((family) => LANGUAGE_FAMILY_INFO[family].label).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};
