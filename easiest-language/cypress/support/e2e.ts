// Import commands.js using ES2015 syntax:
import './commands';

// Import cypress-code-coverage plugin
import '@cypress/code-coverage/support';

// Alternatively you can use CommonJS syntax:
// require('./commands')

/* eslint-disable @typescript-eslint/no-namespace */ // 允许为 Cypress 扩展全局命名空间
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>; // 自定义 dataCy 命令类型
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */
