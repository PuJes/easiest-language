# 语言编辑器使用说明

## 📋 概述

本语言编辑器为"最容易学的语言"项目提供完整的语言数据管理功能。您可以通过这个系统轻松地添加、编辑、删除和管理各种语言的详细信息。

## 🏗️ 系统架构

### 核心组件

1. **LanguageEditor Class** (`language-editor.ts`) - 数据操作引擎
2. **useLanguageEditor Hook** (`useLanguageEditor.ts`) - React状态管理
3. **LanguageEditor Component** (`LanguageEditor.tsx`) - 用户界面
4. **Admin Page** (`admin/page.tsx`) - 管理页面

### 数据结构

每个语言包含以下信息类别：

#### 基础信息
- 语言ID、英文名称、本地名称
- 使用国家列表
- 语言家族和子家族分类
- 书写系统、使用人数
- 代表性国旗和UI颜色

#### FSI难度分类
- FSI分类等级 (0-5)
- 学习所需小时数
- 难度描述
- 详细难度分析（语法、词汇、发音、书写、文化）

#### 详细评分
- 总体难度评分 (1-10)
- 各项技能评分
- 商务和文化价值评分

#### 学习资源
- 按水平分类的学习资源
- 资源类型、链接、评分
- 免费/付费标识

## 🚀 快速开始

### 1. 基本使用

```tsx
import LanguageEditor from '@/components/LanguageEditor';

function MyComponent() {
  return (
    <LanguageEditor
      initialLanguageId="es"  // 初始加载西班牙语
      allowCreate={true}      // 允许创建新语言
      onSaveSuccess={(id) => console.log(`保存成功: ${id}`)}
      onCreateSuccess={(id) => console.log(`创建成功: ${id}`)}
    />
  );
}
```

### 2. 使用Hook进行自定义开发

```tsx
import { useLanguageEditor } from '@/lib/hooks/useLanguageEditor';

function CustomEditor() {
  const {
    editForm,
    loadLanguage,
    updateBasics,
    saveLanguage,
    hasUnsavedChanges,
    errors
  } = useLanguageEditor();

  const handleLoadSpanish = () => {
    loadLanguage('es');
  };

  const handleUpdateName = (newName: string) => {
    updateBasics({ name: newName });
  };

  const handleSave = async () => {
    const success = await saveLanguage();
    if (success) {
      alert('保存成功！');
    }
  };

  return (
    <div>
      {editForm && (
        <div>
          <h2>编辑: {editForm.name}</h2>
          <input 
            value={editForm.name}
            onChange={(e) => handleUpdateName(e.target.value)}
          />
          <button onClick={handleSave} disabled={!hasUnsavedChanges}>
            保存
          </button>
        </div>
      )}
    </div>
  );
}
```

### 3. 直接使用编辑器类

```tsx
import { createLanguageEditor } from '@/lib/data/language-editor';

const editor = createLanguageEditor();

// 获取语言编辑表单
const form = editor.getLanguageEditForm('es');

// 更新基础信息
editor.updateLanguageBasics('es', {
  name: 'Spanish (Updated)',
  speakers: 600000000
});

// 更新FSI信息
editor.updateFSIInfo('es', {
  fsiCategory: 1,
  learningHours: 650
});

// 保存更改（获取更新后的数据）
const updatedData = editor.exportData();
```

## 📝 详细功能说明

### 语言数据编辑

#### 基础信息编辑
- **英文名称**: 语言的英文名称（如 "Spanish"）
- **本地名称**: 语言的本地名称（如 "Español"）
- **使用国家**: 该语言主要使用的国家列表
- **语言家族**: 从预设列表中选择（如 "Indo-European"）
- **书写系统**: 从预设列表中选择（如 "Latin"）
- **使用人数**: 全球使用该语言的人数
- **代表国旗**: 代表性国家的国旗emoji
- **显示颜色**: 在UI中显示该语言时使用的颜色

#### FSI难度分类
- **FSI分类等级**: 0-5的分类（0=母语，5=最困难）
- **学习小时数**: 根据FSI标准的学习时长
- **FSI描述**: 对该语言学习难度的描述
- **详细难度分析**: 
  - 语法难度 (1-5)
  - 词汇难度 (1-5)
  - 发音难度 (1-5)
  - 书写难度 (1-5)
  - 文化难度 (1-5)

#### 详细评分系统
- **总体难度**: 1-10的总体评分
- **各项技能评分**: 语法、发音、词汇的1-10评分
- **价值评分**: 商务价值、旅游价值、文化丰富度、网络存在感的1-5评分

### 学习资源管理

#### 添加学习资源
- 资源标题和描述
- 资源类型（app、book、course、website、video、podcast）
- 资源链接（可选）
- 免费/付费标识
- 用户评分 (1-5)
- 适用水平（beginner、intermediate、advanced）

#### 资源分类
系统自动按水平对资源进行分类：
- **初级资源**: 适合语言学习初学者
- **中级资源**: 适合有一定基础的学习者
- **高级资源**: 适合高级学习者和进阶需求

