import { createNewAgreementAndRenewBuilding, getNewTenantAgreementAndAddToUser, renewAccount, signInUsing } from "../commonActions";
import { randomSelectors } from "../commonSelectors";
import { managerTestingAccount, pagePreparation, userTestingAccount } from "../commonTestingData";
import { ticketInfo } from "./ticketData";

describe('Create Ticket as a Tenant', () => {
    before(() => {
        renewAccount(userTestingAccount);
        renewAccount(managerTestingAccount);
        createNewAgreementAndRenewBuilding(managerTestingAccount);
        getNewTenantAgreementAndAddToUser();
    });

    it('should create a ticket and delete it', () => {
        signInUsing(userTestingAccount);
        cy.visit(pagePreparation.mainPages.manage);
        cy.get('div a.w3-bar-item:visible').contains('Tickets').click();
        cy.get('[data-testid="ticket-screen-create-ticket-btn"]').click();
        cy.get('input[data-testid="input-with-icon-input-create-ticket-title"]').type(ticketInfo.title);
        cy.get('input[data-testid="input-with-icon-input-create-ticket-desc"]').type(ticketInfo.description);
        cy.get('[data-testid="create-ticket-submit-button"]').click();
        cy.get(randomSelectors.messageAlert).should('contain', 'successfully');
        cy.go('back');
        cy.get('div a.w3-bar-item:visible').contains('Tickets').click();
        cy.get('tbody td').should('exist');
        cy.get('[data-testid="ticket-screen-adress-ticket-btn-0"]').click();
        cy.get('button.btn-danger').click();
        cy.get('tbody td').should('not.exist');
    });

    it('should create a ticket and comment in it', () => {
        signInUsing(userTestingAccount);
        cy.visit(pagePreparation.mainPages.manage);
        cy.get('div a.w3-bar-item:visible').contains('Tickets').click();
        cy.get('[data-testid="ticket-screen-create-ticket-btn"]').click();
        cy.get('input[data-testid="input-with-icon-input-create-ticket-title"]').type(ticketInfo.title);
        cy.get('input[data-testid="input-with-icon-input-create-ticket-desc"]').type(ticketInfo.description);
        cy.get('[data-testid="create-ticket-submit-button"]').click();
        cy.get(randomSelectors.messageAlert).should('contain', 'successfully');
        cy.go('back');
        cy.get('div a.w3-bar-item:visible').contains('Tickets').click();
        cy.get('tbody td').should('exist');
        cy.get('[data-testid="ticket-screen-adress-ticket-btn-0"]').click();
        cy.get('[data-testid="input-with-icon-input-create-comment"]').type('testComment');
        cy.get('button').contains('Post').click();
        cy.get('[data_testid="show-comments"] div.card.mb-4').should('exist');
    });
});

describe('Check Ticket Manager', () => {
    before(() => {
        signInUsing(managerTestingAccount);
        cy.wait(100);
        cy.visit(pagePreparation.mainPages.manage);
    });

    it('should check the ticket opened and close it', () => {
        cy.get('div a.w3-bar-item:visible').contains('Tickets').click();
        cy.get('tbody td').should('exist');
        cy.get('[data-testid="ticket-screen-adress-ticket-btn-0"]').click();
        cy.get('[data_testid="show-comments"] div.card.mb-4').should('exist');
        cy.get('[data-testid="input-with-icon-input-create-comment"]').type('testComment');
        cy.get('button').contains('Post').click();
        cy.get('label.btn-outline-warning').click();
        cy.get('button.btn-outline-dark').click();
        cy.contains('Date Closed').should('not.contain', "Not");
        cy.get('label.btn-outline-success').click();
        cy.get('button.btn-outline-dark').click();
        cy.contains('Date Closed').should('contain', "Not");
        cy.get('label.btn-outline-warning').click();
        cy.get('button.btn-outline-dark').click();
        cy.go('back');
        cy.get('div a.w3-bar-item:visible').contains('Tickets').click();
        cy.contains('CLOSED').should('exist');
        cy.get('[data-testid="ticket-screen-adress-ticket-btn-0"]').click();
        cy.get('button.btn-danger').click();
    });
});
