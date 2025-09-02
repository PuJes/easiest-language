/**
 * Excel导入导出工具函数
 * 支持语言数据的完整导出和导入功能
 */

import * as XLSX from 'xlsx';
import { Language } from '../types/language';
import { ExtendedLanguageDetail } from '../data/data-adapters';
import { FSI_LANGUAGE_DATA } from '../data/languages';
import { LEARNING_RESOURCES_BY_LANGUAGE } from '../data/learning-resources';

/**
 * 导出所有语言数据到Excel文件
 */
export function exportLanguagesToExcel(): void {
  try {
    // 准备导出数据
    const exportData = prepareExportData();

    // 创建工作簿
    const workbook = XLSX.utils.book_new();

    // 创建基础信息工作表
    const basicInfoSheet = XLSX.utils.json_to_sheet(exportData.basicInfo);
    XLSX.utils.book_append_sheet(workbook, basicInfoSheet, 'Basic Info');

    // 创建FSI详细信息工作表
    const fsiDetailsSheet = XLSX.utils.json_to_sheet(exportData.fsiDetails);
    XLSX.utils.book_append_sheet(workbook, fsiDetailsSheet, 'FSI Details');

    // 创建学习资源工作表
    const learningResourcesSheet = XLSX.utils.json_to_sheet(exportData.learningResources);
    XLSX.utils.book_append_sheet(workbook, learningResourcesSheet, 'Learning Resources');

    // 创建文化信息工作表
    const cultureInfoSheet = XLSX.utils.json_to_sheet(exportData.cultureInfo);
    XLSX.utils.book_append_sheet(workbook, cultureInfoSheet, 'Culture Info');

    // 生成文件名（包含时间戳）
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `languages-data-${timestamp}.xlsx`;

    // 导出文件
    XLSX.writeFile(workbook, filename);

    console.log(`Excel文件已导出: ${filename}`);
  } catch (error) {
    console.error('导出Excel文件失败:', error);
    throw new Error('导出失败，请检查数据格式');
  }
}

/**
 * 准备导出数据
 */
function prepareExportData() {
  const basicInfo: any[] = [];
  const fsiDetails: any[] = [];
  const learningResources: any[] = [];
  const cultureInfo: any[] = [];

  // 处理每种语言
  FSI_LANGUAGE_DATA.languages.forEach((lang) => {
    // 基础信息
    basicInfo.push({
      ID: lang.id,
      Name: lang.name,
      'Native Name': lang.nativeName,
      Countries: lang.countries.join('; '),
      Family: lang.family,
      Subfamily: lang.subfamily,
      'Writing System': lang.writingSystem,
      Speakers: lang.speakers,
      'Flag Emoji': lang.flagEmoji,
      Color: lang.color,
    });

    // FSI详细信息
    fsiDetails.push({
      'Language ID': lang.id,
      'Language Name': lang.name,
      'FSI Category': lang.fsi.category,
      'Study Hours': lang.fsi.hours,
      Description: lang.fsi.description,
      'Grammar Score': lang.fsi.details?.grammar || '',
      'Vocabulary Score': lang.fsi.details?.vocabulary || '',
      'Pronunciation Score': lang.fsi.details?.pronunciation || '',
      'Writing Score': lang.fsi.details?.writing || '',
      'Cultural Score': lang.fsi.details?.cultural || '',
      'Overall Difficulty': lang.difficulty?.overall || '',
      'Grammar Difficulty': lang.difficulty?.grammar || '',
      'Pronunciation Difficulty': lang.difficulty?.pronunciation || '',
      'Vocabulary Difficulty': lang.difficulty?.vocabulary || '',
    });

    // 学习资源
    const resources = LEARNING_RESOURCES_BY_LANGUAGE[lang.id] || [];
    if (resources.length > 0) {
      resources.forEach((resource) => {
        learningResources.push({
          'Language ID': lang.id,
          'Language Name': lang.name,
          'Resource Title': resource.title,
          'Resource Type': resource.type,
          Description: resource.description,
          URL: resource.url || '',
          Free: resource.free ? 'Yes' : 'No',
        });
      });
    } else {
      // 如果没有资源，也添加一行记录
      learningResources.push({
        'Language ID': lang.id,
        'Language Name': lang.name,
        'Resource Title': '',
        'Resource Type': '',
        Description: '',
        URL: '',
        Free: '',
      });
    }

    // 文化信息（使用扩展数据）
    const extendedData = getExtendedCultureData(lang.id);
    cultureInfo.push({
      'Language ID': lang.id,
      'Language Name': lang.name,
      'Cultural Overview': extendedData.overview,
      'Business Use': extendedData.businessUse,
      Entertainment: extendedData.entertainment.join('; '),
      Cuisine: extendedData.cuisine.join('; '),
      'Business Value': extendedData.culturalInfo.businessUse,
      'Travel Value': extendedData.culturalInfo.travelValue,
      'Cultural Richness': extendedData.culturalInfo.culturalRichness,
      'Online Presence': extendedData.culturalInfo.onlinePresence,
    });
  });

  return {
    basicInfo,
    fsiDetails,
    learningResources,
    cultureInfo,
  };
}

