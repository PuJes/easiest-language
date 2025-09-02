/**
 * 语言数据编辑接口
 * 提供对单个语言各种数据的修改功能
 * 修改后的数据会同步到全局数据源
 */

import { Language, FSIInfo, LanguageDifficulty, LearningResource, FSICategory } from '../types';
import { FSI_LANGUAGE_DATA } from './languages';
import { LEARNING_RESOURCES_BY_LANGUAGE } from './learning-resources';

/**
 * 语言编辑表单数据结构
 * 将复杂的Language接口拆分为易于编辑的表单字段
 */
export interface LanguageEditForm {
  // === 基础信息 ===
  id: string; // 语言ID（不可修改）
  name: string; // 英文名称
  nativeName: string; // 本地名称
  countries: string[]; // 使用国家

  // === FSI分类信息 ===
  fsiCategory: FSICategory; // FSI分类等级 (0-5)
  learningHours: number; // 学习小时数
  fsiDescription: string; // FSI描述

  // === 详细难度评分 (FSI Details) ===
  grammarDifficulty: number; // 语法难度 (1-5)
  vocabularyDifficulty: number; // 词汇难度 (1-5)
  pronunciationDifficulty: number; // 发音难度 (1-5)
  writingDifficulty: number; // 书写难度 (1-5)
  culturalDifficulty: number; // 文化难度 (1-5)

  // === 简化难度评分 ===
  overallDifficulty: number; // 总体难度 (1-10)
  grammarScore: number; // 语法评分 (1-10)
  pronunciationScore: number; // 发音评分 (1-10)
  vocabularyScore: number; // 词汇评分 (1-10)

  // === 分类信息 ===
  family: string; // 语言家族
  subfamily: string; // 语言子家族
  writingSystem: string; // 书写系统

  // === 基础统计 ===
  speakers: number; // 使用人数
  flagEmoji: string; // 代表性国旗
  color: string; // UI显示颜色

  // === 扩展信息（用于详情页） ===
  businessValue: number; // 商务价值 (1-5)
  travelValue: number; // 旅游价值 (1-5)
  culturalRichness: number; // 文化丰富度 (1-5)
  onlinePresence: number; // 网络存在感 (1-5)

  // === 文化背景信息 ===
  culturalOverview: string; // 文化概述
  businessUse: string; // 商务用途描述
  entertainment: string[]; // 娱乐形式
  cuisine: string[]; // 美食文化
}

/**
 * 学习资源编辑结构
 */
export interface LearningResourceEdit {
  id?: string; // 资源ID (新增时为空)
  title: string; // 资源标题
  type: LearningResource['type']; // 资源类型
  url?: string; // 资源链接
  description: string; // 资源描述
  free: boolean; // 是否免费
  rating: number; // 评分 (1-5)
  level: 'beginner' | 'intermediate' | 'advanced'; // 适用水平
}

/**
 * 语言编辑器类
 * 提供对语言数据的CRUD操作，所有修改会直接同步到全局数据源
 */
export class LanguageEditor {
  private learningResources: Record<string, LearningResource[]>;

  constructor() {
    // 学习资源数据仍使用副本，因为这部分数据不会在其他地方直接使用
    this.learningResources = JSON.parse(JSON.stringify(LEARNING_RESOURCES_BY_LANGUAGE));
  }

