/**
 * useLanguageEditor Hook
 * 为React组件提供语言数据编辑功能
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  LanguageEditor,
  LanguageEditForm,
  LearningResourceEdit,
  createLanguageEditor,
  LANGUAGE_EDIT_PRESETS,
} from '../data/language-editor';
import { Language, LearningResource } from '../types';

/**
 * Hook的返回类型
 */
interface UseLanguageEditorReturn {
  // === 编辑器实例 ===
  editor: LanguageEditor;

  // === 当前编辑状态 ===
  currentLanguageId: string | null;
  editForm: LanguageEditForm | null;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
  errors: string[];

  // === 语言CRUD操作 ===
  loadLanguage: (languageId: string) => Promise<boolean>;
  saveLanguage: () => Promise<boolean>;
  createLanguage: (formData: Omit<LanguageEditForm, 'id'>) => Promise<string | null>;
  deleteLanguage: (languageId: string) => Promise<boolean>;

  // === 表单数据更新 ===
  updateBasics: (updates: Partial<LanguageEditForm>) => void;
  updateFSI: (updates: Partial<LanguageEditForm>) => void;
  updateDifficulty: (updates: Partial<LanguageEditForm>) => void;
  updateForm: (updates: Partial<LanguageEditForm>) => void;
  resetForm: () => void;

  // === 学习资源管理 ===
  learningResources: LearningResource[];
  addResource: (resource: Omit<LearningResourceEdit, 'id'>) => string;
  updateResource: (index: number, updates: Partial<LearningResourceEdit>) => boolean;
  deleteResource: (index: number) => boolean;

  // === 数据验证 ===
  validateCurrentLanguage: () => { valid: boolean; errors: string[] };

  // === 语言列表 ===
  languagesList: Array<{ id: string; name: string; nativeName: string }>;
  refreshLanguagesList: () => void;

  // === 数据导出 ===
  exportData: () => {
    languages: Language[];
    learningResources: Record<string, LearningResource[]>;
  };

  // === 预设值 ===
  presets: typeof LANGUAGE_EDIT_PRESETS;
}

/**
 * 语言编辑器Hook
 */
