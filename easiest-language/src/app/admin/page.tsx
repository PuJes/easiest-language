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
  const [activeTab, setActiveTab] = useState<'basics' | 'fsi' | 'difficulty' | 'resources'>(
    'basics'
  );
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
        alert(`数据验证失败：\n${validation.errors.join('\n')}`);
        return;
      }

      // 先保存到内存
      const success = editor.updateLanguageComplete(selectedId, editForm);

      if (success) {
        setHasChanges(false);
        // 刷新语言列表以反映最新数据
        const updatedLanguages = editor.getAllLanguagesSummary();
        setLanguages(updatedLanguages);

        alert('内存保存成功！数据已在当前会话中生效。\n\n要永久保存请点击"永久保存"按钮。');
        console.log('语言数据已更新:', selectedId, editForm);
      } else {
        alert('保存失败！请检查数据格式。');
      }
    } catch (error) {
      console.error('保存失败:', error);
      alert(`保存失败：${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersistentSave = async () => {
    if (!editor) return;

    setIsLoading(true);
    try {
      const result = await editor.persistDataToFile();

      if (result.success) {
        alert(
          `${result.message}\n\n备份路径: ${result.backupPath}\n\n⚠️ 请重启开发服务器以完全应用更改！`
        );
      } else {
        alert(`永久保存失败：${result.message}`);
      }
    } catch (error) {
      console.error('永久保存失败:', error);
      alert(`永久保存异常：${error}`);
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

      alert('数据导出成功！');
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败！');
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
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id as 'basics' | 'fsi' | 'difficulty' | 'resources')
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
            {activeTab === 'resources' && <ResourcesTab />}
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
function ResourcesTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">学习资源</h3>
        <button
          onClick={() => console.log('添加学习资源')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          添加资源
        </button>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-600">学习资源管理功能即将开放...</p>
        <p className="text-sm text-gray-500 mt-2">
          您可以在这里添加和管理该语言的学习资源，包括在线课程、教材、应用程序等。
        </p>
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
  const handleExport = (format: 'json' | 'csv') => {
    // 这里实现数据导出逻辑
    console.log(`Exporting data as ${format}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">数据导出</h2>

      <div className="space-y-6">
        {/* 导出格式选择 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">选择导出格式</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">JSON格式</h4>
              <p className="text-sm text-gray-600 mb-4">完整的数据结构，适合程序处理和备份</p>
              <button
                onClick={() => handleExport('json')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                导出JSON
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">CSV格式</h4>
              <p className="text-sm text-gray-600 mb-4">表格格式，适合Excel处理和数据分析</p>
              <button
                onClick={() => handleExport('csv')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                导出CSV
              </button>
            </div>
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
                <div className="text-2xl font-bold text-blue-600">59</div>
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
