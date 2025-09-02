/**
 * Admin API - 恢复备份数据
 */

import { NextRequest, NextResponse } from 'next/server';
import { createDataPersistenceService } from '@/lib/api/data-persistence';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { backupPath } = body;

    if (!backupPath) {
      return NextResponse.json({ success: false, error: '请提供备份路径' }, { status: 400 });
    }

    const persistenceService = createDataPersistenceService();
    const success = await persistenceService.restoreFromBackup(backupPath);

    if (success) {
      return NextResponse.json({
        success: true,
        message: '数据恢复成功，请重启开发服务器以应用更改',
      });
    } else {
      return NextResponse.json({ success: false, error: '数据恢复失败' }, { status: 500 });
    }
  } catch (error) {
    console.error('❌ 恢复备份API错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: `恢复失败: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 }
    );
  }
}
