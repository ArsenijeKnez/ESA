const { ProductPage, CartPage, HomePage } = require("../pages");

describe("Cart tests", () => {
  beforeEach(() => {
    HomePage.open();
  });

  it("TC8 - Add a product to the cart", () => {
    ProductPage.openProduct("Combination Pliers");
    ProductPage.addToCart();

    cy.get("body").should("be.visible");
    ProductPage.cartQuantity().should("exist");
    CartPage.navCart().should("be.visible");
  });

  it("TC9 - Open the cart after adding a product", () => {
    ProductPage.openProduct("Combination Pliers");
    ProductPage.addToCart();
    CartPage.open();

    cy.url().should("include", "/checkout");
    cy.get("body").should("be.visible");
    CartPage.cartIcon().should("exist");
  });
});
