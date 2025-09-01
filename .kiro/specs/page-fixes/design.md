# 页面修复设计文档

## 概述

本设计文档详细规划了修复当前网站页面问题的技术实现方案。设计重点是快速修复现有问题，确保用户能够正常使用所有页面功能，同时保持与现有架构的一致性。

## 架构设计

### 当前问题分析

```
问题映射:
┌─────────────────────────────────────────────────────────────┐
│ 1. /compare 页面 TypeScript 错误                            │
│    - FSIBadge 组件类型不匹配                                │
│    - LanguageComparison 组件中的数据结构问题                │
├─────────────────────────────────────────────────────────────┤
│ 2. /languages 路由缺失                                      │
│    - 没有对应的 page.tsx 文件                               │
│    - 导航链接指向不存在的路由                                │
├─────────────────────────────────────────────────────────────┤
│ 3. 主页导航不完整                                           │
│    - 部分链接指向不存在的页面                                │
│    - 缺少统一的导航体验                                      │
└─────────────────────────────────────────────────────────────┘
```

### 修复策略

1. **类型安全优先**: 修复所有 TypeScript 类型错误
2. **最小化改动**: 利用现有组件，避免大规模重构
3. **一致性保持**: 确保新页面与现有设计风格一致
4. **渐进增强**: 先修复基础功能，再优化用户体验

## 组件设计

### 1. FSIBadge 组件类型修复

#### 问题分析
当前 FSIBadge 组件期望 `category` 属性为 `0 | 1 | 2 | 3 | 4 | 5`，但在 LanguageComparison 组件中传入的数据结构不匹配。

#### 解决方案
```typescript
// 修复前的问题
<FSIBadge category={language.fsi.category} />

// 修复后的方案
interface FSIData {
  category: 0 | 1 | 2 | 3 | 4 | 5;
  hours: string;
  description: string;
}

// 确保数据适配器返回正确的类型
const adaptFSIData = (rawData: any): FSIData => {
  return {
    category: Math.max(0, Math.min(5, parseInt(rawData.category) || 1)) as 0 | 1 | 2 | 3 | 4 | 5,
    hours: rawData.hours || '600-750',
    description: rawData.description || 'Easy'
  };
};
```

### 2. 语言列表页面设计

#### 页面结构
```typescript
// /src/app/languages/page.tsx
interface LanguagesPageProps {
  searchParams?: {
    category?: string;
    family?: string;
    region?: string;
  };
}

const LanguagesPage = ({ searchParams }: LanguagesPageProps) => {
  // 使用现有的 MVPDemo 组件作为基础
  // 添加页面级别的布局和导航
};
```

#### 组件复用策略
- **复用 MVPDemo 组件**: 作为语言列表的核心展示
- **添加页面包装器**: 提供统一的页面布局和导航
- **集成筛选功能**: 利用现有的筛选组件
- **添加对比功能**: 集成语言对比选择功能

### 3. 导航系统设计

#### 统一导航组件
```typescript
interface NavigationProps {
  currentPage: 'home' | 'languages' | 'compare' | 'language-detail';
  showBackButton?: boolean;
  backUrl?: string;
  title?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  showBackButton,
  backUrl,
  title
}) => {
  // 统一的导航栏设计
  // 包含面包屑导航
  // 响应式设计
};
```

#### 页面布局标准化
```typescript
interface PageLayoutProps {
  title: string;
  description?: string;
  showNavigation?: boolean;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  showNavigation = true,
  children
}) => {
  // 统一的页面布局
  // 包含标题、描述、导航
  // 响应式容器
};
```

## 数据模型设计

### 语言数据类型标准化

```typescript
// 确保所有组件使用一致的数据类型
interface Language {
  id: string;
  name: string;
  nativeName: string;
  flagEmoji: string;
  fsi: {
    category: 0 | 1 | 2 | 3 | 4 | 5;
    hours: string;
    description: string;
  };
  speakers: number;
  family: string;
  countries: string[];
  // 其他属性保持现有结构
}

// 数据适配器增强
interface DataAdapter {
  getAllLanguages(): Language[];
  getLanguageById(id: string): Language | null;
  getLanguagesByCategory(category: number): Language[];
  validateLanguageData(data: any): Language;
}
```

## 路由设计

### 新增路由结构

```
/src/app/
├── page.tsx (主页 - 现有)
├── home/
│   └── page.tsx (专门的首页设计 - 现有)
├── languages/
│   └── page.tsx (语言列表页面 - 新增)
├── compare/
│   └── page.tsx (对比页面 - 修复)
└── language/
    └── [id]/
        └── page.tsx (语言详情 - 现有)
```

