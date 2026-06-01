// helper: query multiple selectors and return the first match
Cypress.Commands.add("q", (selectors, options = {}) => {
  const selector = Array.isArray(selectors) ? selectors.join(", ") : selectors;
  return cy.get(selector, options).first();
});

// --- NAVIGATION ---
Cypress.Commands.add("goHome", () => {
  cy.visit("/");
});

Cypress.Commands.add("goLogin", () => {
  cy.visit("/auth/login");
});

Cypress.Commands.add("goRegister", () => {
  cy.visit("/auth/register");
});

Cypress.Commands.add("goCart", () => {
  cy.q('[data-test="nav-cart"]').click();
});

// --- AUTH ---
Cypress.Commands.add("loginWith", (email, password) => {
  cy.goLogin();
  cy.q([
    '[data-test="email"]',
    'input[id="email"]',
    'input[name="email"]',
    'input[type="email"]',
  ])
    .clear()
    .type(email);
  cy.q([
    '[data-test="password"]',
    'input[id="password"]',
    'input[name="password"]',
    'input[type="password"]',
  ])
    .clear()
    .type(password);
  cy.q(['[data-test="login-submit"]', 'button[type="submit"]']).click();
});

Cypress.Commands.add("logout", () => {
  cy.q('[data-test="nav-menu"]').click();
  cy.q('[data-test="nav-sign-out"]').click();
});

// --- REGISTER ---
Cypress.Commands.add("fillRegisterForm", (user) => {
  cy.goRegister();
  cy.q(['[data-test="first-name"]', 'input[id="first_name"]'])
    .clear()
    .type(user.firstName);
  cy.q(['[data-test="last-name"]', 'input[id="last_name"]'])
    .clear()
    .type(user.lastName);
  cy.q(['[data-test="dob"]', 'input[id="dob"]']).clear().type(user.dob);
  cy.q(['[data-test="street"]', 'input[id="street"]', 'input[id="address"]'])
    .clear()
    .type(user.address);
  cy.q(['[data-test="city"]', 'input[id="city"]']).clear().type(user.city);
  cy.q(['[data-test="state"]', 'input[id="state"]']).clear().type(user.state);
  cy.q(['[data-test="country"]', 'select[id="country"]']).select(user.country);
  cy.get('[data-test="phone"], input[id="phone"]', { timeout: 10000 })
    .filter(":visible")
    .first()
    .should("not.be.disabled")
    .clear()
    .type(user.phone);
  cy.q(['[data-test="email"]', 'input[type="email"]', 'input[id="email"]'])
    .last()
    .clear()
    .type(user.email);
  cy.q([
    '[data-test="password"]',
    'input[type="password"]',
    'input[id="password"]',
  ])
    .first()
    .clear()
    .type(user.password);
});

Cypress.Commands.add("submitPrimary", () => {
  cy.q([
    '[data-test="login-submit"]',
    '[data-test="contact-submit"]',
    'button[type="submit"]',
  ]).click({ force: true });
});

// --- SEARCH ---
Cypress.Commands.add("searchFor", (term) => {
  cy.q('[data-test="search-query"]').clear().type(term);
  cy.q('[data-test="search-submit"]').click();
});

// --- PRODUCT / CART ---
Cypress.Commands.add("openFirstProduct", () => {
  cy.get(".card", { timeout: 10000 })
    .first()
    .then(($card) => {
      const productLink = $card.find('a[href*="/product"]');
      if (productLink.length) {
        cy.wrap(productLink.first()).click({ force: true });
      } else {
        cy.wrap($card).click({ force: true });
      }
    });
});

Cypress.Commands.add("openProductByName", (productName) => {
  cy.contains("a", new RegExp(productName, "i"), { timeout: 10000 })
    .first()
    .click({ force: true });
});

Cypress.Commands.add("addToCart", () => {
  cy.get("body").then(($body) => {
    if ($body.find('[data-test="add-to-cart"]').length) {
      cy.q('[data-test="add-to-cart"]', { timeout: 10000 }).click({
        force: true,
      });
    } else {
      cy.contains("button, a", /add to cart/i, { timeout: 10000 }).click({
        force: true,
      });
    }
  });
});

Cypress.Commands.add("addFirstProductToCart", () => {
  cy.searchFor("Combination Pliers");
  cy.openProductByName("Combination Pliers");
  cy.addToCart();
});

Cypress.Commands.add("openKnownProduct", () => {
  cy.searchFor("Combination Pliers");
  cy.openProductByName("Combination Pliers");
});

Cypress.Commands.add("removeFirstCartItem", () => {
  cy.get("body").then(($body) => {
    if ($body.find('[data-test="delete-product"]').length) {
      cy.q('[data-test="delete-product"]', { timeout: 10000 }).click({
        force: true,
      });
    } else if ($body.find('[data-test="remove-product"]').length) {
      cy.q('[data-test="remove-product"]', { timeout: 10000 }).click({
        force: true,
      });
    } else if (
      $body.find(
        'button[aria-label*="remove"], button[aria-label*="Remove"], button[aria-label*="delete"], button[aria-label*="Delete"]',
      ).length
    ) {
      cy.q(
        'button[aria-label*="remove"], button[aria-label*="Remove"], button[aria-label*="delete"], button[aria-label*="Delete"]',
        { timeout: 10000 },
      ).click({ force: true });
    } else {
      cy.contains("button, a", /remove|delete/i, { timeout: 10000 }).click({
        force: true,
      });
    }
  });
});

// --- CHECKOUT PAYMENT API ---
Cypress.Commands.add(
  "checkGiftCardPayment",
  (giftCardNumber, validationCode) => {
    return cy.request({
      method: "POST",
      url: "https://api.practicesoftwaretesting.com/payment/check",
      failOnStatusCode: false,
      body: {
        payment_method: "gift-card",
        payment_details: {
          gift_card_number: giftCardNumber,
          validation_code: validationCode,
        },
      },
    });
  },
);
