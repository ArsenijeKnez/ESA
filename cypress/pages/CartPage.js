const BasePage = require("./BasePage");

/** CartPage — checkout / cart page. */
class CartPage extends BasePage {
  // --- elements ---
  cartIcon() {
    return cy.q('[data-test="nav-cart"]');
  }

  // --- actions ---
  /** Open the cart from the top navigation. */
  open() {
    cy.goCart();
    return this;
  }
}

module.exports = new CartPage();
