/**
 * Admin API - 保存数据到文件
 * 提供真正的数据持久化功能
 */

import { NextRequest, NextResponse } from 'next/server';
import { createDataPersistenceService } from '@/lib/api/data-persistence';
import { Language, LearningResource } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    console.log('📝 收到数据保存请求');

    const body = await request.json();
    const { languages, learningResources, saveToFile = false } = body;

    // 验证数据格式
    if (!languages || !Array.isArray(languages)) {
      return NextResponse.json({ success: false, error: '无效的语言数据格式' }, { status: 400 });
    }

    // 如果只是内存保存，直接返回成功
    if (!saveToFile) {
      return NextResponse.json({
        success: true,
        message: '数据已保存到内存',
        persistent: false,
      });
    }

    // 执行文件保存
    const persistenceService = createDataPersistenceService();

    // 先创建备份
    const backupPath = await persistenceService.createBackup();
    console.log(`📦 备份已创建: ${backupPath}`);

    // 保存语言数据
    const languagesSaved = await persistenceService.saveLanguagesToFile(languages as Language[]);

    // 保存学习资源数据（如果提供）
    let resourcesSaved = true;
    if (learningResources) {
      resourcesSaved = await persistenceService.saveLearningResourcesToFile(
        learningResources as Record<string, LearningResource[]>
      );
    }

    if (languagesSaved && resourcesSaved) {
      return NextResponse.json({
        success: true,
        message: '数据已成功保存到文件系统',
        persistent: true,
        backupPath,
        stats: {
          languagesCount: languages.length,
          resourcesCount: learningResources ? Object.keys(learningResources).length : 0,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: '保存到文件系统失败',
          backupPath, // 提供备份路径以便恢复
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ 保存数据API错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: `保存失败: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 }
    );
  }
}

// 获取备份列表
export async function GET() {
  try {
    const persistenceService = createDataPersistenceService();
    const backups = await persistenceService.getBackupList();

    return NextResponse.json({
      success: true,
      backups,
    });
  } catch (error) {
    console.error('❌ 获取备份列表失败:', error);
    return NextResponse.json({ success: false, error: '获取备份列表失败' }, { status: 500 });
  }
}
