/**
 * 测试用例模板 - 提供标准化的测试用例结构
 * 遵循SOLID原则：每个模板专注于特定类型的测试
 * DRY原则：避免重复的测试代码结构
 */

// ================================
// 单元测试模板
// ================================

export const unitTestTemplate = `
import { render, screen } from '@/lib/utils/test-utils';
import { ComponentName } from './ComponentName';
import { mockTestData } from '@/lib/__mocks__/test-data';

describe('ComponentName', () => {
  beforeEach(() => {
    // 每个测试前的准备工作
  });

  afterEach(() => {
    // 每个测试后的清理工作
  });

  describe('基础渲染', () => {
    it('应该正确渲染组件', () => {
      // Arrange - 准备测试数据
      const props = { ...mockTestData };
      
      // Act - 执行被测试代码
      render(<ComponentName {...props} />);
      
      // Assert - 验证结果
      expect(screen.getByRole('...')).toBeInTheDocument();
    });

    it('应该正确显示传入的属性', () => {
      const testProps = {
        title: 'Test Title',
        description: 'Test Description'
      };
      
      render(<ComponentName {...testProps} />);
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  describe('用户交互', () => {
    it('应该响应用户点击事件', async () => {
      const mockCallback = jest.fn();
      const props = { ...mockTestData, onClick: mockCallback };
      
      render(<ComponentName {...props} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('错误处理', () => {
    it('应该处理缺失的属性', () => {
      // 测试边界条件
      render(<ComponentName />);
      
      expect(screen.getByText('默认内容')).toBeInTheDocument();
    });

    it('应该处理无效数据', () => {
      const invalidProps = { data: null };
      
      expect(() => {
        render(<ComponentName {...invalidProps} />);
      }).not.toThrow();
    });
  });

  describe('可访问性', () => {
    it('应该具备正确的ARIA属性', () => {
      render(<ComponentName />);
      
      const element = screen.getByRole('...');
      expect(element).toHaveAttribute('aria-label', '...');
    });
  });
});
`;

// ================================
// Hook测试模板
// ================================

export const hookTestTemplate = `
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('应该返回初始状态', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.value).toBe('初始值');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('应该正确更新状态', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.setValue('新值');
    });
    
    expect(result.current.value).toBe('新值');
  });

  it('应该处理异步操作', async () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.loading).toBe(false);
    
    act(() => {
      result.current.fetchData();
    });
    
    expect(result.current.loading).toBe(true);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeDefined();
  });
});
`;

// ================================
// 工具函数测试模板
// ================================

export const utilityTestTemplate = `
import { utilityFunction } from './utilityFunction';

describe('utilityFunction', () => {
  describe('正常输入', () => {
    it('应该正确处理有效输入', () => {
      const input = '有效输入';
      const result = utilityFunction(input);
      
      expect(result).toBe('预期结果');
    });

    it('应该处理不同类型的输入', () => {
      const testCases = [
        { input: 'string', expected: 'result1' },
        { input: 123, expected: 'result2' },
        { input: true, expected: 'result3' }
      ];
      
      testCases.forEach(({ input, expected }) => {
        expect(utilityFunction(input)).toBe(expected);
      });
    });
  });

  describe('边界条件', () => {
    it('应该处理空值', () => {
      expect(utilityFunction(null)).toBe('默认值');
      expect(utilityFunction(undefined)).toBe('默认值');
      expect(utilityFunction('')).toBe('默认值');
    });

    it('应该处理极端值', () => {
      expect(utilityFunction(Number.MAX_VALUE)).toBeDefined();
      expect(utilityFunction(Number.MIN_VALUE)).toBeDefined();
    });
  });

  describe('错误处理', () => {
    it('应该抛出正确的错误', () => {
      expect(() => {
        utilityFunction('无效输入');
      }).toThrow('错误消息');
    });
  });
});
`;

// ================================
// API测试模板
// ================================

