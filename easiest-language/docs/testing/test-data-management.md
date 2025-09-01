# 📊 测试数据管理策略

## 🎯 策略概述

测试数据管理是确保测试质量和可维护性的关键。本策略遵循SOLID、KISS、DRY、YAGNI原则，建立统一、可靠、高效的测试数据管理体系。

## 🏗️ 数据分层架构

### 数据分层结构

```
📊 测试数据层级
├── 🎭 Mock数据层 (Static)
│   ├── 基础Mock数据
│   ├── 场景Mock数据
│   └── 错误Mock数据
├── 🏭 工厂函数层 (Dynamic)
│   ├── 数据生成器
│   ├── 随机数据工厂
│   └── 参数化工厂
├── 🔧 工具函数层 (Utilities)
│   ├── 数据验证工具
│   ├── 数据转换工具
│   └── Mock管理工具
└── 🧪 测试环境层 (Environment)
    ├── 环境配置
    ├── 全局Mock设置
    └── 清理机制
```

## 📂 数据组织结构

### 文件组织架构

```
src/lib/
├── __mocks__/
│   ├── test-data.ts              # 核心Mock数据
│   ├── api-responses.ts          # API响应Mock
│   ├── browser-apis.ts           # 浏览器API Mock
│   └── external-services.ts     # 外部服务Mock
├── __fixtures__/
│   ├── languages.json            # 静态语言数据
│   ├── countries.json            # 静态国家数据
│   └── users.json               # 测试用户数据
├── __factories__/
│   ├── language-factory.ts       # 语言数据工厂
│   ├── user-factory.ts          # 用户数据工厂
│   └── api-factory.ts           # API响应工厂
└── utils/
    ├── test-utils.tsx            # 测试工具函数
    ├── mock-helpers.ts           # Mock辅助工具
    └── data-generators.ts        # 数据生成器
```

## 🎭 Mock数据管理

### 静态Mock数据原则

#### 1. 数据完整性

```typescript
// ✅ 好的Mock数据 - 完整且现实
export const mockLanguage = {
  id: 'es',
  name: 'Spanish',
  nativeName: 'Español',
  difficulty: 1,
  weeksToLearn: 24,
  family: 'Indo-European',
  speakers: 500000000,
  countries: ['Spain', 'Mexico', 'Argentina'],
} as const;

// ❌ 避免 - 不完整的数据
export const badMockLanguage = {
  name: 'Spanish',
  // 缺少其他必需字段
};
```

#### 2. 数据变体管理

```typescript
// 基础数据
export const baseLanguage = {
  id: 'base',
  name: 'Base Language',
  difficulty: 1,
  weeksToLearn: 24,
};

// 数据变体
export const languageVariants = {
  easy: { ...baseLanguage, difficulty: 1, weeksToLearn: 24 },
  medium: { ...baseLanguage, difficulty: 2, weeksToLearn: 36 },
  hard: { ...baseLanguage, difficulty: 4, weeksToLearn: 88 },
  invalid: { ...baseLanguage, difficulty: null }, // 用于错误测试
} as const;
```

#### 3. 场景化Mock数据

```typescript
export const testScenarios = {
  // 成功场景
  success: {
    data: mockLanguages,
    status: 200,
    message: 'Success',
  },

  // 空数据场景
  empty: {
    data: [],
    status: 200,
    message: 'No data found',
  },

  // 错误场景
  error: {
    data: null,
    status: 500,
    message: 'Internal server error',
  },

  // 加载场景
  loading: {
    data: null,
    status: null,
    message: 'Loading...',
  },
} as const;
```

### 动态数据工厂

#### 1. 基础数据工厂

```typescript
interface LanguageFactoryOptions {
  difficulty?: number;
  speakers?: number;
  overrides?: Partial<LanguageMVP>;
}

export const createLanguage = (options: LanguageFactoryOptions = {}): LanguageMVP => {
  const {
    difficulty = randomNumber(1, 4),
    speakers = randomNumber(1000000, 1000000000),
    overrides = {},
  } = options;

  return {
    id: generateId(),
    name: generateLanguageName(),
    nativeName: generateNativeName(),
    difficulty,
    weeksToLearn: calculateWeeksToLearn(difficulty),
    family: generateFamily(),
    speakers,
    countries: generateCountries(),
    ...overrides,
  };
};
```

#### 2. 批量数据生成

```typescript
export const createLanguages = (
  count: number,
  options: LanguageFactoryOptions = {}
): LanguageMVP[] => {
  return Array.from({ length: count }, () => createLanguage(options));
};

// 使用示例
const testLanguages = createLanguages(10, { difficulty: 1 });
const randomLanguages = createLanguages(5); // 随机属性
```

#### 3. 关联数据工厂

```typescript
export const createLanguageWithCountries = () => {
  const language = createLanguage();
  const countries = language.countries.map((countryName) =>
    createCountry({ name: countryName, languages: [language.name] })
  );

  return { language, countries };
};
```

