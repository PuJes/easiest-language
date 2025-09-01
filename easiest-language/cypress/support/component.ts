// Import commands.js using ES2015 syntax:
import './commands';

// Import cypress-code-coverage plugin for component testing
import '@cypress/code-coverage/support';

import { mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for
// your custom command.
/* eslint-disable @typescript-eslint/no-namespace */ // 允许为 Cypress 扩展全局命名空间
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount; // 增加 mount 命令类型
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

Cypress.Commands.add('mount', mount);
