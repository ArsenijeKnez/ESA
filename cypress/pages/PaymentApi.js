/**
 * PaymentApi — API-level page object for the gift-card payment endpoint.
 * Wraps the checkGiftCardPayment custom command.
 */
class PaymentApi {
  /** Send a gift-card payment check request. Returns the cy.request chainable. */
  checkGiftCard(number, code) {
    return cy.checkGiftCardPayment(number, code);
  }
}

module.exports = new PaymentApi();
