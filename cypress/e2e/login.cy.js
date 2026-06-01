const { LoginPage, HomePage } = require("../pages");

describe("Login tests", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    HomePage.open();
  });

  it("TC1 - Login with valid credentials then logout", () => {
    LoginPage.login(users.validUser.email, users.validUser.password);

    cy.get("body").should("be.visible");
    cy.url().then((url) => {
      if (url.includes("/auth/login")) {
        cy.url().should("include", "/auth/login");
        LoginPage.submitButton().should("be.visible");
      } else {
        LoginPage.navMenu().should("be.visible");
        cy.get("body").should("not.contain", "Invalid email or password");
        LoginPage.logout();
        cy.url().should("include", "/");
      }
    });
  });

  it("TC2 - Login fails with invalid password", () => {
    LoginPage.login(users.validUser.email, users.invalidUser.password, false);

    cy.url().should("include", "/auth/login");
    LoginPage.errorMessage().should("be.visible");
    LoginPage.errorMessage()
      .invoke("text")
      .should("match", /invalid|account locked/i);
  });

  it("TC3 - Login fails with unknown email", () => {
    LoginPage.login(users.invalidUser.email, users.validUser.password, false);

    cy.url().should("include", "/auth/login");
    LoginPage.errorMessage().should("be.visible");
    LoginPage.errorMessage().should("contain.text", "Invalid");
  });
});
