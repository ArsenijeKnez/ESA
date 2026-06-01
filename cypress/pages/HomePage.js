const BasePage = require("./BasePage");

/** HomePage — product listing and search. */
class HomePage extends BasePage {
  // --- elements ---
  searchInput() {
    return cy.q('[data-test="search-query"]');
  }

  searchButton() {
    return cy.q('[data-test="search-submit"]');
  }

  productCards() {
    return cy.get(".card", { timeout: 10000 });
  }

  // --- actions ---
  open() {
    cy.goHome();
    return this;
  }

  /** Run a search (delegates to the searchFor custom command). */
  search(term) {
    cy.searchFor(term);
    return this;
  }
}

module.exports = new HomePage();
