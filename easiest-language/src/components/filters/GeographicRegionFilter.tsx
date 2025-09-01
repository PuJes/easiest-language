/**
 * 地理区域筛选器组件
 *
 * 提供地理区域的多选筛选功能，支持地图可视化
 */

import React, { useState } from 'react';
import { GeographicRegion } from '../../lib/types/language';

interface GeographicRegionFilterProps {
  /** 当前选中的地理区域 */
  selectedRegions: GeographicRegion[];

  /** 可用的地理区域选项 */
  availableRegions: GeographicRegion[];

  /** 选择变化回调 */
  onChange: (regions: GeographicRegion[]) => void;

  /** 各区域的语言数量统计 */
  regionCounts?: Record<GeographicRegion, number>;

  /** 是否禁用 */
  disabled?: boolean;

  /** 自定义样式类名 */
  className?: string;

  /** 显示模式：列表或地图 */
  viewMode?: 'list' | 'map';
}

/**
 * 地理区域信息配置
 */
const GEOGRAPHIC_REGION_INFO: Record<
  GeographicRegion,
  {
    label: string;
    description: string;
    examples: string[];
    color: string;
    emoji: string;
    coordinates: { lat: number; lng: number };
  }
> = {
  Europe: {
    label: 'Europe',
    description: 'European continent and nearby regions',
    examples: ['English', 'Spanish', 'French', 'German', 'Italian'],
    color: '#3b82f6',
    emoji: '🇪🇺',
    coordinates: { lat: 54.526, lng: 15.2551 },
  },
  Asia: {
    label: 'Asia',
    description: 'Asian continent including East, South, and Southeast Asia',
    examples: ['Chinese', 'Japanese', 'Korean', 'Hindi', 'Thai'],
    color: '#ef4444',
    emoji: '🌏',
    coordinates: { lat: 34.0479, lng: 100.6197 },
  },
  Africa: {
    label: 'Africa',
    description: 'African continent including North and Sub-Saharan Africa',
    examples: ['Arabic', 'Swahili', 'Amharic', 'Yoruba', 'Zulu'],
    color: '#10b981',
    emoji: '🌍',
    coordinates: { lat: -8.7832, lng: 34.5085 },
  },
  'North America': {
    label: 'North America',
    description: 'North American continent including Central America',
    examples: ['English', 'Spanish', 'French', 'Nahuatl'],
    color: '#f59e0b',
    emoji: '🌎',
    coordinates: { lat: 54.526, lng: -105.2551 },
  },
  'South America': {
    label: 'South America',
    description: 'South American continent',
    examples: ['Spanish', 'Portuguese', 'Quechua', 'Guarani'],
    color: '#8b5cf6',
    emoji: '🌎',
    coordinates: { lat: -8.7832, lng: -55.4915 },
  },
  Oceania: {
    label: 'Oceania',
    description: 'Australia, New Zealand, and Pacific islands',
    examples: ['English', 'Maori', 'Fijian', 'Tok Pisin'],
    color: '#06b6d4',
    emoji: '🌏',
    coordinates: { lat: -25.2744, lng: 133.7751 },
  },
};