  /**
   * 获取指定语言的编辑表单数据
   */
  getLanguageEditForm(languageId: string): LanguageEditForm | null {
    // 直接从全局数据源获取最新数据
    const language = FSI_LANGUAGE_DATA.languages.find((lang) => lang.id === languageId);
    if (!language) return null;

    return {
      // 基础信息
      id: language.id,
      name: language.name,
      nativeName: language.nativeName,
      countries: [...language.countries],

      // FSI信息
      fsiCategory: language.fsi.category,
      learningHours: language.fsi.hours,
      fsiDescription: language.fsi.description,

      // FSI详细难度
      grammarDifficulty: language.fsi.details?.grammar || 3,
      vocabularyDifficulty: language.fsi.details?.vocabulary || 3,
      pronunciationDifficulty: language.fsi.details?.pronunciation || 3,
      writingDifficulty: language.fsi.details?.writing || 3,
      culturalDifficulty: language.fsi.details?.cultural || 3,

      // 简化难度评分
      overallDifficulty: language.difficulty.overall,
      grammarScore: language.difficulty.grammar,
      pronunciationScore: language.difficulty.pronunciation,
      vocabularyScore: language.difficulty.vocabulary,

      // 分类信息
      family: language.family,
      subfamily: language.subfamily,
      writingSystem: language.writingSystem,

      // 基础统计
      speakers: language.speakers,
      flagEmoji: language.flagEmoji,
      color: language.color,

      // 扩展信息（基于现有数据估算）
      businessValue: Math.min(5, language.fsi.category + 1),
      travelValue: Math.min(5, Math.max(1, 6 - language.fsi.category)),
      culturalRichness: 4,
      onlinePresence: language.speakers > 100000000 ? 5 : 3,

      // 文化信息（默认值）
      culturalOverview: `${language.name} is a fascinating language with unique cultural characteristics.`,
      businessUse: `${language.name} can be valuable for international business.`,
      entertainment: ['Music', 'Films', 'Literature', 'Arts'],
      cuisine: ['Traditional Dishes', 'Local Specialties', 'Street Food'],
    };
  }

  /**
   * 更新语言基础信息 - 直接修改全局数据源
   */
  updateLanguageBasics(
    languageId: string,
    updates: Partial<
      Pick<
        LanguageEditForm,
        | 'name'
        | 'nativeName'
        | 'countries'
        | 'family'
        | 'subfamily'
        | 'writingSystem'
        | 'speakers'
        | 'flagEmoji'
        | 'color'
      >
    >
  ): boolean {
    const languageIndex = FSI_LANGUAGE_DATA.languages.findIndex((lang) => lang.id === languageId);
    if (languageIndex === -1) return false;

    const language = FSI_LANGUAGE_DATA.languages[languageIndex];

    // 更新指定字段 - 直接修改全局数据源
    if (updates.name !== undefined) language.name = updates.name;
    if (updates.nativeName !== undefined) language.nativeName = updates.nativeName;
    if (updates.countries !== undefined) language.countries = [...updates.countries];
    if (updates.family !== undefined) language.family = updates.family;
    if (updates.subfamily !== undefined) language.subfamily = updates.subfamily;
    if (updates.writingSystem !== undefined) language.writingSystem = updates.writingSystem;
    if (updates.speakers !== undefined) language.speakers = updates.speakers;
    if (updates.flagEmoji !== undefined) language.flagEmoji = updates.flagEmoji;
    if (updates.color !== undefined) language.color = updates.color;

    console.log(`✅ 已更新语言基础信息: ${languageId}`, updates);
    return true;
  }

  /**
   * 更新FSI难度信息 - 直接修改全局数据源
   */
  updateFSIInfo(
    languageId: string,
    updates: Partial<
      Pick<
        LanguageEditForm,
        | 'fsiCategory'
        | 'learningHours'
        | 'fsiDescription'
        | 'grammarDifficulty'
        | 'vocabularyDifficulty'
        | 'pronunciationDifficulty'
        | 'writingDifficulty'
        | 'culturalDifficulty'
      >
    >
  ): boolean {
    const languageIndex = FSI_LANGUAGE_DATA.languages.findIndex((lang) => lang.id === languageId);
    if (languageIndex === -1) return false;

    const language = FSI_LANGUAGE_DATA.languages[languageIndex];

    // 更新FSI基础信息
    if (updates.fsiCategory !== undefined) language.fsi.category = updates.fsiCategory;
    if (updates.learningHours !== undefined) language.fsi.hours = updates.learningHours;
    if (updates.fsiDescription !== undefined) language.fsi.description = updates.fsiDescription;

    // 更新FSI详细难度
    if (!language.fsi.details) {
      language.fsi.details = {
        grammar: 3,
        vocabulary: 3,
        pronunciation: 3,
        writing: 3,
        cultural: 3,
      };
    }

    if (updates.grammarDifficulty !== undefined)
      language.fsi.details.grammar = updates.grammarDifficulty;
    if (updates.vocabularyDifficulty !== undefined)
      language.fsi.details.vocabulary = updates.vocabularyDifficulty;
    if (updates.pronunciationDifficulty !== undefined)
      language.fsi.details.pronunciation = updates.pronunciationDifficulty;
    if (updates.writingDifficulty !== undefined)
      language.fsi.details.writing = updates.writingDifficulty;
    if (updates.culturalDifficulty !== undefined)
      language.fsi.details.cultural = updates.culturalDifficulty;

    console.log(`✅ 已更新FSI信息: ${languageId}`, updates);
    return true;
  }

