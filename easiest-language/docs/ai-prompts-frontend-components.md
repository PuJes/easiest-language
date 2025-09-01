# 语言学习平台 AI UI组件提示词集合

基于前端规格说明文档，为专业AI UI工具（v0.dev、Lovable等）生成的组件提示词集合。

## 技术栈信息

- **框架**: Next.js 14 + React 19 + TypeScript
- **样式**: Tailwind CSS v4 + 自定义CSS变量
- **动画**: Framer Motion
- **主题**: 深色主题，现代简洁设计
- **颜色系统**: 主色#3b82f6、辅助#8b5cf6、强调#10b981
- **FSI难度等级**: 6个颜色等级（灰/绿/黄/橙/红/紫）

---

## 1. LanguageCard组件 - 语言展示卡片（最高优先级）

### AI提示词

````
创建一个现代化的语言学习卡片组件（LanguageCard），用于展示语言信息。

**组件规格**：
- 使用Next.js 14、React 19、TypeScript、Tailwind CSS v4和Framer Motion
- 深色主题设计，主背景色#0b1220，卡片背景#0f172a
- 支持三种变体：紧凑版（列表视图）、展开版（网格视图）、比较版（比较页面）

**视觉设计要求**：
- 卡片尺寸：展开版320×240px，紧凑版全宽×80px，比较版280×200px
- 圆角12px，边框颜色#1f2a44
- 悬停时上升4px阴影效果，使用transform和box-shadow过渡
- FSI难度指示器：左上角彩色徽章，根据难度等级显示不同颜色
  - 0级(母语):#6c757d 1级(容易):#28a745 2级(中等):#ffc107
  - 3级(较难):#fd7e14 4级(困难):#dc3545 5级(最难):#6f42c1

**内容布局**：
- 顶部：国旗emoji (32px) + 英文名称 (font-semibold text-lg)
- 中部：本地名称 (text-sm text-slate-400)
- 下部：主要使用国家 (text-xs text-slate-500) + 使用人数 (格式化显示，如"1.2B speakers")
- 底部：学习时间标签 (如"600小时" 背景色基于FSI等级)

**交互行为**：
- 悬停：卡片上升，边框发光效果
- 点击：导航到语言详情页面
- 支持键盘导航和屏幕阅读器
- 选中状态：蓝色边框#3b82f6

**动画效果**：
使用Framer Motion实现：
- 入场动画：从下方滑入，透明度0→1
- 悬停动画：轻微缩放和阴影变化
- 难度徽章：轻微的脉冲动画效果

**TypeScript接口**：
```typescript
interface LanguageCardProps {
  language: {
    id: string;
    name: string;
    nativeName: string;
    countries: string[];
    difficulty: number; // FSI level 0-5
    hours: number;
    speakers: number;
    flagEmoji: string;
    color: string;
  };
  variant?: 'compact' | 'expanded' | 'comparison';
  selected?: boolean;
  onClick?: (languageId: string) => void;
  className?: string;
}
````

**无障碍要求**：

- 完整的ARIA标签和语义HTML
- 键盘导航支持
- 颜色对比度符合WCAG 2.1 AA标准
- 屏幕阅读器友好的文本描述

请生成完整的组件代码，包含所有变体和状态处理。

```

---

## 2. HeroSection组件 - 首页主要区域

### AI提示词

