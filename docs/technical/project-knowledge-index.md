# 📚 Easiest Language 项目知识库索引

## 🎯 项目概览

**项目名称**: Easiest Language (语言学习难度分析平台)  
**技术栈**: Next.js 15 + React 19 + TypeScript + Tailwind CSS v4  
**开发模式**: TDD (测试驱动开发)  
**目标**: 基于FSI数据为用户推荐最适合的语言学习路径

---

## 📋 核心文档导航

### 规划文档 (`plan_file/`)
- **[MVP开发计划](../plan_file/MVP开发计划.md)** - 5个Sprint的详细开发计划
- **[技术架构文档](../plan_file/技术架构文档.md)** - 技术选型和架构设计
- **[开发规范文档](../plan_file/开发规范文档.md)** - 代码规范和最佳实践
- **[开发准备检查清单](../plan_file/开发准备检查清单.md)** - 环境配置检查清单

### 技术文档 (`docs/`)
- **[前端规格说明](./前端规格说明.md)** - UI/UX设计规范
- **[组件实现指南](./component-implementation-guide.md)** - 组件开发指南
- **[测试计划](./testing/test-plan.md)** - 测试策略和计划
- **[部署指南](./deployment/cloudbase-deployment-guide.md)** - 云端部署流程

---

## 🗂️ 项目结构快速导航

### 📱 前端应用 (`src/`)

#### 页面结构 (`src/app/`)
```
src/app/
├── layout.tsx          # 根布局配置
├── page.tsx           # 主导航页面 (MVP功能入口)
├── home/              # 首页 (英雄区块 + FSI测验)
├── languages/         # 语言列表页 (筛选 + 搜索)
├── language/[id]/     # 语言详情页 (FSI数据 + 学习资源)
└── compare/          # 语言对比页 (雷达图对比)
```

#### 核心组件 (`src/components/`)
- **LanguageCard.tsx** - 语言信息卡片组件
- **LanguageDetail.tsx** - 语言详情展示组件  
- **LanguageComparison.tsx** - 语言对比功能组件
- **MVPDemo.tsx** - MVP功能演示组件
- **StatsDashboard.tsx** - 统计数据面板

#### 筛选系统 (`src/components/filters/`)
- **SmartSearchFilter.tsx** - 智能搜索筛选 (43%覆盖率)
- **FSICategoryFilter.tsx** - FSI难度等级筛选 (51%覆盖率)  
- **LanguageFamilyFilter.tsx** - 语言家族筛选 (96%覆盖率)
- **GeographicRegionFilter.tsx** - 地理区域筛选 (93%覆盖率)

#### 数据层 (`src/lib/data/`)
- **languages.ts** - 50种语言的FSI数据 (75%覆盖率)
- **countries.ts** - 国家地区数据 (93%覆盖率)
- **language-families.ts** - 语言家族分类 (未使用)
- **learning-resources.ts** - 学习资源数据 (未使用)
- **data-adapters.ts** - 数据适配器 (未使用)

