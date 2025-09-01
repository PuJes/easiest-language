/**
 * 智能搜索筛选器组件
 *
 * 提供智能搜索功能，支持模糊匹配、搜索建议和高亮显示
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Language } from '../../lib/types/language';

interface SmartSearchFilterProps {
  /** 当前搜索查询 */
  searchQuery: string;

  /** 搜索查询变化回调 */
  onSearchChange: (query: string) => void;

  /** 可搜索的语言列表 */
  languages: Language[];

  /** 搜索结果回调 */
  onSearchResults?: (results: SearchResult[]) => void;

  /** 是否禁用 */
  disabled?: boolean;

  /** 自定义样式类名 */
  className?: string;

  /** 占位符文本 */
  placeholder?: string;

  /** 是否显示搜索建议 */
  showSuggestions?: boolean;

  /** 最大建议数量 */
  maxSuggestions?: number;

  /** 防抖延迟（毫秒） */
  debounceDelay?: number;

  /** 是否自动聚焦 */
  autoFocus?: boolean;
}

interface SearchResult {
  language: Language;
  score: number;
  matches: SearchMatch[];
}

interface SearchMatch {
  field: string;
  value: string;
  indices: [number, number][];
}

interface SearchSuggestion {
  type: 'language' | 'family' | 'country';
  value: string;
  label: string;
  count: number;
}

