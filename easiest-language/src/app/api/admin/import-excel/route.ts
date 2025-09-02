import { NextRequest, NextResponse } from 'next/server';
import { importLanguagesFromExcel } from '@/lib/utils/excel-utils';

/**
 * 处理Excel文件导入的API端点
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: '请选择要导入的Excel文件' },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return NextResponse.json(
        { success: false, message: '请选择Excel文件(.xlsx或.xls格式)' },
        { status: 400 }
      );
    }

    // 验证文件大小（限制为10MB）
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: '文件大小不能超过10MB' },
        { status: 400 }
      );
    }

    // 导入Excel数据
    const result = await importLanguagesFromExcel(file);

    if (result.success) {
      // 这里可以添加数据保存逻辑
      // 例如：更新数据库、保存到文件等
      console.log('导入的数据:', result.data);

      return NextResponse.json({
        success: true,
        message: result.message,
        data: result.data,
        summary: {
          basicInfo: result.data?.basicInfo?.length || 0,
          fsiDetails: result.data?.fsiDetails?.length || 0,
          learningResources: result.data?.learningResources?.length || 0,
          cultureInfo: result.data?.cultureInfo?.length || 0,
        },
      });
    } else {
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
