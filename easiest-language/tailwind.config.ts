/**
 * Tailwind CSS v4 配置文件 // 使用 JSDoc注释
 * - 采用 v4 新语法：主要通过 PostCSS 插件启用 // 每行简述用途
 * - 本文件仅作占位与少量自定义令牌示例 // 最小改动
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /**
   * theme: 仅示例自定义 CSS 变量到语义令牌映射 // 约束色板
   */
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)', // 主色
        secondary: 'var(--secondary)', // 辅助色
        accent: 'var(--accent)', // 强调色
        background: 'var(--background)', // 背景色
        foreground: 'var(--foreground)', // 前景色
      },
    },
  },
};
