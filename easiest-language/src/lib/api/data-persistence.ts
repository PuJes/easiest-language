/**
 * 数据持久化API
 * 提供真正修改底层数据文件的接口
 */

import fs from 'fs/promises';
import path from 'path';
import { Language, LearningResource } from '../types';

// 文件路径常量
const DATA_DIR = path.join(process.cwd(), 'src/lib/data');
const LANGUAGES_FILE = path.join(DATA_DIR, 'languages.ts');
const LEARNING_RESOURCES_FILE = path.join(DATA_DIR, 'learning-resources.ts');

/**
 * 数据持久化接口
 */
export interface DataPersistence {
  /**
   * 将修改后的语言数据写入文件
   */
  saveLanguagesToFile(languages: Language[]): Promise<boolean>;

  /**
   * 将修改后的学习资源数据写入文件
   */
  saveLearningResourcesToFile(resources: Record<string, LearningResource[]>): Promise<boolean>;

  /**
   * 创建数据备份
   */
  createBackup(): Promise<string>;

  /**
   * 从备份恢复数据
   */
  restoreFromBackup(backupPath: string): Promise<boolean>;

  /**
   * 获取所有备份列表
   */
  getBackupList(): Promise<Array<{ path: string; timestamp: string; description: string }>>;
}

/**
 * 生成TypeScript代码的工具函数
 */
function generateLanguagesFileContent(languages: Language[]): string {
  return `import type { LanguageData } from '../types';

/**
 * 根据FSI类别生成默认的难度评分
 */
function generateFSIDetails(category: number) {
  const baseScores = {
    1: { grammar: 2, vocabulary: 3, pronunciation: 2, writing: 1, cultural: 2 },    // 最容易
    2: { grammar: 3, vocabulary: 3, pronunciation: 3, writing: 2, cultural: 3 },    // 容易
    3: { grammar: 4, vocabulary: 4, pronunciation: 4, writing: 3, cultural: 4 },    // 中等
    4: { grammar: 4, vocabulary: 5, pronunciation: 5, writing: 4, cultural: 4 },    // 困难
    5: { grammar: 5, vocabulary: 5, pronunciation: 5, writing: 5, cultural: 5 },    // 最困难
  };
  
  return baseScores[category as keyof typeof baseScores] || baseScores[3];
}

/**
 * FSI 语言学习难度数据
 * 基于美国外国语学院官方分类和学习时长标准
 * 
 * ⚠️ 此文件由数据管理系统自动生成，请勿手动编辑
 * 最后更新时间: ${new Date().toISOString()}
 */
export const FSI_LANGUAGE_DATA: LanguageData = {
  languages: ${JSON.stringify(languages, null, 4).replace(/"/g, "'")},
};

export default FSI_LANGUAGE_DATA;
`;
}

/**
 * 生成学习资源文件内容
 */
function generateLearningResourcesFileContent(
  resources: Record<string, LearningResource[]>
): string {
  return `import type { LearningResource } from '../types';

/**
 * 按语言分类的学习资源数据
 * 为每种语言提供推荐的学习资源
 * 
 * ⚠️ 此文件由数据管理系统自动生成，请勿手动编辑
 * 最后更新时间: ${new Date().toISOString()}
 */
export const LEARNING_RESOURCES_BY_LANGUAGE: Record<string, LearningResource[]> = ${JSON.stringify(resources, null, 2).replace(/"/g, "'")};

export default LEARNING_RESOURCES_BY_LANGUAGE;
`;
}

/**
 * 创建数据持久化服务
 */
export class DataPersistenceService implements DataPersistence {
  /**
   * 保存语言数据到文件
   */
  async saveLanguagesToFile(languages: Language[]): Promise<boolean> {
    try {
      console.log('🔄 开始保存语言数据到文件...');

      // 生成新的文件内容
      const fileContent = generateLanguagesFileContent(languages);

      // 创建备份
      const backupPath = await this.createLanguagesBackup();
      console.log(`📄 已创建备份: ${backupPath}`);

      // 写入新内容
      await fs.writeFile(LANGUAGES_FILE, fileContent, 'utf-8');
      console.log(`✅ 成功保存 ${languages.length} 种语言数据到文件`);

      return true;
    } catch (error) {
      console.error('❌ 保存语言数据失败:', error);
      return false;
    }
  }

