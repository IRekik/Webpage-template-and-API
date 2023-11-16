import { createNewAgreementAndRenewBuilding, renewAccount, signInUsing } from "../commonActions";
import { managerTestingAccount, pagePreparation, userTestingAccount } from "../commonTestingData";
import { profileNavigationButton } from "./profileSelectors"
import { updateProfileWithData } from "./profileActions"
import { newProfileData } from "./profileData"
import { navigationBarButtons, randomSelectors } from "../commonSelectors";
import { buttonsSignIn, textBoxesSignIn } from "../signInTesting/signInSelectors";

describe('Check Profile for User Tests', () => {
    before(() => {
        renewAccount(userTestingAccount);
        renewAccount(managerTestingAccount);
        createNewAgreementAndRenewBuilding(managerTestingAccount);
    });

    it('should add tenant agreement', () => {
        cy.visit(pagePreparation.mainPages.manage);
        cy.get('div a.w3-bar-item:visible').contains('Agreements').click();
        cy.get('div.container', {timeout: 10000}).should('be.visible');
        cy.get('tbody tr td').eq(0).invoke('text').then((tenantAgreementValue) => {
            cy.get('[data-testid="header-logout-link"]').click();
            signInUsing(userTestingAccount);
            cy.get(profileNavigationButton).click();
            cy.contains('Tenant Agreement').click();
            cy.get('[data-testid="input-with-icon-input-agreementID"]').type(tenantAgreementValue);
            cy.get('button[type="submit"]').click();
            cy.get('tbody td').should('exist');
            cy.go('back');
            cy.get('[data-id="rent_due"]').eq(0).should('have.text', "1100$");
        });
    });
    
    it('should change password then return it', () => {
        cy.get(profileNavigationButton).click();
        cy.contains('Change Password').click();
        cy.get('[name="oldPassword"]').type(userTestingAccount.password);
        cy.get('[name="newPassword"]').type(`${userTestingAccount.password}1`);
        cy.get('[name="newPasswordAgain"]').type(`${userTestingAccount.password}1`);
        cy.get('button[type="submit"]').click();
        cy.get(randomSelectors.messageAlert).should('contain', 'succesfully');
        cy.wait(100);
        cy.get('[data-testid="header-logout-link"]').click();
        cy.wait(100);
        cy.get(navigationBarButtons.logIn).click();
        cy.get(textBoxesSignIn.email).type(userTestingAccount.email);
        cy.get(textBoxesSignIn.password).type(`${userTestingAccount.password}1`);
        cy.get(buttonsSignIn.login).click();
        cy.wait(100);
        cy.get(profileNavigationButton).click();
        cy.contains('Change Password').click();
        cy.get('[name="oldPassword"]').type(`${userTestingAccount.password}1`);
        cy.get('[name="newPassword"]').type(userTestingAccount.password);
        cy.get('[name="newPasswordAgain"]').type(userTestingAccount.password);
        cy.get('button[type="submit"]').click();
        cy.get(randomSelectors.messageAlert).should('contain', 'succesfully');
    });

    it('should open profile page', () => {
        cy.get(profileNavigationButton).click();
        cy.url().should('equal', pagePreparation.mainPages.profile);
    });

    it('should fill out new user data', () => {
        cy.get(profileNavigationButton).click();
        updateProfileWithData(newProfileData);
        cy.get('button[type="submit"]').click();
        cy.get(randomSelectors.messageAlert).should('contain', 'succesfully');
    });
});