export const apiTestTemplate = `
import { apiFunction } from './api';
import { createApiMock, createNetworkErrorMock } from '@/lib/utils/test-utils';

// Mock fetch
global.fetch = jest.fn();

describe('apiFunction', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('成功请求', () => {
    it('应该正确获取数据', async () => {
      const mockData = { id: 1, name: 'Test' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });
      
      const result = await apiFunction();
      
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith('/api/endpoint');
    });
  });

  describe('错误处理', () => {
    it('应该处理网络错误', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('网络错误'));
      
      await expect(apiFunction()).rejects.toThrow('网络错误');
    });

    it('应该处理HTTP错误', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });
      
      await expect(apiFunction()).rejects.toThrow('Not Found');
    });
  });

  describe('请求参数', () => {
    it('应该正确传递请求参数', async () => {
      const mockData = {};
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });
      
      const params = { search: 'test' };
      await apiFunction(params);
      
      expect(fetch).toHaveBeenCalledWith('/api/endpoint?search=test');
    });
  });
});
`;

// ================================
// E2E测试模板
// ================================

export const e2eTestTemplate = `
describe('功能名称 E2E 测试', () => {
  beforeEach(() => {
    // 访问测试页面
    cy.visit('/');
    
    // 等待页面加载
    cy.get('[data-testid="loading"]').should('not.exist');
  });

  describe('核心用户流程', () => {
    it('应该完成主要用户旅程', () => {
      // Given - 初始状态
      cy.get('[data-testid="main-content"]').should('be.visible');
      
      // When - 用户操作
      cy.get('[data-testid="action-button"]').click();
      
      // Then - 验证结果
      cy.get('[data-testid="success-message"]').should('contain', '操作成功');
    });

    it('应该正确处理表单提交', () => {
      // 填写表单
      cy.get('[data-testid="input-field"]').type('测试内容');
      cy.get('[data-testid="submit-button"]').click();
      
      // 验证提交结果
      cy.get('[data-testid="form-result"]').should('be.visible');
    });
  });

  describe('错误场景', () => {
    it('应该显示错误信息', () => {
      // 模拟错误场景
      cy.intercept('POST', '/api/endpoint', { statusCode: 500 });
      
      cy.get('[data-testid="error-trigger"]').click();
      
      cy.get('[data-testid="error-message"]').should('be.visible');
    });
  });

  describe('响应式设计', () => {
    it('应该在移动端正常工作', () => {
      cy.viewport('iphone-8');
      
      cy.get('[data-testid="mobile-menu"]').should('be.visible');
      cy.get('[data-testid="desktop-menu"]').should('not.be.visible');
    });
  });

  describe('可访问性', () => {
    it('应该支持键盘导航', () => {
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-testid', 'first-focusable');
    });
  });
});
`;

// ================================
// 集成测试模板
// ================================

export const integrationTestTemplate = `
import { render, screen, waitFor } from '@/lib/utils/test-utils';
import { ParentComponent } from './ParentComponent';
import { mockApiResponses } from '@/lib/__mocks__/test-data';

// Mock子组件
jest.mock('./ChildComponent', () => ({
  ChildComponent: ({ onAction }: any) => (
    <button onClick={() => onAction('test')}>Mock Child</button>
  )
}));

describe('ParentComponent 集成测试', () => {
  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks();
  });

  describe('组件协作', () => {
    it('应该正确协调子组件', async () => {
      render(<ParentComponent />);
      
      // 验证父组件渲染
      expect(screen.getByTestId('parent-container')).toBeInTheDocument();
      
      // 触发子组件交互
      const childButton = screen.getByText('Mock Child');
      await user.click(childButton);
      
      // 验证父组件响应
      await waitFor(() => {
        expect(screen.getByText('子组件操作完成')).toBeInTheDocument();
      });
    });
  });

  describe('数据流', () => {
    it('应该正确传递数据', async () => {
      const testData = mockApiResponses.success.data;
      
      render(<ParentComponent initialData={testData} />);
      
      await waitFor(() => {
        expect(screen.getByText(testData[0].name)).toBeInTheDocument();
      });
    });
  });

  describe('状态管理', () => {
    it('应该正确管理共享状态', async () => {
      render(<ParentComponent />);
      
      // 初始状态
      expect(screen.getByText('初始状态')).toBeInTheDocument();
      
      // 触发状态变更
      const updateButton = screen.getByText('更新状态');
      await user.click(updateButton);
      
      // 验证状态更新
      await waitFor(() => {
        expect(screen.getByText('已更新状态')).toBeInTheDocument();
      });
    });
  });
});
`;

// ================================
// 性能测试模板
// ================================