### 导航流程设计

```mermaid
graph TD
    A[主页 /] --> B[首页设计 /home]
    A --> C[语言列表 /languages]
    A --> D[对比页面 /compare]
    A --> E[语言详情 /language/[id]]
    
    C --> E
    C --> D
    D --> C
    E --> C
    
    B --> C
    B --> D
```

## 错误处理设计

### 1. TypeScript 错误处理

```typescript
// 类型守卫函数
const isValidFSICategory = (value: any): value is 0 | 1 | 2 | 3 | 4 | 5 => {
  return typeof value === 'number' && value >= 0 && value <= 5;
};

// 数据验证
const validateLanguageData = (data: any): Language => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid language data');
  }
  
  return {
    ...data,
    fsi: {
      category: isValidFSICategory(data.fsi?.category) ? data.fsi.category : 1,
      hours: data.fsi?.hours || '600-750',
      description: data.fsi?.description || 'Easy'
    }
  };
};
```

### 2. 页面级错误边界

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class PageErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  // 捕获页面级别的错误
  // 提供友好的错误界面
  // 包含重试和导航选项
}
```

### 3. 404 页面处理

```typescript
// /src/app/not-found.tsx
const NotFound = () => {
  return (
    <PageLayout title="页面未找到">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-8">抱歉，您访问的页面不存在</p>
        <div className="space-x-4">
          <Link href="/">返回首页</Link>
          <Link href="/languages">浏览语言</Link>
        </div>
      </div>
    </PageLayout>
  );
};
```

## 性能优化设计

### 1. 代码分割

```typescript
// 动态导入大型组件
const LanguageComparison = dynamic(() => import('@/components/LanguageComparison'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

### 2. 数据缓存

```typescript
// 语言数据缓存
const useLanguageCache = () => {
  const [cache, setCache] = useState<Map<string, Language>>(new Map());
  
  const getLanguage = useCallback((id: string) => {
    if (cache.has(id)) {
      return cache.get(id);
    }
    
    const language = getLanguageDetailData(id);
    if (language) {
      setCache(prev => new Map(prev).set(id, language));
    }
    return language;
  }, [cache]);
  
  return { getLanguage };
};
```

## 测试策略

### 1. 类型测试

```typescript
// 确保类型安全
describe('Language Data Types', () => {
  it('should have valid FSI category', () => {
    const languages = getAllLanguages();
    languages.forEach(lang => {
      expect(lang.fsi.category).toBeGreaterThanOrEqual(0);
      expect(lang.fsi.category).toBeLessThanOrEqual(5);
    });
  });
});
```

### 2. 路由测试

```typescript
// 测试所有路由正常工作
describe('Page Routes', () => {
  it('should render languages page', () => {
    render(<LanguagesPage />);
    expect(screen.getByText(/语言列表/)).toBeInTheDocument();
  });
  
  it('should handle invalid language id', () => {
    render(<LanguageDetailPage params={{ id: 'invalid' }} />);
    expect(screen.getByText(/Language Not Found/)).toBeInTheDocument();
  });
});
```

### 3. 导航测试

```typescript
// 测试页面间导航
describe('Navigation', () => {
  it('should navigate between pages', () => {
    const { user } = renderWithRouter(<HomePage />);
    
    user.click(screen.getByText(/Languages List/));
    expect(window.location.pathname).toBe('/languages');
  });
});
```

## 实施计划

### Phase 1: 紧急修复 (1-2天)
1. 修复 FSIBadge 组件类型错误
2. 创建 `/languages` 页面
3. 修复主页导航链接

### Phase 2: 用户体验优化 (2-3天)
1. 添加统一导航组件
2. 实现页面布局标准化
3. 添加错误边界和404处理

### Phase 3: 性能和测试 (1-2天)
1. 添加性能优化
2. 完善测试覆盖
3. 验证所有功能正常

## 风险评估

### 技术风险
- **数据结构不一致**: 可能存在其他组件的类型不匹配
- **路由冲突**: 新路由可能与现有路由冲突
- **性能影响**: 新页面可能影响整体性能

### 缓解策略
- 全面的类型检查和测试
- 渐进式部署，逐步验证
- 性能监控和优化
- 完整的回滚计划

这个设计确保了快速修复当前问题，同时为未来的功能扩展奠定了良好的基础。