import "./commands";

before(() => {
  cy.log("🚀 Starting Test Suite");
});

after(() => {
  cy.log("✅ Test Suite Completed");
});