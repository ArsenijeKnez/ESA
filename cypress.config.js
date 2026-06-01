const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://practicesoftwaretesting.com",
    specPattern: ["cypress/e2e/**/*.cy.js"],
    excludeSpecPattern: ["**/new.cy.js", "**/new1.cy.js"],
    chromeWebSecurity: false,
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    // Use a real desktop Chrome user-agent. CI runs headless Chrome, whose
    // default UA contains "HeadlessChrome" and is blocked (403) by the site's
    // bot protection. A normal UA lets cy.visit() load the pages.
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
    retries: { runMode: 2, openMode: 0 },
  },
});
