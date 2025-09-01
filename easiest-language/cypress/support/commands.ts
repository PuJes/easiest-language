/// <reference types="cypress" />

// Custom commands for reusable functionality
Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});
