/**
 * 测试工具函数 - 提供统一的测试辅助工具
 * 遵循SOLID原则：单一职责，每个函数专注于特定测试场景
 * DRY原则：避免测试代码重复
 */

import React, { ReactElement, ReactNode } from 'react';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupGlobalMocks, cleanupMocks } from '../__mocks__/test-data';

// 自定义渲染函数，包含常用的提供者
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // 可以扩展添加更多选项，如主题、国际化等
}

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <React.StrictMode>
      {/* 可以在这里添加Context提供者，如主题、国际化等 */}
      {children}
    </React.StrictMode>
  );
};

/**
 * 自定义渲染函数 - 包装常用的提供者
 * KISS原则：简化测试组件的渲染过程
 */
export const customRender = (ui: ReactElement, options?: CustomRenderOptions): RenderResult => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

/**
 * 用户事件工具 - 预配置的用户交互
 */
export const user = userEvent.setup();

/**
 * 等待函数 - 用于异步测试
 * @param ms 等待毫秒数
 */
export const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 断言辅助函数 - 常用的测试断言
 */
export const testAssertions = {
  /**
   * 检查元素是否可见且可访问
   */
  toBeAccessible: (element: HTMLElement) => {
    // 检查元素是否存在
    if (!element) {
      throw new Error('Element is null or undefined');
    }
    // 检查元素是否可见
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden') {
      throw new Error('Element is not visible');
    }
    // 检查是否有适当的可访问性属性
    if (element.tagName === 'BUTTON' || element.tagName === 'A') {
      if (element.getAttribute('aria-disabled') === 'true') {
        throw new Error('Element is disabled');
      }
    }
  },

  /**
   * 检查表单元素状态
   */
  formElementState: (element: HTMLElement, state: 'valid' | 'invalid' | 'required') => {
    // 检查元素是否存在
    if (!element) {
      throw new Error('Element is null or undefined');
    }
    switch (state) {
      case 'valid':
        if (!(element as HTMLInputElement).validity.valid) {
          throw new Error('Element is not valid');
        }
        break;
      case 'invalid':
        if ((element as HTMLInputElement).validity.valid) {
          throw new Error('Element is valid but expected to be invalid');
        }
        break;
      case 'required':
        if (!(element as HTMLInputElement).required) {
          throw new Error('Element is not required');
        }
        break;
    }
  },

  /**
   * 检查加载状态
   */
  loadingState: (container: HTMLElement, isLoading: boolean) => {
    const loadingElement = container.querySelector('[data-testid="loading"]');
    if (isLoading) {
      if (!loadingElement) {
        throw new Error('Loading element not found when expected to be loading');
      }
    } else {
      if (loadingElement) {
        throw new Error('Loading element found when not expected to be loading');
      }
    }
  },
};

/**
 * 测试数据生成器 - 生成测试用的数据
 */
export const testDataGenerator = {
  /**
   * 生成随机字符串
   */
  randomString: (length = 8) => {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  },

  /**
   * 生成随机数字
   */
  randomNumber: (min = 1, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * 生成测试用的语言数据
   */
  mockLanguage: (overrides = {}) => ({
    id: `test-${testDataGenerator.randomString()}`,
    name: `Test Language ${testDataGenerator.randomString(4)}`,
    nativeName: `Native ${testDataGenerator.randomString(4)}`,
    difficulty: testDataGenerator.randomNumber(1, 4),
    weeksToLearn: testDataGenerator.randomNumber(20, 90),
    family: 'Test Family',
    speakers: testDataGenerator.randomNumber(1000000, 1000000000),
    countries: [`Country ${testDataGenerator.randomString(4)}`],
    ...overrides,
  }),
};

/**
 * Mock函数辅助工具
 */
export const mockHelpers = {
  /**
   * 创建Promise的Mock
   */
  createPromiseMock: <T = any,>(data: T, shouldResolve = true, delay = 0) => {
    return jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (shouldResolve) {
              resolve(data);
            } else {
              reject(new Error('Mock error'));
            }
          }, delay);
        })
    );
  },

  /**
   * 创建API响应Mock
   */
  createApiMock: <T = any,>(data: T, status = 200) => {
    return jest.fn().mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      json: jest.fn().mockResolvedValue(data),
      text: jest.fn().mockResolvedValue(JSON.stringify(data)),
    });
  },

  /**
   * 模拟网络错误
   */
  createNetworkErrorMock: () => {
    return jest.fn().mockRejectedValue(new Error('Network error'));
  },
};