  /**
   * 更新难度评分 - 直接修改全局数据源
   */
  updateDifficultyScores(
    languageId: string,
    updates: Partial<
      Pick<
        LanguageEditForm,
        'overallDifficulty' | 'grammarScore' | 'pronunciationScore' | 'vocabularyScore'
      >
    >
  ): boolean {
    const languageIndex = FSI_LANGUAGE_DATA.languages.findIndex((lang) => lang.id === languageId);
    if (languageIndex === -1) return false;

    const language = FSI_LANGUAGE_DATA.languages[languageIndex];

    if (updates.overallDifficulty !== undefined)
      language.difficulty.overall = updates.overallDifficulty;
    if (updates.grammarScore !== undefined) language.difficulty.grammar = updates.grammarScore;
    if (updates.pronunciationScore !== undefined)
      language.difficulty.pronunciation = updates.pronunciationScore;
    if (updates.vocabularyScore !== undefined)
      language.difficulty.vocabulary = updates.vocabularyScore;

    console.log(`✅ 已更新难度评分: ${languageId}`, updates);
    return true;
  }

  /**
   * 批量更新语言所有信息 - 使用上述方法确保同步到全局数据源
   */
  updateLanguageComplete(languageId: string, formData: LanguageEditForm): boolean {
    console.log(`🔄 开始完整更新语言: ${languageId}`);

    const success1 = this.updateLanguageBasics(languageId, {
      name: formData.name,
      nativeName: formData.nativeName,
      countries: formData.countries,
      family: formData.family,
      subfamily: formData.subfamily,
      writingSystem: formData.writingSystem,
      speakers: formData.speakers,
      flagEmoji: formData.flagEmoji,
      color: formData.color,
    });

    const success2 = this.updateFSIInfo(languageId, {
      fsiCategory: formData.fsiCategory,
      learningHours: formData.learningHours,
      fsiDescription: formData.fsiDescription,
      grammarDifficulty: formData.grammarDifficulty,
      vocabularyDifficulty: formData.vocabularyDifficulty,
      pronunciationDifficulty: formData.pronunciationDifficulty,
      writingDifficulty: formData.writingDifficulty,
      culturalDifficulty: formData.culturalDifficulty,
    });

    const success3 = this.updateDifficultyScores(languageId, {
      overallDifficulty: formData.overallDifficulty,
      grammarScore: formData.grammarScore,
      pronunciationScore: formData.pronunciationScore,
      vocabularyScore: formData.vocabularyScore,
    });

    const result = success1 && success2 && success3;
    console.log(`${result ? '✅' : '❌'} 语言完整更新${result ? '成功' : '失败'}: ${languageId}`);
    
    return result;
  }

  /**
   * 获取语言的学习资源
   */
  getLearningResources(languageId: string): LearningResource[] {
    return this.learningResources[languageId] || [];
  }

  /**
   * 添加学习资源
   */
  addLearningResource(languageId: string, resource: Omit<LearningResourceEdit, 'id'>): string {
    if (!this.learningResources[languageId]) {
      this.learningResources[languageId] = [];
    }

    const newResource: LearningResource = {
      title: resource.title,
      type: resource.type,
      url: resource.url,
      description: resource.description,
      free: resource.free,
      rating: resource.rating,
    };

    this.learningResources[languageId].push(newResource);

    // 返回新添加资源的临时ID（基于索引）
    return `${languageId}_resource_${this.learningResources[languageId].length - 1}`;
  }