/**
 * 获取扩展文化数据
 */
function getExtendedCultureData(languageId: string) {
  // 这里可以调用现有的getLanguageDetailData函数
  // 或者直接生成默认的文化信息
  return {
    overview: `${FSI_LANGUAGE_DATA.languages.find((l) => l.id === languageId)?.name || 'This language'} is a fascinating language with unique cultural characteristics. Learning it opens doors to new perspectives and cultural experiences.`,
    businessUse: `${FSI_LANGUAGE_DATA.languages.find((l) => l.id === languageId)?.name || 'This language'} can be valuable for international business, especially in regions where it's widely spoken.`,
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
    culturalInfo: {
      businessUse: 4,
      travelValue: 4,
      culturalRichness: 4,
      onlinePresence: 4,
    },
  };
}

/**
 * 从Excel文件导入语言数据（服务器端版本）
 */
export async function importLanguagesFromExcel(file: File): Promise<{
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];
}> {
  try {
    console.log('开始导入Excel文件:', file.name, '大小:', file.size, 'bytes');

    // 将File对象转换为ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    console.log('文件数据大小:', arrayBuffer.byteLength, 'bytes');

    // 使用XLSX读取Excel文件
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    console.log('Excel工作簿解析成功');
    console.log('工作表名称:', workbook.SheetNames);

    // 解析各个工作表
    const result = parseExcelData(workbook);
    console.log('数据解析完成，错误数量:', result.errors.length);

    if (result.errors.length > 0) {
      console.log('发现错误:', result.errors);
      return {
        success: false,
        message: `导入完成，但发现 ${result.errors.length} 个错误`,
        data: result.data,
        errors: result.errors,
      };
    } else {
      console.log('导入成功，数据摘要:', {
        basicInfo: result.data.basicInfo.length,
        fsiDetails: result.data.fsiDetails.length,
        learningResources: result.data.learningResources.length,
        cultureInfo: result.data.cultureInfo.length,
      });
      return {
        success: true,
        message: '数据导入成功',
        data: result.data,
      };
    }
  } catch (error) {
    console.error('导入Excel文件失败:', error);
    console.error('错误堆栈:', error instanceof Error ? error.stack : '无堆栈信息');
    return {
      success: false,
      message: '文件格式错误或文件损坏',
      errors: [error instanceof Error ? error.message : '未知错误'],
    };
  }
}

/**
 * 解析Excel数据
 */
