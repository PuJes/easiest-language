/**
 * useAdvancedFilter Hook 测试
 * 测试高级筛选系统的核心逻辑
 */

import { renderHook, act } from '@testing-library/react';
import { useAdvancedFilter } from '../useAdvancedFilter';
import { Language, FSICategory } from '../../types/language';
import { DEFAULT_FILTER_STATE } from '../../types/filter';

// Mock数据
const mockLanguages: Language[] = [
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    countries: ['Spain', 'Mexico'],
    fsi: {
      category: 1,
      hours: 600,
      description: 'Category I - Easy',
      hoursRange: [600, 750],
    },
    difficulty: {
      overall: 3,
      grammar: 3,
      pronunciation: 2,
      vocabulary: 3,
    },
    family: 'Indo-European',
    subfamily: 'Romance',
    writingSystem: 'Latin',
    speakers: 500000000,
    flagEmoji: '🇪🇸',
    color: '#22c55e',
  },
  {
    id: 'mandarin',
    name: 'Mandarin Chinese',
    nativeName: '普通话',
    countries: ['China', 'Taiwan'],
    fsi: {
      category: 5,
      hours: 2200,
      description: 'Category V - Exceptionally Difficult',
      hoursRange: [2200, 2500],
    },
    difficulty: {
      overall: 9,
      grammar: 8,
      pronunciation: 9,
      vocabulary: 9,
    },
    family: 'Sino-Tibetan',
    subfamily: 'Chinese',
    writingSystem: 'Chinese Characters',
    speakers: 918000000,
    flagEmoji: '🇨🇳',
    color: '#ef4444',
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    countries: ['France', 'Canada'],
    fsi: {
      category: 2,
      hours: 900,
      description: 'Category II - Moderate',
    },
    difficulty: {
      overall: 5,
      grammar: 6,
      pronunciation: 4,
      vocabulary: 5,
    },
    family: 'Indo-European',
    subfamily: 'Romance',
    writingSystem: 'Latin',
    speakers: 280000000,
    flagEmoji: '🇫🇷',
    color: '#3b82f6',
  },
];

