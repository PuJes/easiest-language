/**
 * API端点：保存学习资源数据
 * 允许管理员更新特定语言的学习资源
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import type { LearningResource } from '@/lib/types';

/**
 * 处理保存学习资源的POST请求
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { languageId, resources } = body;

    // 验证输入数据
    if (!languageId || !Array.isArray(resources)) {
      return NextResponse.json({ success: false, message: '无效的请求数据' }, { status: 400 });
    }

    // 验证资源数据格式
    for (const resource of resources) {
      if (!resource.title || !resource.type || !resource.description) {
        return NextResponse.json(
          { success: false, message: '资源数据格式不正确' },
          { status: 400 }
        );
      }
    }

    // 读取当前的学习资源数据
    const resourcesFilePath = join(process.cwd(), 'src/lib/data/learning-resources.ts');
    let currentContent = '';

    try {
      currentContent = await readFile(resourcesFilePath, 'utf-8');
    } catch (error) {
      console.error('读取学习资源文件失败:', error);
      return NextResponse.json({ success: false, message: '无法读取现有数据' }, { status: 500 });
    }

    // 解析现有的学习资源数据 - 使用更安全的方法
    const importMatch = currentContent.match(
      /export const LEARNING_RESOURCES_BY_LANGUAGE: Record<string, LearningResource\[\]> = ({[\s\S]*?});/
    );
    if (!importMatch) {
      return NextResponse.json(
        { success: false, message: '无法解析现有数据格式' },
        { status: 500 }
      );
    }

    let existingData: Record<string, LearningResource[]> = {};
    try {
      // 使用更简单的方法：直接导入现有的学习资源数据
      console.log('🔄 尝试直接导入现有学习资源数据...');

      // 动态导入学习资源数据
      const { LEARNING_RESOURCES_BY_LANGUAGE } = await import('@/lib/data/learning-resources');
      existingData = JSON.parse(JSON.stringify(LEARNING_RESOURCES_BY_LANGUAGE));

      console.log('✅ 成功导入现有学习资源数据:', Object.keys(existingData).length, '种语言');
    } catch (importError) {
      console.error('导入现有数据失败:', importError);

      // 如果导入失败，尝试解析文件内容
      try {
        console.log('🔄 尝试解析文件内容...');
        const dataString = importMatch[1];

        // 使用eval作为最后的手段（仅用于开发环境）
        existingData = eval(`(${dataString})`);
        console.log('✅ 文件解析成功:', Object.keys(existingData).length, '种语言');
      } catch (parseError: unknown) {
        console.error('文件解析也失败:', parseError);
        const errorMessage = parseError instanceof Error ? parseError.message : String(parseError);
        return NextResponse.json(
          { success: false, message: `数据格式错误，无法解析现有数据: ${errorMessage}` },
          { status: 500 }
        );
      }
    }

    // 更新指定语言的学习资源
    const previousCount = existingData[languageId]?.length || 0;
    existingData[languageId] = resources;
    console.log(`🔄 更新 ${languageId} 语言的学习资源: ${previousCount} -> ${resources.length} 个`);

    // 生成新的文件内容
    const newContent = generateLearningResourcesFile(existingData);

    // 创建备份
    const backupPath = join(
      process.cwd(),
      'src/lib/data/backups',
      `learning-resources-${new Date().toISOString()}.ts`
    );
    await writeFile(backupPath, currentContent);
    console.log(`📄 已创建备份: ${backupPath}`);

    // 写入新内容
    await writeFile(resourcesFilePath, newContent);
    console.log(`✅ 已更新学习资源文件: ${resourcesFilePath}`);

    return NextResponse.json({
      success: true,
      message: `成功保存 ${languageId} 语言的学习资源`,
      backupPath: backupPath,
      updatedCount: resources.length,
      previousCount: previousCount,
    });
  } catch (error) {
    console.error('保存学习资源失败:', error);
    return NextResponse.json({ success: false, message: '服务器内部错误' }, { status: 500 });
  }
}

/**
 * 生成学习资源文件内容
 */
function generateLearningResourcesFile(data: Record<string, LearningResource[]>): string {
  const timestamp = new Date().toISOString();

  let content = `import type { LearningResource } from '../types';

/**
 * 按语言分类的学习资源数据
 * 为每种语言提供推荐的学习资源
 * 
 * ⚠️ 此文件由数据管理系统自动生成，请勿手动编辑
 * 最后更新时间: ${timestamp}
 */
export const LEARNING_RESOURCES_BY_LANGUAGE: Record<string, LearningResource[]> = {
`;

  // 按语言ID排序生成内容
  const sortedLanguages = Object.keys(data).sort();

  for (const languageId of sortedLanguages) {
    const resources = data[languageId];
    content += `  '${languageId}': [\n`;

    for (const resource of resources) {
      content += `    {\n`;
      content += `      'title': '${escapeString(resource.title)}',\n`;
      content += `      'type': '${resource.type}',\n`;
      if (resource.url) {
        content += `      'url': '${escapeString(resource.url)}',\n`;
      }
      content += `      'description': '${escapeString(resource.description)}',\n`;
      content += `      'free': ${resource.free}\n`;
      content += `    },\n`;
    }

    content += `  ],\n`;
  }

  content += `};

export default LEARNING_RESOURCES_BY_LANGUAGE;
`;

  return content;
}

/**
 * 转义字符串中的特殊字符
 */
function escapeString(str: string): string {
  return str.replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
