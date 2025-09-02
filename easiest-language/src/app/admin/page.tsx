/**
 * 管理员页面 - 语言数据管理
 * 整合了可工作的语言编辑功能，包含密码保护
 */

'use client';

import React, { useState, useEffect } from 'react';
import { createLanguageEditor, LanguageEditor } from '@/lib/data/language-editor';
import type { LanguageEditForm } from '@/lib/data/language-editor';
import { AuthProvider, useAuth, withAuth } from '@/lib/context/AuthContext';
import type { FSICategory } from '@/lib/types/language';

/**
 * 受保护的管理员页面内容
 */
function ProtectedAdminContent() {
  const [activeSection, setActiveSection] = useState<'editor' | 'bulk' | 'export'>('editor');
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">语言数据管理</h1>
              <p className="mt-1 text-sm text-gray-500">管理和编辑语言学习网站的语言数据</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* 功能导航按钮 */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveSection('editor')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    activeSection === 'editor'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  语言编辑器
                </button>
                <button
                  onClick={() => setActiveSection('bulk')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    activeSection === 'bulk'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  批量操作
                </button>
                <button
                  onClick={() => setActiveSection('export')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    activeSection === 'export'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  数据导出
                </button>
              </div>

              {/* 用户操作区域 */}
              <div className="flex items-center space-x-3 border-l border-gray-300 pl-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="h-4 w-4 mr-1 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  已登录
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'editor' && <LanguageEditorSection />}
        {activeSection === 'bulk' && <BulkOperationsSection />}
        {activeSection === 'export' && <DataExportSection />}
      </main>
    </div>
  );
}

/**
 * 语言编辑器区域 - 整合了可工作的编辑功能
 */
