/**
 * useAdvancedFilter Hook
 * 高级筛选系统的核心逻辑
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Language, FSICategory } from '../types/language';
import {
  FilterState,
  FilterConfig,
  FilterResult,
  FilterSummary,
  DEFAULT_FILTER_STATE,
  DEFAULT_SEARCH_CONFIG,
  SearchResult,
} from '../types/filter';

/**
 * 高级筛选Hook返回值接口
 */
interface UseAdvancedFilterReturn {
  /** 当前筛选状态 */
  filterState: FilterState;
  /** 筛选配置信息 */
  filterConfig: FilterConfig;
  /** 筛选后的语言列表 */
  filteredLanguages: Language[];
  /** 设置FSI等级筛选 */
  setFSICategories: (categories: FSICategory[]) => void;
  /** 设置语言家族筛选 */
  setLanguageFamilies: (families: string[]) => void;
  /** 设置地理区域筛选 */
  setRegions: (regions: string[]) => void;
  /** 设置搜索查询 */
  setSearchQuery: (query: string) => void;
  /** 设置难度范围筛选 */
  setDifficultyRange: (range: [number, number]) => void;
  /** 设置学习时长范围筛选 */
  setLearningTimeRange: (range: [number, number]) => void;
  /** 设置使用人数范围筛选 */
  setSpeakersRange: (range: [number, number]) => void;
  /** 重置所有筛选条件 */
  resetFilters: () => void;
  /** 获取筛选统计信息 */
  getFilterStats: () => FilterResult;
  /** 是否正在加载 */
  isLoading: boolean;
}

/**
 * 搜索引擎类
 */
class SearchEngine {
  private config = DEFAULT_SEARCH_CONFIG;

