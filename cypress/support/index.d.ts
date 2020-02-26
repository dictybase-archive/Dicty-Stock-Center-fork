/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(overrides?: {}): Chainable<Cypress.Response>
  }
}
