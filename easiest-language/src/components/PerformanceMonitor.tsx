'use client'; // 客户端组件

import { useEffect } from 'react'; // React 钩子

/**
 * 性能监控组件
 * - 监控 Core Web Vitals
 * - 收集性能数据
 * - 发送到分析服务
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') return;

    // 监控 Largest Contentful Paint (LCP)
    const observerLCP = new PerformanceObserver((list) => {
      const entries = list.getEntries(); // 获取性能条目
      const lastEntry = entries[entries.length - 1]; // 最后一个条目
      
      // 发送 LCP 数据到 Google Analytics
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          name: 'LCP', // 指标名称
          value: Math.round(lastEntry.startTime), // 数值（毫秒）
          event_category: 'Web Vitals', // 事件分类
        });
      }
    });

    // 监控 First Input Delay (FID)
    const observerFID = new PerformanceObserver((list) => {
      const entries = list.getEntries(); // 获取性能条目
      entries.forEach((entry) => {
        // 发送 FID 数据到 Google Analytics
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'FID', // 指标名称
            value: Math.round(entry.processingStart - entry.startTime), // 数值（毫秒）
            event_category: 'Web Vitals', // 事件分类
          });
        }
      });
    });

    // 监控 Cumulative Layout Shift (CLS)
    let clsValue = 0; // CLS 累计值
    const observerCLS = new PerformanceObserver((list) => {
      const entries = list.getEntries(); // 获取性能条目
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) { // 排除用户输入导致的布局偏移
          clsValue += entry.value; // 累加 CLS 值
        }
      });
    });

    // 启动性能监控
    try {
      observerLCP.observe({ entryTypes: ['largest-contentful-paint'] }); // 监控 LCP
      observerFID.observe({ entryTypes: ['first-input'] }); // 监控 FID
      observerCLS.observe({ entryTypes: ['layout-shift'] }); // 监控 CLS
    } catch (error) {
      console.warn('Performance monitoring not supported:', error); // 浏览器不支持时的警告
    }

    // 页面卸载时发送 CLS 数据
    const handleBeforeUnload = () => {
      if (clsValue > 0 && window.gtag) {
        window.gtag('event', 'web_vitals', {
          name: 'CLS', // 指标名称
          value: Math.round(clsValue * 1000), // 数值（转换为整数）
          event_category: 'Web Vitals', // 事件分类
        });
      }
    };

    // 添加页面卸载事件监听
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 清理函数
    return () => {
      observerLCP.disconnect(); // 断开 LCP 观察器
      observerFID.disconnect(); // 断开 FID 观察器
      observerCLS.disconnect(); // 断开 CLS 观察器
      window.removeEventListener('beforeunload', handleBeforeUnload); // 移除事件监听
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次

  return null; // 不渲染任何内容
}

// 扩展 Window 接口以支持 gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void; // Google Analytics 全局函数
  }
}
