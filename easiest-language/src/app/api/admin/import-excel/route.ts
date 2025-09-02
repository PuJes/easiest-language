import { NextRequest, NextResponse } from 'next/server';
import { importLanguagesFromExcel } from '@/lib/utils/excel-utils';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

/**
 * 处理Excel文件导入的API端点
 */
export async function POST(request: NextRequest) {
  try {
    console.log('=== Excel导入API开始 ===');
    console.log('请求时间:', new Date().toISOString());

    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('接收到的文件信息:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      lastModified: file?.lastModified,
    });

    if (!file) {
      console.log('错误: 没有接收到文件');
      return NextResponse.json(
        { success: false, message: '请选择要导入的Excel文件' },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      console.log('错误: 文件类型不正确:', file.name);
      return NextResponse.json(
        { success: false, message: '请选择Excel文件(.xlsx或.xls格式)' },
        { status: 400 }
      );
    }

    // 验证文件大小（限制为10MB）
    if (file.size > 10 * 1024 * 1024) {
      console.log('错误: 文件过大:', file.size, 'bytes');
      return NextResponse.json(
        { success: false, message: '文件大小不能超过10MB' },
        { status: 400 }
      );
    }

    console.log('文件验证通过，开始导入...');

    // 导入Excel数据
    const result = await importLanguagesFromExcel(file);
    console.log('导入结果:', result);

    if (result.success) {
      console.log('导入成功，数据摘要:', {
        basicInfo: result.data?.basicInfo?.length || 0,
        fsiDetails: result.data?.fsiDetails?.length || 0,
        learningResources: result.data?.learningResources?.length || 0,
        cultureInfo: result.data?.cultureInfo?.length || 0,
      });

      // 保存导入的数据到系统
      const saveResult = await saveImportedData(result.data);
      console.log('数据保存结果:', saveResult);

      if (saveResult.success) {
        return NextResponse.json({
          success: true,
          message: `${result.message}，数据已保存到系统`,
          data: result.data,
          summary: {
            basicInfo: result.data?.basicInfo?.length || 0,
            fsiDetails: result.data?.fsiDetails?.length || 0,
            learningResources: result.data?.learningResources?.length || 0,
            cultureInfo: result.data?.cultureInfo?.length || 0,
          },
          saveResult: saveResult,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            message: `${result.message}，但数据保存失败: ${saveResult.message}`,
            errors: saveResult.errors || [],
          },
          { status: 500 }
        );
      }
    } else {
      console.log('导入失败，错误信息:', result.errors);
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          errors: result.errors,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Excel导入API错误:', error);
    console.error('错误堆栈:', error instanceof Error ? error.stack : '无堆栈信息');
    return NextResponse.json(
      {
        success: false,
        message: '服务器错误，请稍后重试',
        error: error instanceof Error ? error.message : '未知错误',
      },
      { status: 500 }
    );
  }
}

/**
 * 保存导入的数据到系统
 */
interface BasicInfoItem {
  ID: string;
  [key: string]: unknown;
}

interface FSIDetailItem {
  ID: string;
  [key: string]: unknown;
}

interface LearningResourceItem {
  ID: string;
  [key: string]: unknown;
}

interface CultureInfoItem {
  ID: string;
  [key: string]: unknown;
}

interface ImportedData {
  basicInfo?: BasicInfoItem[];
  fsiDetails?: FSIDetailItem[];
  learningResources?: LearningResourceItem[];
  cultureInfo?: CultureInfoItem[];
}

async function saveImportedData(data: ImportedData): Promise<{
  success: boolean;
  message: string;
  errors?: string[];
  details?: Record<string, unknown>;
}> {
  try {
    console.log('开始保存导入的数据...');
    console.log('导入的数据结构:', {
      basicInfo: data.basicInfo?.length || 0,
      fsiDetails: data.fsiDetails?.length || 0,
      learningResources: data.learningResources?.length || 0,
      cultureInfo: data.cultureInfo?.length || 0,
    });
    const errors: string[] = [];
    let savedCount = 0;

    // 保存基础信息和FSI详情到语言数据文件
    if (data.basicInfo && data.basicInfo.length > 0) {
      const languageSaveResult = await saveLanguageData(data.basicInfo, data.fsiDetails || []);
      if (languageSaveResult.success) {
        savedCount += data.basicInfo.length;
        console.log(`✅ 成功保存 ${data.basicInfo.length} 条语言数据`);
      } else {
        errors.push(`保存语言数据失败: ${languageSaveResult.message}`);
      }
    }

    // 保存学习资源数据
    if (data.learningResources && data.learningResources.length > 0) {
      const resourceSaveResult = await saveLearningResourcesData(data.learningResources);
      if (resourceSaveResult.success) {
        savedCount += data.learningResources.length;
        console.log(`✅ 成功保存 ${data.learningResources.length} 条学习资源数据`);
      } else {
        errors.push(`保存学习资源失败: ${resourceSaveResult.message}`);
      }
    }

    // 保存文化信息数据
    if (data.cultureInfo && data.cultureInfo.length > 0) {
      const cultureSaveResult = await saveCultureInfoData(data.cultureInfo);
      if (cultureSaveResult.success) {
        savedCount += data.cultureInfo.length;
        console.log(`✅ 成功保存 ${data.cultureInfo.length} 条文化信息数据`);
      } else {
        errors.push(`保存文化信息失败: ${cultureSaveResult.message}`);
      }
    }

    if (errors.length > 0) {
      return {
        success: false,
        message: `部分数据保存失败`,
        errors,
      };
    }

    return {
      success: true,
      message: `成功保存 ${savedCount} 条数据到系统`,
      details: {
        basicInfo: data.basicInfo?.length || 0,
        fsiDetails: data.fsiDetails?.length || 0,
        learningResources: data.learningResources?.length || 0,
        cultureInfo: data.cultureInfo?.length || 0,
        savedCount,
      },
    };
  } catch (error) {
    console.error('保存导入数据失败:', error);
    return {
      success: false,
      message: `保存失败: ${error instanceof Error ? error.message : '未知错误'}`,
      errors: [error instanceof Error ? error.message : '未知错误'],
    };
  }
}

/**
 * 保存语言数据
 */
async function saveLanguageData(
  basicInfo: BasicInfoItem[],
  fsiDetails: FSIDetailItem[]
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // 读取现有的语言数据
    const languagesFilePath = join(process.cwd(), 'src/lib/data/languages.ts');
    let currentContent = '';

    try {
      currentContent = await readFile(languagesFilePath, 'utf-8');
    } catch (error) {
      console.error('读取语言数据文件失败:', error);
      return {
        success: false,
        message: '无法读取现有语言数据',
      };
    }

    // 动态导入现有数据
    const { FSI_LANGUAGE_DATA } = await import('@/lib/data/languages');
    const existingData = JSON.parse(JSON.stringify(FSI_LANGUAGE_DATA));

    // 创建FSI详情映射
    const fsiDetailsMap: Record<string, FSIDetailItem> = {};
    fsiDetails.forEach((detail) => {
      const languageId = detail['Language ID'] as string;
      if (languageId) {
        fsiDetailsMap[languageId] = detail;
      }
    });

    // 更新语言数据
    basicInfo.forEach((info) => {
      const languageId = info.ID;
      if (languageId) {
        // 查找现有语言
        const existingLanguageIndex = existingData.languages.findIndex(
          (lang: { id: string; [key: string]: unknown }) => lang.id === languageId
        );

        const fsiDetail = fsiDetailsMap[languageId];

        const updatedLanguage = {
          id: languageId,
          name: info.Name,
          nativeName: info['Native Name'],
          countries: info.Countries
            ? (info.Countries as string).split('; ').filter((item: string) => item.trim())
            : [],
          family: info.Family,
          subfamily: info.Subfamily,
          writingSystem: info['Writing System'],
          speakers: info.Speakers || 0,
          flagEmoji: info['Flag Emoji'],
          color: info.Color,
          fsi: {
            category: fsiDetail ? fsiDetail['FSI Category'] : 3,
            hours: fsiDetail ? fsiDetail['Study Hours'] : 600,
            description: fsiDetail ? fsiDetail['Description'] : 'Language learning data',
            details: fsiDetail
              ? {
                  grammar: fsiDetail['Grammar Score'] || 3,
                  vocabulary: fsiDetail['Vocabulary Score'] || 3,
                  pronunciation: fsiDetail['Pronunciation Score'] || 3,
                  writing: fsiDetail['Writing Score'] || 3,
                  cultural: fsiDetail['Cultural Score'] || 3,
                }
              : {
                  grammar: 3,
                  vocabulary: 3,
                  pronunciation: 3,
                  writing: 3,
                  cultural: 3,
                },
          },
          difficulty: {
            overall: fsiDetail ? fsiDetail['Overall Difficulty'] : 3,
            grammar: fsiDetail ? fsiDetail['Grammar Difficulty'] : 3,
            pronunciation: fsiDetail ? fsiDetail['Pronunciation Difficulty'] : 3,
            vocabulary: fsiDetail ? fsiDetail['Vocabulary Difficulty'] : 3,
          },
        };

        if (existingLanguageIndex >= 0) {
          // 更新现有语言
          existingData.languages[existingLanguageIndex] = updatedLanguage;
          console.log(`更新语言: ${languageId}`);
        } else {
          // 添加新语言
          existingData.languages.push(updatedLanguage);
          console.log(`添加新语言: ${languageId}`);
        }
      }
    });

    // 生成新的文件内容
    const newContent = generateLanguagesFile(existingData);

    // 创建备份
    const backupPath = join(
      process.cwd(),
      'src/lib/data/backups',
      `languages-import-${new Date().toISOString().replace(/[:.]/g, '-')}.ts`
    );
    await writeFile(backupPath, currentContent);
    console.log(`📄 已创建语言数据备份: ${backupPath}`);

    // 保存新数据
    await writeFile(languagesFilePath, newContent);
    console.log('✅ 语言数据已保存');

    return {
      success: true,
      message: '语言数据保存成功',
    };
  } catch (error) {
    console.error('保存语言数据失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '未知错误',
    };
  }
}

