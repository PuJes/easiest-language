/**
 * 保存文化信息API接口
 * 处理文化信息的保存和更新
 */

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// 文化信息接口定义
interface CultureInfo {
  overview: string;
  businessUse: string;
  entertainment: string[];
  cuisine: string[];
}

// 文化信息数据文件路径
const CULTURE_DATA_PATH = path.join(process.cwd(), 'src/lib/data/culture-data.ts');

/**
 * 读取当前文化信息数据
 */
async function readCultureData(): Promise<Record<string, CultureInfo>> {
  try {
    // 首先尝试读取JSON文件
    const jsonPath = path.join(process.cwd(), 'src/lib/data/culture-data.json');
    try {
      const jsonContent = await fs.readFile(jsonPath, 'utf-8');
      return JSON.parse(jsonContent);
    } catch (jsonError) {
      console.log('JSON文件不存在，尝试读取TypeScript文件');
    }

    // 如果JSON文件不存在，尝试从TypeScript文件读取
    const fileContent = await fs.readFile(CULTURE_DATA_PATH, 'utf-8');

    // 提取CULTURE_DATA对象的内容
    const match = fileContent.match(
      /export const CULTURE_DATA: Record<string, CultureInfo> = \{([\s\S]*?)\};/
    );
    if (!match) {
      console.log('无法从TypeScript文件解析数据，返回空对象');
      return {};
    }

    // 尝试解析TypeScript对象内容
    try {
      const objectContent = match[1];
      // 简单的JSON解析，处理TypeScript语法
      const jsonString = objectContent
        .replace(/(\w+):/g, '"$1":') // 将键名加引号
        .replace(/'/g, '"'); // 将单引号替换为双引号

      return JSON.parse(`{${jsonString}}`);
    } catch (parseError) {
      console.error('解析TypeScript对象失败:', parseError);
      return {};
    }
  } catch (error) {
    console.error('读取文化信息数据失败:', error);
    return {};
  }
}

/**
 * 保存文化信息数据
 */
async function saveCultureData(cultureData: Record<string, CultureInfo>): Promise<void> {
  try {
    // 创建文化信息JSON文件路径
    const jsonPath = path.join(process.cwd(), 'src/lib/data/culture-data.json');

    // 保存为JSON文件
    await fs.writeFile(jsonPath, JSON.stringify(cultureData, null, 2), 'utf-8');

    // 同时更新TypeScript文件
    const tsContent = `/**
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
export const CULTURE_DATA: Record<string, CultureInfo> = ${JSON.stringify(cultureData, null, 2)};

/**
 * 获取指定语言的文化信息
 * @param languageId 语言ID
 * @returns 文化信息对象，如果不存在则返回默认值
 */
export function getCultureInfo(languageId: string): CultureInfo {
  return CULTURE_DATA[languageId] || {
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
  };
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

    await fs.writeFile(CULTURE_DATA_PATH, tsContent, 'utf-8');
  } catch (error) {
    console.error('保存文化信息数据失败:', error);
    throw error;
  }
}

/**
 * POST请求处理 - 保存文化信息
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { languageId, cultureInfo } = body;

    if (!languageId || !cultureInfo) {
      return NextResponse.json(
        { success: false, message: '缺少必要参数：languageId 和 cultureInfo' },
        { status: 400 }
      );
    }

    // 验证文化信息格式
    if (!cultureInfo.overview || !cultureInfo.businessUse) {
      return NextResponse.json(
        { success: false, message: '文化概述和商务用途描述不能为空' },
        { status: 400 }
      );
    }

    // 读取当前文化信息数据
    const currentData = await readCultureData();

    // 更新指定语言的文化信息
    currentData[languageId] = {
      overview: cultureInfo.overview,
      businessUse: cultureInfo.businessUse,
      entertainment: Array.isArray(cultureInfo.entertainment) ? cultureInfo.entertainment : [],
      cuisine: Array.isArray(cultureInfo.cuisine) ? cultureInfo.cuisine : [],
    };

    // 保存更新后的数据
    await saveCultureData(currentData);

    // 创建备份
    const backupPath = path.join(
      process.cwd(),
      'src/lib/data/backups',
      `culture-data-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
    );

    // 确保备份目录存在
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.writeFile(backupPath, JSON.stringify(currentData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: `语言 ${languageId} 的文化信息已成功保存`,
      backupPath: backupPath,
      updatedCount: 1,
    });
  } catch (error) {
    console.error('保存文化信息失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: `保存失败: ${error instanceof Error ? error.message : '未知错误'}`,
      },
      { status: 500 }
    );
  }
}

/**
 * GET请求处理 - 获取文化信息
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const languageId = searchParams.get('languageId');

    if (languageId) {
      // 获取指定语言的文化信息
      const cultureData = await readCultureData();
      const cultureInfo = cultureData[languageId];

      return NextResponse.json({
        success: true,
        data: cultureInfo || null,
        hasCustomInfo: !!cultureInfo,
      });
    } else {
      // 获取所有文化信息
      const cultureData = await readCultureData();

      return NextResponse.json({
        success: true,
        data: cultureData,
        count: Object.keys(cultureData).length,
      });
    }
  } catch (error) {
    console.error('获取文化信息失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: `获取失败: ${error instanceof Error ? error.message : '未知错误'}`,
      },
      { status: 500 }
    );
  }
}
