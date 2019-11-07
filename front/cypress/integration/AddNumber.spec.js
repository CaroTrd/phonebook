describe("AddNumber SPEC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/add-new-contact");
  });

  it("Insert the data", () => {
    cy.focused().should("have.class", "");
  });
});