  /**
   * 更新学习资源
   */
  updateLearningResource(
    languageId: string,
    resourceIndex: number,
    updates: Partial<LearningResourceEdit>
  ): boolean {
    const resources = this.learningResources[languageId];
    if (!resources || !resources[resourceIndex]) return false;

    const resource = resources[resourceIndex];

    if (updates.title !== undefined) resource.title = updates.title;
    if (updates.type !== undefined) resource.type = updates.type;
    if (updates.url !== undefined) resource.url = updates.url;
    if (updates.description !== undefined) resource.description = updates.description;
    if (updates.free !== undefined) resource.free = updates.free;
    if (updates.rating !== undefined) resource.rating = updates.rating;

    return true;
  }

  /**
   * 删除学习资源
   */
  deleteLearningResource(languageId: string, resourceIndex: number): boolean {
    const resources = this.learningResources[languageId];
    if (!resources || !resources[resourceIndex]) return false;

    resources.splice(resourceIndex, 1);
    return true;
  }

  /**
   * 获取所有语言的简要信息（用于列表显示）
   */
  getAllLanguagesSummary(): Array<{
    id: string;
    name: string;
    nativeName: string;
    fsiCategory: FSICategory;
  }> {
    // 直接从全局数据源获取最新数据
    return FSI_LANGUAGE_DATA.languages.map((lang) => ({
      id: lang.id,
      name: lang.name,
      nativeName: lang.nativeName,
      fsiCategory: lang.fsi.category,
    }));
  }

