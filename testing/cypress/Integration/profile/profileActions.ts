/// <reference types="cypress" />
export const updateProfileWithData = (details: string[]) => {
    cy.get('[data-testid="input-with-icon-input-test"]').each((el, index) => {
            cy.wrap(el).type(details[index]);
    });
    cy.get('[data-testid="input-with-icon-input"]').type('bio');
    cy.get('#formFile').selectFile('./cypress/fixtures/image.png')
};
