const { PaymentApi } = require("../pages");

describe("Gift card API tests", () => {
  it("TC11 - Gift card rejects an invalid format", () => {
    PaymentApi.checkGiftCard("GC-###-@@@", "%%%***").then((response) => {
      const bodyText = JSON.stringify(response.body).toLowerCase();
      expect([400, 404, 422]).to.include(response.status);
      expect(bodyText).to.match(/error|invalid|validation|resource not found/);
      expect(bodyText).not.to.contain("payment was successful");
    });
  });

  it("TC12 - Gift card accepts a valid format", () => {
    PaymentApi.checkGiftCard("ABCDGC1234567890", "ITS1234").then((response) => {
      const bodyText = JSON.stringify(response.body).toLowerCase();
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message");
      expect(bodyText).to.contain("payment was successful");
    });
  });
});
