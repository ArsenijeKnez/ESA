const BasePage = require("./BasePage");

/** CheckoutPage — checkout/checkout flow page object. */
class CheckoutPage extends BasePage {
  // --- elements ---
  proceedStep1() {
    return cy.q('[data-test="proceed-1"]');
  }

  proceedStep2() {
    return cy.q('[data-test="proceed-2"]');
  }

  proceedStep3() {
    return cy.q('[data-test="proceed-3"]');
  }

  paymentMethodSelect() {
    return cy.q('[data-test="payment-method"]');
  }

  bankNameInput() {
    return cy.q('[data-test="bank_name"]');
  }

  accountNameInput() {
    return cy.q('[data-test="account_name"]');
  }

  accountNumberInput() {
    return cy.q('[data-test="account_number"]');
  }

  finishButton() {
    return cy.q('[data-test="finish"]');
  }

  successMessage() {
    return cy.contains(/payment was successful/i);
  }

  // --- actions ---
  continueStep1() {
    this.proceedStep1().click();
    return this;
  }

  continueStep2() {
    this.proceedStep2().click();
    return this;
  }

  continueStep3() {
    this.proceedStep3().click();
    return this;
  }

  finishOrder() {
    this.finishButton().click();
    return this;
  }

  fillBillingAddress({
    country,
    postalCode,
    houseNumber,
    street,
    city,
    state,
  }) {
    cy.q(['[data-test="country"]', 'select[id="country"]']).select(country);
    cy.q(['[data-test="postal_code"]', 'input[id="postal_code"]'])
      .clear()
      .type(postalCode);
    cy.q(['[data-test="house_number"]', 'input[id="house_number"]'])
      .clear()
      .type(houseNumber);
    cy.q(['[data-test="street"]', 'input[id="street"]']).clear().type(street);
    cy.q(['[data-test="city"]', 'input[id="city"]']).clear().type(city);
    cy.q(['[data-test="state"]', 'input[id="state"]']).clear().type(state);
    return this;
  }

  selectPaymentMethod(method) {
    this.paymentMethodSelect().select(method);
    return this;
  }

  fillBankTransferDetails({ bankName, accountName, accountNumber }) {
    this.bankNameInput().should("be.visible").type(bankName);
    this.accountNameInput().type(accountName);
    this.accountNumberInput().type(accountNumber);
    return this;
  }
}

module.exports = new CheckoutPage();
