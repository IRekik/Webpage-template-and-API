import { createNewAgreementAndRenewBuilding, getNewTenantAgreementAndAddToUser, renewAccount, signInUsing } from "../commonActions";
import { managerTestingAccount, pagePreparation, userTestingAccount } from "../commonTestingData";

// TODO: Remove Skips once the bug is fixed LCN-141

before(() => {
    renewAccount(managerTestingAccount);
    createNewAgreementAndRenewBuilding(managerTestingAccount);
    getNewTenantAgreementAndAddToUser();
});

describe('Manager creating new event', () => {
    before(() => {
        signInUsing(managerTestingAccount);
        cy.visit(pagePreparation.mainPages.events);
    });

    it('should create a new event', () => {
        cy.get('button[type="button"]').contains('Add').click();
        cy.get('div.modal').should('be.visible');
        cy.get('input[name="title"]').type('test event');
        cy.get('textarea[name="description"]').type('random');
        cy.get('input[name="location"]').type('basement');
        cy.get('select[name="building"]').select('test');
        cy.get('#formBasicImage').selectFile('./cypress/fixtures/image.png');
        cy.get('[data-testid="input-with-icon-input-event-start-at"]').select('05:00');
        cy.get('[data-testid="input-with-icon-input-event-end-at"]').select('07:00');
        cy.get('button[type="button"]').contains('Save').click();
    });

    it('should assert event is created', () => {
        cy.get('table tbody tr').should('have.length', 1);
        cy.get('table tbody tr td').eq(1).should('contain', 'test event');
        cy.get('table tbody tr td button').click();
        cy.get('div.modal-content').should('be.visible');
        cy.get('button.btn').contains('Close').click();
    });

    it('should update the event', () => {
        cy.get('table tbody tr td button').click();
        cy.get('button.btn').contains('Update').click();
        cy.get('input[name="title"]').clear().type('editted');
        cy.get('button[type="button"]').contains('Cancel').click();
        cy.get('button.btn').contains('Close').click();
        cy.get('table tbody tr td').eq(1).should('contain', 'test event');
        cy.get('table tbody tr td button').click();
        cy.get('button.btn').contains('Update').click();
        cy.get('input[name="title"]').clear().type('editted');
        cy.get('button[type="button"]').contains('Update').click();
        cy.get('table tbody tr td').eq(1).should('contain', 'editted');
    });

    it('should delete the created event', () => {
        cy.get('table tbody tr td button').click();
        cy.get('button.btn-danger').click();
        cy.get('button.btn-danger').eq(1).click();
        cy.get('table tbody tr').should('have.length', 0);
    });

    it('should create a new event for testing for tenant', () => {
        cy.get('button[type="button"]').contains('Add').click();
        cy.get('input[name="title"]').type('test event');
        cy.get('textarea[name="description"]').type('random');
        cy.get('input[name="location"]').type('basement');
        cy.get('select[name="building"]').select('test');
        cy.get('#formBasicImage').selectFile('./cypress/fixtures/image.png');
        cy.get('[data-testid="input-with-icon-input-event-start-at"]').select('05:00');
        cy.get('[data-testid="input-with-icon-input-event-end-at"]').select('07:00');
        cy.get('button[type="button"]').contains('Save').click();
    });
});