```

创建一个语言学习平台的首页Hero区域组件，现代化设计风格。

**组件规格**：

- 使用Next.js 14、React 19、TypeScript、Tailwind CSS v4和Framer Motion
- 深色主题，背景渐变从#0b1220到#1f2a44
- 响应式设计，在移动端、平板、桌面端都有良好表现

**视觉设计要求**：

- 容器最大宽度1440px，居中对齐
- 高度：桌面端80vh，移动端60vh
- 背景：深色渐变 + 微妙的几何装饰图案
- 文字颜色：主标题#e2e8f0，副标题#94a3b8

**内容结构**：

- 主标题："找到最适合你的语言学习之路" (text-5xl font-bold)
- 副标题："基于FSI官方数据，科学评估50+种语言的学习难度" (text-xl text-slate-400)
- 统计数据展示：3个卡片显示"50+ 种语言"、"1000+ 小时数据"、"科学评估方法"
- 主要CTA按钮："开始语言测试"（渐变背景，从#3b82f6到#8b5cf6）
- 次要按钮："浏览所有语言"（透明背景，蓝色边框）

**布局安排**：

- 左侧（60%）：文字内容和按钮
- 右侧（40%）：3D语言地球或语言云效果（装饰性）
- 底部：统计数据卡片（水平排列，移动端垂直堆叠）

**交互效果**：

- CTA按钮悬停：上升2px，增强阴影
- 统计卡片：计数动画效果，从0递增到目标数字
- 背景元素：微妙的视差滚动效果
- 文字：分阶段淡入动画（主标题→副标题→按钮→统计）

**动画设计**：
使用Framer Motion实现：

- 页面加载：文字从左侧滑入，装饰从右侧滑入
- 按钮悬停：轻微缩放和颜色变化
- 统计数字：CountUp动画效果
- 背景装饰：缓慢旋转/移动动画

**TypeScript接口**：

```typescript
interface HeroSectionProps {
  onStartQuiz: () => void;
  onBrowseLanguages: () => void;
  statistics: {
    languageCount: number;
    totalHours: number;
    userCount?: number;
  };
  className?: string;
}
```

**响应式断点**：

- 移动端（<768px）：单列布局，装饰隐藏，按钮全宽
- 平板（768-1024px）：简化装饰，调整文字大小
- 桌面（>1024px）：完整双列布局

**性能优化**：

- 图片懒加载
- 动画使用transform而非position
- 合理使用will-change属性

请生成完整的组件代码，包含所有响应式变化和动画效果。

```

---

## 3. FilterPanel组件 - 筛选面板

### AI提示词

```

创建一个功能完整的语言筛选面板组件，支持多维度筛选功能。

**组件规格**：

- 使用Next.js 14、React 19、TypeScript、Tailwind CSS v4和Framer Motion
- 深色主题，面板背景#0f172a，边框#1f2a44
- 支持桌面侧边栏和移动抽屉两种布局模式

**视觉设计要求**：

- 桌面版：固定侧边栏，宽度320px，高度自适应
- 移动版：从底部滑出的抽屉，高度60vh
- 背景：深色卡片样式，圆角12px
- 分组标题：text-sm font-medium text-slate-300
- 筛选器：现代化开关、滑块、多选按钮设计

**筛选功能模块**：

1. **难度等级筛选**（FSI Category）：
   - 6个彩色徽章，可多选
   - 每个等级显示颜色标识和描述文字
   - 选中状态：边框高亮，背景透明度50%

2. **学习时间范围**（双范围滑块）：
   - 范围：0-2500小时
   - 默认值：0-1200小时
   - 实时显示当前选择范围

3. **语言家族**（下拉多选）：
   - 主要家族：Indo-European、Sino-Tibetan、Afro-Asiatic等
   - 支持搜索和全选/取消全选
   - 选中项显示为标签

4. **地理区域**（网格选择）：
   - 世界主要地区：欧洲、亚洲、非洲、美洲等
   - 每个区域显示代表性图标
   - 多选模式

5. **使用人数**（滑块筛选）：
   - 最小使用人数筛选
   - 对数刻度显示（1M、10M、100M、1B+）
   - 实时预览筛选结果数量

**交互体验**：

- 实时筛选：每个选择立即更新结果
- 筛选计数：显示"已选择X个筛选器，找到Y种语言"
- 清除按钮：一键清空所有筛选条件
- 收缩/展开：每个筛选组支持折叠

**状态管理**：

- 筛选条件状态持久化（URL参数或localStorage）
- 加载状态处理
- 错误状态处理

**动画效果**：
使用Framer Motion实现：

- 抽屉滑入/滑出动画
- 筛选器展开/收缩动画
- 选择状态变化的微交互
- 结果计数的数字变化动画

**TypeScript接口**：

```typescript
interface FilterPanelProps {
  filters: {
    fsiCategories: number[];
    hoursRange: [number, number];
    families: string[];
    regions: string[];
    minSpeakers: number;
  };
  onFiltersChange: (filters: LanguageFilters) => void;
  onClearFilters: () => void;
  resultCount: number;
  variant: 'sidebar' | 'drawer';
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}
```

**响应式行为**：

- 桌面端：固定侧边栏，始终可见
- 平板端：可收缩侧边栏，带切换按钮
- 移动端：底部抽屉，覆盖主内容

**无障碍支持**：

- 完整键盘导航
- 屏幕阅读器标签
- 焦点管理（抽屉打开时）
- 高对比度模式支持

请生成完整的组件代码，包含所有筛选器类型和响应式布局。

```

