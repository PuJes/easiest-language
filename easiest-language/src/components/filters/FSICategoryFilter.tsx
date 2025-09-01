/**
 * FSI难度等级筛选器组件
 * 提供FSI等级的多选筛选功能
 */

import React from 'react';
import { FSICategory } from '../../lib/types/language';

interface FSICategoryFilterProps {
  /** 当前选中的FSI等级 */
  selectedCategories: FSICategory[];
  /** 可用的FSI等级选项 */
  availableCategories: FSICategory[];
  /** 选择变化回调 */
  onChange: (categories: FSICategory[]) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * FSI等级信息配置
 */
const FSI_CATEGORY_INFO = {
  0: { label: 'Native', hours: '0h', color: '#6b7280', description: 'Native language' },
  1: {
    label: 'Category I',
    hours: '600-750h',
    color: '#22c55e',
    description: 'Languages closely related to English',
  },
  2: {
    label: 'Category II',
    hours: '900h',
    color: '#84cc16',
    description: 'Languages with some linguistic differences',
  },
  3: {
    label: 'Category III',
    hours: '1100h',
    color: '#eab308',
    description: 'Languages with significant differences',
  },
  4: {
    label: 'Category IV',
    hours: '1800h',
    color: '#f97316',
    description: 'Languages with major differences',
  },
  5: {
    label: 'Category V',
    hours: '2200h',
    color: '#ef4444',
    description: 'Languages exceptionally difficult for English speakers',
  },
} as const;

export const FSICategoryFilter: React.FC<FSICategoryFilterProps> = ({
  selectedCategories,
  availableCategories,
  onChange,
  disabled = false,
  className = '',
}) => {
  /**
   * 处理单个等级的选择/取消选择
   */
  const handleCategoryToggle = (category: FSICategory) => {
    if (disabled) return;

    const isSelected = selectedCategories.includes(category);

    if (isSelected) {
      // 取消选择
      onChange(selectedCategories.filter((cat) => cat !== category));
    } else {
      // 添加选择
      onChange([...selectedCategories, category].sort());
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
   * 处理键盘事件
   */
  const handleKeyDown = (event: React.KeyboardEvent, category: FSICategory) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleCategoryToggle(category);
    }
  };

  // 如果没有可用等级，显示空状态
  if (availableCategories.length === 0) {
    return (
      <div className={`p-4 text-center text-gray-500 ${className}`}>
        <p>No FSI categories available</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 标题和清除按钮 */}
      <div className="flex items-center justify-between">
        <h3 id="fsi-filter-title" className="text-lg font-semibold text-gray-900 dark:text-white">
          FSI Difficulty Level
        </h3>
        {selectedCategories.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {selectedCategories.length}
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

      {/* FSI等级选项 */}
      <div role="group" aria-labelledby="fsi-filter-title" className="space-y-3">
        {availableCategories.map((category) => {
          const info = FSI_CATEGORY_INFO[category];
          const isSelected = selectedCategories.includes(category);

          return (
            <label
              key={category}
              className={`
                flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all
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
                data-testid="fsi-color-indicator"
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: info.color }}
                aria-hidden="true"
              />

              {/* 复选框 */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleCategoryToggle(category)}
                onKeyDown={(e) => handleKeyDown(e, category)}
                disabled={disabled}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                aria-describedby={`fsi-category-${category}-description`}
                data-testid={`fsi-category-${category}-checkbox`}
              />

              {/* 等级信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {info.label} ({info.hours})
                  </span>
                </div>
                <p
                  id={`fsi-category-${category}-description`}
                  className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                >
                  {info.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {/* 选择摘要 */}
      {selectedCategories.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Selected:</span>{' '}
            {selectedCategories
              .filter((cat) => FSI_CATEGORY_INFO[cat])
              .map((cat) => FSI_CATEGORY_INFO[cat].label)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};
