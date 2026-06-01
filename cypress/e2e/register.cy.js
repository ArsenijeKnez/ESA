const { RegisterPage, HomePage } = require("../pages");

describe("Registration tests", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    HomePage.open();
  });

  it("TC4 - Register form validates required fields", () => {
    RegisterPage.open();
    RegisterPage.submit();

    cy.url().should("include", "/auth/register");
    RegisterPage.firstNameInput().should("have.value", "");
    RegisterPage.submitButton().should("be.visible");
  });

  it("TC5 - Register rejects an invalid email format", () => {
    const invalidEmailUser = { ...users.newUser, email: "aaa@" };
    RegisterPage.open();
    RegisterPage.fillForm(invalidEmailUser);
    RegisterPage.submit();

    cy.url().should("include", "/auth/register");
    RegisterPage.emailInput().should("have.value", invalidEmailUser.email);
    RegisterPage.submitButton().should("be.visible");
  });
});
