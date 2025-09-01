# 组件实现技术指南

本文档提供语言学习平台组件的详细技术实现指导，包含代码示例、最佳实践和集成建议。

## 核心技术配置

### 1. Framer Motion配置

```typescript
// framer-motion.d.ts
declare module 'framer-motion' {
  export * from 'framer-motion';
}

// 动画预设
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  cardHover: {
    whileHover: {
      y: -4,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    transition: { type: 'spring', stiffness: 300 },
  },
};
```

### 2. Tailwind CSS自定义类

```css
/* 补充全局样式 */
@layer components {
  .fsi-badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }

  .fsi-badge-0 {
    @apply bg-gray-100 text-gray-800;
  }
  .fsi-badge-1 {
    @apply bg-green-100 text-green-800;
  }
  .fsi-badge-2 {
    @apply bg-yellow-100 text-yellow-800;
  }
  .fsi-badge-3 {
    @apply bg-orange-100 text-orange-800;
  }
  .fsi-badge-4 {
    @apply bg-red-100 text-red-800;
  }
  .fsi-badge-5 {
    @apply bg-purple-100 text-purple-800;
  }

  .language-card {
    @apply bg-card border border-border rounded-xl p-6 transition-all duration-200;
  }

  .language-card:hover {
    @apply transform -translate-y-1 shadow-lg border-primary/50;
  }
}
```

### 3. TypeScript工具类型

```typescript
// utils/types.ts
export type FSILevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export type ViewMode = 'grid' | 'list' | 'comparison';
export type SortDirection = 'asc' | 'desc';

// FSI配置
export const FSI_CONFIG = {
  0: { label: '母语', color: 'var(--fsi-native)', hours: 0 },
  1: { label: '容易', color: 'var(--fsi-easy)', hours: 600 },
  2: { label: '中等', color: 'var(--fsi-moderate)', hours: 900 },
  3: { label: '较难', color: 'var(--fsi-medium)', hours: 1100 },
  4: { label: '困难', color: 'var(--fsi-hard)', hours: 1800 },
  5: { label: '最难', color: 'var(--fsi-hardest)', hours: 2200 },
} as const;
```

## 组件实现指南

### 1. LanguageCard组件详细实现

```typescript
// components/LanguageCard/types.ts
export interface LanguageCardProps extends ComponentProps {
  language: Language;
  variant?: ViewMode;
  selected?: boolean;
  onClick?: (languageId: string) => void;
  showComparison?: boolean;
}

// components/LanguageCard/utils.ts
export const formatSpeakerCount = (count: number): string => {
  if (count >= 1_000_000_000) {
    return `${(count / 1_000_000_000).toFixed(1)}B`;
  }
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(0)}K`;
  }
  return count.toString();
};

export const getFSIBadgeClass = (level: FSILevel): string => {
  return `fsi-badge fsi-badge-${level}`;
};
```

**关键实现要点：**

- 使用`memo`优化性能，避免不必要的重渲染
- 实现完整的键盘导航支持
- 确保所有交互状态都有视觉反馈
- 支持服务端渲染（SSR）

### 2. HeroSection组件实现要点

```typescript
// components/HeroSection/hooks.ts
export const useCountUpAnimation = (target: number) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const duration = 2000; // 2秒动画
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      countRef.current += increment;
      if (countRef.current >= target) {
        countRef.current = target;
        clearInterval(timer);
      }
      setCount(Math.floor(countRef.current));
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return count;
};