## 🔧 工具函数策略

### Mock管理工具

#### 1. 全局Mock设置

```typescript
export class MockManager {
  private mocks: Map<string, jest.Mock> = new Map();

  public setupMock(name: string, implementation: any): void {
    const mock = jest.fn(implementation);
    this.mocks.set(name, mock);
    return mock;
  }

  public getMock(name: string): jest.Mock | undefined {
    return this.mocks.get(name);
  }

  public clearMocks(): void {
    this.mocks.forEach((mock) => mock.mockClear());
  }

  public resetMocks(): void {
    this.mocks.forEach((mock) => mock.mockReset());
    this.mocks.clear();
  }
}

// 全局实例
export const mockManager = new MockManager();
```

#### 2. 异步Mock工具

```typescript
export const createAsyncMock = <T>(data: T, delay: number = 0, shouldReject: boolean = false) => {
  return jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldReject) {
            reject(new Error('Mock error'));
          } else {
            resolve(data);
          }
        }, delay);
      })
  );
};

// 网络延迟模拟
export const createNetworkMock = <T>(data: T, networkCondition: 'fast' | 'slow' | 'offline') => {
  const delays = { fast: 50, slow: 2000, offline: 0 };
  const shouldReject = networkCondition === 'offline';

  return createAsyncMock(data, delays[networkCondition], shouldReject);
};
```

#### 3. 状态Mock工具

```typescript
export const createStatefulMock = <T>(initialState: T) => {
  let state = initialState;

  const mock = jest.fn().mockImplementation((newState?: T) => {
    if (newState !== undefined) {
      state = newState;
    }
    return state;
  });

  mock.getState = () => state;
  mock.setState = (newState: T) => {
    state = newState;
  };
  mock.resetState = () => {
    state = initialState;
  };

  return mock;
};
```

## 🧪 测试环境管理

### 环境配置策略

#### 1. 环境隔离

```typescript
export class TestEnvironment {
  private originalEnv: NodeJS.ProcessEnv;

  constructor() {
    this.originalEnv = { ...process.env };
  }

  public setup(): void {
    // 设置测试环境变量
    process.env.NODE_ENV = 'test';
    process.env.NEXT_PUBLIC_APP_ENV = 'test';

    // 禁用外部服务
    process.env.NEXT_PUBLIC_DISABLE_ANALYTICS = 'true';

    // 设置Mock服务端点
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:3001/api';

    // 全局Mock设置
    this.setupGlobalMocks();
  }

  public teardown(): void {
    // 恢复原始环境变量
    process.env = this.originalEnv;

    // 清理Mock
    this.cleanupGlobalMocks();
  }

  private setupGlobalMocks(): void {
    mockManager.setupMock('fetch', global.fetch);
    mockManager.setupMock('localStorage', window.localStorage);
    mockManager.setupMock('sessionStorage', window.sessionStorage);
  }

  private cleanupGlobalMocks(): void {
    mockManager.resetMocks();
  }
}
```

#### 2. 测试数据生命周期

```typescript
export class TestDataLifecycle {
  private static testData: Map<string, any> = new Map();

  public static setupTestData(testName: string, data: any): void {
    this.testData.set(testName, data);
  }

  public static getTestData<T>(testName: string): T | undefined {
    return this.testData.get(testName);
  }

  public static cleanupTestData(testName?: string): void {
    if (testName) {
      this.testData.delete(testName);
    } else {
      this.testData.clear();
    }
  }

  // Jest钩子集成
  public static beforeEach(testName: string, dataFactory: () => any): void {
    this.setupTestData(testName, dataFactory());
  }

  public static afterEach(testName?: string): void {
    this.cleanupTestData(testName);
  }
}
```

## 📊 数据验证策略

### 数据完整性检查

#### 1. Schema验证

```typescript
import { z } from 'zod';

// 定义数据Schema
const LanguageSchema = z.object({
  id: z.string(),
  name: z.string(),
  nativeName: z.string(),
  difficulty: z.number().min(1).max(4),
  weeksToLearn: z.number().positive(),
  family: z.string(),
  speakers: z.number().positive(),
  countries: z.array(z.string()),
});

// 验证函数
export const validateTestData = <T>(data: T, schema: z.ZodSchema<T>): boolean => {
  try {
    schema.parse(data);
    return true;
  } catch (error) {
    console.error('测试数据验证失败:', error);
    return false;
  }
};

// 使用示例
export const createValidLanguage = (overrides = {}) => {
  const language = createLanguage(overrides);

  if (!validateTestData(language, LanguageSchema)) {
    throw new Error('生成的语言数据不符合Schema');
  }

  return language;
};
```

#### 2. 数据一致性检查

