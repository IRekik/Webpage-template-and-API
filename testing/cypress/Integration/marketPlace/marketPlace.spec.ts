import { signInUsing } from "../commonActions";
import { pagePreparation, userTestingAccount } from "../commonTestingData";

describe("Add a facility", () => {
    before(() => {
        signInUsing(userTestingAccount);
        cy.visit(pagePreparation.mainPages.marketPlace);
    })

    it('should test the search bar', () => {
        cy.get('div input[type="text"]').type('Ant');
        cy.get('button[type="submit"]').click();
        cy.get('div.marketplacecard').should('have.length', 1);
        cy.get('div input[type="text"]').clear();
        cy.get('div input[type="text"]').type('abcde');
        cy.get('button[type="submit"]').click();
        cy.get('div[role="alert"]').should('contain', 'No products');
        cy.get('div input[type="text"]').clear();
        cy.get('button[type="submit"]').click();
    });

    it('should test the filters', () => {
        cy.get('[name="minPrice"]').type('37');
        cy.contains('button', 'Apply').click();
        cy.get('div[role="alert"]').should('contain', 'No products');
        cy.get('[name="minPrice"]').clear();
        cy.get('[name="maxPrice"]').type('35');
        cy.contains('button', 'Apply').click();
        cy.get('div[role="alert"]').should('contain', 'No products');
        cy.get('[name="maxPrice"]').clear();
        cy.get('[data-bs-target="#productType"]').click();
        cy.get('[name="saleOnly"]').click();
        cy.contains('button', 'Apply').click();
        cy.get('div[role="alert"]').should('contain', 'No products');
        cy.get('[name="saleOnly"]').click();
        cy.contains('button', 'Apply').click();
    });

    it('should test the cart', () => {
        cy.get('[data-rr-ui-event-key="/cart"]').should('not.exist');
        cy.get('div.marketplacecard button').click();
        cy.contains('button', 'Add to Cart').click();
        cy.get('table tbody tr').should('have.length', 1);
        cy.get('[data-rr-ui-event-key="/cart"]').should('exist');
        cy.contains('button', 'Proceed').click();
        cy.get('div textarea').type('anything');
        cy.contains('button', 'Continue').click();
    });

});
