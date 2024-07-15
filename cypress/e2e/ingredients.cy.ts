/// <reference types="cypress" />

describe("React-Burger tests", () => {
  before(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients",
    });
  });
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Dragging to constructor", () => {
    //cy.drag кастомная команда
    cy.drag("643d69a5c3f7b9001cfa093c");

    cy.get('[data-cy="dropTarget"] .bun-top').should(
      "contains.text",
      "Краторная булка N-200i (верх)"
    );
    cy.get('[data-cy="dropTarget"] .bun-bottom').should(
      "contains.text",
      "Краторная булка N-200i (низ)"
    );
    //cy.getCount - кастомная команда
    cy.getCount("643d69a5c3f7b9001cfa093c").should("eq", 2);
    cy.drag("643d69a5c3f7b9001cfa093d");
    cy.get('[data-cy="dropTarget"] .bun-top').should(
      "contains.text",
      "Флюоресцентная булка R2-D3 (верх)"
    );
    cy.get('[data-cy="dropTarget"] .bun-bottom').should(
      "contains.text",
      "Флюоресцентная булка R2-D3 (низ)"
    );
    cy.getCount("643d69a5c3f7b9001cfa093d").should("eq", 2);
    cy.doesNotHaveCount("643d69a5c3f7b9001cfa093c");
    cy.drag("643d69a5c3f7b9001cfa0941");
    cy.get(
      '[data-cy="constructor"] [data-cy="constructor_item"]:first-child'
    ).should("contains.text", "Биокотлета из марсианской Магнолии");
    cy.getCount("643d69a5c3f7b9001cfa0941").should("eq", 1);
    cy.drag("643d69a5c3f7b9001cfa0942");
    cy.get(
      '[data-cy="constructor"] [data-cy="constructor_item"]:last-child'
    ).should("contains.text", "Соус Spicy-X");
    cy.getCount("643d69a5c3f7b9001cfa0942").should("eq", 1);
    cy.drag("643d69a5c3f7b9001cfa0941");
    cy.getCount("643d69a5c3f7b9001cfa0941").should("eq", 2);
    cy.drag("643d69a5c3f7b9001cfa0941");
    cy.getCount("643d69a5c3f7b9001cfa0941").should("eq", 3);
  });

  it("Open/Close modal of ingredient", () => {
    cy.get("#modal > *").should("not.exist");
    cy.get("#modal-overlay > *").should("not.exist");
    cy.get('[data-cy="card_643d69a5c3f7b9001cfa093d"]').click();
    cy.get("#modal > *:first-child").should("exist");
    cy.get("#modal > *:first-child")
      .should("have.css", "position", "absolute")
      .should("have.css", "z-index", "101");
    cy.get("#modal-overlay > *:first-child").should("exist");
    cy.get("#modal-overlay > *:first-child")
      .should("have.css", "position", "absolute")
      .should("have.css", "z-index", "100");
    cy.get("[data-cy='close-modal']").click();
    cy.get("#modal > *").should("not.exist");
    cy.get("#modal-overlay > *").should("not.exist");
  });

  it("Check data in modal of ingredient", () => {
    cy.get('[data-cy="ingredient_643d69a5c3f7b9001cfa093d"]').should(
      "have.text",
      "Флюоресцентная булка R2-D3"
    );
    cy.get('[data-cy="card_643d69a5c3f7b9001cfa093d"]').click();
    cy.get('[data-cy="calories"]').should("have.text", "643");
    cy.get('[data-cy="proteins"]').should("have.text", "44");
    cy.get('[data-cy="fat"]').should("have.text", "26");
    cy.get('[data-cy="carbohydrates"]').should("have.text", "85");
    cy.get('[data-cy="ingredient_name"]').should(
      "have.text",
      "Флюоресцентная булка R2-D3"
    );
  });
});