  /**
   * 保存学习资源数据到文件
   */
  async saveLearningResourcesToFile(
    resources: Record<string, LearningResource[]>
  ): Promise<boolean> {
    try {
      console.log('🔄 开始保存学习资源数据到文件...');

      // 生成新的文件内容
      const fileContent = generateLearningResourcesFileContent(resources);

      // 创建备份
      const backupPath = await this.createLearningResourcesBackup();
      console.log(`📄 已创建备份: ${backupPath}`);

      // 写入新内容
      await fs.writeFile(LEARNING_RESOURCES_FILE, fileContent, 'utf-8');
      console.log(`✅ 成功保存学习资源数据到文件`);

      return true;
    } catch (error) {
      console.error('❌ 保存学习资源数据失败:', error);
      return false;
    }
  }

  /**
   * 创建完整备份
   */
  async createBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(DATA_DIR, 'backups', timestamp);

    try {
      // 确保备份目录存在
      await fs.mkdir(backupDir, { recursive: true });

      // 备份语言数据
      const languagesContent = await fs.readFile(LANGUAGES_FILE, 'utf-8');
      await fs.writeFile(path.join(backupDir, 'languages.ts'), languagesContent);

      // 备份学习资源数据
      const resourcesContent = await fs.readFile(LEARNING_RESOURCES_FILE, 'utf-8');
      await fs.writeFile(path.join(backupDir, 'learning-resources.ts'), resourcesContent);

      // 创建备份信息文件
      const backupInfo = {
        timestamp: new Date().toISOString(),
        files: ['languages.ts', 'learning-resources.ts'],
        description: '自动备份 - Admin页面数据修改前',
      };
      await fs.writeFile(
        path.join(backupDir, 'backup-info.json'),
        JSON.stringify(backupInfo, null, 2)
      );

      console.log(`📦 已创建完整备份: ${backupDir}`);
      return backupDir;
    } catch (error) {
      console.error('❌ 创建备份失败:', error);
      throw error;
    }
  }

  /**
   * 从备份恢复数据
   */
  async restoreFromBackup(backupPath: string): Promise<boolean> {
    try {
      console.log(`🔄 开始从备份恢复数据: ${backupPath}`);

      // 恢复语言数据
      const languagesBackup = path.join(backupPath, 'languages.ts');
      const languagesContent = await fs.readFile(languagesBackup, 'utf-8');
      await fs.writeFile(LANGUAGES_FILE, languagesContent);

      // 恢复学习资源数据
      const resourcesBackup = path.join(backupPath, 'learning-resources.ts');
      const resourcesContent = await fs.readFile(resourcesBackup, 'utf-8');
      await fs.writeFile(LEARNING_RESOURCES_FILE, resourcesContent);

      console.log('✅ 数据恢复成功');
      return true;
    } catch (error) {
      console.error('❌ 数据恢复失败:', error);
      return false;
    }
  }

  /**
   * 创建语言数据备份
   */
  private async createLanguagesBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(DATA_DIR, 'backups', `languages-${timestamp}.ts`);

    // 确保备份目录存在
    await fs.mkdir(path.dirname(backupPath), { recursive: true });

    // 复制当前文件
    const content = await fs.readFile(LANGUAGES_FILE, 'utf-8');
    await fs.writeFile(backupPath, content);

    return backupPath;
  }

  /**
   * 创建学习资源数据备份
   */
  private async createLearningResourcesBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(DATA_DIR, 'backups', `learning-resources-${timestamp}.ts`);

    // 确保备份目录存在
    await fs.mkdir(path.dirname(backupPath), { recursive: true });

    // 复制当前文件
    const content = await fs.readFile(LEARNING_RESOURCES_FILE, 'utf-8');
    await fs.writeFile(backupPath, content);

    return backupPath;
  }

  /**
   * 获取所有备份列表
   */
  async getBackupList(): Promise<Array<{ path: string; timestamp: string; description: string }>> {
    try {
      const backupsDir = path.join(DATA_DIR, 'backups');
      const entries = await fs.readdir(backupsDir, { withFileTypes: true });

      const backups = [];
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const backupInfoPath = path.join(backupsDir, entry.name, 'backup-info.json');
          try {
            const infoContent = await fs.readFile(backupInfoPath, 'utf-8');
            const info = JSON.parse(infoContent);
            backups.push({
              path: path.join(backupsDir, entry.name),
              timestamp: info.timestamp,
              description: info.description,
            });
          } catch {
            // 忽略没有info文件的目录
          }
        }
      }

      return backups.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (error) {
      console.error('❌ 获取备份列表失败:', error);
      return [];
    }
  }
}

/**
 * 创建数据持久化服务实例
 */
export function createDataPersistenceService(): DataPersistence {
  return new DataPersistenceService();
}

export default DataPersistenceService;
