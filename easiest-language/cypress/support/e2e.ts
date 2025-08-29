// Import commands.js using ES2015 syntax:
import './commands'

// Import cypress-code-coverage plugin
import '@cypress/code-coverage/support'

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}