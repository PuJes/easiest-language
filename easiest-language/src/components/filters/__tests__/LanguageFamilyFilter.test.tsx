/**
 * LanguageFamilyFilter 组件测试
 * 测试语言家族筛选器的功能
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageFamilyFilter } from '../LanguageFamilyFilter';
import { LanguageFamily } from '../../../lib/types/language';

describe('LanguageFamilyFilter', () => {
  const mockOnChange = jest.fn();
  const availableFamilies: LanguageFamily[] = [
    'Indo-European',
    'Sino-Tibetan',
    'Niger-Congo',
    'Afro-Asiatic',
    'Austronesian',
  ];

  const familyCounts = {
    'Indo-European': 25,
    'Sino-Tibetan': 15,
    'Niger-Congo': 10,
    'Afro-Asiatic': 8,
    Austronesian: 5,
  };

  const defaultProps = {
    selectedFamilies: [],
    availableFamilies,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('渲染', () => {
    it('应该渲染语言家族筛选器标题', () => {
      render(<LanguageFamilyFilter {...defaultProps} />);
      expect(screen.getByText('Language Family')).toBeInTheDocument();
    });

    it('应该渲染所有可用的语言家族选项', () => {
      render(<LanguageFamilyFilter {...defaultProps} />);

      expect(screen.getByLabelText(/Indo-European/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Sino-Tibetan/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Niger-Congo/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Afro-Asiatic/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Austronesian/)).toBeInTheDocument();
    });

    it('应该显示每个家族的描述和示例', () => {
      render(<LanguageFamilyFilter {...defaultProps} />);

      expect(screen.getByText(/The largest language family/)).toBeInTheDocument();
      expect(screen.getByText(/English, Spanish, French/)).toBeInTheDocument();
      expect(screen.getByText(/Second largest family/)).toBeInTheDocument();
      expect(screen.getByText(/Mandarin, Cantonese/)).toBeInTheDocument();
    });

    it('应该显示颜色指示器', () => {
      render(<LanguageFamilyFilter {...defaultProps} />);

      const colorIndicators = screen.getAllByTestId('family-color-indicator');
      expect(colorIndicators).toHaveLength(5);
    });

    it('应该显示语言数量统计', () => {
      render(<LanguageFamilyFilter {...defaultProps} familyCounts={familyCounts} />);

      expect(screen.getByText('25 languages')).toBeInTheDocument();
      expect(screen.getByText('15 languages')).toBeInTheDocument();
      expect(screen.getByText('10 languages')).toBeInTheDocument();
    });

    it('应该在没有可用家族时显示空状态', () => {
      render(<LanguageFamilyFilter {...defaultProps} availableFamilies={[]} />);

      expect(screen.getByText('No language families available')).toBeInTheDocument();
    });

    it('应该默认显示搜索框', () => {
      render(<LanguageFamilyFilter {...defaultProps} />);

      expect(screen.getByPlaceholderText('Search language families...')).toBeInTheDocument();
    });

    it('应该在showSearch为false时隐藏搜索框', () => {
      render(<LanguageFamilyFilter {...defaultProps} showSearch={false} />);

      expect(screen.queryByPlaceholderText('Search language families...')).not.toBeInTheDocument();
    });
  });

  describe('选择状态', () => {
    it('应该正确显示已选择的家族', () => {
      render(
        <LanguageFamilyFilter
          {...defaultProps}
          selectedFamilies={['Indo-European', 'Sino-Tibetan']}
        />
      );

      const indoEuropeanCheckbox = screen.getByLabelText(/Indo-European/);
      const sinoTibetanCheckbox = screen.getByLabelText(/Sino-Tibetan/);
      const nigerCongoCheckbox = screen.getByLabelText(/Niger-Congo/);

      expect(indoEuropeanCheckbox).toBeChecked();
      expect(sinoTibetanCheckbox).toBeChecked();
      expect(nigerCongoCheckbox).not.toBeChecked();
    });

    it('应该显示选择计数', () => {
      render(
        <LanguageFamilyFilter
          {...defaultProps}
          selectedFamilies={['Indo-European', 'Sino-Tibetan', 'Niger-Congo']}
        />
      );

      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('应该显示选择摘要', () => {
      render(
        <LanguageFamilyFilter
          {...defaultProps}
          selectedFamilies={['Indo-European', 'Sino-Tibetan']}
        />
      );

      expect(screen.getByText('Selected:')).toBeInTheDocument();
      expect(screen.getByText('Indo-European, Sino-Tibetan')).toBeInTheDocument();
    });

    it('应该在没有选择时隐藏清除按钮和摘要', () => {
      render(<LanguageFamilyFilter {...defaultProps} />);

      expect(screen.queryByText('Clear')).not.toBeInTheDocument();
      expect(screen.queryByText('Selected:')).not.toBeInTheDocument();
    });
  });

  describe('交互', () => {
    it('应该在点击复选框时触发onChange', async () => {
      const user = userEvent.setup();
      render(<LanguageFamilyFilter {...defaultProps} />);

      const indoEuropeanCheckbox = screen.getByLabelText(/Indo-European/);
      await user.click(indoEuropeanCheckbox);

      expect(mockOnChange).toHaveBeenCalledWith(['Indo-European']);
    });

    it('应该支持多选', async () => {
      const user = userEvent.setup();
      render(<LanguageFamilyFilter {...defaultProps} selectedFamilies={['Indo-European']} />);

      const sinoTibetanCheckbox = screen.getByLabelText(/Sino-Tibetan/);
      await user.click(sinoTibetanCheckbox);

      expect(mockOnChange).toHaveBeenCalledWith(['Indo-European', 'Sino-Tibetan']);
    });

    it('应该支持取消选择', async () => {
      const user = userEvent.setup();
      render(
        <LanguageFamilyFilter
          {...defaultProps}
          selectedFamilies={['Indo-European', 'Sino-Tibetan']}
        />
      );

      const indoEuropeanCheckbox = screen.getByLabelText(/Indo-European/);
      await user.click(indoEuropeanCheckbox);

      expect(mockOnChange).toHaveBeenCalledWith(['Sino-Tibetan']);
    });

    it('应该在点击清除按钮时清空所有选择', async () => {
      const user = userEvent.setup();
      render(
        <LanguageFamilyFilter
          {...defaultProps}
          selectedFamilies={['Indo-European', 'Sino-Tibetan']}
        />
      );

      const clearButton = screen.getByText('Clear');
      await user.click(clearButton);

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });

    it('应该支持键盘导航', async () => {
      const user = userEvent.setup();
      render(<LanguageFamilyFilter {...defaultProps} />);

      const indoEuropeanCheckbox = screen.getByLabelText(/Indo-European/);
      indoEuropeanCheckbox.focus();

      await user.keyboard(' ');
      expect(mockOnChange).toHaveBeenCalledWith(['Indo-European']);

      jest.clearAllMocks();
      await user.keyboard('{Enter}');
      expect(mockOnChange).toHaveBeenCalledWith([]);
    });
  });

  describe('搜索功能', () => {
    it('应该根据家族名称筛选', async () => {
      const user = userEvent.setup();
      render(<LanguageFamilyFilter {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search language families...');
      await user.type(searchInput, 'Indo');

      expect(screen.getByLabelText(/Indo-European/)).toBeInTheDocument();
      expect(screen.queryByLabelText(/Sino-Tibetan/)).not.toBeInTheDocument();
    });

    it('应该根据描述筛选', async () => {
      const user = userEvent.setup();
      render(<LanguageFamilyFilter {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search language families...');
      await user.type(searchInput, 'largest');

      expect(screen.getByLabelText(/Indo-European/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Sino-Tibetan/)).toBeInTheDocument();
    });

    it('应该根据示例语言筛选', async () => {
      const user = userEvent.setup();
      render(<LanguageFamilyFilter {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search language families...');
      await user.type(searchInput, 'Mandarin');

      expect(screen.getByLabelText(/Sino-Tibetan/)).toBeInTheDocument();
      expect(screen.queryByLabelText(/Indo-European/)).not.toBeInTheDocument();
    });

    it('应该在搜索无结果时显示提示', async () => {
      const user = userEvent.setup();
      render(<LanguageFamilyFilter {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search language families...');
      await user.type(searchInput, 'nonexistent');

      expect(screen.getByText(/No families found for "nonexistent"/)).toBeInTheDocument();
      expect(screen.getByText('Clear search')).toBeInTheDocument();
    });

    it('应该支持清除搜索', async () => {
      const user = userEvent.setup();
      render(<LanguageFamilyFilter {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Search language families...');
      await user.type(searchInput, 'nonexistent');

      const clearSearchButton = screen.getByText('Clear search');
      await user.click(clearSearchButton);

      expect(searchInput).toHaveValue('');
      expect(screen.getByLabelText(/Indo-European/)).toBeInTheDocument();
    });
  });

  describe('折叠功能', () => {
    const manyFamilies: LanguageFamily[] = [
      'Indo-European',
      'Sino-Tibetan',
      'Niger-Congo',
      'Afro-Asiatic',
      'Austronesian',
      'Trans-New Guinea',
      'Japonic',
      'Koreanic',
      'Dravidian',
      'Altaic',
      'Tai-Kadai',
      'Hmong-Mien',
      'Ainu',
    ];

    it('应该在超过maxVisible时显示展开按钮', () => {
      render(
        <LanguageFamilyFilter {...defaultProps} availableFamilies={manyFamilies} maxVisible={5} />
      );

      expect(screen.getByText(/Show 8 more/)).toBeInTheDocument();
    });

    it('应该支持展开和折叠', async () => {
      const user = userEvent.setup();
      render(
        <LanguageFamilyFilter {...defaultProps} availableFamilies={manyFamilies} maxVisible={5} />
      );

      // 初始状态只显示5个
      expect(screen.getAllByRole('checkbox')).toHaveLength(5);

      // 点击展开
      const expandButton = screen.getByText(/Show 8 more/);
      await user.click(expandButton);

      // 现在应该显示所有13个
      expect(screen.getAllByRole('checkbox')).toHaveLength(13);
      expect(screen.getByText(/Show less/)).toBeInTheDocument();

      // 点击折叠
      const collapseButton = screen.getByText(/Show less/);
      await user.click(collapseButton);

      // 又回到5个
      expect(screen.getAllByRole('checkbox')).toHaveLength(5);
    });
  });

  describe('禁用状态', () => {
    it('应该在禁用时正确显示', () => {
      render(<LanguageFamilyFilter {...defaultProps} disabled={true} />);

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeDisabled();
      });

      const searchInput = screen.getByPlaceholderText('Search language families...');
      expect(searchInput).toBeDisabled();
    });

    it('应该在禁用时不响应点击', async () => {
      const user = userEvent.setup();
      render(<LanguageFamilyFilter {...defaultProps} disabled={true} />);

      const indoEuropeanCheckbox = screen.getByLabelText(/Indo-European/);
      await user.click(indoEuropeanCheckbox);

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('可访问性', () => {
    it('应该有正确的ARIA属性', () => {
      render(<LanguageFamilyFilter {...defaultProps} />);

      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('aria-labelledby', 'family-filter-title');

      const title = screen.getByText('Language Family');
      expect(title).toHaveAttribute('id', 'family-filter-title');
    });

    it('应该为每个复选框提供描述', () => {
      render(<LanguageFamilyFilter {...defaultProps} />);

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute('aria-describedby');
      });
    });
  });

  describe('自定义样式', () => {
    it('应该应用自定义className', () => {
      const customClass = 'custom-family-filter';
      render(<LanguageFamilyFilter {...defaultProps} className={customClass} />);

      const container = screen.getByRole('group').parentElement;
      expect(container).toHaveClass(customClass);
    });
  });

  describe('边界情况', () => {
    it('应该处理空的selectedFamilies数组', () => {
      render(<LanguageFamilyFilter {...defaultProps} selectedFamilies={[]} />);

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });

    it('应该正确排序选择的家族', async () => {
      const user = userEvent.setup();
      render(
        <LanguageFamilyFilter
          {...defaultProps}
          selectedFamilies={['Sino-Tibetan', 'Indo-European']}
        />
      );

      const nigerCongoCheckbox = screen.getByLabelText(/Niger-Congo/);
      await user.click(nigerCongoCheckbox);

      expect(mockOnChange).toHaveBeenCalledWith(['Indo-European', 'Niger-Congo', 'Sino-Tibetan']);
    });

    it('应该处理无familyCounts的情况', () => {
      render(<LanguageFamilyFilter {...defaultProps} />);

      // 不应该显示语言数量
      expect(screen.queryByText(/languages$/)).not.toBeInTheDocument();
    });
  });
});