// 背景装饰组件
export const HeroDecorations = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 1 }}
  >
    {/* 几何装饰图案 */}
    <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-primary/20 rounded-full" />
    <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/20 to-transparent rounded-lg rotate-45" />
  </motion.div>
);
```

**关键实现要点：**

- 使用Intersection Observer实现滚动触发动画
- 确保CTA按钮在所有设备上都易于点击
- 实现渐进增强的装饰效果

### 3. FilterPanel组件实现架构

```typescript
// components/FilterPanel/FilterGroup.tsx
export const FilterGroup: React.FC<{
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}> = ({ title, children, collapsible = true, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => collapsible && setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        {collapsible && (
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 双范围滑块实现
export const RangeSlider: React.FC<{
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  label: string;
}> = ({ min, max, value, onChange, step = 1, label }) => {
  // 实现双范围滑块逻辑
  // 使用HTML5 range input或第三方库如rc-slider
};
```

**关键实现要点：**

- 状态管理使用Context或Redux Toolkit
- 防抖处理用户输入
- 支持URL参数同步
- 移动端友好的触摸交互

### 4. LanguageList组件性能优化

```typescript
// components/LanguageList/VirtualizedGrid.tsx
import { FixedSizeGrid as Grid } from 'react-window';

export const VirtualizedLanguageGrid: React.FC<{
  languages: Language[];
  itemsPerRow: number;
  itemHeight: number;
  containerHeight: number;
}> = ({ languages, itemsPerRow, itemHeight, containerHeight }) => {
  const rowCount = Math.ceil(languages.length / itemsPerRow);

  const Row = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * itemsPerRow + columnIndex;
    const language = languages[index];

    if (!language) return null;

    return (
      <div style={style} className="p-2">
        <LanguageCard
          language={language}
          variant="expanded"
        />
      </div>
    );
  };

  return (
    <Grid
      columnCount={itemsPerRow}
      columnWidth={320}
      height={containerHeight}
      rowCount={rowCount}
      rowHeight={itemHeight}
      width="100%"
    >
      {Row}
    </Grid>
  );
};
```

## 响应式设计实现

### 断点管理

```typescript
// hooks/useBreakpoint.ts
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint('mobile');
      else if (width < 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

// 组件中使用
const LanguageList = () => {
  const breakpoint = useBreakpoint();
  const itemsPerRow = breakpoint === 'mobile' ? 1 : breakpoint === 'tablet' ? 2 : 4;

  return (
    <div className={`grid gap-6 ${
      breakpoint === 'mobile' ? 'grid-cols-1' :
      breakpoint === 'tablet' ? 'grid-cols-2' : 'grid-cols-4'
    }`}>
      {/* 内容 */}
    </div>
  );
};
```

## 无障碍功能实现

### ARIA标签示例

```typescript
// components/common/AccessibleCard.tsx
export const AccessibleLanguageCard: React.FC<LanguageCardProps> = ({
  language,
  selected,
  onClick
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${language.name}语言，FSI难度等级${language.fsi.category}，学习时间约${language.fsi.hours}小时`}
      aria-selected={selected}
      onClick={() => onClick?.(language.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(language.id);
        }
      }}
      className="language-card focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {/* 卡片内容 */}
    </div>
  );
};
```

### 屏幕阅读器支持

```typescript
// hooks/useAnnouncement.ts
export const useAnnouncement = () => {
  const announce = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }, []);

  return announce;
};

// 在筛选器变化时使用
const FilterPanel = () => {
  const announce = useAnnouncement();

  const handleFilterChange = (newFilters: LanguageFilters) => {
    // 更新筛选器
    onFiltersChange(newFilters);

    // 通知屏幕阅读器
    announce(`筛选已更新，找到${resultCount}种语言`);
  };
};
```

## 性能优化策略

### 1. 代码分割

```typescript
// 懒加载重型组件
const FilterPanel = lazy(() => import('./components/FilterPanel'));
const LanguageComparison = lazy(() => import('./components/LanguageComparison'));

// 在使用时
<Suspense fallback={<FilterPanelSkeleton />}>
  <FilterPanel {...props} />
</Suspense>
```

### 2. 状态管理优化

```typescript
// 使用React.memo和useMemo优化
export const LanguageCard = memo<LanguageCardProps>(({ language, ...props }) => {
  const formattedSpeakers = useMemo(
    () => formatSpeakerCount(language.speakers),
    [language.speakers]
  );

  return (
    // 组件内容
  );
});

// 选择器优化
const selectFilteredLanguages = createSelector(
  [
    (state: AppState) => state.languages.data,
    (state: AppState) => state.filters.current
  ],
  (languages, filters) => applyFilters(languages, filters)
);
```

### 3. 图片和资源优化

```typescript
// 使用Next.js Image组件
import Image from 'next/image';

export const CountryFlag: React.FC<{ country: string; size?: number }> = ({
  country,
  size = 32
}) => {
  return (
    <Image
      src={`/flags/${country.toLowerCase()}.svg`}
      alt={`${country} flag`}
      width={size}
      height={size}
      loading="lazy"
      className="rounded-sm"
    />
  );
};
```

## 测试策略

### 组件测试示例

```typescript
// __tests__/LanguageCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageCard } from '../LanguageCard';
import { mockLanguage } from '../../__mocks__/test-data';

describe('LanguageCard', () => {
  it('renders language information correctly', () => {
    render(<LanguageCard language={mockLanguage} />);

    expect(screen.getByText(mockLanguage.name)).toBeInTheDocument();
    expect(screen.getByText(mockLanguage.nativeName)).toBeInTheDocument();
    expect(screen.getByLabelText(/FSI难度等级/)).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <LanguageCard
        language={mockLanguage}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(mockLanguage.id);
  });

  it('supports keyboard navigation', () => {
    const handleClick = jest.fn();
    render(
      <LanguageCard
        language={mockLanguage}
        onClick={handleClick}
      />
    );

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## 部署和优化

### Build优化配置

```javascript
// next.config.ts
const nextConfig = {
  // 图片优化
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Bundle分析
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // 实验性功能
  experimental: {
    scrollRestoration: true,
  },
};
```

### 监控和分析

```typescript
// utils/performance.ts
export const trackComponentRender = (componentName: string) => {
  if (typeof window !== 'undefined' && window.performance) {
    const mark = `${componentName}-render-start`;
    performance.mark(mark);

    return () => {
      const endMark = `${componentName}-render-end`;
      performance.mark(endMark);
      performance.measure(`${componentName}-render-time`, mark, endMark);
    };
  }
  return () => {};
};

// 在组件中使用
const LanguageCard = (props) => {
  useEffect(() => {
    const endTracking = trackComponentRender('LanguageCard');
    return endTracking;
  }, []);
};
```

---

这份技术实现指南提供了构建高质量、高性能的语言学习平台组件所需的所有技术细节和最佳实践。结合AI工具提示词，可以快速生成符合专业标准的React组件。
