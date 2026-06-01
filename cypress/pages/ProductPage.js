const BasePage = require("./BasePage");

/** ProductPage — single product details page. */
class ProductPage extends BasePage {
  // --- elements ---
  cartQuantity() {
    return cy.q('[data-test="cart-quantity"]');
  }

  // --- actions ---
  /** Search for a known product and open its details page. */
  openProduct(name) {
    cy.searchFor(name);
    cy.openProductByName(name);
    return this;
  }

  /** Add the currently open product to the cart. */
  addToCart() {
    cy.addToCart();
    return this;
  }
}

module.exports = new ProductPage();