## 🔧 高级功能

### 批量操作
- **批量更新FSI分类**: 根据学习小时数自动更新所有语言的FSI分类
- **数据验证**: 检查所有语言数据的完整性和一致性
- **批量导入**: 从CSV或JSON文件导入语言数据

### 数据导出
- **JSON格式**: 完整的数据结构，适合程序处理和备份
- **CSV格式**: 表格格式，适合Excel处理和数据分析
- **选择性导出**: 可以选择导出特定类型的数据

### 数据验证
系统提供多层验证机制：
- **字段完整性验证**: 确保必需字段不为空
- **数值范围验证**: 确保评分在有效范围内
- **引用完整性验证**: 确保语言家族等引用数据的一致性

## 🎨 自定义和扩展

### 添加新的语言家族
修改 `LANGUAGE_EDIT_PRESETS.families` 数组：

```typescript
export const LANGUAGE_EDIT_PRESETS = {
  families: [
    'Indo-European',
    'Sino-Tibetan',
    // 添加新的语言家族
    'New-Language-Family'
  ],
  // ...
};
```

### 添加新的书写系统
修改 `LANGUAGE_EDIT_PRESETS.writingSystems` 数组：

```typescript
export const LANGUAGE_EDIT_PRESETS = {
  writingSystems: [
    'Latin',
    'Chinese Characters',
    // 添加新的书写系统
    'New-Writing-System'
  ],
  // ...
};
```

### 扩展资源类型
修改 `LearningResource` 类型定义：

```typescript
export interface LearningResource {
  title: string;
  type: 'app' | 'book' | 'course' | 'website' | 'video' | 'podcast' | 'new-type';
  // ...
}
```

## 🔍 故障排除

### 常见问题

1. **编辑器无法加载语言数据**
   - 检查语言ID是否正确
   - 确保语言存在于数据源中

2. **保存时出现验证错误**
   - 检查必需字段是否已填写
   - 确保数值字段在有效范围内

3. **学习资源无法添加**
   - 确保标题和描述字段不为空
   - 检查资源类型是否在预设列表中

### 调试技巧

1. **使用浏览器开发者工具**
   ```javascript
   // 在控制台中查看当前编辑器状态
   console.log(editor.exportData());
   ```

2. **启用详细错误信息**
   ```typescript
   const validation = editor.validateLanguage(languageId);
   console.log(validation.errors);
   ```

## 📚 API参考

### LanguageEditor 类方法

#### 基础操作
- `getLanguageEditForm(languageId: string): LanguageEditForm | null`
- `updateLanguageBasics(languageId: string, updates: Partial<LanguageEditForm>): boolean`
- `updateFSIInfo(languageId: string, updates: Partial<LanguageEditForm>): boolean`
- `updateDifficultyScores(languageId: string, updates: Partial<LanguageEditForm>): boolean`

#### CRUD操作
- `createLanguage(newLanguageData: Omit<LanguageEditForm, 'id'>): string`
- `deleteLanguage(languageId: string): boolean`
- `validateLanguage(languageId: string): {valid: boolean, errors: string[]}`

#### 资源管理
- `getLearningResources(languageId: string): LearningResource[]`
- `addLearningResource(languageId: string, resource: LearningResourceEdit): string`
- `updateLearningResource(languageId: string, index: number, updates: Partial<LearningResourceEdit>): boolean`
- `deleteLearningResource(languageId: string, index: number): boolean`

#### 数据导出
- `exportData(): {languages: Language[], learningResources: Record<string, LearningResource[]>}`
- `getAllLanguagesSummary(): Array<{id: string, name: string, nativeName: string}>`

### useLanguageEditor Hook 返回值

#### 状态
- `currentLanguageId: string | null` - 当前编辑的语言ID
- `editForm: LanguageEditForm | null` - 当前编辑表单数据
- `isLoading: boolean` - 是否正在加载
- `hasUnsavedChanges: boolean` - 是否有未保存的更改
- `errors: string[]` - 错误信息列表

#### 操作方法
- `loadLanguage(languageId: string): Promise<boolean>` - 加载语言数据
- `saveLanguage(): Promise<boolean>` - 保存当前编辑的语言
- `createLanguage(formData): Promise<string | null>` - 创建新语言
- `deleteLanguage(languageId: string): Promise<boolean>` - 删除语言

#### 表单更新
- `updateBasics(updates: Partial<LanguageEditForm>): void` - 更新基础信息
- `updateFSI(updates: Partial<LanguageEditForm>): void` - 更新FSI信息
- `updateDifficulty(updates: Partial<LanguageEditForm>): void` - 更新难度评分
- `resetForm(): void` - 重置表单到原始状态

## 🤝 贡献指南

如果您想为语言编辑器贡献代码或功能：

1. 遵循现有的代码风格和注释规范
2. 为新功能添加相应的类型定义
3. 确保所有新功能都有适当的验证
4. 添加必要的错误处理
5. 更新相关文档

## 📄 许可证

该语言编辑器系统是"最容易学的语言"项目的一部分，遵循项目的整体许可证。
