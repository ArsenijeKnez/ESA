const BasePage = require("./BasePage");

/** LoginPage — /auth/login */
class LoginPage extends BasePage {
  // --- elements ---
  emailInput() {
    return cy.q(['[data-test="email"]', 'input[type="email"]']);
  }

  passwordInput() {
    return cy.q(['[data-test="password"]', 'input[type="password"]']);
  }

  submitButton() {
    return cy.q(['[data-test="login-submit"]', 'button[type="submit"]']);
  }

  errorMessage() {
    return cy.q('[data-test="login-error"]');
  }

  // --- actions ---
  open() {
    cy.goLogin();
    return this;
  }

  /** Fill credentials and submit (delegates to the loginWith custom command). */
  login(email, password, valid = true) {
    cy.loginWith(email, password);
    if (valid) {
      this.navMenu().should("be.visible");
    }
    return this;
  }
}

module.exports = new LoginPage();
