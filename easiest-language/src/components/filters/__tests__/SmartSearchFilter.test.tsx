/**
 * SmartSearchFilter 组件测试
 * 测试智能搜索筛选器的功能
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SmartSearchFilter } from '../SmartSearchFilter';
import {
  Language,
  FSICategory,
  LanguageFamily,
  GeographicRegion,
} from '../../../lib/types/language';

// 测试数据
const mockLanguages: Language[] = [
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    family: 'Indo-European',
    subfamily: 'Romance',
    fsi: { category: 1, hours: 600, description: 'Category I - Easy' },
    difficulty: { overall: 3, grammar: 3, pronunciation: 2, vocabulary: 3 },
    speakers: 500000000,
    countries: ['Spain', 'Mexico', 'Argentina'],
    writingSystem: 'Latin',
    flagEmoji: '🇪🇸',
    color: '#22c55e',
  },
  {
    id: 'chinese',
    name: 'Chinese',
    nativeName: '中文',
    family: 'Sino-Tibetan',
    subfamily: 'Chinese',
    fsi: { category: 5, hours: 2200, description: 'Category V - Exceptionally Difficult' },
    difficulty: { overall: 9, grammar: 8, pronunciation: 9, vocabulary: 9 },
    speakers: 1400000000,
    countries: ['China', 'Taiwan', 'Singapore'],
    writingSystem: 'Chinese Characters',
    flagEmoji: '🇨🇳',
    color: '#ef4444',
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    family: 'Indo-European',
    subfamily: 'Romance',
    fsi: { category: 2, hours: 900, description: 'Category II - Moderate' },
    difficulty: { overall: 5, grammar: 6, pronunciation: 4, vocabulary: 5 },
    speakers: 280000000,
    countries: ['France', 'Canada', 'Belgium'],
    writingSystem: 'Latin',
    flagEmoji: '🇫🇷',
    color: '#3b82f6',
  },
];

describe('SmartSearchFilter', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnSearchResults = jest.fn();

  const defaultProps = {
    searchQuery: '',
    onSearchChange: mockOnSearchChange,
    languages: mockLanguages,
    onSearchResults: mockOnSearchResults,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('渲染', () => {
    it('应该渲染搜索输入框', () => {
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('placeholder', 'Search languages, families, regions...');
    });

    it('应该显示搜索图标', () => {
      render(<SmartSearchFilter {...defaultProps} />);

      const searchIcon = screen.getByRole('combobox').parentElement?.querySelector('svg');
      expect(searchIcon).toBeInTheDocument();
    });

    it('应该支持自定义占位符', () => {
      render(<SmartSearchFilter {...defaultProps} placeholder="Custom placeholder" />);

      expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
    });

    it('应该支持自动聚焦', () => {
      render(<SmartSearchFilter {...defaultProps} autoFocus={true} />);

      const searchInput = screen.getByRole('combobox');
      expect(searchInput).toHaveFocus();
    });

    it('应该在有搜索内容时显示清除按钮', () => {
      render(<SmartSearchFilter {...defaultProps} searchQuery="test" />);

      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    it('应该在没有搜索内容时隐藏清除按钮', () => {
      render(<SmartSearchFilter {...defaultProps} />);

      const clearButton = screen.queryByLabelText('Clear search');
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('搜索功能', () => {
    it('应该在输入时触发搜索变更', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'spanish');

      expect(mockOnSearchChange).toHaveBeenCalledWith('spanish');
    });

    it('应该防抖处理搜索', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} debounceDelay={300} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'spa');

      // 防抖期间不应该触发搜索结果
      expect(mockOnSearchResults).not.toHaveBeenCalled();

      // 等待防抖完成
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnSearchResults).toHaveBeenCalled();
      });
    });

    it('应该根据语言名称搜索', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Spanish');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnSearchResults).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              language: expect.objectContaining({ name: 'Spanish' }),
              score: expect.any(Number),
              matches: expect.any(Array),
            }),
          ])
        );
      });
    });

    it('应该根据本地名称搜索', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, '中文');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnSearchResults).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              language: expect.objectContaining({ name: 'Chinese' }),
            }),
          ])
        );
      });
    });

    it('应该根据语言家族搜索', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Indo-European');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        const results = mockOnSearchResults.mock.calls[0][0];
        expect(results).toHaveLength(2); // Spanish and French
        expect(results.map((r: any) => r.language.name)).toEqual(
          expect.arrayContaining(['Spanish', 'French'])
        );
      });
    });

    it('应该根据地理区域搜索', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Europe');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        const results = mockOnSearchResults.mock.calls[0][0];
        expect(results).toHaveLength(2); // Spanish and French
      });
    });

    it('应该根据国家搜索', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'China');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        const results = mockOnSearchResults.mock.calls[0][0];
        expect(results).toHaveLength(1);
        expect(results[0].language.name).toBe('Chinese');
      });
    });

    it('应该根据特点搜索', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const { rerender } = render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Romance');

      // 模拟父组件更新searchQuery
      rerender(<SmartSearchFilter {...defaultProps} searchQuery="Romance" />);

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        const results =
          mockOnSearchResults.mock.calls[mockOnSearchResults.mock.calls.length - 1][0];
        expect(results).toHaveLength(2); // Spanish and French
      });
    });

    it('应该支持大小写不敏感搜索', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const { rerender } = render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'SPANISH');

      // 模拟父组件更新searchQuery
      rerender(<SmartSearchFilter {...defaultProps} searchQuery="SPANISH" />);

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        const results =
          mockOnSearchResults.mock.calls[mockOnSearchResults.mock.calls.length - 1][0];
        expect(results).toHaveLength(1);
        expect(results[0].language.name).toBe('Spanish');
      });
    });

    it('应该按相关性排序搜索结果', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const { rerender } = render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'an'); // 匹配 Spanish, French (France)

      // 模拟父组件更新searchQuery
      rerender(<SmartSearchFilter {...defaultProps} searchQuery="an" />);

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        const results =
          mockOnSearchResults.mock.calls[mockOnSearchResults.mock.calls.length - 1][0];
        expect(results.length).toBeGreaterThan(0);
        // 结果应该按分数排序
        for (let i = 1; i < results.length; i++) {
          expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
        }
      });
    });
  });

  describe('搜索建议', () => {
    it('应该在聚焦时显示搜索建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'spa');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('应该显示语言建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Spanish');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/Spanish \(Español\)/)).toBeInTheDocument();
      });
    });

    it('应该显示家族建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const { rerender } = render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Indo');

      // 模拟父组件更新searchQuery
      rerender(<SmartSearchFilter {...defaultProps} searchQuery="Indo" />);

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/Indo-European family/)).toBeInTheDocument();
      });
    });

    it('应该显示区域建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const { rerender } = render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Spain');

      // 模拟父组件更新searchQuery
      rerender(<SmartSearchFilter {...defaultProps} searchQuery="Spain" />);

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/Languages from Spain/)).toBeInTheDocument();
      });
    });

    it('应该显示国家建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const { rerender } = render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'France');

      // 模拟父组件更新searchQuery
      rerender(<SmartSearchFilter {...defaultProps} searchQuery="France" />);

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/Languages from France/)).toBeInTheDocument();
      });
    });

    it('应该限制建议数量', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} maxSuggestions={2} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'a'); // 匹配多个结果

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        const suggestions = screen.getAllByRole('option');
        expect(suggestions.length).toBeLessThanOrEqual(2);
      });
    });

    it('应该支持点击建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Spanish');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        const suggestion = screen.getByText(/Spanish \(Español\)/);
        expect(suggestion).toBeInTheDocument();
      });

      const suggestion = screen.getByText(/Spanish \(Español\)/);
      await user.click(suggestion);

      expect(mockOnSearchChange).toHaveBeenCalledWith('Spanish');
    });

    it('应该在showSuggestions为false时隐藏建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} showSuggestions={false} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Spanish');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('键盘导航', () => {
    it('应该支持方向键导航建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'a');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      // 按下箭头键
      await user.keyboard('{ArrowDown}');

      const firstOption = screen.getAllByRole('option')[0];
      expect(firstOption).toHaveAttribute('aria-selected', 'true');
    });

    it('应该支持Enter键选择建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Spanish');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(mockOnSearchChange).toHaveBeenCalledWith('Spanish');
    });

    it('应该支持Escape键关闭建议', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Spanish');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('清除功能', () => {
    it('应该支持点击清除按钮', async () => {
      const user = userEvent.setup();
      render(<SmartSearchFilter {...defaultProps} searchQuery="test" />);

      const clearButton = screen.getByLabelText('Clear search');
      await user.click(clearButton);

      expect(mockOnSearchChange).toHaveBeenCalledWith('');
    }, 10000);
  });

  describe('禁用状态', () => {
    it('应该在禁用时正确显示', () => {
      render(<SmartSearchFilter {...defaultProps} disabled={true} />);

      const searchInput = screen.getByRole('combobox');
      expect(searchInput).toBeDisabled();
    });

    it('应该在禁用时不响应输入', async () => {
      const user = userEvent.setup();
      render(<SmartSearchFilter {...defaultProps} disabled={true} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'test');

      expect(mockOnSearchChange).not.toHaveBeenCalled();
    }, 10000);
  });

  describe('可访问性', () => {
    it('应该有正确的ARIA属性', () => {
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      expect(searchInput).toHaveAttribute('aria-label', 'Smart search for languages');
      expect(searchInput).toHaveAttribute('aria-expanded', 'false');
      expect(searchInput).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('应该在显示建议时更新aria-expanded', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'Spanish');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(searchInput).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('自定义样式', () => {
    it('应该应用自定义className', () => {
      const customClass = 'custom-search-filter';
      render(<SmartSearchFilter {...defaultProps} className={customClass} />);

      const container = screen.getByRole('combobox').parentElement?.parentElement;
      expect(container).toHaveClass(customClass);
    });
  });

  describe('边界情况', () => {
    it('应该处理空语言列表', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} languages={[]} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'test');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnSearchResults).toHaveBeenCalledWith([]);
      });
    });

    it('应该处理空搜索查询', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, 'test');
      await user.clear(searchInput);

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnSearchResults).toHaveBeenCalledWith([]);
      });
    });

    it('应该处理特殊字符搜索', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<SmartSearchFilter {...defaultProps} />);

      const searchInput = screen.getByRole('combobox');
      await user.type(searchInput, '中文');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnSearchResults).toHaveBeenCalled();
      });
    });
  });
});