```typescript
export const validateDataConsistency = (languages: LanguageMVP[]): boolean => {
  const checks = [
    // 检查ID唯一性
    () => {
      const ids = languages.map((lang) => lang.id);
      return ids.length === new Set(ids).size;
    },

    // 检查难度与学习时间的对应关系
    () => {
      return languages.every((lang) => {
        const expectedWeeks = calculateWeeksToLearn(lang.difficulty);
        return lang.weeksToLearn === expectedWeeks;
      });
    },

    // 检查数据范围
    () => {
      return languages.every(
        (lang) =>
          lang.difficulty >= 1 &&
          lang.difficulty <= 4 &&
          lang.speakers > 0 &&
          lang.countries.length > 0
      );
    },
  ];

  return checks.every((check) => check());
};
```

## 🎯 性能优化策略

### 数据缓存机制

#### 1. Mock数据缓存

```typescript
class MockDataCache {
  private cache: Map<string, any> = new Map();
  private ttl: Map<string, number> = new Map();

  public set(key: string, data: any, ttlMs: number = 60000): void {
    this.cache.set(key, data);
    this.ttl.set(key, Date.now() + ttlMs);
  }

  public get<T>(key: string): T | undefined {
    const expiry = this.ttl.get(key);
    if (expiry && Date.now() > expiry) {
      this.delete(key);
      return undefined;
    }

    return this.cache.get(key);
  }

  public delete(key: string): void {
    this.cache.delete(key);
    this.ttl.delete(key);
  }

  public clear(): void {
    this.cache.clear();
    this.ttl.clear();
  }
}

export const mockDataCache = new MockDataCache();
```

#### 2. 懒加载Mock数据

```typescript
export const createLazyMock = <T>(dataFactory: () => T) => {
  let data: T | undefined;

  return {
    getData: (): T => {
      if (!data) {
        data = dataFactory();
      }
      return data;
    },

    clearData: (): void => {
      data = undefined;
    },
  };
};

// 使用示例
const lazyLanguages = createLazyMock(() => createLanguages(1000));
```

## 🔄 数据同步策略

### 真实数据同步

#### 1. 数据快照更新

```typescript
export const updateMockDataFromReal = async () => {
  try {
    // 从真实API获取数据（仅在开发环境）
    if (process.env.NODE_ENV === 'development') {
      const realData = await fetch('/api/languages').then((r) => r.json());

      // 更新Mock数据快照
      const mockDataPath = path.join(__dirname, '__mocks__/languages.json');
      await fs.writeFile(mockDataPath, JSON.stringify(realData, null, 2));

      console.log('Mock数据已更新');
    }
  } catch (error) {
    console.error('Mock数据更新失败:', error);
  }
};
```

#### 2. 版本控制

```typescript
interface MockDataVersion {
  version: string;
  timestamp: number;
  data: any;
  checksum: string;
}

export const versionMockData = (data: any): MockDataVersion => {
  const version = generateVersion();
  const timestamp = Date.now();
  const checksum = generateChecksum(data);

  return {
    version,
    timestamp,
    data,
    checksum,
  };
};
```

## 📋 最佳实践清单

### ✅ 应该做的事情

1. **数据隔离**: 每个测试使用独立的数据实例
2. **工厂模式**: 使用工厂函数创建测试数据
3. **真实性**: Mock数据应该反映真实数据特征
4. **版本管理**: 重要的Mock数据应该版本化
5. **性能考虑**: 大数据集使用懒加载和缓存
6. **清理机制**: 测试后及时清理Mock数据
7. **文档化**: 为复杂的Mock数据编写文档

### ❌ 应该避免的事情

1. **硬编码**: 避免在测试中硬编码具体值
2. **数据泄漏**: 避免测试间的数据相互影响
3. **过度Mock**: 不要Mock不需要Mock的东西
4. **真实API**: 测试中避免调用真实的API
5. **大数据集**: 避免在单元测试中使用过大的数据集
6. **全局状态**: 避免依赖全局的可变状态

## 🎯 执行计划

### Phase 1: 基础设施 (Week 1)

- [x] 创建Mock数据文件结构
- [x] 实现基础工厂函数
- [x] 设置全局Mock管理器

### Phase 2: 工具完善 (Week 2)

- [ ] 实现数据验证工具
- [ ] 添加性能优化机制
- [ ] 创建数据生命周期管理

### Phase 3: 集成优化 (Week 3)

- [ ] 集成CI/CD流程
- [ ] 添加数据同步机制
- [ ] 性能监控和优化

### Phase 4: 文档和培训 (Week 4)

- [ ] 完善文档
- [ ] 团队培训
- [ ] 最佳实践指南

---

## 🎯 总结

通过这个测试数据管理策略，我们确保了：

- **一致性**: 所有测试使用标准化的数据格式
- **可维护性**: 集中管理减少维护成本
- **性能**: 优化的缓存和懒加载机制
- **质量**: 数据验证确保测试可靠性
- **扩展性**: 工厂模式支持未来需求变化

这个策略为我们的TDD开发提供了坚实的数据基础。
