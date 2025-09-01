import { defineConfig } from 'cypress'; // ESM 导入配置函数
import codeCoverageTask from '@cypress/code-coverage/task'; // ESM 导入代码覆盖任务

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // 注册代码覆盖率任务（替换 require 为 ESM 调用）
      codeCoverageTask(on, config); // 挂载覆盖率收集任务
      return config; // 返回修改后的配置
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
  },
});