/**
 * 保存学习资源数据
 */
async function saveLearningResourcesData(learningResources: LearningResourceItem[]): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // 读取现有的学习资源数据
    const resourcesFilePath = join(process.cwd(), 'src/lib/data/learning-resources.ts');
    let currentContent = '';

    try {
      currentContent = await readFile(resourcesFilePath, 'utf-8');
    } catch (error) {
      console.error('读取学习资源文件失败:', error);
      return {
        success: false,
        message: '无法读取现有学习资源数据',
      };
    }

    // 动态导入现有数据
    const { LEARNING_RESOURCES_BY_LANGUAGE } = await import('@/lib/data/learning-resources');
    const existingData = JSON.parse(JSON.stringify(LEARNING_RESOURCES_BY_LANGUAGE));

    // 按语言ID分组学习资源
    const resourcesByLanguage: Record<string, unknown[]> = {};
    learningResources.forEach((resource) => {
      const languageId = resource['Language ID'] as string;
      if (languageId) {
        if (!resourcesByLanguage[languageId]) {
          resourcesByLanguage[languageId] = [];
        }
        resourcesByLanguage[languageId].push({
          title: resource['Resource Title'],
          type: resource['Resource Type'],
          description: resource['Description'],
          url: resource['URL'],
          free: resource['Free'] === 'Yes',
        });
      }
    });

    // 更新现有数据
    Object.keys(resourcesByLanguage).forEach((languageId) => {
      existingData[languageId] = resourcesByLanguage[languageId];
    });

    // 生成新的文件内容
    const newContent = generateLearningResourcesFile(existingData);

    // 创建备份
    const backupPath = join(
      process.cwd(),
      'src/lib/data/backups',
      `learning-resources-import-${new Date().toISOString().replace(/[:.]/g, '-')}.ts`
    );
    await writeFile(backupPath, currentContent);
    console.log(`📄 已创建学习资源备份: ${backupPath}`);

    // 写入新内容
    await writeFile(resourcesFilePath, newContent);
    console.log('✅ 学习资源数据已保存');

    return {
      success: true,
      message: '学习资源数据保存成功',
    };
  } catch (error) {
    console.error('保存学习资源数据失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '未知错误',
    };
  }
}