/**
 * 测试环境设置和清理
 */
export const testEnvironment = {
  /**
   * 设置测试环境
   */
  setup: () => {
    setupGlobalMocks();

    // 设置测试环境变量
    (process.env as any).NODE_ENV = 'test';
    (process.env as any).NEXT_PUBLIC_APP_ENV = 'test';

    // 清理计时器
    jest.clearAllTimers();
    jest.useFakeTimers();
  },

  /**
   * 清理测试环境
   */
  cleanup: () => {
    cleanupMocks();
    jest.useRealTimers();
    jest.clearAllTimers();
  },

  /**
   * 在每个测试后运行
   */
  afterEach: () => {
    cleanupMocks();
  },

  /**
   * 在每个测试前运行
   */
  beforeEach: () => {
    setupGlobalMocks();
  },
};

/**
 * 组件测试辅助工具
 */
export const componentTestUtils = {
  /**
   * 测试组件的基本渲染
   */
  testBasicRender: async (component: ReactElement, testId?: string) => {
    const result = customRender(component);

    if (testId) {
      const element = result.getByTestId(testId);
      testAssertions.toBeAccessible(element);
    }

    return result;
  },

  /**
   * 测试组件的Props变化
   */
  testPropsChanges: async (
    ComponentClass: React.ComponentType<any>,
    initialProps: any,
    changedProps: any,
    testId: string
  ) => {
    const { rerender, getByTestId } = customRender(<ComponentClass {...initialProps} />);

    const element = getByTestId(testId);
    testAssertions.toBeAccessible(element);

    rerender(<ComponentClass {...changedProps} />);

    // 验证Props变化后的状态
    if (!element) {
      throw new Error('Element is null or undefined after rerender');
    }

    return { element, rerender };
  },

  /**
   * 测试用户交互
   */
  testUserInteraction: async (
    component: ReactElement,
    interactions: Array<{
      type: 'click' | 'type' | 'hover';
      target: string;
      value?: string;
    }>
  ) => {
    const result = customRender(component);

    for (const interaction of interactions) {
      const element = result.getByTestId(interaction.target);

      switch (interaction.type) {
        case 'click':
          await user.click(element);
          break;
        case 'type':
          await user.type(element, interaction.value || '');
          break;
        case 'hover':
          await user.hover(element);
          break;
      }

      // 等待DOM更新
      await wait(10);
    }

    return result;
  },
};

/**
 * 性能测试工具
 */
export const performanceTestUtils = {
  /**
   * 测量组件渲染时间
   */
  measureRenderTime: (component: ReactElement): Promise<number> => {
    return new Promise((resolve) => {
      const startTime = performance.now();

      customRender(component);

      // 使用requestAnimationFrame确保渲染完成
      requestAnimationFrame(() => {
        const endTime = performance.now();
        resolve(endTime - startTime);
      });
    });
  },

  /**
   * 测试内存使用情况（仅在支持的环境中）
   */
  checkMemoryUsage: () => {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  },
};

// 导出所有工具，方便使用
export {
  customRender as render,
  testAssertions as assertions,
  testDataGenerator as generateTestData,
  mockHelpers as mocks,
  testEnvironment as env,
  componentTestUtils as componentUtils,
  performanceTestUtils as performance,
};

// 重新导出react-testing-library的常用函数
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
