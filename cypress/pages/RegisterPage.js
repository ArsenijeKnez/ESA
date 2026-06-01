const BasePage = require("./BasePage");

/** RegisterPage — /auth/register */
class RegisterPage extends BasePage {
  // --- elements ---
  firstNameInput() {
    return cy.q(['[data-test="first-name"]', 'input[id="first_name"]']);
  }

  emailInput() {
    return cy.q(['[data-test="email"]', 'input[type="email"]']).last();
  }

  passwordInput() {
    return cy.q(['[data-test="password"]', 'input[type="password"]']).first();
  }

  submitButton() {
    return cy.q('button[type="submit"]');
  }

  // --- actions ---
  open() {
    cy.goRegister();
    return this;
  }

  /** Fill the whole registration form (delegates to fillRegisterForm command). */
  fillForm(user) {
    cy.fillRegisterForm(user);
    return this;
  }

  submit() {
    cy.submitPrimary();
    return this;
  }
}

module.exports = new RegisterPage();