function LanguageEditorSection() {
  const [editor, setEditor] = useState<LanguageEditor | null>(null);
  const [languages, setLanguages] = useState<
    Array<{ id: string; name: string; nativeName: string; fsiCategory: FSICategory }>
  >([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [editForm, setEditForm] = useState<LanguageEditForm | null>(null);
  const [activeTab, setActiveTab] = useState<
    'basics' | 'fsi' | 'difficulty' | 'resources' | 'culture'
  >('basics');
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // 初始化编辑器
    const ed = createLanguageEditor();
    setEditor(ed);

    // 获取语言列表
    const langList = ed.getAllLanguagesSummary();
    setLanguages(langList);
    console.log('语言列表加载完成:', langList.length, '个语言');
  }, []);

  const handleLanguageSelect = (languageId: string) => {
    if (!editor || !languageId) return;

    if (hasChanges && !window.confirm('有未保存的更改，确定要切换语言吗？')) {
      return;
    }

    setSelectedId(languageId);
    const form = editor.getLanguageEditForm(languageId);
    setEditForm(form);
    setHasChanges(false);
    console.log('选择语言:', languageId, form);
  };

  const updateForm = (updates: Partial<LanguageEditForm>) => {
    if (!editForm) return;
    setEditForm({ ...editForm, ...updates });
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!editor || !editForm || !selectedId) return;

    setIsLoading(true);
    try {
      // 验证数据完整性
      const validation = editor.validateLanguage(selectedId);
      if (!validation.valid) {
        alert(`Data validation failed:\n${validation.errors.join('\n')}`);
        return;
      }

      // 先保存到内存
      const success = editor.updateLanguageComplete(selectedId, editForm);

      if (success) {
        // 如果当前是文化信息标签页，需要单独保存文化信息
        if (activeTab === 'culture') {
          await saveCultureInfo(selectedId, {
            overview: editForm.culturalOverview,
            businessUse: editForm.businessUse,
            entertainment: editForm.entertainment,
            cuisine: editForm.cuisine,
          });
        }

        setHasChanges(false);
        // 刷新语言列表以反映最新数据
        const updatedLanguages = editor.getAllLanguagesSummary();
        setLanguages(updatedLanguages);

        alert(
          'Memory save successful! Data is now active in the current session.\n\nTo save permanently, click the "Permanent Save" button.'
        );
        console.log('语言数据已更新:', selectedId, editForm);
      } else {
        alert('Save failed! Please check the data format.');
      }
    } catch (error) {
      console.error('保存失败:', error);
      alert(`Save failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 保存文化信息的函数
  const saveCultureInfo = async (languageId: string, cultureInfo: any) => {
    try {
      const response = await fetch('/api/admin/save-culture-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languageId,
          cultureInfo,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('文化信息保存成功:', result);
        // 可以显示成功消息
        alert(`文化信息保存成功！\n备份路径: ${result.backupPath}`);
      } else {
        console.error('文化信息保存失败:', result.message);
        alert(`文化信息保存失败: ${result.message}`);
      }
    } catch (error) {
      console.error('保存文化信息时出错:', error);
      alert(`保存文化信息时出错: ${error}`);
    }
  };

  const handlePersistentSave = async () => {
    if (!editor) return;

    setIsLoading(true);
    try {
      const result = await editor.persistDataToFile();

      if (result.success) {
        alert(
          `${result.message}\n\nBackup path: ${result.backupPath}\n\n⚠️ Please restart the development server to fully apply changes!`
        );
      } else {
        alert(`Permanent save failed: ${result.message}`);
      }
    } catch (error) {
      console.error('永久保存失败:', error);
      alert(`Permanent save error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (!selectedId || !editor) return;

    if (window.confirm('确定要重置所有更改吗？')) {
      const form = editor.getLanguageEditForm(selectedId);
      setEditForm(form);
      setHasChanges(false);
    }
  };

  const handleExportData = () => {
    if (!editor) return;

    try {
      const data = editor.exportData();
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `language-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('Data export successful!');
    } catch (error) {
      console.error('导出失败:', error);
      alert('Export failed!');
    }
  };

  return (
    <div className="space-y-6">
      {/* 状态指示器 */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex items-center">
            <div className="text-yellow-800">⚠️ 有未保存的更改</div>
          </div>
        </div>
      )}

      {/* 语言选择 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择要编辑的语言 (共{languages.length}种)：
            </label>
            <select
              value={selectedId}
              onChange={(e) => handleLanguageSelect(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择语言...</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name} ({lang.nativeName}) - FSI:{lang.fsiCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => console.log('创建新语言')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              创建新语言
            </button>
            <button
              onClick={handleExportData}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              📄 导出JSON
            </button>
            <button
              onClick={handlePersistentSave}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              💾 保存到文件
            </button>
          </div>
        </div>
      </div>

      {/* 编辑界面 */}
      {editForm && (
        <div className="bg-white rounded-lg shadow">
          {/* 编辑头部 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">编辑: {editForm.name}</h2>
                <p className="text-gray-600">{editForm.nativeName}</p>
              </div>
              <div className="flex gap-2">
                {hasChanges && (
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    重置
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={isLoading || !hasChanges}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {isLoading ? '保存中...' : '保存到内存'}
                </button>
                <button
                  onClick={handlePersistentSave}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 transition-colors"
                >
                  {isLoading ? '保存中...' : '💾 永久保存'}
                </button>
              </div>
            </div>
          </div>

          {/* 标签页导航 */}
          <div className="border-b border-gray-200">
            <nav className="px-6 -mb-px flex space-x-8">
              {[
                { id: 'basics', label: '基础信息' },
                { id: 'fsi', label: 'FSI难度' },
                { id: 'difficulty', label: '详细评分' },
                { id: 'resources', label: '学习资源' },
                { id: 'culture', label: '文化信息' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as 'basics' | 'fsi' | 'difficulty' | 'resources' | 'culture'
                    )
                  }
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
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
          <div className="p-6">
            {activeTab === 'basics' && <BasicsTab editForm={editForm} updateForm={updateForm} />}
            {activeTab === 'fsi' && <FSITab editForm={editForm} updateForm={updateForm} />}
            {activeTab === 'difficulty' && (
              <DifficultyTab editForm={editForm} updateForm={updateForm} />
            )}
            {activeTab === 'resources' && <ResourcesTab selectedId={selectedId} />}
            {activeTab === 'culture' && (
              <CultureTab
                editForm={editForm}
                updateForm={updateForm}
                onSaveCulture={async () => {
                  if (!selectedId) return;
                  await saveCultureInfo(selectedId, {
                    overview: editForm.culturalOverview,
                    businessUse: editForm.businessUse,
                    entertainment: editForm.entertainment,
                    cuisine: editForm.cuisine,
                  });
                }}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      )}

      {/* 没有选择语言时的提示 */}
      {!editForm && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">开始编辑</h3>
          <p className="text-gray-600 mb-4">请从上方的下拉列表中选择一种语言开始编辑</p>
          <p className="text-sm text-gray-500">
            您可以修改语言的基础信息、FSI难度评级、详细评分以及学习资源
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * 基础信息标签页
 */
function BasicsTab({
  editForm,
  updateForm,
}: {
  editForm: LanguageEditForm;
  updateForm: (updates: Partial<LanguageEditForm>) => void;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">基础信息</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">英文名称 *</label>
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: Spanish"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">本地名称 *</label>
          <input
            type="text"
            value={editForm.nativeName}
            onChange={(e) => updateForm({ nativeName: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: Español"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">语言家族 *</label>
          <input
            type="text"
            value={editForm.family}
            onChange={(e) => updateForm({ family: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: Indo-European"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">语言子家族</label>
          <input
            type="text"
            value={editForm.subfamily}
            onChange={(e) => updateForm({ subfamily: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: Romance"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">书写系统 *</label>
          <input
            type="text"
            value={editForm.writingSystem}
            onChange={(e) => updateForm({ writingSystem: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: Latin"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">使用人数</label>
          <input
            type="number"
            value={editForm.speakers}
            onChange={(e) => updateForm({ speakers: parseInt(e.target.value) || 0 })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: 500000000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">代表性国旗 Emoji</label>
          <input
            type="text"
            value={editForm.flagEmoji}
            onChange={(e) => updateForm({ flagEmoji: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: 🇪🇸"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">显示颜色</label>
          <input
            type="color"
            value={editForm.color}
            onChange={(e) => updateForm({ color: e.target.value })}
            className="block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          使用国家 (用逗号分隔)
        </label>
        <textarea
          value={editForm.countries.join(', ')}
          onChange={(e) =>
            updateForm({ countries: e.target.value.split(',').map((c) => c.trim()) })
          }
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="如: Spain, Mexico, Argentina"
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
  updateForm,
}: {
  editForm: LanguageEditForm;
  updateForm: (updates: Partial<LanguageEditForm>) => void;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">FSI难度设置</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">FSI分类等级 *</label>
          <select
            value={editForm.fsiCategory}
            onChange={(e) => updateForm({ fsiCategory: parseInt(e.target.value) as FSICategory })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={0}>0 - 母语</option>
            <option value={1}>1 - 最容易 (600-750小时)</option>
            <option value={2}>2 - 较容易 (900小时)</option>
            <option value={3}>3 - 中等难度 (1100小时)</option>
            <option value={4}>4 - 较困难 (1800小时)</option>
            <option value={5}>5 - 最困难 (2200小时)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">学习小时数 *</label>
          <input
            type="number"
            value={editForm.learningHours}
            onChange={(e) => updateForm({ learningHours: parseInt(e.target.value) || 0 })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="如: 600"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">FSI描述</label>
        <textarea
          value={editForm.fsiDescription}
          onChange={(e) => updateForm({ fsiDescription: e.target.value })}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="描述这种语言的学习难度..."
        />
      </div>
    </div>
  );
}

/**
 * 详细评分标签页
 */
function DifficultyTab({
  editForm,
  updateForm,
}: {
  editForm: LanguageEditForm;
  updateForm: (updates: Partial<LanguageEditForm>) => void;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">详细评分</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">总体难度 (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={editForm.overallDifficulty}
            onChange={(e) => updateForm({ overallDifficulty: parseInt(e.target.value) || 1 })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">语法评分 (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={editForm.grammarScore}
            onChange={(e) => updateForm({ grammarScore: parseInt(e.target.value) || 1 })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">发音评分 (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={editForm.pronunciationScore}
            onChange={(e) => updateForm({ pronunciationScore: parseInt(e.target.value) || 1 })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">词汇评分 (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={editForm.vocabularyScore}
            onChange={(e) => updateForm({ vocabularyScore: parseInt(e.target.value) || 1 })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-md font-medium text-gray-900 mb-4">详细难度分析 (1-5)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">语法难度</label>
            <input
              type="number"
              min="1"
              max="5"
              value={editForm.grammarDifficulty}
              onChange={(e) => updateForm({ grammarDifficulty: parseInt(e.target.value) || 1 })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">词汇难度</label>
            <input
              type="number"
              min="1"
              max="5"
              value={editForm.vocabularyDifficulty}
              onChange={(e) => updateForm({ vocabularyDifficulty: parseInt(e.target.value) || 1 })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">发音难度</label>
            <input
              type="number"
              min="1"
              max="5"
              value={editForm.pronunciationDifficulty}
              onChange={(e) =>
                updateForm({ pronunciationDifficulty: parseInt(e.target.value) || 1 })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">书写难度</label>
            <input
              type="number"
              min="1"
              max="5"
              value={editForm.writingDifficulty}
              onChange={(e) => updateForm({ writingDifficulty: parseInt(e.target.value) || 1 })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">文化难度</label>
            <input
              type="number"
              min="1"
              max="5"
              value={editForm.culturalDifficulty}
              onChange={(e) => updateForm({ culturalDifficulty: parseInt(e.target.value) || 1 })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 学习资源标签页
 */
function ResourcesTab({ selectedId }: { selectedId: string }) {
  const [resources, setResources] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 获取当前语言的学习资源
  useEffect(() => {
    if (selectedId) {
      loadResourcesForLanguage(selectedId);
    }
  }, [selectedId]);

  const loadResourcesForLanguage = async (languageId: string) => {
    try {
      // 从学习资源数据中获取该语言的资源
      const { LEARNING_RESOURCES_BY_LANGUAGE } = await import('@/lib/data/learning-resources');
      const languageResources = LEARNING_RESOURCES_BY_LANGUAGE[languageId] || [];
      setResources(languageResources);
    } catch (error) {
      console.error('加载学习资源失败:', error);
      // 如果加载失败，使用空数组
      setResources([]);
    }
  };

  const handleAddResource = (resourceData: any) => {
    setResources([...resources, resourceData]);
    setShowAddForm(false);
  };

  const handleUpdateResource = (index: number, updates: any) => {
    const updatedResources = resources.map((resource, i) =>
      i === index ? { ...resource, ...updates } : resource
    );
    setResources(updatedResources);
    setEditingIndex(null);
  };

  const handleDeleteResource = (index: number) => {
    if (window.confirm('确定要删除这个学习资源吗？')) {
      const updatedResources = resources.filter((_, i) => i !== index);
      setResources(updatedResources);
    }
  };

  const handleSaveResources = async () => {
    if (!selectedId) {
      alert('Please select a language first');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/save-learning-resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languageId: selectedId,
          resources: resources,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(
          `Learning resources saved successfully!\n\nBackup path: ${result.backupPath}\nUpdated ${result.updatedCount} resources\n\n⚠️ Please restart the development server to fully apply changes!`
        );
      } else {
        alert(`Save failed: ${result.message}`);
      }
    } catch (error) {
      console.error('保存学习资源失败:', error);
      alert('Save failed, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">学习资源管理</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            添加资源
          </button>
          <button
            onClick={handleSaveResources}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {isLoading ? '保存中...' : '保存资源'}
          </button>
        </div>
      </div>

      {/* 资源列表 */}
      <div className="space-y-4">
        {resources.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-2">暂无学习资源</p>
            <p className="text-sm text-gray-500">点击"添加资源"按钮开始添加学习资源</p>
          </div>
        ) : (
          resources.map((resource, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              {editingIndex === index ? (
                <EditResourceForm
                  resource={resource}
                  onSave={(updates) => handleUpdateResource(index, updates)}
                  onCancel={() => setEditingIndex(null)}
                />
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          resource.free
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {resource.free ? '免费' : '付费'}
                      </span>
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          查看资源 →
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteResource(index)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 添加资源表单 */}
      {showAddForm && (
        <AddResourceModal onSubmit={handleAddResource} onCancel={() => setShowAddForm(false)} />
      )}
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
  const [formData, setFormData] = useState({
    title: '',
    type: 'app' as const,
    url: '',
    description: '',
    free: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">添加学习资源</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">资源标题 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="如: Duolingo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">资源类型 *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="app">应用程序</option>
              <option value="website">网站</option>
              <option value="book">书籍</option>
              <option value="podcast">播客</option>
              <option value="course">课程</option>
              <option value="video">视频</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">资源链接</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">资源描述 *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="描述这个学习资源的特点和优势..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">是否免费</label>
            <select
              value={formData.free ? 'true' : 'false'}
              onChange={(e) => setFormData({ ...formData, free: e.target.value === 'true' })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="true">免费</option>
              <option value="false">付费</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              添加资源
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * 编辑资源表单
 */
function EditResourceForm({
  resource,
  onSave,
  onCancel,
}: {
  resource: any;
  onSave: (updates: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(resource);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">资源标题 *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">资源类型 *</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="app">应用程序</option>
          <option value="website">网站</option>
          <option value="book">书籍</option>
          <option value="podcast">播客</option>
          <option value="course">课程</option>
          <option value="video">视频</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">资源链接</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">资源描述 *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">是否免费</label>
        <select
          value={formData.free ? 'true' : 'false'}
          onChange={(e) => setFormData({ ...formData, free: e.target.value === 'true' })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="true">免费</option>
          <option value="false">付费</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          保存更改
        </button>
      </div>
    </form>
  );
}

/**
 * 文化信息标签页
 */
function CultureTab({
  editForm,
  updateForm,
  onSaveCulture,
  isLoading,
}: {
  editForm: LanguageEditForm;
  updateForm: (updates: Partial<LanguageEditForm>) => void;
  onSaveCulture: () => Promise<void>;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">文化信息</h3>
        <button
          onClick={onSaveCulture}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isLoading ? '保存中...' : '💾 保存文化信息'}
        </button>
      </div>

      {/* 文化概述 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">文化概述 *</label>
        <textarea
          value={editForm.culturalOverview}
          onChange={(e) => updateForm({ culturalOverview: e.target.value })}
          rows={4}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="描述这种语言的文化特色、历史背景和重要价值..."
        />
      </div>

      {/* 商务用途 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">商务用途描述 *</label>
        <textarea
          value={editForm.businessUse}
          onChange={(e) => updateForm({ businessUse: e.target.value })}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="描述这种语言在商务环境中的价值和重要性..."
        />
      </div>

      {/* 娱乐文化 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">娱乐文化形式</label>
        <div className="space-y-2">
          {editForm.entertainment.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newEntertainment = [...editForm.entertainment];
                  newEntertainment[index] = e.target.value;
                  updateForm({ entertainment: newEntertainment });
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="如: 传统音乐、电影文化、文学特色..."
              />
              <button
                type="button"
                onClick={() => {
                  const newEntertainment = editForm.entertainment.filter((_, i) => i !== index);
                  updateForm({ entertainment: newEntertainment });
                }}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                删除
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newEntertainment = [...editForm.entertainment, ''];
              updateForm({ entertainment: newEntertainment });
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            + 添加娱乐形式
          </button>
        </div>
      </div>

      {/* 饮食文化 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">饮食文化特色</label>
        <div className="space-y-2">
          {editForm.cuisine.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newCuisine = [...editForm.cuisine];
                  newCuisine[index] = e.target.value;
                  updateForm({ cuisine: newCuisine });
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="如: 传统美食、地方特色、饮品文化..."
              />
              <button
                type="button"
                onClick={() => {
                  const newCuisine = editForm.cuisine.filter((_, i) => i !== index);
                  updateForm({ cuisine: newCuisine });
                }}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                删除
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newCuisine = [...editForm.cuisine, ''];
              updateForm({ cuisine: newCuisine });
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            + 添加饮食特色
          </button>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">文化信息编辑提示</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>文化概述应该包含语言的历史背景、文化特色和重要价值</li>
                <li>商务用途描述应该说明这种语言在商业环境中的重要性</li>
                <li>娱乐文化形式包括音乐、电影、文学、艺术等文化表达方式</li>
                <li>饮食文化特色包括传统美食、地方特色和饮品文化</li>
                <li>
                  <strong>重要：</strong>编辑完成后请点击"💾 保存文化信息"按钮保存更改
                </li>
                <li>保存的文化信息会立即在前端语言详情页面中显示</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 批量操作区域
 */
function BulkOperationsSection() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">批量操作</h2>

      <div className="space-y-6">
        {/* 批量更新FSI分类 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">批量更新FSI分类</h3>
          <p className="text-sm text-gray-600 mb-4">基于学习小时数自动更新所有语言的FSI分类等级</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            执行批量更新
          </button>
        </div>

        {/* 批量验证数据 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">数据验证</h3>
          <p className="text-sm text-gray-600 mb-4">检查所有语言数据的完整性和一致性</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            开始验证
          </button>
        </div>

        {/* 批量导入数据 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">批量导入</h3>
          <p className="text-sm text-gray-600 mb-4">从CSV或JSON文件导入语言数据</p>
          <input type="file" accept=".csv,.json" className="mb-4" />
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            导入数据
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 数据导出区域
 */
function DataExportSection() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [languages, setLanguages] = useState<any[]>([]);

  // 获取语言数据
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const { getAllLanguages } = await import('@/lib/data/data-adapters');
        const languagesData = getAllLanguages();
        setLanguages(languagesData);
      } catch (error) {
        console.error('加载语言数据失败:', error);
      }
    };
    loadLanguages();
  }, []);

  const handleExport = async (format: 'json' | 'excel') => {
    setIsExporting(true);
    try {
      if (format === 'json') {
        // JSON导出逻辑（保持原有功能）
        const { getAllLanguages } = await import('@/lib/data/data-adapters');
        const languages = getAllLanguages();
        const dataStr = JSON.stringify(languages, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `languages-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else if (format === 'excel') {
        // Excel导出逻辑
        const { exportLanguagesToExcel } = await import('@/lib/utils/excel-utils');
        exportLanguagesToExcel();
      }

      alert(`${format.toUpperCase()}文件导出成功！`);
    } catch (error) {
      console.error('导出失败:', error);
      alert(`导出失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log('没有选择文件');
      return;
    }

    console.log('开始导入文件:', file.name, '大小:', file.size, '类型:', file.type);
    setIsImporting(true);
    setImportResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log('FormData创建成功，准备发送请求...');

      const response = await fetch('/api/admin/import-excel', {
        method: 'POST',
        body: formData,
      });

      console.log('API响应状态:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API响应结果:', result);
      setImportResult(result);

      if (result.success) {
        console.log('导入成功！');
        const saveInfo = result.saveResult ? `\n\n保存结果: ${result.saveResult.message}` : '';
        alert(`Excel文件导入成功！\n\n数据摘要:\n- 基础信息: ${result.summary?.basicInfo || 0} 条\n- FSI详情: ${result.summary?.fsiDetails || 0} 条\n- 学习资源: ${result.summary?.learningResources || 0} 条\n- 文化信息: ${result.summary?.cultureInfo || 0} 条${saveInfo}`);
      } else {
        console.log('导入失败:', result.message, result.errors);
        const errorDetails = result.errors ? result.errors.join('\n') : '';
        alert(`导入失败: ${result.message}\n\n错误详情:\n${errorDetails}`);
      }
    } catch (error) {
      console.error('导入失败:', error);
      console.error('错误堆栈:', error instanceof Error ? error.stack : '无堆栈信息');
      alert(`导入失败: ${error instanceof Error ? error.message : '未知错误'}\n\n请检查浏览器控制台获取详细错误信息。`);
    } finally {
      setIsImporting(false);
      // 清空文件输入
      event.target.value = '';
    }
  };

  const handleGenerateTemplate = async () => {
    try {
      const { generateExcelTemplate } = await import('@/lib/utils/excel-utils');
      generateExcelTemplate();
      alert('Excel模板文件已生成！');
    } catch (error) {
      console.error('生成模板失败:', error);
      alert(`生成模板失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">数据导出与导入</h2>

      <div className="space-y-6">
        {/* 导出格式选择 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">导出数据</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">📄 JSON格式</h4>
              <p className="text-sm text-gray-600 mb-4">完整的数据结构，适合程序处理和备份</p>
              <button
                onClick={() => handleExport('json')}
                disabled={isExporting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
              >
                {isExporting ? '导出中...' : '导出JSON'}
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">📊 Excel格式</h4>
              <p className="text-sm text-gray-600 mb-4">
                包含所有语言数据的Excel文件，包含4个工作表
              </p>
              <button
                onClick={() => handleExport('excel')}
                disabled={isExporting}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 transition-colors"
              >
                {isExporting ? '导出中...' : '导出Excel'}
              </button>
            </div>
          </div>
        </div>

        {/* Excel导入功能 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">导入数据</h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">📥 从Excel文件导入</h4>
              <p className="text-sm text-gray-600 mb-4">
                支持导入包含基础信息、FSI详情、学习资源和文化信息的Excel文件
              </p>

              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleImport}
                  disabled={isImporting}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                />
                <button
                  onClick={handleGenerateTemplate}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  📋 下载模板
                </button>
              </div>
            </div>

            {/* 导入结果显示 */}
            {importResult && (
              <div
                className={`mt-4 p-4 rounded-md ${
                  importResult.success
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {importResult.success ? (
                      <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3
                      className={`text-sm font-medium ${
                        importResult.success ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {importResult.success ? '导入成功' : '导入失败'}
                    </h3>
                    <div
                      className={`mt-2 text-sm ${
                        importResult.success ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      <p>{importResult.message}</p>
                      {importResult.summary && (
                        <div className="mt-2">
                          <p>导入统计:</p>
                          <ul className="list-disc pl-5">
                            <li>基础信息: {importResult.summary.basicInfo} 条</li>
                            <li>FSI详情: {importResult.summary.fsiDetails} 条</li>
                            <li>学习资源: {importResult.summary.learningResources} 条</li>
                            <li>文化信息: {importResult.summary.cultureInfo} 条</li>
                          </ul>
                        </div>
                      )}
                      {importResult.errors && importResult.errors.length > 0 && (
                        <div className="mt-2">
                          <p>错误详情:</p>
                          <ul className="list-disc pl-5">
                            {importResult.errors.map((error: string, index: number) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 导出选项 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">导出选项</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">包含基础信息</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">包含FSI数据</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">包含详细评分</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">包含学习资源</span>
            </label>
          </div>
        </div>

        {/* 数据统计 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">数据统计</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{languages.length}</div>
                <div className="text-sm text-gray-600">总语言数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">13</div>
                <div className="text-sm text-gray-600">语言家族</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">150+</div>
                <div className="text-sm text-gray-600">国家映射</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">300+</div>
                <div className="text-sm text-gray-600">学习资源</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 创建受身份验证保护的管理员页面组件
const AuthenticatedAdminContent = withAuth(ProtectedAdminContent);

/**
 * 管理员主页面 - 包含身份验证保护
 */
export default function AdminPage() {
  return (
    <AuthProvider>
      <AuthenticatedAdminContent />
    </AuthProvider>
  );
}
