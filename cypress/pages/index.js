/** Barrel export — single import point for all page objects. */
module.exports = {
  LoginPage: require("./LoginPage"),
  RegisterPage: require("./RegisterPage"),
  HomePage: require("./HomePage"),
  ProductPage: require("./ProductPage"),
  CartPage: require("./CartPage"),
  PaymentApi: require("./PaymentApi"),
  CheckoutPage: require("./CheckoutPage"),
};
