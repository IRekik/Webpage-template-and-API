import { createNewAgreementAndRenewBuilding, getNewTenantAgreementAndAddToUser, renewAccount, signInUsing } from "../commonActions";
import { managerTestingAccount, pagePreparation, userTestingAccount } from "../commonTestingData";

describe('Manager creating new announcement', () => {
    before(() => {
        renewAccount(managerTestingAccount);
        createNewAgreementAndRenewBuilding(managerTestingAccount);
        getNewTenantAgreementAndAddToUser();
        signInUsing(managerTestingAccount);
        cy.visit(pagePreparation.mainPages.news);
    });

    it('should create a new announcement', () => {
        cy.get('button[type="button"]').contains('Add').click();
        cy.get('div.modal').should('be.visible');
        cy.get('input[name="title"]').type('test news');
        cy.get('textarea[name="description"]').type('random');
        cy.get('#formBasicImage').selectFile('./cypress/fixtures/image.png');
        cy.get('select[name="building"]').select('test');
        cy.get('button[type="button"]').contains('Save').click();
    });

    it('should assert announcement is created', () => {
        cy.get('div.card-title').should('have.length', 1);
        cy.get('div.card-title').should('contain', 'test news');
        cy.get('div.card-title').click();
        cy.get('div.modal-content').should('be.visible');
        cy.get('button.btn').contains('Close').click();
    });
});

describe('Tenant Can Check the Announcements', () => {
    before(() => {
        signInUsing(userTestingAccount);
    });

    it('should assert the news is visible', () => {
        cy.visit(pagePreparation.mainPages.news);
        cy.get('div.card-title').should('have.length', 1);
        cy.get('div.card-title').should('contain', 'test news');
        cy.get('div.card-title').click();
        cy.get('div.modal-content').should('be.visible');
        cy.get('button.btn').contains('Close').click();
    });
});
