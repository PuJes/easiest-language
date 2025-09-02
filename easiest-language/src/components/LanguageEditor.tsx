/**
 * 语言编辑器组件
 * 提供完整的语言数据编辑界面
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useLanguageEditor } from '../lib/hooks/useLanguageEditor';
import { LanguageEditForm, LearningResourceEdit } from '../lib/data/language-editor';

interface LanguageEditorProps {
  /** 初始要编辑的语言ID */
  initialLanguageId?: string;
  /** 是否显示创建新语言选项 */
  allowCreate?: boolean;
  /** 保存成功回调 */
  onSaveSuccess?: (languageId: string) => void;
  /** 创建成功回调 */
  onCreateSuccess?: (languageId: string) => void;
}

/**
 * 语言编辑器主组件
 */
export function LanguageEditor({
  initialLanguageId,
  allowCreate = true,
  onSaveSuccess,
  onCreateSuccess,
}: LanguageEditorProps) {
  const {
    currentLanguageId,
    editForm,
    isLoading,
    hasUnsavedChanges,
    errors,
    loadLanguage,
    saveLanguage,
    createLanguage,
    deleteLanguage,
    updateBasics,
    updateFSI,
    updateDifficulty,
    updateForm,
    resetForm,
    learningResources,
    addResource,
    updateResource,
    deleteResource,
    validateCurrentLanguage,
    languagesList,
    presets,
  } = useLanguageEditor();

  const [activeTab, setActiveTab] = useState<'basics' | 'fsi' | 'difficulty' | 'resources'>(
    'basics'
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>(initialLanguageId || '');

  // 加载初始语言
  useEffect(() => {
    if (initialLanguageId && !currentLanguageId) {
      loadLanguage(initialLanguageId);
    }
  }, [initialLanguageId, currentLanguageId, loadLanguage]);

  // 处理语言选择
  const handleLanguageSelect = async (languageId: string) => {
    if (hasUnsavedChanges) {
      const confirmDiscard = window.confirm('有未保存的更改，确定要切换到其他语言吗？');
      if (!confirmDiscard) return;
    }

    setSelectedLanguageId(languageId);
    await loadLanguage(languageId);
  };

  // 处理保存
  const handleSave = async () => {
    const success = await saveLanguage();
    if (success && onSaveSuccess && currentLanguageId) {
      onSaveSuccess(currentLanguageId);
    }
  };

  // 处理创建新语言
  const handleCreate = async (formData: Omit<LanguageEditForm, 'id'>) => {
    const newId = await createLanguage(formData);
    if (newId) {
      setShowCreateForm(false);
      await loadLanguage(newId);
      if (onCreateSuccess) {
        onCreateSuccess(newId);
      }
    }
  };

  if (!editForm) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">语言数据编辑器</h2>

        {/* 语言选择 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">选择要编辑的语言：</label>
          <select
            value={selectedLanguageId}
            onChange={(e) => handleLanguageSelect(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">请选择语言...</option>
            {languagesList.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* 创建新语言按钮 */}
        {allowCreate && (
          <div className="mb-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              创建新语言
            </button>
          </div>
        )}

        {/* 错误显示 */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-red-800">发生错误：</h3>
            <ul className="mt-2 text-sm text-red-700">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 创建语言表单模态框 */}
        {showCreateForm && (
          <CreateLanguageModal
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
            presets={presets}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* 头部 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">编辑语言: {editForm.name}</h2>
          <p className="text-gray-600">{editForm.nativeName}</p>
        </div>
        <div className="flex gap-2">
          {hasUnsavedChanges && (
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              重置
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {isLoading ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      {/* 状态指示器 */}
      {hasUnsavedChanges && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">⚠️ 有未保存的更改</p>
        </div>
      )}

      {/* 错误显示 */}
      {errors.length > 0 && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-red-800">发生错误：</h3>
          <ul className="mt-2 text-sm text-red-700">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 标签页导航 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'basics', label: '基础信息' },
            { id: 'fsi', label: 'FSI难度' },
            { id: 'difficulty', label: '详细评分' },
            { id: 'resources', label: '学习资源' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 标签页内容 */}
      <div className="tab-content">
        {activeTab === 'basics' && (
          <BasicsTab editForm={editForm} updateBasics={updateBasics} presets={presets} />
        )}
        {activeTab === 'fsi' && (
          <FSITab editForm={editForm} updateFSI={updateFSI} presets={presets} />
        )}
        {activeTab === 'difficulty' && (
          <DifficultyTab editForm={editForm} updateDifficulty={updateDifficulty} />
        )}
        {activeTab === 'resources' && (
          <ResourcesTab
            resources={learningResources}
            onAddResource={addResource}
            onUpdateResource={updateResource}
            onDeleteResource={deleteResource}
          />
        )}
      </div>
    </div>
  );
}

/**
 * 基础信息标签页
 */
function BasicsTab({
  editForm,
  updateBasics,
  presets,
}: {
  editForm: LanguageEditForm;
  updateBasics: (updates: Partial<LanguageEditForm>) => void;
  presets: any;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 英文名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">英文名称 *</label>
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => updateBasics({ name: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: Spanish"
          />
        </div>

        {/* 本地名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">本地名称 *</label>
          <input
            type="text"
            value={editForm.nativeName}
            onChange={(e) => updateBasics({ nativeName: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: Español"
          />
        </div>

        {/* 语言家族 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">语言家族 *</label>
          <select
            value={editForm.family}
            onChange={(e) => updateBasics({ family: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {presets.families.map((family: string) => (
              <option key={family} value={family}>
                {family}
              </option>
            ))}
          </select>
        </div>

        {/* 语言子家族 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">语言子家族</label>
          <input
            type="text"
            value={editForm.subfamily}
            onChange={(e) => updateBasics({ subfamily: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: Romance"
          />
        </div>

        {/* 书写系统 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">书写系统 *</label>
          <select
            value={editForm.writingSystem}
            onChange={(e) => updateBasics({ writingSystem: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {presets.writingSystems.map((system: string) => (
              <option key={system} value={system}>
                {system}
              </option>
            ))}
          </select>
        </div>

        {/* 使用人数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">使用人数</label>
          <input
            type="number"
            value={editForm.speakers}
            onChange={(e) => updateBasics({ speakers: parseInt(e.target.value) || 0 })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: 500000000"
          />
        </div>

        {/* 代表性国旗 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">代表性国旗 Emoji</label>
          <input
            type="text"
            value={editForm.flagEmoji}
            onChange={(e) => updateBasics({ flagEmoji: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: 🇪🇸"
          />
        </div>

        {/* 显示颜色 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">显示颜色</label>
          <input
            type="color"
            value={editForm.color}
            onChange={(e) => updateBasics({ color: e.target.value })}
            className="block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 使用国家 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">使用国家 *</label>
        <CountryEditor
          countries={editForm.countries}
          onChange={(countries) => updateBasics({ countries })}
        />
      </div>
    </div>
  );
}

/**
 * FSI难度标签页
 */
function FSITab({
  editForm,
  updateFSI,
  presets,
}: {
  editForm: LanguageEditForm;
  updateFSI: (updates: Partial<LanguageEditForm>) => void;
  presets: any;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FSI分类 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">FSI分类等级 *</label>
          <select
            value={editForm.fsiCategory}
            onChange={(e) => {
              const category = parseInt(e.target.value) as any;
              updateFSI({
                fsiCategory: category,
                fsiDescription: presets.fsiDescriptions[category],
                color: presets.fsiColors[category],
              });
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(presets.fsiDescriptions).map(([key, desc]) => (
              <option key={key} value={key}>
                Category {key}: {desc as string}
              </option>
            ))}
          </select>
        </div>

        {/* 学习小时数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">学习小时数 *</label>
          <input
            type="number"
            value={editForm.learningHours}
            onChange={(e) => updateFSI({ learningHours: parseInt(e.target.value) || 0 })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: 600"
          />
        </div>
      </div>

      {/* FSI描述 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">FSI描述</label>
        <textarea
          value={editForm.fsiDescription}
          onChange={(e) => updateFSI({ fsiDescription: e.target.value })}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="描述该语言的学习难度特点..."
        />
      </div>

      {/* FSI详细难度 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">详细难度分析 (1-5分)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { key: 'grammarDifficulty', label: '语法难度' },
            { key: 'vocabularyDifficulty', label: '词汇难度' },
            { key: 'pronunciationDifficulty', label: '发音难度' },
            { key: 'writingDifficulty', label: '书写难度' },
            { key: 'culturalDifficulty', label: '文化难度' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <input
                type="number"
                min="1"
                max="5"
                value={editForm[key as keyof LanguageEditForm] as number}
                onChange={(e) => updateFSI({ [key]: parseInt(e.target.value) || 1 })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 详细难度标签页
 */
function DifficultyTab({
  editForm,
  updateDifficulty,
}: {
  editForm: LanguageEditForm;
  updateDifficulty: (updates: Partial<LanguageEditForm>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">难度评分 (1-10分)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: 'overallDifficulty', label: '总体难度' },
            { key: 'grammarScore', label: '语法评分' },
            { key: 'pronunciationScore', label: '发音评分' },
            { key: 'vocabularyScore', label: '词汇评分' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <input
                type="number"
                min="1"
                max="10"
                value={editForm[key as keyof LanguageEditForm] as number}
                onChange={(e) => updateDifficulty({ [key]: parseInt(e.target.value) || 1 })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 扩展信息 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">价值评分 (1-5分)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: 'businessValue', label: '商务价值' },
            { key: 'travelValue', label: '旅游价值' },
            { key: 'culturalRichness', label: '文化丰富度' },
            { key: 'onlinePresence', label: '网络存在感' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <input
                type="number"
                min="1"
                max="5"
                value={editForm[key as keyof LanguageEditForm] as number}
                onChange={(e) => updateDifficulty({ [key]: parseInt(e.target.value) || 1 })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 学习资源标签页
 */
function ResourcesTab({
  resources,
  onAddResource,
  onUpdateResource,
  onDeleteResource,
}: {
  resources: any[];
  onAddResource: (resource: any) => void;
  onUpdateResource: (index: number, updates: any) => void;
  onDeleteResource: (index: number) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">学习资源管理</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          添加资源
        </button>
      </div>

      {/* 资源列表 */}
      <div className="space-y-4">
        {resources.map((resource, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{resource.title}</h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span>类型: {resource.type}</span>
                  <span>评分: {resource.rating || 'N/A'}</span>
                  <span>{resource.free ? '免费' : '付费'}</span>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      查看资源
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => onDeleteResource(index)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 添加资源表单 */}
      {showAddForm && (
        <AddResourceModal
          onSubmit={(resource) => {
            onAddResource(resource);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

/**
 * 国家编辑器组件
 */
function CountryEditor({
  countries,
  onChange,
}: {
  countries: string[];
  onChange: (countries: string[]) => void;
}) {
  const [newCountry, setNewCountry] = useState('');

  const addCountry = () => {
    if (newCountry.trim() && !countries.includes(newCountry.trim())) {
      onChange([...countries, newCountry.trim()]);
      setNewCountry('');
    }
  };

  const removeCountry = (index: number) => {
    const newCountries = countries.filter((_, i) => i !== index);
    onChange(newCountries);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addCountry()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="输入国家名称..."
        />
        <button
          onClick={addCountry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          添加
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {countries.map((country, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {country}
            <button
              onClick={() => removeCountry(index)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * 创建语言模态框
 */
function CreateLanguageModal({
  onSubmit,
  onCancel,
  presets,
}: {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  presets: any;
}) {
  const [formData, setFormData] = useState({
    name: '',
    nativeName: '',
    countries: [] as string[],
    fsiCategory: 1,
    learningHours: 600,
    fsiDescription: '',
    grammarDifficulty: 3,
    vocabularyDifficulty: 3,
    pronunciationDifficulty: 3,
    writingDifficulty: 3,
    culturalDifficulty: 3,
    overallDifficulty: 3,
    grammarScore: 3,
    pronunciationScore: 3,
    vocabularyScore: 3,
    family: 'Indo-European',
    subfamily: '',
    writingSystem: 'Latin',
    speakers: 0,
    flagEmoji: '🏳️',
    color: '#3b82f6',
    businessValue: 3,
    travelValue: 3,
    culturalRichness: 3,
    onlinePresence: 3,
    culturalOverview: '',
    businessUse: '',
    entertainment: [] as string[],
    cuisine: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.nativeName) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">创建新语言</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">英文名称 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">本地名称 *</label>
              <input
                type="text"
                value={formData.nativeName}
                onChange={(e) => setFormData({ ...formData, nativeName: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              创建
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * 添加资源模态框
 */
function AddResourceModal({
  onSubmit,
  onCancel,
}: {
  onSubmit: (resource: any) => void;
  onCancel: () => void;
}) {
  const [resourceData, setResourceData] = useState({
    title: '',
    type: 'app' as const,
    url: '',
    description: '',
    free: true,
    rating: 4,
    level: 'beginner' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resourceData.title && resourceData.description) {
      onSubmit(resourceData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-lg font-medium mb-4">添加学习资源</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">资源标题 *</label>
            <input
              type="text"
              value={resourceData.title}
              onChange={(e) => setResourceData({ ...resourceData, title: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">资源描述 *</label>
            <textarea
              value={resourceData.description}
              onChange={(e) => setResourceData({ ...resourceData, description: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LanguageEditor;
