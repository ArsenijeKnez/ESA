# Cypress Test Automation — Practice Software Testing (Toolshop)

End-to-end test automation for the [Practice Software Testing](https://practicesoftwaretesting.com/)
demo store, built with **Cypress** and the **Page Object Model (POM)**.

## Features

- ✅ **Cypress Page Object Model** for cleaner, reusable test actions
- ✅ **Custom commands** in `cypress/support/commands.js`
- ✅ **Fixture-driven test data** in `cypress/fixtures/users.json`
- ✅ **7 Cypress spec files** covering login, registration, search, cart, product, payment API, and checkout flows
- ✅ **Postman collection** for API validation and Newman CLI execution
- ✅ **Bug report documentation** for API endpoint issues

## Project Structure

```text
ESAGaming/
├── cypress.config.js               # Cypress configuration
├── package.json                    # npm scripts and dependencies
├── cypress/
│   ├── fixtures/
│   │   └── users.json              # test data for login, registration, search, etc.
│   ├── pages/                      # Page Object Model classes
│   │   ├── BasePage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── ProductPage.js
│   │   ├── RegisterPage.js
│   │   └── PaymentApi.js
│   ├── support/
│   │   ├── commands.js             # custom Cypress commands
│   │   └── e2e.js                  # global test setup
│   └── e2e/
│       ├── cart.cy.js
│       ├── checkout.cy.js
│       ├── login.cy.js
│       ├── payment.cy.js
│       ├── product.cy.js
│       ├── register.cy.js
│       └── search.cy.js
├── postman/
│   ├── Toolshop-Store-Product.postman_collection.json
│   ├── Toolshop-Env.postman_environment.json
│   └── BUG_REPORT_ProductEndpoint.md
└── README.md                        # project documentation
```

## Getting Started

### Prerequisites

- Node.js 22+

### Install dependencies

```bash
npm install
```

### Run Cypress tests

```bash
npm test
npm run test:open
npm run test:pom
```

## Page Object Model (POM)

This project uses a POM structure in `cypress/pages/`:

- `BasePage.js` — shared navigation and helper methods
- `LoginPage.js` — login page interactions
- `RegisterPage.js` — registration flow
- `HomePage.js` — search and navigation
- `ProductPage.js` — product lookup and add-to-cart
- `CartPage.js` — cart navigation
- `CheckoutPage.js` — checkout workflow and payment details
- `PaymentApi.js` — API-level payment check wrapper

## Postman / Newman

The repository includes a Postman collection and environment for API testing:

- `postman/Toolshop-Store-Product.postman_collection.json`
- `postman/Toolshop-Env.postman_environment.json`
- `postman/BUG_REPORT_ProductEndpoint.md`

### Run Postman collection with Newman

```bash
npm install -g newman
newman run postman/Toolshop-Store-Product.postman_collection.json -e postman/Toolshop-Env.postman_environment.json --reporters cli
```

### Notes

- Update `postman/Toolshop-Env.postman_environment.json` with valid credentials and valid IDs for `brandId`, `categoryId`, and `productImageId`.
- The `BUG_REPORT_ProductEndpoint.md` file documents a known server error when calling `POST /products`.

## Notes

- The current suite does not include a GitHub Actions workflow in this repository.
- The README now reflects the current POM structure, actual Cypress spec files, and the Postman support files.
