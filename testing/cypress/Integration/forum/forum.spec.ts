import { createNewAgreementAndRenewBuilding, getNewTenantAgreementAndAddToUser, renewAccount, signInUsing } from "../commonActions";
import { managerTestingAccount, pagePreparation, userTestingAccount } from "../commonTestingData";

before(() => {
    renewAccount(managerTestingAccount);
    createNewAgreementAndRenewBuilding(managerTestingAccount);
    getNewTenantAgreementAndAddToUser();
});

describe('Tenant creating new forum', () => {
    before(() => {
        signInUsing(userTestingAccount);
        cy.visit(pagePreparation.mainPages.forum);
    });

    it('should create a new forum', () => {
        cy.get('div.ms-auto button[type="button"]').click();
        cy.get('div.modal-dialog').should('be.visible');
        cy.get('#topicName').type('Tenant Title');
        cy.get('#topicDescription').type('Tenant Description');
        cy.get('#formBasicImage').selectFile('./cypress/fixtures/image.png')
        cy.get('#topicCategory').select('Technology');
        cy.contains('div.modal-footer button[type="button"]', 'Create').click();
        cy.get('div[data-testid="main"] div[role="button"]').should('be.visible');
        cy.get('.modal-content').should('contain', 'successfully');
    });

    it('should add a post on the forum from tenant', () => {
        cy.get('div[data-testid="main"] div[role="button"]').click();
        cy.contains('[data-testid="main"] button[type="button"]', 'Create').click();
        cy.get('#formBasicpostTitle').type('Post Title Tenant');
        cy.get('#formBasicBody').type('Post Body Tenant');
        cy.contains('div.modal-footer button[type="button"]', 'Create').click();
        cy.get('[data-testid="main"] div[role="button"]').should('be.visible');
    });
});

describe('Manager checking user  new forum', () => {
    before(() => {
        signInUsing(managerTestingAccount);
        cy.visit(pagePreparation.mainPages.forum);
    });

    it('should create a new forum', () => {
        cy.get('div.ms-auto button[type="button"]').click();
        cy.get('div.modal-dialog').should('be.visible');
        cy.get('#topicName').type('Manager Title');
        cy.get('#topicDescription').type('Manager Description');
        cy.get('#formBasicImage').selectFile('./cypress/fixtures/image.png')
        cy.get('#topicCategory').select('Technology');
        cy.contains('div.modal-footer button[type="button"]', 'Create').click();
        cy.get('div[data-testid="main"] div[role="button"]').should('have.length', 2);
        cy.get('.modal-content').should('contain', 'successfully');
    });

    it('should add a post on the forum from tenant', () => {
        cy.contains('div[data-testid="main"] div[role="button"]', 'Tenant').click();
        cy.contains('[data-testid="main"] button[type="button"]', 'Create').click();
        cy.get('#formBasicpostTitle').type('Post Title Manager');
        cy.get('#formBasicBody').type('Post Body Manager');
        cy.contains('div.modal-footer button[type="button"]', 'Create').click();
        cy.get('[data-testid="main"] div[role="button"]').should('have.length', 2);
    });

    it('should leave comment', () => {
        cy.contains('div[data-testid="main"] div[role="button"]', 'Tenant').click();
        cy.contains('button[type="button"]', '0').click();
        cy.contains('button[type="button"]', '0').should('not.exist');
        cy.get('[name="comment"]').type('from manager');
        cy.get('[data-testid="blog-post-add-comment-form"] button[type="button"]').click();
        cy.get('div.card-body').should('have.length', 1);
        cy.get('[data-testid="blog-post-back-button"]').click();
        cy.get('[data-testid="main"]').should('contain', 'Latest posts')
    });
});