export const performanceTestTemplate = `
import { measureRenderTime, checkMemoryUsage } from '@/lib/utils/test-utils';
import { ComponentName } from './ComponentName';
import { mockLanguages } from '@/lib/__mocks__/test-data';

describe('ComponentName 性能测试', () => {
  describe('渲染性能', () => {
    it('应该快速渲染', async () => {
      const renderTime = await measureRenderTime(<ComponentName />);
      
      // 渲染时间应少于100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('应该高效处理大量数据', async () => {
      // 创建大量测试数据
      const largeDataSet = Array.from({ length: 1000 }, (_, i) => ({
        ...mockLanguages[0],
        id: \`lang-\${i}\`
      }));
      
      const renderTime = await measureRenderTime(
        <ComponentName data={largeDataSet} />
      );
      
      // 即使大量数据，渲染时间也应合理
      expect(renderTime).toBeLessThan(500);
    });
  });

  describe('内存使用', () => {
    it('应该合理使用内存', () => {
      const memoryBefore = checkMemoryUsage();
      
      // 渲染组件
      render(<ComponentName />);
      
      const memoryAfter = checkMemoryUsage();
      
      if (memoryBefore && memoryAfter) {
        const memoryIncrease = memoryAfter.usedJSHeapSize - memoryBefore.usedJSHeapSize;
        expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // 少于10MB
      }
    });
  });

  describe('更新性能', () => {
    it('应该高效更新', async () => {
      const { rerender } = render(<ComponentName data={mockLanguages.slice(0, 5)} />);
      
      const updateStartTime = performance.now();
      
      rerender(<ComponentName data={mockLanguages.slice(0, 10)} />);
      
      const updateTime = performance.now() - updateStartTime;
      
      expect(updateTime).toBeLessThan(50); // 更新时间少于50ms
    });
  });
});
`;

// ================================
// 可访问性测试模板
// ================================

export const a11yTestTemplate = `
import { render } from '@/lib/utils/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComponentName } from './ComponentName';

expect.extend(toHaveNoViolations);

describe('ComponentName 可访问性测试', () => {
  it('应该没有可访问性违规', async () => {
    const { container } = render(<ComponentName />);
    
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  describe('键盘导航', () => {
    it('应该支持Tab键导航', () => {
      render(<ComponentName />);
      
      const focusableElements = screen.getAllByRole('button');
      
      focusableElements.forEach((element) => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('应该支持Enter键激活', async () => {
      const mockCallback = jest.fn();
      render(<ComponentName onActivate={mockCallback} />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard('{Enter}');
      
      expect(mockCallback).toHaveBeenCalled();
    });
  });

  describe('屏幕阅读器支持', () => {
    it('应该有正确的ARIA标签', () => {
      render(<ComponentName />);
      
      const element = screen.getByRole('button');
      
      expect(element).toHaveAttribute('aria-label');
      expect(element).toHaveAccessibleName();
    });

    it('应该正确传达状态变化', async () => {
      render(<ComponentName />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
`;

// ================================
// 模板选择器
// ================================

export const testTemplateSelector = {
  unit: unitTestTemplate,
  hook: hookTestTemplate,
  utility: utilityTestTemplate,
  api: apiTestTemplate,
  e2e: e2eTestTemplate,
  integration: integrationTestTemplate,
  performance: performanceTestTemplate,
  a11y: a11yTestTemplate,
};

// ================================
// 测试命名约定
// ================================

export const testNamingConventions = {
  describe: {
    component: '组件名称',
    feature: '功能名称',
    scenario: '场景描述',
    integration: '组件名称 集成测试',
    performance: '组件名称 性能测试',
    a11y: '组件名称 可访问性测试',
  },

  it: {
    should: '应该 + 期望行为',
    when: '当 + 条件 + 时，应该 + 期望行为',
    given: '给定 + 前提条件 + 应该 + 期望行为',
  },
};

// ================================
// 测试辅助函数
// ================================

export const testHelpers = {
  /**
   * 生成测试文件名
   */
  generateTestFileName: (componentName: string, type: string = 'test') => {
    return `${componentName}.${type}.{ts,tsx}`;
  },

  /**
   * 生成测试ID
   */
  generateTestId: (component: string, element: string) => {
    return `${component.toLowerCase()}-${element.toLowerCase()}`;
  },

  /**
   * 生成Mock函数名
   */
  generateMockName: (functionName: string) => {
    return `mock${functionName.charAt(0).toUpperCase()}${functionName.slice(1)}`;
  },
};