describe('Tenant Can Check the Events', () => {
    before(() => {
        signInUsing(userTestingAccount);
        cy.visit(pagePreparation.mainPages.events);
    });

    it('should assert the event is visible', () => {
        cy.get('table tbody tr').should('have.length', 1);
        cy.get('table tbody tr').should('contain', 'test event');
        cy.get('table tbody tr td button').click();
        cy.get('div.modal-content').should('be.visible');
        cy.get('button.btn').contains('Close').click();
    });

    it('should assert tenant can not edit or delete Manager Created Events', () => {
        cy.get('table tbody tr td button').click();
        cy.get('div.modal button.btn').should('contain', 'Close');
        cy.get('button.btn').contains('Close').click();
    });

    it('should create a new event as a user', () => {
        cy.get('button[type="button"]').contains('Add').click();
        cy.get('div.modal').should('be.visible');
        cy.get('input[name="title"]').type('test event User');
        cy.get('textarea[name="description"]').type('random');
        cy.get('input[name="location"]').type('basement');
        cy.get('select[name="building"]').select('test');
        cy.get('#formBasicImage').selectFile('./cypress/fixtures/image.png');
        cy.get('[data-testid="input-with-icon-input-event-start-at"]').select('03:00');
        cy.get('[data-testid="input-with-icon-input-event-end-at"]').select('04:00');
        cy.get('button[type="button"]').contains('Save').click();
    });

    it('should update and then delete tenant created event', () => {
        cy.get('table tbody tr td button').eq(1).click();
        cy.get('button.btn').contains('Update').click();
        cy.get('input[name="title"]').clear().type('editted');
        cy.get('button[type="button"]').contains('Cancel').click();
        cy.get('button.btn').contains('Close').click();
        cy.get('table tbody tr').should('have.length', 2);
        cy.get('table tbody tr td button').eq(1).click();
        cy.get('button.btn').contains('Update').click();
        cy.get('input[name="title"]').clear().type('editted');
        cy.get('button[type="button"]').contains('Update').click();
        cy.get('table tbody tr').eq(1).within(() => {
           cy.get('td').eq(1).should('contain', 'editted');
        })
        cy.get('table tbody tr td button').eq(1).click();
        cy.get('button.btn').contains('Delete').click();
        cy.get('button.btn-danger').eq(1).click();
        cy.get('table tbody tr').should('have.length', 1);
    });

    it('should create a new event as a user for manager testing', () => {
        cy.get('button[type="button"]').contains('Add').click();
        cy.get('input[name="title"]').type('test event User');
        cy.get('textarea[name="description"]').type('random');
        cy.get('input[name="location"]').type('basement');
        cy.get('select[name="building"]').select('test');
        cy.get('#formBasicImage').selectFile('./cypress/fixtures/image.png');
        cy.get('[data-testid="input-with-icon-input-event-start-at"]').select('03:00');
        cy.get('[data-testid="input-with-icon-input-event-end-at"]').select('04:00');
        cy.get('button[type="button"]').contains('Save').click();
    });
});

describe('Manager Can Check the Events Created By Tenant', () => {
    before(() => {
        signInUsing(managerTestingAccount);
    });

    it('should assert the event is visible', () => {
        cy.visit(pagePreparation.mainPages.events);
        cy.get('table tbody tr').should('have.length', 2);
        cy.get('table tbody tr').eq(1).should('contain', 'test event User');
        cy.get('table tbody tr td button').eq(0).click();
        cy.get('div.modal-content').should('be.visible');
        cy.get('button.btn').contains('Close').click();
    });

    it('should assert the event created by tenant is edittable and deletable', () => {
        cy.get('table tbody tr').eq(1).should('contain', 'test event User');
        cy.get('table tbody tr td button').eq(1).click();
        cy.get('button.btn').contains('Update').click();
        cy.get('input[name="title"]').clear().type('editted');
        cy.get('button[type="button"]').contains('Cancel').click();
        cy.get('button.btn').contains('Close').click();
        cy.get('table tbody tr').eq(1).should('contain', 'test event User');
        cy.get('table tbody tr td button').eq(1).click();
        cy.get('button.btn').contains('Update').click();
        cy.get('input[name="title"]').clear().type('editted');
        cy.get('button[type="button"]').contains('Update').click();
        cy.get('table tbody tr').eq(1).should('contain', 'editted');
        cy.get('table tbody tr td button').eq(1).click();
        cy.get('button.btn').contains('Delete').click();
        cy.get('button.btn-danger').eq(1).click();
        cy.get('table tbody tr').should('have.length', 1);
    });
});