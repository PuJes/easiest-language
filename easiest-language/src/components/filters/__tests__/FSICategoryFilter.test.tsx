/**
 * FSICategoryFilter 组件测试
 * 测试FSI难度等级筛选器的功能
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FSICategoryFilter } from '../FSICategoryFilter';
import { FSICategory } from '../../../lib/types/language';

describe('FSICategoryFilter', () => {
  const mockOnChange = jest.fn();
  const availableCategories: FSICategory[] = [0, 1, 2, 3, 4, 5];
  const defaultProps = {
    selectedCategories: [],
    availableCategories,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('渲染', () => {
    it('应该渲染所有可用的FSI等级选项', () => {
      render(<FSICategoryFilter {...defaultProps} />);

      expect(screen.getByText('FSI Difficulty Level')).toBeInTheDocument();
      expect(screen.getByText('Native (0h)')).toBeInTheDocument();
      expect(screen.getByText('Category I (600-750h)')).toBeInTheDocument();
      expect(screen.getByText('Category II (900h)')).toBeInTheDocument();
      expect(screen.getByText('Category III (1100h)')).toBeInTheDocument();
      expect(screen.getByText('Category IV (1800h)')).toBeInTheDocument();
      expect(screen.getByText('Category V (2200h)')).toBeInTheDocument();
    });

    it('应该显示选中的等级', () => {
      render(<FSICategoryFilter {...defaultProps} selectedCategories={[1, 3]} />);

      const category1Checkbox = screen.getByTestId('fsi-category-1-checkbox');
      const category3Checkbox = screen.getByTestId('fsi-category-3-checkbox');

      expect(category1Checkbox).toBeChecked();
      expect(category3Checkbox).toBeChecked();
    });

    it('应该显示选中数量的徽章', () => {
      render(<FSICategoryFilter {...defaultProps} selectedCategories={[1, 2, 3]} />);

      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('交互', () => {
    it('应该在点击选项时调用onChange', () => {
      render(<FSICategoryFilter {...defaultProps} />);

      const category1Checkbox = screen.getByTestId('fsi-category-1-checkbox');
      fireEvent.click(category1Checkbox);

      expect(mockOnChange).toHaveBeenCalledWith([1]);
    });

    it('应该支持多选', () => {
      render(<FSICategoryFilter {...defaultProps} selectedCategories={[1]} />);

      const category2Checkbox = screen.getByTestId('fsi-category-2-checkbox');
      fireEvent.click(category2Checkbox);

      expect(mockOnChange).toHaveBeenCalledWith([1, 2]);
    });

    it('应该支持取消选择', () => {
      render(<FSICategoryFilter {...defaultProps} selectedCategories={[1, 2]} />);

      const category1Checkbox = screen.getByTestId('fsi-category-1-checkbox');
      fireEvent.click(category1Checkbox);

      expect(mockOnChange).toHaveBeenCalledWith([2]);
    });

    it('应该在点击清除按钮时清空所有选择', () => {
      render(<FSICategoryFilter {...defaultProps} selectedCategories={[1, 2, 3]} />);

      const clearButton = screen.getByText('Clear');
      fireEvent.click(clearButton);

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });
  });

  describe('可访问性', () => {
    it('应该支持键盘导航', () => {
      render(<FSICategoryFilter {...defaultProps} />);

      const category1Checkbox = screen.getByTestId('fsi-category-1-checkbox');
      category1Checkbox.focus();

      expect(category1Checkbox).toHaveFocus();

      fireEvent.keyDown(category1Checkbox, { key: ' ' });
      expect(mockOnChange).toHaveBeenCalledWith([1]);
    });

    it('应该有正确的ARIA标签', () => {
      render(<FSICategoryFilter {...defaultProps} />);

      const filterGroup = screen.getByRole('group');
      expect(filterGroup).toHaveAttribute('aria-labelledby');

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute('aria-describedby');
      });
    });
  });

  describe('FSI等级信息', () => {
    it('应该显示每个等级的学习时长信息', () => {
      render(<FSICategoryFilter {...defaultProps} />);

      expect(screen.getByText(/600-750h/)).toBeInTheDocument();
      expect(screen.getByText(/900h/)).toBeInTheDocument();
      expect(screen.getByText(/1100h/)).toBeInTheDocument();
      expect(screen.getByText(/1800h/)).toBeInTheDocument();
      expect(screen.getByText(/2200h/)).toBeInTheDocument();
    });

    it('应该显示每个等级的颜色指示器', () => {
      render(<FSICategoryFilter {...defaultProps} />);

      const colorIndicators = screen.getAllByTestId('fsi-color-indicator');
      expect(colorIndicators).toHaveLength(6);
    });
  });

  describe('边界情况', () => {
    it('应该处理空的可用等级列表', () => {
      render(<FSICategoryFilter {...defaultProps} availableCategories={[]} />);

      expect(screen.getByText('No FSI categories available')).toBeInTheDocument();
    });

    it('应该处理无效的选中等级', () => {
      render(<FSICategoryFilter {...defaultProps} selectedCategories={[1, 99 as FSICategory]} />);

      // 应该只显示有效的选中等级
      const checkedBoxes = screen.getAllByRole('checkbox', { checked: true });
      expect(checkedBoxes).toHaveLength(1);
    });
  });
});
