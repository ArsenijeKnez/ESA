/**
 * BasePage — shared behaviour every page inherits.
 * Holds header/navigation elements and generic helpers.
 */
class BasePage {
  // --- header / nav elements ---
  navMenu() {
    return cy.get('[data-test="nav-menu"]');
  }

  navCart() {
    return cy.get('[data-test="nav-cart"]');
  }

  signOut() {
    return cy.get('[data-test="nav-sign-out"]');
  }

  // --- generic helpers ---
  visit(path = "/") {
    cy.visit(path);
    return this;
  }

  /** Open the home page (also exposed as the goHome custom command). */
  goHome() {
    cy.goHome();
    return this;
  }

  /** Log the current user out via the top navigation menu. */
  logout() {
    cy.logout();
    return this;
  }
}

module.exports = BasePage;