/**
 * 保存文化信息数据
 */
async function saveCultureInfoData(cultureInfo: CultureInfoItem[]): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // 读取现有的文化信息数据
    const cultureFilePath = join(process.cwd(), 'src/lib/data/culture-data.ts');
    let currentContent = '';

    try {
      currentContent = await readFile(cultureFilePath, 'utf-8');
    } catch (error) {
      console.error('读取文化信息文件失败:', error);
      return {
        success: false,
        message: '无法读取现有文化信息数据',
      };
    }

    // 动态导入现有数据
    const { CULTURE_DATA } = await import('@/lib/data/culture-data');
    const existingData = JSON.parse(JSON.stringify(CULTURE_DATA));

    // 更新文化信息数据
    cultureInfo.forEach((info) => {
      const languageId = info['Language ID'] as string;
      if (languageId) {
        existingData[languageId] = {
          overview: info['Cultural Overview'],
          businessUse: info['Business Use'],
          entertainment: info['Entertainment']
            ? (info['Entertainment'] as string).split('; ').filter((item: string) => item.trim())
            : [],
          cuisine: info['Cuisine']
            ? (info['Cuisine'] as string).split('; ').filter((item: string) => item.trim())
            : [],
          culturalInfo: {
            businessUse: info['Business Value'] || 4,
            travelValue: info['Travel Value'] || 4,
            culturalRichness: info['Cultural Richness'] || 4,
            onlinePresence: info['Online Presence'] || 4,
          },
        };
      }
    });

    // 生成新的文件内容
    const newContent = generateCultureDataFile(existingData);

    // 创建备份
    const backupPath = join(
      process.cwd(),
      'src/lib/data/backups',
      `culture-data-import-${new Date().toISOString().replace(/[:.]/g, '-')}.ts`
    );
    await writeFile(backupPath, currentContent);
    console.log(`📄 已创建文化信息备份: ${backupPath}`);

    // 保存新数据
    await writeFile(cultureFilePath, newContent);
    console.log('✅ 文化信息数据已保存');

    return {
      success: true,
      message: '文化信息数据保存成功',
    };
  } catch (error) {
    console.error('保存文化信息数据失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '未知错误',
    };
  }
}