describe('useAdvancedFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('初始化', () => {
    it('应该使用默认筛选状态初始化', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      expect(result.current.filterState.fsiCategories).toEqual([]);
      expect(result.current.filterState.languageFamilies).toEqual([]);
      expect(result.current.filterState.regions).toEqual([]);
      expect(result.current.filterState.searchQuery).toBe('');
      expect(result.current.filterState.isActive).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('应该正确产生筛选器配置', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      expect(result.current.filterConfig.availableFSICategories).toContain(1);
      expect(result.current.filterConfig.availableFSICategories).toContain(2);
      expect(result.current.filterConfig.availableFSICategories).toContain(5);
      expect(result.current.filterConfig.availableLanguageFamilies).toContain('Indo-European');
      expect(result.current.filterConfig.availableLanguageFamilies).toContain('Sino-Tibetan');
      expect(result.current.filterConfig.availableRegions).toContain('Spain');
      expect(result.current.filterConfig.availableRegions).toContain('China');
    });

    it('应该返回所有语言作为初始筛选结果', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      expect(result.current.filteredLanguages).toHaveLength(3);
      expect(result.current.filteredLanguages.map(l => l.id)).toContain('spanish');
      expect(result.current.filteredLanguages.map(l => l.id)).toContain('mandarin');
      expect(result.current.filteredLanguages.map(l => l.id)).toContain('french');
    });
  });

  describe('FSI 分类筛选', () => {
    it('应该正确设置 FSI 分类筛选', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setFSICategories([1, 2]);
      });

      expect(result.current.filterState.fsiCategories).toEqual([1, 2]);
      expect(result.current.filterState.isActive).toBe(true);
    });

    it('应该根据 FSI 分类筛选语言', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setFSICategories([1]);
      });

      expect(result.current.filteredLanguages).toHaveLength(1);
      expect(result.current.filteredLanguages[0].id).toBe('spanish');
    });
  });

  describe('语言家族筛选', () => {
    it('应该正确设置语言家族筛选', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setLanguageFamilies(['Indo-European']);
      });

      expect(result.current.filterState.languageFamilies).toEqual(['Indo-European']);
      expect(result.current.filterState.isActive).toBe(true);
    });

    it('应该根据语言家族筛选语言', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setLanguageFamilies(['Indo-European']);
      });

      expect(result.current.filteredLanguages).toHaveLength(2);
      const ids = result.current.filteredLanguages.map((l) => l.id);
      expect(ids).toContain('spanish');
      expect(ids).toContain('french');
    });
  });

  describe('地理区域筛选', () => {
    it('应该正确设置地理区域筛选', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setRegions(['Spain']);
      });

      expect(result.current.filterState.regions).toEqual(['Spain']);
      expect(result.current.filterState.isActive).toBe(true);
    });

    it('应该根据地理区域筛选语言', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setRegions(['Spain']);
      });

      expect(result.current.filteredLanguages).toHaveLength(1);
      expect(result.current.filteredLanguages[0].id).toBe('spanish');
    });
  });

  describe('搜索查询', () => {
    it('应该正确设置搜索查询', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setSearchQuery('spanish');
      });

      expect(result.current.filterState.searchQuery).toBe('spanish');
      expect(result.current.filterState.isActive).toBe(true);
    });

    it('应该根据搜索查询筛选语言', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setSearchQuery('spanish');
      });

      expect(result.current.filteredLanguages).toHaveLength(1);
      expect(result.current.filteredLanguages[0].id).toBe('spanish');
    });

    it('应该支持模糊搜索', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setSearchQuery('chin');
      });

      expect(result.current.filteredLanguages).toHaveLength(1);
      expect(result.current.filteredLanguages[0].id).toBe('mandarin');
    });
  });

  describe('难度范围筛选', () => {
    it('应该正确设置难度范围', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setDifficultyRange([1, 5]);
      });

      expect(result.current.filterState.difficultyRange).toEqual([1, 5]);
      expect(result.current.filterState.isActive).toBe(true);
    });

    it('应该根据难度范围筛选语言', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setDifficultyRange([1, 4]);
      });

      expect(result.current.filteredLanguages).toHaveLength(1);
      expect(result.current.filteredLanguages[0].id).toBe('spanish');
    });
  });

  describe('学习时长范围筛选', () => {
    it('应该正确设置学习时长范围', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setLearningTimeRange([500, 1000]);
      });

      expect(result.current.filterState.learningTimeRange).toEqual([500, 1000]);
      expect(result.current.filterState.isActive).toBe(true);
    });

    it('应该根据学习时长范围筛选语言', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setLearningTimeRange([500, 1000]);
      });

      expect(result.current.filteredLanguages).toHaveLength(2);
      const ids = result.current.filteredLanguages.map(l => l.id);
      expect(ids).toContain('spanish');
      expect(ids).toContain('french');
    });
  });

  describe('使用人数范围筛选', () => {
    it('应该正确设置使用人数范围', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setSpeakersRange([100000000, 600000000]);
      });

      expect(result.current.filterState.speakersRange).toEqual([100000000, 600000000]);
      expect(result.current.filterState.isActive).toBe(true);
    });

    it('应该根据使用人数范围筛选语言', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setSpeakersRange([400000000, 600000000]);
      });

      expect(result.current.filteredLanguages).toHaveLength(1);
      expect(result.current.filteredLanguages[0].id).toBe('spanish');
    });
  });

  describe('组合筛选', () => {
    it('应该支持多个筛选条件组合', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setLanguageFamilies(['Indo-European']);
        result.current.setDifficultyRange([1, 4]);
      });

      expect(result.current.filteredLanguages).toHaveLength(1);
      expect(result.current.filteredLanguages[0].id).toBe('spanish');
    });
  });

  describe('筛选重置', () => {
    it('应该重置筛选状态到默认值', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      // 先设置一些筛选条件
      act(() => {
        result.current.setSearchQuery('test');
        result.current.setFSICategories([1, 2]);
      });

      expect(result.current.filterState.isActive).toBe(true);

      // 重置筛选
      act(() => {
        result.current.resetFilters();
      });

      expect(result.current.filterState.fsiCategories).toEqual([]);
      expect(result.current.filterState.languageFamilies).toEqual([]);
      expect(result.current.filterState.searchQuery).toBe('');
      expect(result.current.filterState.isActive).toBe(false);
      expect(result.current.filteredLanguages).toHaveLength(3);
    });
  });

  describe('筛选统计', () => {
    it('应该返回正确的筛选统计信息', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      const stats = result.current.getFilterStats();

      expect(stats.totalCount).toBe(3);
      expect(stats.filteredLanguages).toHaveLength(3);
      expect(stats.executionTime).toBeGreaterThanOrEqual(0);
      expect(typeof stats.executionTime).toBe('number');
    });
  });

  describe('边界情况', () => {
    it('应该处理空语言列表', () => {
      const { result } = renderHook(() => useAdvancedFilter([]));

      expect(result.current.filteredLanguages).toHaveLength(0);
      expect(result.current.filterConfig.availableFSICategories).toEqual([]);
      expect(result.current.filterConfig.availableLanguageFamilies).toEqual([]);
    });

    it('应该处理无效的搜索查询', () => {
      const { result } = renderHook(() => useAdvancedFilter(mockLanguages));

      act(() => {
        result.current.setSearchQuery('   ');
      });

      // 空查询应该返回所有语言
      expect(result.current.filteredLanguages).toHaveLength(3);
    });
  });
});