---

## 4. LanguageList组件 - 语言列表页面

### AI提示词

```

创建一个功能完整的语言列表组件，支持网格/列表视图切换和高级排序功能。

**组件规格**：

- 使用Next.js 14、React 19、TypeScript、Tailwind CSS v4和Framer Motion
- 深色主题，与整体设计保持一致
- 集成LanguageCard和FilterPanel组件

**布局结构**：

- 顶部工具栏：搜索框 + 视图切换 + 排序选项
- 左侧（桌面）：FilterPanel侧边栏 (320px宽)
- 主内容区：语言卡片网格或列表
- 底部：分页器或加载更多按钮

**工具栏功能**：

1. **搜索框**：
   - 实时搜索，支持语言名称和本地名称
   - 搜索图标 + 清除按钮
   - 防抖处理，300ms延迟
   - Placeholder: "搜索语言..."

2. **视图切换**：
   - 网格视图：4×N网格（桌面），2×N（平板），1×N（移动）
   - 列表视图：紧凑的水平布局
   - 图标切换按钮，带状态指示

3. **排序选项**：
   - 下拉选择器：名称(A-Z)、难度(低→高)、难度(高→低)、学习时间(少→多)、使用人数(多→少)
   - 当前排序方式高亮显示
   - 排序图标指示升序/降序

**主内容区**：

- 网格模式：响应式网格，使用LanguageCard展开版
- 列表模式：堆叠布局，使用LanguageCard紧凑版
- 空状态：友好的"未找到语言"提示 + 建议操作
- 加载状态：骨架屏或加载指示器

**性能优化**：

- 虚拟滚动（对于大量数据）
- 分页或无限滚动
- 图片懒加载
- 搜索防抖

**动画效果**：
使用Framer Motion实现：

- 卡片列表的交错进场动画
- 视图切换的布局动画（layoutId）
- 筛选结果变化的流畅过渡
- 排序时的重新排列动画

**状态管理**：

- 搜索关键词状态
- 筛选器状态（与FilterPanel协调）
- 排序方式状态
- 视图模式状态（持久化到localStorage）

**TypeScript接口**：

```typescript
interface LanguageListProps {
  languages: Language[];
  loading?: boolean;
  filters: LanguageFilters;
  searchQuery: string;
  sortBy: LanguageSortBy;
  viewMode: 'grid' | 'list';
  onFiltersChange: (filters: LanguageFilters) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: LanguageSortBy) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onLanguageClick: (languageId: string) => void;
  className?: string;
}
```

**响应式设计**：

- 移动端（<768px）：
  - 筛选面板改为抽屉模式
  - 单列卡片布局
  - 工具栏简化（搜索 + 筛选按钮）
- 平板端（768-1024px）：
  - 2列卡片布局
  - 可收缩的筛选面板
- 桌面端（>1024px）：
  - 3-4列卡片布局
  - 固定筛选面板

**无障碍功能**：

- 语义化HTML结构
- 键盘导航支持
- 屏幕阅读器优化
- 筛选和排序操作的语音反馈

**错误处理**：

- 网络错误的友好提示
- 搜索无结果的引导
- 筛选条件过严的建议

请生成完整的组件代码，包含所有功能模块和响应式布局处理。

```

---

## 使用说明

### 如何使用这些提示词

1. **选择合适的AI工具**：推荐使用v0.dev、Lovable、或Claude等支持React组件生成的工具
2. **复制完整提示词**：将整个提示词（包括技术要求和接口定义）复制到AI工具中
3. **根据需要调整**：可以根据具体项目需求微调颜色、尺寸等参数
4. **逐步完善**：先生成基础组件，再添加动画和高级功能

### 提示词优化建议

- **具体化描述**：包含具体的像素值、颜色代码、动画时长
- **技术栈明确**：明确指定使用的框架和库版本
- **类型安全**：提供完整的TypeScript接口定义
- **无障碍考虑**：包含WCAG标准要求
- **性能意识**：提及关键的性能优化点

### 组件集成顺序

建议按以下顺序开发组件：
1. **LanguageCard** - 作为基础展示单元
2. **FilterPanel** - 提供筛选功能
3. **HeroSection** - 首页入口体验
4. **LanguageList** - 集成上述组件的主页面

---

*本文档基于语言学习平台的前端规格说明生成，确保所有组件设计的一致性和专业性。*
```