#### 业务逻辑 (`src/lib/`)
- **hooks/useAdvancedFilter.ts** - 高级筛选Hook (**测试失败**)
- **types/** - TypeScript类型定义
- **utils/** - 工具函数和验证逻辑

---

## 🧪 测试现状总览

### 当前测试覆盖率
```
总体覆盖率: 22.83% (目标: 90%)
├── Statements: 22.83%
├── Branches:   17.98%  
├── Functions:  21.72%
└── Lines:      22.48%
```

### 测试文件分布
- ✅ **数据层测试**: `languages.test.ts`, `countries.test.ts`
- ✅ **筛选器测试**: 4个筛选器组件测试
- ❌ **Hook测试**: `useAdvancedFilter.test.ts` (**失败**)
- ❌ **组件测试**: 主要UI组件未测试 (0%覆盖率)

### 紧急修复需求
1. **Jest配置错误**: `moduleNameMapping` 拼写错误
2. **Mock问题**: `mockLocalStorage` 未定义
3. **覆盖率提升**: 需要大量补充单元测试

---

## 🎯 MVP开发进度追踪

### Sprint 1-2: 核心数据展示 (70% 完成)
- ✅ 语言列表页面框架
- ✅ 基础过滤功能
- 🟡 搜索功能 (部分实现)
- ❌ 测试覆盖率不达标

### Sprint 3-4: 交互功能 (30% 完成)  
- 🟡 对比功能基础框架
- ❌ 推荐系统未实现
- ❌ 个性化算法缺失

### Sprint 5: 优化提升 (10% 完成)
- ❌ 性能优化待实现
- ❌ 无障碍优化未开始
- ❌ SEO优化基础薄弱

---

## 🚨 关键技术债务

### 🔥 高优先级
1. **测试系统修复**: Jest配置 + Hook测试失败
2. **覆盖率提升**: 22.83% → 90%目标
3. **核心功能完善**: 推荐算法 + 完整对比功能

### 🟡 中优先级  
1. **未使用代码激活**: 数据适配器、学习资源、语言家族
2. **性能优化**: Bundle分析、懒加载、缓存策略
3. **用户体验**: 无障碍访问、SEO优化

### 🟢 低优先级
1. **代码重构**: 工具函数整理、类型定义优化
2. **文档完善**: API文档、用户手册
3. **监控集成**: 错误追踪、性能监控

---

## 🛠️ 常用命令

### 开发命令
```bash
npm run dev          # 开发服务器 (Turbopack)
npm run build        # 生产构建
npm run test         # 运行测试
npm run test:coverage # 测试覆盖率
npm run lint         # 代码检查
npm run format       # 代码格式化
```

### 测试命令
```bash
npm test             # Jest单元测试
npm run test:watch   # 监听模式测试
npm run cypress:open # 打开Cypress
npm run test:e2e     # 端到端测试
```

### 部署命令
```bash
npm run deploy:cloudbase    # 腾讯云部署
npm run build:cloudbase     # 云端构建
npm run preview:cloudbase   # 预览部署
```

---

## 🔗 外部依赖

### 核心依赖
- **Next.js 15.5.2** - React全栈框架
- **React 19.1.0** - UI库 (最新版本)
- **TypeScript 5** - 类型系统
- **Tailwind CSS 4** - 样式框架

### 功能依赖  
- **ECharts 6.0.0** - 数据可视化
- **Framer Motion 12.23.12** - 动画库
- **@heroicons/react 2.2.0** - 图标库

### 开发依赖
- **Jest 30.1.1** - 测试框架  
- **Cypress 15.0.0** - E2E测试
- **ESLint 9** + **Prettier 3.6.2** - 代码质量
- **Husky 9.1.7** - Git钩子管理

---

## 📈 项目健康度仪表板

| 指标 | 当前状态 | 目标 | 状态 |
|------|----------|------|------|
| 测试覆盖率 | 22.83% | 90% | 🔴 危险 |
| 构建状态 | ✅ 通过 | ✅ 通过 | 🟢 健康 |
| TypeScript | ✅ 零错误 | ✅ 零错误 | 🟢 健康 |
| 代码规范 | ✅ 通过 | ✅ 通过 | 🟢 健康 |
| 依赖更新 | 🟡 最新 | 🟢 最新 | 🟡 良好 |
| 文档完整性 | 🟡 70% | 🟢 90% | 🟡 良好 |

---

## 🎯 下一步行动建议

### 立即行动 (今日)
1. 修复Jest配置中的拼写错误
2. 解决 `useAdvancedFilter.test.ts` 测试失败
3. 确保核心筛选功能正常工作

### 本周目标
1. 将测试覆盖率提升至50%以上
2. 激活未使用的数据层模块
3. 完善搜索筛选功能的用户体验

### 两周目标
1. 实现完整的语言推荐系统
2. 完善语言对比可视化功能  
3. 添加性能监控和优化措施

---

**文档创建**: 2025年08月31日  
**最后更新**: 2025年08月31日  
**维护者**: BMad Orchestrator  
**版本**: v1.0