export const GeographicRegionFilter: React.FC<GeographicRegionFilterProps> = ({
  selectedRegions,
  availableRegions,
  onChange,
  regionCounts = {},
  disabled = false,
  className = '',
  viewMode = 'list',
}) => {
  const [currentViewMode, setCurrentViewMode] = useState<'list' | 'map'>(viewMode);

  /**
   * 处理单个区域的选择/取消选择
   */
  const handleRegionToggle = (region: GeographicRegion) => {
    if (disabled) return;

    const isSelected = selectedRegions.includes(region);

    if (isSelected) {
      // 取消选择
      onChange(selectedRegions.filter((r) => r !== region));
    } else {
      // 添加选择
      onChange([...selectedRegions, region].sort());
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
   * 全选所有区域
   */
  const handleSelectAll = () => {
    if (disabled) return;
    onChange([...availableRegions]);
  };

  /**
   * 处理键盘事件
   */
  const handleKeyDown = (event: React.KeyboardEvent, region: GeographicRegion) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleRegionToggle(region);
    }
  };

  /**
   * 渲染列表视图
   */
  const renderListView = () => (
    <div className="space-y-2">
      {availableRegions.map((region) => {
        const info = GEOGRAPHIC_REGION_INFO[region];
        const isSelected = selectedRegions.includes(region);
        const count = regionCounts[region] || 0;

        return (
          <label
            key={region}
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
            {/* 区域表情符号 */}
            <div className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
              {info.emoji}
            </div>

            {/* 复选框 */}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleRegionToggle(region)}
              onKeyDown={(e) => handleKeyDown(e, region)}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
              aria-describedby={`region-${region}-description`}
            />

            {/* 区域信息 */}
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
                id={`region-${region}-description`}
                className="text-xs text-gray-500 dark:text-gray-400 mt-1"
              >
                {info.description}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Examples: {info.examples.join(', ')}
              </p>
            </div>

            {/* 颜色指示器 */}
            <div
              data-testid="region-color-indicator"
              className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: info.color }}
              aria-hidden="true"
            />
          </label>
        );
      })}
    </div>
  );

  /**
   * 渲染地图视图（简化版）
   */
  const renderMapView = () => (
    <div className="space-y-4">
      {/* 世界地图占位符 */}
      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-sm">Interactive world map</p>
          <p className="text-xs mt-1">Click regions to select/deselect</p>
        </div>

        {/* 区域按钮覆盖层 */}
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-4">
          {availableRegions.map((region) => {
            const info = GEOGRAPHIC_REGION_INFO[region];
            const isSelected = selectedRegions.includes(region);
            const count = regionCounts[region] || 0;

            return (
              <button
                key={region}
                onClick={() => handleRegionToggle(region)}
                disabled={disabled}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    isSelected
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                aria-describedby={`region-${region}-description`}
              >
                <span>{info.emoji}</span>
                <span>{info.label}</span>
                {count > 0 && (
                  <span
                    className={`
                    text-xs px-1.5 py-0.5 rounded-full
                    ${
                      isSelected
                        ? 'bg-blue-400 text-blue-100'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }
                  `}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 地图图例 */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
        {availableRegions.map((region) => {
          const info = GEOGRAPHIC_REGION_INFO[region];
          return (
            <div key={region} className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: info.color }} />
              <span>{info.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // 如果没有可用区域，显示空状态
  if (availableRegions.length === 0) {
    return (
      <div className={`p-4 text-center text-gray-500 ${className}`}>
        <p>No geographic regions available</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 标题和控制按钮 */}
      <div className="flex items-center justify-between">
        <h3
          id="region-filter-title"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          Geographic Region
        </h3>

        <div className="flex items-center space-x-2">
          {/* 视图切换按钮 */}
          <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
            <button
              onClick={() => setCurrentViewMode('list')}
              disabled={disabled}
              className={`
                px-3 py-1 text-xs font-medium transition-colors
                ${
                  currentViewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              List
            </button>
            <button
              onClick={() => setCurrentViewMode('map')}
              disabled={disabled}
              className={`
                px-3 py-1 text-xs font-medium transition-colors
                ${
                  currentViewMode === 'map'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              Map
            </button>
          </div>

          {/* 选择状态和控制 */}
          {selectedRegions.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {selectedRegions.length}
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

          {/* 全选按钮 */}
          {selectedRegions.length < availableRegions.length && (
            <button
              onClick={handleSelectAll}
              disabled={disabled}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 disabled:opacity-50"
            >
              Select All
            </button>
          )}
        </div>
      </div>

      {/* 内容区域 */}
      <div role="group" aria-labelledby="region-filter-title">
        {currentViewMode === 'list' ? renderListView() : renderMapView()}
      </div>

      {/* 选择摘要 */}
      {selectedRegions.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Selected regions:</span>{' '}
            {selectedRegions.map((region) => GEOGRAPHIC_REGION_INFO[region].label).join(', ')}
          </p>
          {Object.keys(regionCounts).length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Total languages:{' '}
              {selectedRegions.reduce((sum, region) => sum + (regionCounts[region] || 0), 0)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
