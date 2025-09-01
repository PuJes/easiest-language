/**
 * GeographicRegionFilter 组件测试
 * 测试地理区域筛选器的功能
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GeographicRegionFilter } from '../GeographicRegionFilter';
import { GeographicRegion } from '../../../lib/types/language';

describe('GeographicRegionFilter', () => {
  const mockOnChange = jest.fn();
  const availableRegions: GeographicRegion[] = [
    'Europe',
    'Asia',
    'Africa',
    'North America',
    'South America',
    'Oceania',
  ];

  const regionCounts = {
    Europe: 30,
    Asia: 25,
    Africa: 20,
    'North America': 15,
    'South America': 10,
    Oceania: 5,
  };

  const defaultProps = {
    selectedRegions: [],
    availableRegions,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('渲染', () => {
    it('应该渲染地理区域筛选器标题', () => {
      render(<GeographicRegionFilter {...defaultProps} />);
      expect(screen.getByText('Geographic Region')).toBeInTheDocument();
    });

    it('应该渲染所有可用的地理区域选项', () => {
      render(<GeographicRegionFilter {...defaultProps} />);

      expect(screen.getByLabelText(/Europe/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Asia/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Africa/)).toBeInTheDocument();
      expect(screen.getByLabelText(/North America/)).toBeInTheDocument();
      expect(screen.getByLabelText(/South America/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Oceania/)).toBeInTheDocument();
    });

    it('应该显示每个区域的描述和示例', () => {
      render(<GeographicRegionFilter {...defaultProps} />);

      expect(screen.getByText(/European continent and nearby regions/)).toBeInTheDocument();
      expect(screen.getByText(/English, Spanish, French/)).toBeInTheDocument();
      expect(screen.getByText(/Asian continent including East/)).toBeInTheDocument();
      expect(screen.getByText(/Chinese, Japanese, Korean/)).toBeInTheDocument();
    });

    it('应该显示区域表情符号', () => {
      render(<GeographicRegionFilter {...defaultProps} />);

      expect(screen.getByText('🇪🇺')).toBeInTheDocument();
      expect(screen.getByText('🌏')).toBeInTheDocument();
      expect(screen.getByText('🌍')).toBeInTheDocument();
      expect(screen.getByText('🌎')).toBeInTheDocument();
    });

    it('应该显示颜色指示器', () => {
      render(<GeographicRegionFilter {...defaultProps} />);

      const colorIndicators = screen.getAllByTestId('region-color-indicator');
      expect(colorIndicators).toHaveLength(6);
    });

    it('应该显示语言数量统计', () => {
      render(<GeographicRegionFilter {...defaultProps} regionCounts={regionCounts} />);

      expect(screen.getByText('30 languages')).toBeInTheDocument();
      expect(screen.getByText('25 languages')).toBeInTheDocument();
      expect(screen.getByText('20 languages')).toBeInTheDocument();
    });

    it('应该在没有可用区域时显示空状态', () => {
      render(<GeographicRegionFilter {...defaultProps} availableRegions={[]} />);

      expect(screen.getByText('No geographic regions available')).toBeInTheDocument();
    });

    it('应该默认显示列表视图', () => {
      render(<GeographicRegionFilter {...defaultProps} />);

      expect(screen.getByText('List')).toHaveClass('bg-blue-500');
      expect(screen.getByText('Map')).not.toHaveClass('bg-blue-500');
    });
  });

  describe('选择状态', () => {
    it('应该正确显示已选择的区域', () => {
      render(<GeographicRegionFilter {...defaultProps} selectedRegions={['Europe', 'Asia']} />);

      const europeCheckbox = screen.getByLabelText(/Europe/);
      const asiaCheckbox = screen.getByLabelText(/Asia/);
      const africaCheckbox = screen.getByLabelText(/Africa/);

      expect(europeCheckbox).toBeChecked();
      expect(asiaCheckbox).toBeChecked();
      expect(africaCheckbox).not.toBeChecked();
    });

    it('应该显示选择计数', () => {
      render(
        <GeographicRegionFilter {...defaultProps} selectedRegions={['Europe', 'Asia', 'Africa']} />
      );

      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('应该显示选择摘要', () => {
      render(<GeographicRegionFilter {...defaultProps} selectedRegions={['Europe', 'Asia']} />);

      expect(screen.getByText('Selected regions:')).toBeInTheDocument();
      expect(screen.getByText('Europe, Asia')).toBeInTheDocument();
    });

    it('应该显示总语言数量', () => {
      render(
        <GeographicRegionFilter
          {...defaultProps}
          selectedRegions={['Europe', 'Asia']}
          regionCounts={regionCounts}
        />
      );

      expect(screen.getByText('Total languages: 55')).toBeInTheDocument();
    });

    it('应该在没有选择时隐藏清除按钮和摘要', () => {
      render(<GeographicRegionFilter {...defaultProps} />);

      expect(screen.queryByText('Clear')).not.toBeInTheDocument();
      expect(screen.queryByText('Selected regions:')).not.toBeInTheDocument();
    });

    it('应该在部分选择时显示全选按钮', () => {
      render(<GeographicRegionFilter {...defaultProps} selectedRegions={['Europe']} />);

      expect(screen.getByText('Select All')).toBeInTheDocument();
    });

    it('应该在全选时隐藏全选按钮', () => {
      render(<GeographicRegionFilter {...defaultProps} selectedRegions={availableRegions} />);

      expect(screen.queryByText('Select All')).not.toBeInTheDocument();
    });
  });

  describe('交互', () => {
    it('应该在点击复选框时触发onChange', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} />);

      const europeCheckbox = screen.getByLabelText(/Europe/);
      await user.click(europeCheckbox);

      expect(mockOnChange).toHaveBeenCalledWith(['Europe']);
    });

    it('应该支持多选', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} selectedRegions={['Europe']} />);

      const asiaCheckbox = screen.getByLabelText(/Asia/);
      await user.click(asiaCheckbox);

      expect(mockOnChange).toHaveBeenCalledWith(['Asia', 'Europe']);
    });

    it('应该支持取消选择', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} selectedRegions={['Europe', 'Asia']} />);

      const europeCheckbox = screen.getByLabelText(/Europe/);
      await user.click(europeCheckbox);

      expect(mockOnChange).toHaveBeenCalledWith(['Asia']);
    });

    it('应该在点击清除按钮时清空所有选择', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} selectedRegions={['Europe', 'Asia']} />);

      const clearButton = screen.getByText('Clear');
      await user.click(clearButton);

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });

    it('应该在点击全选按钮时选择所有区域', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} />);

      const selectAllButton = screen.getByText('Select All');
      await user.click(selectAllButton);

      expect(mockOnChange).toHaveBeenCalledWith(availableRegions);
    });

    it('应该支持键盘导航', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} />);

      const europeCheckbox = screen.getByLabelText(/Europe/);
      europeCheckbox.focus();

      await user.keyboard(' ');
      expect(mockOnChange).toHaveBeenCalledWith(['Europe']);

      jest.clearAllMocks();
      await user.keyboard('{Enter}');
      expect(mockOnChange).toHaveBeenCalledWith([]);
    });
  });

  describe('视图切换', () => {
    it('应该支持切换到地图视图', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} />);

      const mapButton = screen.getByText('Map');
      await user.click(mapButton);

      expect(mapButton).toHaveClass('bg-blue-500');
      expect(screen.getByText('List')).not.toHaveClass('bg-blue-500');
      expect(screen.getByText('Interactive world map')).toBeInTheDocument();
    });

    it('应该在地图视图中显示区域按钮', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} regionCounts={regionCounts} />);

      const mapButton = screen.getByText('Map');
      await user.click(mapButton);

      // 应该显示区域按钮
      const europeButton = screen.getByRole('button', { name: /🇪🇺 Europe/ });
      expect(europeButton).toBeInTheDocument();

      // 应该显示语言数量
      expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('应该在地图视图中支持区域选择', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} />);

      const mapButton = screen.getByText('Map');
      await user.click(mapButton);

      const europeButton = screen.getByRole('button', { name: /🇪🇺 Europe/ });
      await user.click(europeButton);

      expect(mockOnChange).toHaveBeenCalledWith(['Europe']);
    });

    it('应该显示地图图例', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} />);

      const mapButton = screen.getByText('Map');
      await user.click(mapButton);

      // 图例应该显示所有区域
      expect(screen.getAllByText('Europe')).toHaveLength(2); // 按钮 + 图例
      expect(screen.getAllByText('Asia')).toHaveLength(2);
    });

    it('应该支持切换回列表视图', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} viewMode="map" />);

      const listButton = screen.getByText('List');
      await user.click(listButton);

      expect(listButton).toHaveClass('bg-blue-500');
      expect(screen.getByText('Map')).not.toHaveClass('bg-blue-500');
      expect(screen.queryByText('Interactive world map')).not.toBeInTheDocument();
    });
  });

  describe('禁用状态', () => {
    it('应该在禁用时正确显示', () => {
      render(<GeographicRegionFilter {...defaultProps} disabled={true} />);

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeDisabled();
      });

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('应该在禁用时不响应点击', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} disabled={true} />);

      const europeCheckbox = screen.getByLabelText(/Europe/);
      await user.click(europeCheckbox);

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('可访问性', () => {
    it('应该有正确的ARIA属性', () => {
      render(<GeographicRegionFilter {...defaultProps} />);

      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('aria-labelledby', 'region-filter-title');

      const title = screen.getByText('Geographic Region');
      expect(title).toHaveAttribute('id', 'region-filter-title');
    });

    it('应该为每个复选框提供描述', () => {
      render(<GeographicRegionFilter {...defaultProps} />);

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute('aria-describedby');
      });
    });
  });

  describe('自定义样式', () => {
    it('应该应用自定义className', () => {
      const customClass = 'custom-region-filter';
      render(<GeographicRegionFilter {...defaultProps} className={customClass} />);

      const container = screen.getByRole('group').parentElement;
      expect(container).toHaveClass(customClass);
    });

    it('应该支持自定义初始视图模式', () => {
      render(<GeographicRegionFilter {...defaultProps} viewMode="map" />);

      expect(screen.getByText('Map')).toHaveClass('bg-blue-500');
      expect(screen.getByText('Interactive world map')).toBeInTheDocument();
    });
  });

  describe('边界情况', () => {
    it('应该处理空的selectedRegions数组', () => {
      render(<GeographicRegionFilter {...defaultProps} selectedRegions={[]} />);

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });

    it('应该正确排序选择的区域', async () => {
      const user = userEvent.setup();
      render(<GeographicRegionFilter {...defaultProps} selectedRegions={['Oceania', 'Europe']} />);

      const asiaCheckbox = screen.getByLabelText(/Asia/);
      await user.click(asiaCheckbox);

      expect(mockOnChange).toHaveBeenCalledWith(['Asia', 'Europe', 'Oceania']);
    });

    it('应该处理无regionCounts的情况', () => {
      render(<GeographicRegionFilter {...defaultProps} />);

      // 不应该显示语言数量
      expect(screen.queryByText(/languages$/)).not.toBeInTheDocument();
    });

    it('应该处理部分regionCounts数据', () => {
      const partialCounts = { Europe: 30, Asia: 25 };
      render(<GeographicRegionFilter {...defaultProps} regionCounts={partialCounts} />);

      expect(screen.getByText('30 languages')).toBeInTheDocument();
      expect(screen.getByText('25 languages')).toBeInTheDocument();
      // 其他区域不应该显示数量
      expect(screen.queryByText('0 languages')).not.toBeInTheDocument();
    });
  });
});