export function useLanguageEditor(): UseLanguageEditorReturn {
  // === 状态管理 ===
  const editorRef = useRef<LanguageEditor | null>(null);
  const [currentLanguageId, setCurrentLanguageId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<LanguageEditForm | null>(null);
  const [originalForm, setOriginalForm] = useState<LanguageEditForm | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [learningResources, setLearningResources] = useState<LearningResource[]>([]);
  const [languagesList, setLanguagesList] = useState<
    Array<{ id: string; name: string; nativeName: string }>
  >([]);

  // === 初始化编辑器 ===
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = createLanguageEditor();
      // 初始化语言列表
      setLanguagesList(editorRef.current.getAllLanguagesSummary());
    }
  }, []);

  // === 检查是否有未保存的更改 ===
  const hasUnsavedChanges = useCallback(() => {
    if (!editForm || !originalForm) return false;
    return JSON.stringify(editForm) !== JSON.stringify(originalForm);
  }, [editForm, originalForm]);

  // === 加载语言数据 ===
  const loadLanguage = useCallback(async (languageId: string): Promise<boolean> => {
    if (!editorRef.current) return false;

    setIsLoading(true);
    setErrors([]);

    try {
      const formData = editorRef.current.getLanguageEditForm(languageId);
      if (!formData) {
        setErrors(['语言未找到']);
        return false;
      }

      setCurrentLanguageId(languageId);
      setEditForm(formData);
      setOriginalForm(JSON.parse(JSON.stringify(formData))); // 深拷贝作为原始数据

      // 加载学习资源
      const resources = editorRef.current.getLearningResources(languageId);
      setLearningResources(resources);

      return true;
    } catch (error) {
      setErrors([`加载语言数据失败: ${error}`]);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // === 保存语言数据 ===
  const saveLanguage = useCallback(async (): Promise<boolean> => {
    if (!editorRef.current || !editForm || !currentLanguageId) return false;

    setIsLoading(true);
    setErrors([]);

    try {
      // 验证数据
      const validation = editorRef.current.validateLanguage(currentLanguageId);
      if (!validation.valid) {
        setErrors(validation.errors);
        return false;
      }

      // 保存数据
      const success = editorRef.current.updateLanguageComplete(currentLanguageId, editForm);
      if (success) {
        // 更新原始表单数据（标记为已保存）
        setOriginalForm(JSON.parse(JSON.stringify(editForm)));
        // 刷新语言列表
        setLanguagesList(editorRef.current.getAllLanguagesSummary());
      }

      return success;
    } catch (error) {
      setErrors([`保存语言数据失败: ${error}`]);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [editForm, currentLanguageId]);

  // === 创建新语言 ===
  const createLanguage = useCallback(
    async (formData: Omit<LanguageEditForm, 'id'>): Promise<string | null> => {
      if (!editorRef.current) return null;

      setIsLoading(true);
      setErrors([]);

      try {
        const newId = editorRef.current.createLanguage(formData);
        // 刷新语言列表
        setLanguagesList(editorRef.current.getAllLanguagesSummary());
        return newId;
      } catch (error) {
        setErrors([`创建语言失败: ${error}`]);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // === 删除语言 ===
  const deleteLanguage = useCallback(
    async (languageId: string): Promise<boolean> => {
      if (!editorRef.current) return false;

      setIsLoading(true);
      setErrors([]);

      try {
        const success = editorRef.current.deleteLanguage(languageId);
        if (success) {
          // 如果删除的是当前编辑的语言，清空表单
          if (languageId === currentLanguageId) {
            setCurrentLanguageId(null);
            setEditForm(null);
            setOriginalForm(null);
            setLearningResources([]);
          }
          // 刷新语言列表
          setLanguagesList(editorRef.current.getAllLanguagesSummary());
        }
        return success;
      } catch (error) {
        setErrors([`删除语言失败: ${error}`]);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [currentLanguageId]
  );

  // === 更新表单数据 ===
  const updateForm = useCallback((updates: Partial<LanguageEditForm>) => {
    setEditForm((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const updateBasics = useCallback(
    (updates: Partial<LanguageEditForm>) => {
      updateForm(updates);
    },
    [updateForm]
  );

  const updateFSI = useCallback(
    (updates: Partial<LanguageEditForm>) => {
      updateForm(updates);
    },
    [updateForm]
  );

  const updateDifficulty = useCallback(
    (updates: Partial<LanguageEditForm>) => {
      updateForm(updates);
    },
    [updateForm]
  );

  // === 重置表单 ===
  const resetForm = useCallback(() => {
    if (originalForm) {
      setEditForm(JSON.parse(JSON.stringify(originalForm)));
    }
  }, [originalForm]);

  // === 学习资源管理 ===
  const addResource = useCallback(
    (resource: Omit<LearningResourceEdit, 'id'>): string => {
      if (!editorRef.current || !currentLanguageId) return '';

      const resourceId = editorRef.current.addLearningResource(currentLanguageId, resource);
      // 刷新资源列表
      const updatedResources = editorRef.current.getLearningResources(currentLanguageId);
      setLearningResources(updatedResources);

      return resourceId;
    },
    [currentLanguageId]
  );

  const updateResource = useCallback(
    (index: number, updates: Partial<LearningResourceEdit>): boolean => {
      if (!editorRef.current || !currentLanguageId) return false;

      const success = editorRef.current.updateLearningResource(currentLanguageId, index, updates);
      if (success) {
        // 刷新资源列表
        const updatedResources = editorRef.current.getLearningResources(currentLanguageId);
        setLearningResources(updatedResources);
      }

      return success;
    },
    [currentLanguageId]
  );

  const deleteResource = useCallback(
    (index: number): boolean => {
      if (!editorRef.current || !currentLanguageId) return false;

      const success = editorRef.current.deleteLearningResource(currentLanguageId, index);
      if (success) {
        // 刷新资源列表
        const updatedResources = editorRef.current.getLearningResources(currentLanguageId);
        setLearningResources(updatedResources);
      }

      return success;
    },
    [currentLanguageId]
  );

  // === 数据验证 ===
  const validateCurrentLanguage = useCallback(() => {
    if (!editorRef.current || !currentLanguageId) {
      return { valid: false, errors: ['未选择语言'] };
    }
    return editorRef.current.validateLanguage(currentLanguageId);
  }, [currentLanguageId]);

  // === 刷新语言列表 ===
  const refreshLanguagesList = useCallback(() => {
    if (editorRef.current) {
      setLanguagesList(editorRef.current.getAllLanguagesSummary());
    }
  }, []);

  // === 导出数据 ===
  const exportData = useCallback(() => {
    if (!editorRef.current) {
      return { languages: [], learningResources: {} };
    }
    return editorRef.current.exportData();
  }, []);

  return {
    // 编辑器实例
    editor: editorRef.current!,

    // 当前状态
    currentLanguageId,
    editForm,
    isLoading,
    hasUnsavedChanges: hasUnsavedChanges(),
    errors,

    // 语言CRUD操作
    loadLanguage,
    saveLanguage,
    createLanguage,
    deleteLanguage,

    // 表单更新
    updateBasics,
    updateFSI,
    updateDifficulty,
    updateForm,
    resetForm,

    // 学习资源管理
    learningResources,
    addResource,
    updateResource,
    deleteResource,

    // 数据验证
    validateCurrentLanguage,

    // 语言列表
    languagesList,
    refreshLanguagesList,

    // 数据导出
    exportData,

    // 预设值
    presets: LANGUAGE_EDIT_PRESETS,
  };
}

export default useLanguageEditor;
