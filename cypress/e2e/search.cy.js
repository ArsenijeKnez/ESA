const { HomePage } = require("../pages");

describe("Search tests", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    HomePage.open();
  });

  it("TC6 - Search for a valid product shows matching results", () => {
    HomePage.search(users.searchTerms.valid);

    HomePage.productCards().should("have.length.greaterThan", 0);
    HomePage.searchButton().should("be.visible");
    cy.url().should("include", "/");
  });

  it("TC7 - Search for an invalid product shows no results", () => {
    HomePage.search(users.searchTerms.invalid);

    HomePage.productCards().should("have.length", 0);
    HomePage.searchButton().should("be.visible");
    cy.url().should("include", "/");
  });
});