  /**
   * 创建新语言 - 直接添加到全局数据源
   */
  createLanguage(newLanguageData: Omit<LanguageEditForm, 'id'>): string {
    // 生成新的语言ID
    const newId = newLanguageData.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z-]/g, '');

    // 检查ID是否已存在
    if (FSI_LANGUAGE_DATA.languages.find((lang) => lang.id === newId)) {
      throw new Error(`Language with ID '${newId}' already exists`);
    }

    const newLanguage: Language = {
      id: newId,
      name: newLanguageData.name,
      nativeName: newLanguageData.nativeName,
      countries: [...newLanguageData.countries],
      fsi: {
        category: newLanguageData.fsiCategory,
        hours: newLanguageData.learningHours,
        description: newLanguageData.fsiDescription,
        details: {
          grammar: newLanguageData.grammarDifficulty,
          vocabulary: newLanguageData.vocabularyDifficulty,
          pronunciation: newLanguageData.pronunciationDifficulty,
          writing: newLanguageData.writingDifficulty,
          cultural: newLanguageData.culturalDifficulty,
        },
      },
      difficulty: {
        overall: newLanguageData.overallDifficulty,
        grammar: newLanguageData.grammarScore,
        pronunciation: newLanguageData.pronunciationScore,
        vocabulary: newLanguageData.vocabularyScore,
      },
      family: newLanguageData.family,
      subfamily: newLanguageData.subfamily,
      writingSystem: newLanguageData.writingSystem,
      speakers: newLanguageData.speakers,
      flagEmoji: newLanguageData.flagEmoji,
      color: newLanguageData.color,
    };

    // 直接添加到全局数据源
    FSI_LANGUAGE_DATA.languages.push(newLanguage);
    console.log(`✅ 已创建新语言: ${newId}`);
    
    return newId;
  }

  /**
   * 删除语言 - 直接从全局数据源删除
   */
  deleteLanguage(languageId: string): boolean {
    const languageIndex = FSI_LANGUAGE_DATA.languages.findIndex((lang) => lang.id === languageId);
    if (languageIndex === -1) return false;

    // 删除语言数据
    FSI_LANGUAGE_DATA.languages.splice(languageIndex, 1);

    // 删除相关的学习资源
    delete this.learningResources[languageId];

    console.log(`✅ 已删除语言: ${languageId}`);
    return true;
  }

  /**
   * 导出当前编辑的数据（用于保存到文件）
   */
  exportData(): {
    languages: Language[];
    learningResources: Record<string, LearningResource[]>;
  } {
    return {
      // 导出全局数据源的当前状态
      languages: JSON.parse(JSON.stringify(FSI_LANGUAGE_DATA.languages)),
      learningResources: JSON.parse(JSON.stringify(this.learningResources)),
    };
  }

  /**
   * 持久化保存数据到文件系统
   */
  async persistDataToFile(): Promise<{ success: boolean; message: string; backupPath?: string }> {
    try {
      console.log('🔄 开始持久化保存数据...');
      
      const data = this.exportData();
      
      // 调用API保存数据
      const response = await fetch('/api/admin/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languages: data.languages,
          learningResources: data.learningResources,
          saveToFile: true
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ 数据持久化成功');
        return {
          success: true,
          message: `数据已永久保存！已处理 ${result.stats?.languagesCount || 0} 种语言`,
          backupPath: result.backupPath
        };
      } else {
        console.error('❌ 数据持久化失败:', result.error);
        return {
          success: false,
          message: `持久化失败: ${result.error}`
        };
      }
    } catch (error) {
      console.error('❌ 持久化保存异常:', error);
      return {
        success: false,
        message: `持久化异常: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 获取备份列表
   */
  async getBackupList(): Promise<Array<{path: string; timestamp: string; description: string}>> {
    try {
      const response = await fetch('/api/admin/save-data');
      const result = await response.json();
      
      if (result.success) {
        return result.backups || [];
      } else {
        console.error('获取备份列表失败:', result.error);
        return [];
      }
    } catch (error) {
      console.error('获取备份列表异常:', error);
      return [];
    }
  }

  /**
   * 恢复备份数据
   */
  async restoreBackup(backupPath: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/admin/restore-backup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ backupPath }),
      });

      const result = await response.json();
      return {
        success: result.success,
        message: result.message || result.error
      };
    } catch (error) {
      return {
        success: false,
        message: `恢复失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 验证语言数据的完整性
   */
  validateLanguage(languageId: string): { valid: boolean; errors: string[] } {
    const language = FSI_LANGUAGE_DATA.languages.find((lang) => lang.id === languageId);
    if (!language) {
      return { valid: false, errors: ['Language not found'] };
    }

    const errors: string[] = [];

    // 基础字段验证
    if (!language.name.trim()) errors.push('Name is required');
    if (!language.nativeName.trim()) errors.push('Native name is required');
    if (language.countries.length === 0) errors.push('At least one country is required');

    // FSI数据验证
    if (language.fsi.category < 0 || language.fsi.category > 5) {
      errors.push('FSI category must be between 0 and 5');
    }
    if (language.fsi.hours < 0) errors.push('Learning hours cannot be negative');

    // 难度评分验证
    if (language.difficulty.overall < 1 || language.difficulty.overall > 10) {
      errors.push('Overall difficulty must be between 1 and 10');
    }

    // 使用人数验证
    if (language.speakers < 0) errors.push('Speaker count cannot be negative');

    return { valid: errors.length === 0, errors };
  }
}

/**
 * 语言编辑器工厂函数
 */
export function createLanguageEditor(): LanguageEditor {
  return new LanguageEditor();
}

/**
 * 预设的常用值（用于表单下拉选项）
 */
export const LANGUAGE_EDIT_PRESETS = {
  // 语言家族选项
  families: [
    'Indo-European',
    'Sino-Tibetan',
    'Afro-Asiatic',
    'Niger-Congo',
    'Austronesian',
    'Japonic',
    'Koreanic',
    'Turkic',
    'Uralic',
    'Dravidian',
    'Mongolic',
    'Kra-Dai',
    'Austroasiatic',
  ],

  // 书写系统选项
  writingSystems: [
    'Latin',
    'Chinese Characters',
    'Arabic',
    'Cyrillic',
    'Devanagari',
    'Hangul',
    'Hiragana, Katakana, Kanji',
    'Hebrew',
    'Thai',
    'Bengali',
    'Tamil',
    'Telugu',
    'Ethiopic',
    'Greek',
  ],

  // FSI类别描述
  fsiDescriptions: {
    0: 'Native Language',
    1: 'Easiest for English Speakers (600-750 hours)',
    2: 'Moderate Difficulty (900 hours)',
    3: 'Significant Difficulty (1100 hours)',
    4: 'Hard for English Speakers (1800 hours)',
    5: 'Hardest for English Speakers (2200 hours)',
  },

  // 颜色预设（基于FSI分类）
  fsiColors: {
    0: '#6c757d', // Native - gray
    1: '#22c55e', // Easy - green
    2: '#eab308', // Moderate - yellow
    3: '#f97316', // Significant - orange
    4: '#ef4444', // Hard - red
    5: '#a855f7', // Hardest - purple
  },
};

export default LanguageEditor;