export const SmartSearchFilter: React.FC<SmartSearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  languages,
  onSearchResults,
  disabled = false,
  className = '',
  placeholder = 'Search languages, families, regions...',
  showSuggestions = true,
  maxSuggestions = 8,
  debounceDelay = 300,
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // 防抖处理
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceDelay]);

  // 生成搜索建议
  const generateSuggestions = useMemo(() => {
    if (!showSuggestions || !isFocused) {
      return [];
    }
    
    // 如果没有查询，显示所有语言的建议
    if (!searchQuery.trim()) {
      return languages.slice(0, maxSuggestions).map(language => ({
        type: 'language' as const,
        value: language.name,
        label: `${language.name} (${language.nativeName})`,
        count: 1,
      }));
    }

    const query = searchQuery.toLowerCase();
    const suggestionMap = new Map<string, SearchSuggestion>();

    languages.forEach((language) => {
      // 语言名称匹配
      if (language.name.toLowerCase().includes(query)) {
        const key = `language-${language.name}`;
        if (!suggestionMap.has(key)) {
          suggestionMap.set(key, {
            type: 'language',
            value: language.name,
            label: `${language.name} (${language.nativeName})`,
            count: 1,
          });
        }
      }

      // 本地名称匹配
      if (language.nativeName.toLowerCase().includes(query)) {
        const key = `language-${language.name}`;
        if (!suggestionMap.has(key)) {
          suggestionMap.set(key, {
            type: 'language',
            value: language.name,
            label: `${language.name} (${language.nativeName})`,
            count: 1,
          });
        }
      }

      // 语言家族匹配
      if (language.family.toLowerCase().includes(query)) {
        const key = `family-${language.family}`;
        const existing = suggestionMap.get(key);
        if (existing) {
          existing.count++;
        } else {
          suggestionMap.set(key, {
            type: 'family',
            value: language.family,
            label: `${language.family} family`,
            count: 1,
          });
        }
      }

      // 子家族匹配
      if (language.subfamily.toLowerCase().includes(query)) {
        const key = `subfamily-${language.subfamily}`;
        const existing = suggestionMap.get(key);
        if (existing) {
          existing.count++;
        } else {
          suggestionMap.set(key, {
            type: 'family',
            value: language.subfamily,
            label: `${language.subfamily} subfamily`,
            count: 1,
          });
        }
      }

      // 国家匹配
      language.countries.forEach((country) => {
        if (country.toLowerCase().includes(query)) {
          const key = `country-${country}`;
          const existing = suggestionMap.get(key);
          if (existing) {
            existing.count++;
          } else {
            suggestionMap.set(key, {
              type: 'country',
              value: country,
              label: `Languages from ${country}`,
              count: 1,
            });
          }
        }
      });
    });

    // 按相关性排序
    return Array.from(suggestionMap.values())
      .sort((a, b) => {
        // 优先级：语言 > 家族 > 国家
        const typeOrder = { language: 0, family: 1, country: 2 };
        const typeDiff = typeOrder[a.type] - typeOrder[b.type];
        if (typeDiff !== 0) return typeDiff;

        // 然后按匹配度排序
        const aStartsWith = a.value.toLowerCase().startsWith(query);
        const bStartsWith = b.value.toLowerCase().startsWith(query);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        // 最后按计数排序
        return b.count - a.count;
      })
      .slice(0, maxSuggestions);
  }, [searchQuery, languages, showSuggestions, maxSuggestions, isFocused]);

  // 更新建议
  useEffect(() => {
    setSuggestions(generateSuggestions);
    setSelectedSuggestionIndex(-1);
  }, [generateSuggestions]);

  // 执行搜索
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      onSearchResults?.([]);
      return;
    }

    const results = performSearch(debouncedQuery, languages);
    onSearchResults?.(results);
  }, [debouncedQuery, languages, onSearchResults]);

  /**
   * 执行搜索
   */
  const performSearch = (query: string, searchLanguages: Language[]): SearchResult[] => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const results: SearchResult[] = [];

    searchLanguages.forEach((language) => {
      const matches: SearchMatch[] = [];
      let score = 0;

      // 搜索语言名称
      const nameMatch = findMatches(language.name, searchTerm);
      if (nameMatch.length > 0) {
        matches.push({
          field: 'name',
          value: language.name,
          indices: nameMatch,
        });
        score += nameMatch.length * 10; // 名称匹配权重最高
      }

      // 搜索本地名称
      const nativeNameMatch = findMatches(language.nativeName, searchTerm);
      if (nativeNameMatch.length > 0) {
        matches.push({
          field: 'nativeName',
          value: language.nativeName,
          indices: nativeNameMatch,
        });
        score += nativeNameMatch.length * 8;
      }

      // 搜索语言家族
      const familyMatch = findMatches(language.family, searchTerm);
      if (familyMatch.length > 0) {
        matches.push({
          field: 'family',
          value: language.family,
          indices: familyMatch,
        });
        score += familyMatch.length * 6;
      }

      // 搜索子家族
      const subfamilyMatch = findMatches(language.subfamily, searchTerm);
      if (subfamilyMatch.length > 0) {
        matches.push({
          field: 'subfamily',
          value: language.subfamily,
          indices: subfamilyMatch,
        });
        score += subfamilyMatch.length * 6; // 子家族匹配权重与家族相同
      }

      // 搜索国家
      language.countries.forEach((country) => {
        const countryMatch = findMatches(country, searchTerm);
        if (countryMatch.length > 0) {
          matches.push({
            field: 'countries',
            value: country,
            indices: countryMatch,
          });
          score += countryMatch.length * 3;
        }
      });

      // 搜索写作系统
      const writingSystemMatch = findMatches(language.writingSystem, searchTerm);
      if (writingSystemMatch.length > 0) {
        matches.push({
          field: 'writingSystem',
          value: language.writingSystem,
          indices: writingSystemMatch,
        });
        score += writingSystemMatch.length * 2;
      }

      if (matches.length > 0) {
        results.push({
          language,
          score,
          matches,
        });
      }
    });

    // 按分数排序
    return results.sort((a, b) => b.score - a.score);
  };

  /**
   * 查找匹配的索引
   */
  const findMatches = (text: string, searchTerm: string): [number, number][] => {
    if (!text || typeof text !== 'string') return [];
    
    const matches: [number, number][] = [];
    const lowerText = text.toLowerCase();
    let startIndex = 0;

    while (true) {
      const index = lowerText.indexOf(searchTerm, startIndex);
      if (index === -1) break;

      matches.push([index, index + searchTerm.length]);
      startIndex = index + 1;
    }

    return matches;
  };

  /**
   * 处理输入变化
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  /**
   * 处理键盘事件
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;

      case 'ArrowUp':
        event.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;

      case 'Enter':
        event.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          const suggestion = suggestions[selectedSuggestionIndex];
          handleSuggestionClick(suggestion);
        }
        break;

      case 'Escape':
        setIsFocused(false);
        inputRef.current?.blur();
        break;
    }
  };

  /**
   * 处理建议点击
   */
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSearchChange(suggestion.value);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  /**
   * 处理焦点
   */
  const handleFocus = () => {
    setIsFocused(true);
  };

  /**
   * 处理失焦
   */
  const handleBlur = () => {
    // 延迟隐藏建议，以便点击建议
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  /**
   * 清除搜索
   */
  const handleClear = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  /**
   * 获取建议图标
   */
  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'language':
        return '🌐';
      case 'family':
        return '👥';
      case 'country':
        return '🏳️';
      default:
        return '🔍';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* 搜索输入框 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            w-full px-4 py-3 pl-12 pr-10 text-sm border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            dark:bg-gray-700 dark:border-gray-600 dark:text-white 
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''}
          `}
          aria-label="Smart search for languages"
          aria-expanded={isFocused && suggestions.length > 0}
          aria-haspopup="listbox"
          role="combobox"
        />

        {/* 搜索图标 */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
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

        {/* 清除按钮 */}
        {searchQuery && (
          <button
            onClick={handleClear}
            disabled={disabled}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* 搜索建议 */}
      {showSuggestions && isFocused && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.value}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                ${index === selectedSuggestionIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === suggestions.length - 1 ? 'rounded-b-lg' : ''}
              `}
              role="option"
              aria-selected={index === selectedSuggestionIndex}
            >
              <span className="text-lg flex-shrink-0">{getSuggestionIcon(suggestion.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {suggestion.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {suggestion.type} • {suggestion.count} result{suggestion.count !== 1 ? 's' : ''}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 搜索状态 */}
      {searchQuery && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {debouncedQuery !== searchQuery ? (
            <span>Searching...</span>
          ) : (
            <span>Search results for "{debouncedQuery}"</span>
          )}
        </div>
      )}
    </div>
  );
};
