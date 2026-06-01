const {
  LoginPage,
  ProductPage,
  CartPage,
  HomePage,
  CheckoutPage,
} = require("../pages");

describe("Checkout tests", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    HomePage.open();
  });

  it("TC13 - Complete checkout with bank transfer", () => {
    cy.intercept(
      "POST",
      "https://api.practicesoftwaretesting.com/payment/check",
    ).as("paymentCheck");

    LoginPage.login(users.validUser.email, users.validUser.password);
    HomePage.open();
    ProductPage.openProduct("Combination Pliers").addToCart();
    CartPage.open();

    CheckoutPage.continueStep1()
      .continueStep2()
      .fillBillingAddress({
        country: "RS",
        postalCode: "21000",
        houseNumber: "1",
        street: "Bulevar Oslobodjenja",
        city: "Novi Sad",
        state: "Vojvodina",
      })
      .continueStep3()
      .selectPaymentMethod("Bank Transfer")
      .fillBankTransferDetails({
        bankName: "Addiko Bank",
        accountName: "John Doe",
        accountNumber: "123456789",
      })
      .finishOrder();

    CheckoutPage.successMessage().should("be.visible");
    cy.wait("@paymentCheck").its("response.statusCode").should("eq", 200);
  });
});
