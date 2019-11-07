describe("Home SPEC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("search bar in the home", () => {
    cy.focused().should("have.class", "search");
  });

  it.only("Search by number", () => {
    const typedNumber = "+39 02 1234567";
    cy.get(".search")
      .type(typedNumber)
      .should("have.value", typedNumber);
  });
});
