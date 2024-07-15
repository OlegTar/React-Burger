/// <reference types="cypress" />
import {
  baseUrl,
  user,
  ingredients,
  accessToken,
  orders,
} from "../../src/config";

describe("React-Burger tests", () => {
  beforeEach(() => {
    cy.intercept("GET", `${baseUrl}${ingredients}`, {
      fixture: "ingredients",
    });
    cy.intercept("GET", `${baseUrl}${user}`, {
      fixture: "user",
    });
    cy.intercept("POST", `${baseUrl}${orders}`, {
      fixture: "order",
    });
    cy.visit("http://localhost:3000");
  });

  it("Dragging to constructor", () => {
    //cy.drag кастомная команда
    cy.drag("643d69a5c3f7b9001cfa093c");

    cy.get('[data-cy="bun-top"]').should(
      "contains.text",
      "Краторная булка N-200i (верх)"
    );
    cy.get('[data-cy="bun-bottom"]').should(
      "contains.text",
      "Краторная булка N-200i (низ)"
    );
    //cy.getCount - кастомная команда
    cy.getCount("643d69a5c3f7b9001cfa093c").should("eq", 2);
    cy.drag("643d69a5c3f7b9001cfa093d");
    cy.get('[data-cy="bun-top"]').should(
      "contains.text",
      "Флюоресцентная булка R2-D3 (верх)"
    );
    cy.get('[data-cy="bun-bottom"]').should(
      "contains.text",
      "Флюоресцентная булка R2-D3 (низ)"
    );
    cy.getCount("643d69a5c3f7b9001cfa093d").should("eq", 2);
    cy.doesNotHaveCount("643d69a5c3f7b9001cfa093c");
    cy.drag("643d69a5c3f7b9001cfa0941");
    cy.get(
      '[data-cy="constructor"] [data-cy="constructor-item"]:first-child'
    ).should("contains.text", "Биокотлета из марсианской Магнолии");
    cy.getCount("643d69a5c3f7b9001cfa0941").should("eq", 1);
    cy.drag("643d69a5c3f7b9001cfa0942");
    cy.get(
      '[data-cy="constructor"] [data-cy="constructor-item"]:last-child'
    ).should("contains.text", "Соус Spicy-X");
    cy.getCount("643d69a5c3f7b9001cfa0942").should("eq", 1);
    cy.drag("643d69a5c3f7b9001cfa0941");
    cy.getCount("643d69a5c3f7b9001cfa0941").should("eq", 2);
    cy.drag("643d69a5c3f7b9001cfa0941");
    cy.getCount("643d69a5c3f7b9001cfa0941").should("eq", 3);
  });

  it("Open/Close modal of ingredient", () => {
    cy.checkModalIsClosed();
    cy.get('[data-cy="card_643d69a5c3f7b9001cfa093d"]').click();

    cy.checkModalIsOpen();
    cy.reload();
    cy.checkModalIsOpen(); //проверяем, что модалка остаётся

    cy.get("[data-cy='close-modal']").click();
    cy.checkModalIsClosed();
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

  it("Make order", () => {
    localStorage.setItem(accessToken, "Bearer test");
    cy.reload();
    cy.checkModalIsClosed();

    cy.get("[data-cy='order']").should("be.disabled");
    cy.drag("643d69a5c3f7b9001cfa093c");
    cy.drag("643d69a5c3f7b9001cfa0941");
    cy.drag("643d69a5c3f7b9001cfa0942");
    cy.get("[data-cy='order']").should("not.be.disabled");
    cy.get("[data-cy='order']").click();

    cy.checkModalIsOpen();
    cy.get("[data-cy='order-number']").should("have.text", 45815);
    cy.get("[data-cy='close-modal']").click();
    cy.checkModalIsClosed();
    cy.get('[data-cy="constructor"] [data-cy="constructor-item"]').should(
      "not.exist"
    );
    cy.get("[data-cy='bun-top']").should("not.exist");
    cy.get("[data-cy='bun-bottom']").should("not.exist");
  });
});