function parseExcelData(workbook: XLSX.WorkBook) {
  const errors: string[] = [];
  const data: any = {
    basicInfo: [],
    fsiDetails: [],
    learningResources: [],
    cultureInfo: [],
  };

  try {
    // 解析基础信息
    if (workbook.Sheets['Basic Info']) {
      const basicInfoSheet = workbook.Sheets['Basic Info'];
      data.basicInfo = XLSX.utils.sheet_to_json(basicInfoSheet);
      console.log('Basic Info 数据行数:', data.basicInfo.length);
    } else {
      errors.push('缺少"Basic Info"工作表');
    }

    // 解析FSI详细信息
    if (workbook.Sheets['FSI Details']) {
      const fsiDetailsSheet = workbook.Sheets['FSI Details'];
      data.fsiDetails = XLSX.utils.sheet_to_json(fsiDetailsSheet);
      console.log('FSI Details 数据行数:', data.fsiDetails.length);
    } else {
      errors.push('缺少"FSI Details"工作表');
    }

    // 解析学习资源
    if (workbook.Sheets['Learning Resources']) {
      const learningResourcesSheet = workbook.Sheets['Learning Resources'];
      data.learningResources = XLSX.utils.sheet_to_json(learningResourcesSheet);
      console.log('Learning Resources 数据行数:', data.learningResources.length);
    } else {
      errors.push('缺少"Learning Resources"工作表');
    }

    // 解析文化信息
    if (workbook.Sheets['Culture Info']) {
      const cultureInfoSheet = workbook.Sheets['Culture Info'];
      data.cultureInfo = XLSX.utils.sheet_to_json(cultureInfoSheet);
      console.log('Culture Info 数据行数:', data.cultureInfo.length);
    } else {
      errors.push('缺少"Culture Info"工作表');
    }

    // 检查是否有任何数据
    const totalDataRows =
      data.basicInfo.length +
      data.fsiDetails.length +
      data.learningResources.length +
      data.cultureInfo.length;

    if (totalDataRows === 0) {
      errors.push('Excel文件中没有找到任何数据，请确保至少有一个工作表包含数据');
    }

    // 数据验证（只有在有数据时才进行验证）
    if (totalDataRows > 0) {
      validateImportedData(data, errors);
    }
  } catch (error) {
    errors.push(`解析Excel数据失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }

  return { data, errors };
}

/**
 * 验证导入的数据
 */
function validateImportedData(data: any, errors: string[]) {
  // 验证基础信息
  if (data.basicInfo && data.basicInfo.length > 0) {
    data.basicInfo.forEach((item: any, index: number) => {
      if (!item.ID) {
        errors.push(`基础信息第${index + 1}行缺少ID`);
      }
      if (!item.Name) {
        errors.push(`基础信息第${index + 1}行缺少语言名称`);
      }
      if (!item.Family) {
        errors.push(`基础信息第${index + 1}行缺少语言家族`);
      }
    });
  } else {
    console.log('基础信息工作表为空，跳过验证');
  }

  // 验证FSI详细信息
  if (data.fsiDetails && data.fsiDetails.length > 0) {
    data.fsiDetails.forEach((item: any, index: number) => {
      if (!item['Language ID']) {
        errors.push(`FSI详细信息第${index + 1}行缺少语言ID`);
      }
      if (item['FSI Category'] === undefined || item['FSI Category'] === '') {
        errors.push(`FSI详细信息第${index + 1}行缺少FSI类别`);
      }
      if (item['Study Hours'] === undefined || item['Study Hours'] === '') {
        errors.push(`FSI详细信息第${index + 1}行缺少学习时长`);
      }
    });
  } else {
    console.log('FSI详细信息工作表为空，跳过验证');
  }

  // 验证学习资源
  if (data.learningResources && data.learningResources.length > 0) {
    data.learningResources.forEach((item: any, index: number) => {
      if (!item['Language ID']) {
        errors.push(`学习资源第${index + 1}行缺少语言ID`);
      }
      if (item['Resource Title'] && !item['Resource Type']) {
        errors.push(`学习资源第${index + 1}行有标题但缺少资源类型`);
      }
    });
  } else {
    console.log('学习资源工作表为空，跳过验证');
  }

  // 验证文化信息
  if (data.cultureInfo && data.cultureInfo.length > 0) {
    data.cultureInfo.forEach((item: any, index: number) => {
      if (!item['Language ID']) {
        errors.push(`文化信息第${index + 1}行缺少语言ID`);
      }
    });
  } else {
    console.log('文化信息工作表为空，跳过验证');
  }
}

/**
 * 生成Excel模板文件
 */
export function generateExcelTemplate(): void {
  try {
    const workbook = XLSX.utils.book_new();

    // 创建基础信息模板
    const basicInfoTemplate = [
      {
        ID: 'es',
        Name: 'Spanish',
        'Native Name': 'Español',
        Countries: 'Spain; Mexico; Argentina',
        Family: 'Indo-European',
        Subfamily: 'Romance',
        'Writing System': 'Latin',
        Speakers: 548000000,
        'Flag Emoji': '🇪🇸',
        Color: '#28a745',
      },
    ];

    const basicInfoSheet = XLSX.utils.json_to_sheet(basicInfoTemplate);
    XLSX.utils.book_append_sheet(workbook, basicInfoSheet, 'Basic Info');

    // 创建FSI详细信息模板
    const fsiDetailsTemplate = [
      {
        'Language ID': 'es',
        'Language Name': 'Spanish',
        'FSI Category': 1,
        'Study Hours': 600,
        Description: 'One of the easiest languages to learn',
        'Grammar Score': 2,
        'Vocabulary Score': 3,
        'Pronunciation Score': 2,
        'Writing Score': 1,
        'Cultural Score': 2,
        'Overall Difficulty': 3,
        'Grammar Difficulty': 3,
        'Pronunciation Difficulty': 2,
        'Vocabulary Difficulty': 3,
      },
    ];

    const fsiDetailsSheet = XLSX.utils.json_to_sheet(fsiDetailsTemplate);
    XLSX.utils.book_append_sheet(workbook, fsiDetailsSheet, 'FSI Details');

    // 创建学习资源模板
    const learningResourcesTemplate = [
      {
        'Language ID': 'es',
        'Language Name': 'Spanish',
        'Resource Title': 'Duolingo Spanish',
        'Resource Type': 'app',
        Description: 'Popular language learning app',
        URL: 'https://www.duolingo.com',
        Free: 'Yes',
      },
    ];

    const learningResourcesSheet = XLSX.utils.json_to_sheet(learningResourcesTemplate);
    XLSX.utils.book_append_sheet(workbook, learningResourcesSheet, 'Learning Resources');

    // 创建文化信息模板
    const cultureInfoTemplate = [
      {
        'Language ID': 'es',
        'Language Name': 'Spanish',
        'Cultural Overview': 'Spanish is a fascinating language with rich cultural heritage...',
        'Business Use': 'Spanish is valuable for international business...',
        Entertainment: 'Flamenco; Spanish Cinema; Bullfighting',
        Cuisine: 'Paella; Tapas; Gazpacho',
        'Business Value': 4,
        'Travel Value': 5,
        'Cultural Richness': 5,
        'Online Presence': 4,
      },
    ];

    const cultureInfoSheet = XLSX.utils.json_to_sheet(cultureInfoTemplate);
    XLSX.utils.book_append_sheet(workbook, cultureInfoSheet, 'Culture Info');

    // 导出模板文件
    const filename = 'languages-template.xlsx';
    XLSX.writeFile(workbook, filename);

    console.log(`Excel模板文件已生成: ${filename}`);
  } catch (error) {
    console.error('生成Excel模板失败:', error);
    throw new Error('生成模板失败');
  }
}
