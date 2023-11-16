/// <reference types="cypress" />

import { baseUrl, pagePreparation, requestDetails, userTestingAccount } from "./commonTestingData";
import { createBuildingWithDataFrom, createUnitWithDataFrom } from "./manageBuildingTesting/manageBuildingActions";
import { agreementDetails, buildingDetails, unitDetails } from "./manageBuildingTesting/manageBuildingData";
import { agreementCreationRelated, buildingPageRelated, unitCreationRelated } from "./manageBuildingTesting/manageBuildingSelectors";
import { buttonsSignIn, textBoxesSignIn } from "./signInTesting/signInSelectors";

export const deleteBuildingWithAddress = (address: string) => {
    cy.request({
        method: requestDetails.deleteBuilding.method,
        url: requestDetails.deleteBuilding.url,
        body: {
            'address': address
        },
        failOnStatusCode: false
    });
}

export const deleteAccount = (email: string) => {
    cy.request({
        method: requestDetails.deleteUser.method,
        url: requestDetails.deleteUser.url,
        body: {
            'email': email,
        },
        failOnStatusCode: false
    });
}

export const createAccount = (account, code) => {
    cy.request({
        method: requestDetails.createUser.method,
        url: requestDetails.createUser.url,
        body: {
            code: code,
            email: account.email,
            first_name: account.firstName,
            last_name: account.lastName,
            manager: account.manager,
            user: account.user,
            password: account.password,
            password_confirm: account.password
        },
        failOnStatusCode: false
    });
}

export const renewAccount = (account, code="") => {
    deleteAccount(account.email);
    createAccount(account, code);
};

export const signInUsing = (account: any) => {
    cy.visit(pagePreparation.mainPages.login);
    cy.get(textBoxesSignIn.email).type(account.email);
    cy.get(textBoxesSignIn.password).type(account.password);
    cy.get(buttonsSignIn.login).click();
    cy.url().should('equal', `${baseUrl}/`);
};

export const createNewAgreementAndRenewBuilding = (account) => {
    deleteBuildingWithAddress(buildingDetails.address);
    signInUsing(account);
    cy.visit(pagePreparation.mainPages.manage);
    cy.get(buildingPageRelated.createBuildingButton).click();
    createBuildingWithDataFrom(buildingDetails);
    cy.visit(pagePreparation.mainPages.manage);
    cy.get(buildingPageRelated.manageFirstBuildingButton).click();
    cy.get(unitCreationRelated.createUnitButton).click();
    createUnitWithDataFrom(unitDetails);
    cy.visit(pagePreparation.mainPages.manage);
    cy.get(buildingPageRelated.manageFirstBuildingButton).click();
    cy.get(agreementCreationRelated.addAgreementButton).click();
    cy.get(agreementCreationRelated.startDateInput).type(agreementDetails.startDate);
    cy.get(agreementCreationRelated.endDateInput).type(agreementDetails.startDate);
    cy.get(agreementCreationRelated.rentTextBox).type(agreementDetails.rent);
    cy.get(agreementCreationRelated.isActiveCheck).check();
    cy.get(agreementCreationRelated.createAgreementSubmitButton).click();
};

export const getNewTenantAgreementAndAddToUser = () => {
    cy.visit(pagePreparation.mainPages.manage);
    cy.contains('div a.w3-bar-item:visible', 'Agreements').click();
    cy.get('div.container', {timeout: 10000}).should('be.visible');
    cy.get('tbody tr td').eq(0).invoke('text').then((tenantAgreementValue) => {
        cy.get('[data-testid="header-logout-link"]').click();
        renewAccount(userTestingAccount, tenantAgreementValue);
    });
};
