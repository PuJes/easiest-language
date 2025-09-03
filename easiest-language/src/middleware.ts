import { NextResponse } from 'next/server'; // Next.js 响应处理
import type { NextRequest } from 'next/server'; // 请求类型定义

/**
 * 性能优化中间件
 * - 添加缓存头
 * - 压缩响应
 * - 安全头设置
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next(); // 继续处理请求

  // 设置缓存策略 - 静态资源长期缓存
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable' // 1年缓存
    );
  }

  // 设置图片缓存策略
  if (
    request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/) ||
    request.nextUrl.pathname.startsWith('/api/og')
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=86400, s-maxage=86400' // 1天缓存
    );
  }

  // 设置 API 路由缓存策略
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=300, s-maxage=300' // 5分钟缓存
    );
  }

  // 安全头设置
  response.headers.set('X-Frame-Options', 'DENY'); // 防止点击劫持
  response.headers.set('X-Content-Type-Options', 'nosniff'); // 防止 MIME 类型嗅探
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin'); // 引用策略
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()'); // 权限策略

  // 性能优化头
  response.headers.set('X-DNS-Prefetch-Control', 'on'); // 启用 DNS 预解析

  return response; // 返回处理后的响应
}

/**
 * 中间件匹配规则
 * - 匹配所有路径，除了内部 Next.js 路径
 */
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了：
     * - api (API 路由)
     * - _next/static (静态文件)
     * - _next/image (图片优化文件)
     * - favicon.ico (网站图标)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
