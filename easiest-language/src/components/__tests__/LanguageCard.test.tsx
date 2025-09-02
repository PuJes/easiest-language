/**
 * LanguageCard 组件测试
 * 测试语言卡片组件的渲染和交互功能
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageCard from '../LanguageCard';
import { Language } from '@/lib/types/language';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      onClick,
      className,
      whileHover,
      whileTap,
      layout,
      transition,
      ...props
    }: any) => (
      <div onClick={onClick} className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    button: ({ children, onClick, className, whileHover, whileTap, ...props }: any) => (
      <button onClick={onClick} className={className} data-testid="motion-button" {...props}>
        {children}
      </button>
    ),
  },
}));

// Mock FSIBadge 组件
jest.mock('../FSIBadge', () => {
  return function MockFSIBadge({ category, size, showLabel }: any) {
    return (
      <div data-testid="fsi-badge">
        FSI Badge - Category: {category}, Size: {size}, Label: {showLabel}
      </div>
    );
  };
});

// Mock Language 数据
const mockLanguage: Language = {
  id: 'spanish',
  name: 'Spanish',
  nativeName: 'Español',
  countries: ['Spain', 'Mexico', 'Argentina'],
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
};

const mockLanguageWithoutRange: Language = {
  ...mockLanguage,
  id: 'simple',
  name: 'Simple Language',
  fsi: {
    category: 2,
    hours: 900,
    description: 'Category II - Moderate',
  },
  speakers: 1500000,
  countries: ['Country1', 'Country2', 'Country3', 'Country4', 'Country5'],
};

const mockNativeLanguage: Language = {
  ...mockLanguage,
  id: 'english',
  name: 'English',
  fsi: {
    category: 0,
    hours: 0,
    description: 'Native Language',
  },
};

describe('LanguageCard', () => {
  const mockOnCompare = jest.fn();
  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('基本渲染', () => {
    it('应该正确渲染语言基本信息', () => {
      render(
        <LanguageCard
          language={mockLanguage}
          onCompare={mockOnCompare}
          onViewDetails={mockOnViewDetails}
        />
      );

      expect(screen.getByText('Spanish')).toBeInTheDocument();
      expect(screen.getByText('Español')).toBeInTheDocument();
      expect(screen.getByTestId('fsi-badge')).toBeInTheDocument();
    });

    it('应该显示格式化的学习时长', () => {
      render(<LanguageCard language={mockLanguage} />);

      expect(screen.getByText('600-750 hours')).toBeInTheDocument();
    });

    it('应该显示格式化的使用人数', () => {
      render(<LanguageCard language={mockLanguage} />);

      expect(screen.getByText('500M')).toBeInTheDocument();
    });

    it('应该显示国家数量', () => {
      render(<LanguageCard language={mockLanguage} />);

      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('countries')).toBeInTheDocument();
    });

    it('应该显示语言家族信息', () => {
      render(<LanguageCard language={mockLanguage} />);

      expect(screen.getByText('Indo-European')).toBeInTheDocument();
      expect(screen.getByText('family')).toBeInTheDocument();
    });

    it('应该显示前3个国家', () => {
      render(<LanguageCard language={mockLanguage} />);

      expect(screen.getByText(/Spain, Mexico, Argentina/)).toBeInTheDocument();
    });
  });

  describe('格式化功能', () => {
    it('应该正确格式化数十亿级别的使用人数', () => {
      const language = {
        ...mockLanguage,
        speakers: 1500000000, // 1.5B
      };
      render(<LanguageCard language={language} />);

      expect(screen.getByText('1.5B')).toBeInTheDocument();
    });

    it('应该正确格式化数千级别的使用人数', () => {
      const language = {
        ...mockLanguage,
        speakers: 150000, // 150K
      };
      render(<LanguageCard language={language} />);

      expect(screen.getByText('150K')).toBeInTheDocument();
    });

    it('应该正确格式化小数字的使用人数', () => {
      const language = {
        ...mockLanguage,
        speakers: 500, // 直接显示
      };
      render(<LanguageCard language={language} />);

      expect(screen.getByText('500')).toBeInTheDocument();
    });

    it('应该为没有小时范围的语言显示固定小时数', () => {
      render(<LanguageCard language={mockLanguageWithoutRange} />);

      expect(screen.getByText('900 hours')).toBeInTheDocument();
    });

    it('应该为母语显示 "Native"', () => {
      render(<LanguageCard language={mockNativeLanguage} />);

      expect(screen.getByText('Native')).toBeInTheDocument();
    });

    it('应该为超过3个国家的语言显示 "+N more"', () => {
      render(<LanguageCard language={mockLanguageWithoutRange} />);

      expect(screen.getByText(/Country1, Country2, Country3, \+2 more/)).toBeInTheDocument();
    });
  });

  describe('交互功能', () => {
    it('应该在点击卡片时调用 onViewDetails', () => {
      render(
        <LanguageCard
          language={mockLanguage}
          onCompare={mockOnCompare}
          onViewDetails={mockOnViewDetails}
        />
      );

      const card = screen.getByTestId('motion-div');
      fireEvent.click(card);

      expect(mockOnViewDetails).toHaveBeenCalledWith(mockLanguage);
    });

    it('应该在点击比较按钮时调用 onCompare', () => {
      render(
        <LanguageCard
          language={mockLanguage}
          onCompare={mockOnCompare}
          onViewDetails={mockOnViewDetails}
        />
      );

      const compareButton = screen.getByText('Compare');
      fireEvent.click(compareButton);

      expect(mockOnCompare).toHaveBeenCalledWith(mockLanguage);
      expect(mockOnViewDetails).not.toHaveBeenCalled(); // 确保点击比较按钮不会触发详情
    });

    it('应该支持隐藏比较按钮', () => {
      render(
        <LanguageCard
          language={mockLanguage}
          showCompareButton={false}
          onCompare={mockOnCompare}
          onViewDetails={mockOnViewDetails}
        />
      );

      expect(screen.queryByText('Compare')).not.toBeInTheDocument();
    });

    it('应该在没有 onCompare 回调时不显示错误', () => {
      render(
        <LanguageCard
          language={mockLanguage}
          showCompareButton={true}
          onViewDetails={mockOnViewDetails}
        />
      );

      const compareButton = screen.getByText('Compare');

      // 这应该不会抛出错误
      expect(() => fireEvent.click(compareButton)).not.toThrow();
    });

    it('应该在没有 onViewDetails 回调时不显示错误', () => {
      render(<LanguageCard language={mockLanguage} />);

      const card = screen.getByTestId('motion-div');

      // 这应该不会抛出错误
      expect(() => fireEvent.click(card)).not.toThrow();
    });
  });

  describe('样式和类名', () => {
    it('应该应用自定义类名', () => {
      const customClass = 'custom-language-card';
      render(<LanguageCard language={mockLanguage} className={customClass} />);

      const card = screen.getByTestId('motion-div');
      expect(card).toHaveClass(customClass);
    });

    it('应该显示难度指示器', () => {
      render(<LanguageCard language={mockLanguage} />);

      expect(screen.getByText('Difficulty:')).toBeInTheDocument();
    });
  });

  describe('可访问性', () => {
    it('应该包含语义化的内容', () => {
      render(<LanguageCard language={mockLanguage} />);

      expect(screen.getByText('Click for details')).toBeInTheDocument();
      expect(screen.getByText('FSI Study Time')).toBeInTheDocument();
      expect(screen.getByText('for English speakers')).toBeInTheDocument();
      expect(screen.getByText('speakers')).toBeInTheDocument();
    });

    it('应该正确显示 FSI Badge 组件的属性', () => {
      render(<LanguageCard language={mockLanguage} />);

      const fsiBadge = screen.getByTestId('fsi-badge');
      expect(fsiBadge).toHaveTextContent('FSI Badge - Category: 1, Size: md, Label:');
    });
  });

  describe('边界情况', () => {
    it('应该处理没有国家信息的语言', () => {
      const languageNoCountries = {
        ...mockLanguage,
        countries: [],
      };

      render(<LanguageCard language={languageNoCountries} />);

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('countries')).toBeInTheDocument();
    });

    it('应该处理只有一个国家的语言', () => {
      const languageOneCountry = {
        ...mockLanguage,
        countries: ['Spain'],
      };

      render(<LanguageCard language={languageOneCountry} />);

      expect(screen.getByText('Spain')).toBeInTheDocument();
      expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
    });
  });
});
