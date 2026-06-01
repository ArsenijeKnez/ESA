const { ProductPage, HomePage } = require("../pages");

describe("Product details tests", () => {
  beforeEach(() => {
    HomePage.open();
  });

  it("TC10 - Open a product details page", () => {
    ProductPage.openProduct("Combination Pliers");

    cy.url().should("include", "/product/");
    cy.get("body").should("be.visible");
    cy.contains(/price|add to cart|quantity/i).should("exist");
  });
});