/**
 * 生成学习资源文件内容
 */
function generateLearningResourcesFile(data: Record<string, any[]>): string {
  const dataString = JSON.stringify(data, null, 2);

  return `/**
 * 学习资源数据
 * 自动生成于: ${new Date().toISOString()}
 */

import type { LearningResource } from '../types';

export const LEARNING_RESOURCES_BY_LANGUAGE: Record<string, LearningResource[]> = ${dataString};
`;
}

/**
 * 生成文化信息文件内容
 */
function generateCultureDataFile(data: Record<string, any>): string {
  const dataString = JSON.stringify(data, null, 2);

  return `/**
 * 文化信息数据
 * 为主要语言提供真实的文化背景信息
 *
 * 数据结构说明：
 * - overview: 文化概述
 * - businessUse: 商务用途描述
 * - entertainment: 娱乐文化形式
 * - cuisine: 饮食文化特色
 */

export interface CultureInfo {
  overview: string;
  businessUse: string;
  entertainment: string[];
  cuisine: string[];
}

/**
 * 主要语言的文化信息数据
 * 按语言ID索引，包含真实的文化内容
 *
 * ⚠️ 此文件由数据管理系统自动生成，请勿手动编辑
 * 最后更新时间: ${new Date().toISOString()}
 */
export const CULTURE_DATA: Record<string, CultureInfo> = ${dataString};

/**
 * 获取指定语言的文化信息
 * @param languageId 语言ID
 * @returns 文化信息对象，如果不存在则返回默认值
 */
export function getCultureInfo(languageId: string): CultureInfo {
  return (
    CULTURE_DATA[languageId] || {
      overview: \`\${languageId} is a fascinating language with unique cultural characteristics. Learning it opens doors to new perspectives and cultural experiences.\`,
      businessUse: \`\${languageId} can be valuable for international business, especially in regions where it's widely spoken.\`,
      entertainment: [
        'Local Music',
        'Traditional Arts',
        'Cultural Festivals',
        'Local Cinema',
        'Traditional Games',
      ],
      cuisine: [
        'Traditional Dishes',
        'Local Specialties',
        'Street Food',
        'Regional Cuisine',
        'Local Beverages',
      ],
    }
  );
}

/**
 * 检查指定语言是否有自定义文化信息
 * @param languageId 语言ID
 * @returns 是否有自定义文化信息
 */
export function hasCustomCultureInfo(languageId: string): boolean {
  return languageId in CULTURE_DATA;
}

/**
 * 获取所有有自定义文化信息的语言ID列表
 * @returns 语言ID数组
 */
export function getLanguagesWithCustomCulture(): string[] {
  return Object.keys(CULTURE_DATA);
}
`;
}

/**
 * 生成语言数据文件内容
 */
function generateLanguagesFile(data: { languages: unknown[] }): string {
  const dataString = JSON.stringify(data, null, 2);

  return `import type { LanguageData } from '../types';

/**
 * 根据FSI类别生成默认的难度评分
 */
function generateFSIDetails(category: number) {
  const baseScores = {
    1: { grammar: 2, vocabulary: 3, pronunciation: 2, writing: 1, cultural: 2 }, // 最容易
    2: { grammar: 3, vocabulary: 3, pronunciation: 3, writing: 2, cultural: 3 }, // 容易
    3: { grammar: 4, vocabulary: 4, pronunciation: 4, writing: 3, cultural: 4 }, // 中等
    4: { grammar: 4, vocabulary: 5, pronunciation: 5, writing: 4, cultural: 4 }, // 困难
    5: { grammar: 5, vocabulary: 5, pronunciation: 5, writing: 5, cultural: 5 }, // 最困难
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
export const FSI_LANGUAGE_DATA: LanguageData = ${dataString};
`;
}