  /**
   * 执行模糊搜索
   */
  search(query: string, languages: Language[]): SearchResult[] {
    if (!query.trim()) return [];

    const normalizedQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    for (const language of languages) {
      const score = this.calculateScore(normalizedQuery, language);
      if (score >= this.config.threshold) {
        results.push({
          language,
          score,
          matchedFields: this.getMatchedFields(normalizedQuery, language),
          highlights: this.getHighlights(normalizedQuery, language),
        });
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, this.config.maxResults);
  }

  /**
   * 计算匹配分数
   */
  private calculateScore(query: string, language: Language): number {
    let totalScore = 0;
    let totalWeight = 0;

    // 检查各个字段的匹配度
    const fields = [
      { value: language.name.toLowerCase(), weight: this.config.fieldWeights.name },
      { value: language.nativeName.toLowerCase(), weight: this.config.fieldWeights.nativeName },
      { value: language.family.toLowerCase(), weight: this.config.fieldWeights.family },
      {
        value: language.countries.join(' ').toLowerCase(),
        weight: this.config.fieldWeights.countries,
      },
    ];

    for (const field of fields) {
      const fieldScore = this.calculateFieldScore(query, field.value);
      totalScore += fieldScore * field.weight;
      totalWeight += field.weight;
    }

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  /**
   * 计算单个字段的匹配分数
   */
  private calculateFieldScore(query: string, fieldValue: string): number {
    // 完全匹配
    if (fieldValue === query) return 1.0;

    // 开头匹配
    if (fieldValue.startsWith(query)) return 0.9;

    // 包含匹配
    if (fieldValue.includes(query)) return 0.7;

    // 模糊匹配（简单的编辑距离）
    const distance = this.levenshteinDistance(query, fieldValue);
    const maxLength = Math.max(query.length, fieldValue.length);
    const similarity = 1 - distance / maxLength;

    return similarity > 0.3 ? similarity * 0.5 : 0;
  }

  /**
   * 计算编辑距离
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * 获取匹配的字段
   */
  private getMatchedFields(query: string, language: Language): string[] {
    const matchedFields: string[] = [];

    if (language.name.toLowerCase().includes(query)) matchedFields.push('name');
    if (language.nativeName.toLowerCase().includes(query)) matchedFields.push('nativeName');
    if (language.family.toLowerCase().includes(query)) matchedFields.push('family');
    if (language.countries.some((country) => country.toLowerCase().includes(query))) {
      matchedFields.push('countries');
    }

    return matchedFields;
  }

  /**
   * 获取高亮信息
   */
  private getHighlights(query: string, language: Language): any[] {
    // 简化实现，实际项目中可以更复杂
    return [];
  }
}

/**
 * 高级筛选Hook
 */
export function useAdvancedFilter(languages: Language[]): UseAdvancedFilterReturn {
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [searchEngine] = useState(() => new SearchEngine());

  // 生成筛选配置
  const filterConfig = useMemo<FilterConfig>(() => {
    const fsiCategories = [
      ...new Set(languages.map((l) => l.fsi.category)),
    ].sort() as FSICategory[];
    const families = [...new Set(languages.map((l) => l.family))].sort();
    const regions = [...new Set(languages.flatMap((l) => l.countries))].sort();

    const difficulties = languages.map((l) => l.difficulty.overall);
    const learningTimes = languages.map((l) => l.fsi.hours);
    const speakers = languages.map((l) => l.speakers);

    return {
      availableFSICategories: fsiCategories,
      availableLanguageFamilies: families,
      availableRegions: regions,
      difficultyBounds: [Math.min(...difficulties), Math.max(...difficulties)],
      learningTimeBounds: [Math.min(...learningTimes), Math.max(...learningTimes)],
      speakersBounds: [Math.min(...speakers), Math.max(...speakers)],
    };
  }, [languages]);

  // 执行筛选逻辑
  const filteredLanguages = useMemo(() => {
    let result = [...languages];

    // FSI等级筛选
    if (filterState.fsiCategories.length > 0) {
      result = result.filter((lang) => filterState.fsiCategories.includes(lang.fsi.category));
    }

    // 语言家族筛选
    if (filterState.languageFamilies.length > 0) {
      result = result.filter((lang) => filterState.languageFamilies.includes(lang.family));
    }

    // 地理区域筛选
    if (filterState.regions.length > 0) {
      result = result.filter((lang) =>
        lang.countries.some((country) => filterState.regions.includes(country))
      );
    }

    // 难度范围筛选
    const [minDifficulty, maxDifficulty] = filterState.difficultyRange;
    result = result.filter(
      (lang) => lang.difficulty.overall >= minDifficulty && lang.difficulty.overall <= maxDifficulty
    );

    // 学习时长范围筛选
    const [minHours, maxHours] = filterState.learningTimeRange;
    result = result.filter((lang) => lang.fsi.hours >= minHours && lang.fsi.hours <= maxHours);

    // 使用人数范围筛选
    const [minSpeakers, maxSpeakers] = filterState.speakersRange;
    result = result.filter((lang) => lang.speakers >= minSpeakers && lang.speakers <= maxSpeakers);

    // 搜索筛选
    if (filterState.searchQuery.trim()) {
      const searchResults = searchEngine.search(filterState.searchQuery, result);
      result = searchResults.map((sr) => sr.language);
    }

    return result;
  }, [languages, filterState, searchEngine]);

  // 更新筛选状态的辅助函数
  const updateFilterState = useCallback(
    (updates: Partial<FilterState>) => {
      setFilterState((prev) => {
        const newState = { ...prev, ...updates };

        // 检查是否有激活的筛选条件（简化检查，避免循环依赖）
        const isActive =
          newState.fsiCategories.length > 0 ||
          newState.languageFamilies.length > 0 ||
          newState.regions.length > 0 ||
          newState.searchQuery.trim() !== '' ||
          (newState.difficultyRange[0] > 1 || newState.difficultyRange[1] < 10) ||
          (newState.learningTimeRange[0] > 0 || newState.learningTimeRange[1] < 3000) ||
          (newState.speakersRange[0] > 0 || newState.speakersRange[1] < 2000000000);

        return { ...newState, isActive };
      });
    },
    [] // 移除filterConfig依赖以避免循环
  );

  // 筛选操作函数
  const setFSICategories = useCallback(
    (categories: FSICategory[]) => {
      updateFilterState({ fsiCategories: categories });
    },
    [updateFilterState]
  );

  const setLanguageFamilies = useCallback(
    (families: string[]) => {
      updateFilterState({ languageFamilies: families });
    },
    [updateFilterState]
  );

  const setRegions = useCallback(
    (regions: string[]) => {
      updateFilterState({ regions });
    },
    [updateFilterState]
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      updateFilterState({ searchQuery: query });
    },
    [updateFilterState]
  );

  const setDifficultyRange = useCallback(
    (range: [number, number]) => {
      updateFilterState({ difficultyRange: range });
    },
    [updateFilterState]
  );

  const setLearningTimeRange = useCallback(
    (range: [number, number]) => {
      updateFilterState({ learningTimeRange: range });
    },
    [updateFilterState]
  );

  const setSpeakersRange = useCallback(
    (range: [number, number]) => {
      updateFilterState({ speakersRange: range });
    },
    [updateFilterState]
  );

  const resetFilters = useCallback(() => {
    setFilterState(DEFAULT_FILTER_STATE);
  }, []);

  // 获取筛选统计信息
  const getFilterStats = useCallback((): FilterResult => {
    const startTime = performance.now();

    const appliedFilters: FilterSummary = {
      fsiCategories:
        filterState.fsiCategories.length > 0
          ? filterState.fsiCategories
              .map(
                (cat) =>
                  `Category ${cat === 0 ? 'Native' : cat === 1 ? 'I' : cat === 2 ? 'II' : cat === 3 ? 'III' : cat === 4 ? 'IV' : 'V'}`
              )
              .join(', ')
          : '',
      families: filterState.languageFamilies.join(', '),
      regions: filterState.regions.join(', '),
      searchQuery: filterState.searchQuery,
      hasRangeFilters:
        filterState.difficultyRange[0] > filterConfig.difficultyBounds[0] ||
        filterState.difficultyRange[1] < filterConfig.difficultyBounds[1] ||
        filterState.learningTimeRange[0] > filterConfig.learningTimeBounds[0] ||
        filterState.learningTimeRange[1] < filterConfig.learningTimeBounds[1] ||
        filterState.speakersRange[0] > filterConfig.speakersBounds[0] ||
        filterState.speakersRange[1] < filterConfig.speakersBounds[1],
    };

    const endTime = performance.now();

    return {
      filteredLanguages,
      totalCount: filteredLanguages.length,
      appliedFilters,
      executionTime: endTime - startTime,
    };
  }, [filterState, filteredLanguages, filterConfig]);

  return {
    filterState,
    filterConfig,
    filteredLanguages,
    setFSICategories,
    setLanguageFamilies,
    setRegions,
    setSearchQuery,
    setDifficultyRange,
    setLearningTimeRange,
    setSpeakersRange,
    resetFilters,
    getFilterStats,
    isLoading: false,
  };
}
