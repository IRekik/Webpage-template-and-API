import { managerTestingAccount, pagePreparation } from "../commonTestingData";
import {agreementCreationRelated, buildingPageRelated, unitCreationRelated} from "./manageBuildingSelectors";
import { createBuildingWithDataFrom, createUnitWithDataFrom } from "./manageBuildingActions";
import { agreementDetails, buildingDetails, unitDetails } from "./manageBuildingData";
import { randomSelectors } from "../commonSelectors";
import { deleteBuildingWithAddress, getNewTenantAgreementAndAddToUser, signInUsing } from "../commonActions";

before(() => {
    deleteBuildingWithAddress(buildingDetails.address);
});

describe("Manage Building As Manager", () => {
    beforeEach(() => {
        signInUsing(managerTestingAccount);
        cy.wait(100);
        cy.visit(pagePreparation.mainPages.manage);
    });

    describe("Add a building", () => {
        it('should create a building and assert building details stored correctly', () => {
            cy.get(randomSelectors.messageAlert).should('contain', 'No buildings')
            cy.get(buildingPageRelated.createBuildingButton).click();
            cy.url().should('equal', pagePreparation.mainPages.createBuilding);
            createBuildingWithDataFrom(buildingDetails);
            cy.get(randomSelectors.messageAlert).should('be.visible');
            cy.get(randomSelectors.messageAlert).should('contain', 'successfully');
            cy.visit(pagePreparation.mainPages.manage);
            cy.get('table tbody tr').should('have.length', 1);
        });
    
        it('should assert failure on creating exisitng building', () => {
            cy.get(buildingPageRelated.createBuildingButton).click();
            cy.url().should('equal', pagePreparation.mainPages.createBuilding);
            createBuildingWithDataFrom(buildingDetails);
            cy.get(randomSelectors.messageAlert).should('be.visible');
            cy.get(randomSelectors.messageAlert).should('contain', 'already exists');
            cy.visit(pagePreparation.mainPages.manage);
            cy.get('table tbody tr').should('have.length', 1);
        });
    
        it('should assert building details stored correctly', () => {
            cy.get('table tbody tr').should('have.length', 1);
            cy.get(buildingPageRelated.manageFirstBuildingButton).click();
            cy.contains(`${buildingPageRelated.buildingDetails}6`, 'Description').should('contain', buildingDetails.description);
            cy.contains(`${buildingPageRelated.buildingDetails}6`, 'Address').should('contain', buildingDetails.address);
            cy.contains(`${buildingPageRelated.buildingDetails}6`, 'City').should('contain', buildingDetails.city);
            cy.contains(`${buildingPageRelated.buildingDetails}6`, 'Province').should('contain', buildingDetails.province);
            cy.contains(`${buildingPageRelated.buildingDetails}6`, 'Postal Code').should('contain', buildingDetails.postalCode);
            cy.get(`${buildingPageRelated.buildingDetails}1`).eq(0).should('contain', buildingDetails.name);
            cy.get(`${buildingPageRelated.buildingDetails}1`).eq(1).should('contain', `(${buildingDetails.longitude}, ${buildingDetails.latitude})`);
        });

        describe("Manage a building", () => {
            describe("Add a unit", () => {
                it('should add unit for building happy path', () => {
                    cy.get(buildingPageRelated.manageFirstBuildingButton).click();
                    cy.get('table tbody tr').should('have.length', 0);
                    cy.get(unitCreationRelated.createUnitButton).click();
                    createUnitWithDataFrom(unitDetails);
                    cy.get(randomSelectors.messageAlert).should('be.visible');
                    cy.get(randomSelectors.messageAlert).should('contain', 'successfully');
                    cy.visit(pagePreparation.mainPages.manage);
                    cy.get(buildingPageRelated.manageFirstBuildingButton).click();
                    cy.get('table tbody tr').should('have.length', 1);
                });
            
                it('should assert failure on adding existing unit for building', () => {
                    cy.get(buildingPageRelated.manageFirstBuildingButton).click();
                    cy.get(unitCreationRelated.createUnitButton).click();
                    createUnitWithDataFrom(unitDetails);
                    cy.get(randomSelectors.messageAlert).should('be.visible');
                    cy.get(randomSelectors.messageAlert).should('contain', 'already exists');
                    cy.visit(pagePreparation.mainPages.manage);
                    cy.get(buildingPageRelated.manageFirstBuildingButton).click();
                    cy.get('table tbody tr').should('have.length', 1);
                });
            });

            describe('Manage a unit', () => {
                it('should add an agreement', () => {
                    cy.get(buildingPageRelated.manageFirstBuildingButton).click();
                    cy.get(agreementCreationRelated.addAgreementButton).click();
                    cy.get(agreementCreationRelated.startDateInput).type(agreementDetails.startDate);
                    cy.get(agreementCreationRelated.endDateInput).type(agreementDetails.endDate);
                    cy.get(agreementCreationRelated.rentTextBox).type(agreementDetails.rent);
                    cy.get(agreementCreationRelated.isActiveCheck).check();
                    cy.get(agreementCreationRelated.createAgreementSubmitButton).click();
                });
                
                it('should assert an agreement is visible', () => {
                    cy.get('div a.w3-bar-item:visible').contains('Agreements').click();
                    cy.get('div.container', {timeout: 10000}).should('be.visible');
                    cy.get('tbody tr').should('have.length', 1);
                    cy.get('tbody tr').within(() => {
                        cy.get('td').eq(1).should('contain', buildingDetails.name);
                        cy.get('td').eq(2).should('contain', unitDetails.number);
                        cy.get('td').eq(3).should('contain', agreementDetails.rent);
                        cy.get('td').eq(4).should('contain', agreementDetails.startDate);
                        cy.get('td').eq(5).should('contain', agreementDetails.endDate);
                        cy.get('td').eq(6).should('contain', 'No');
                        cy.get('td').eq(7).should('contain', 'Pending');
                    });
                });

                it('should assert Status of agreement changes after unchecking active', () => {
                    cy.get('div a.w3-bar-item:visible').contains('Agreements').click();
                    cy.get('a[role="button"]').click();
                    cy.get('[data-testid="edit-agreement-is-active"]').click();
                    cy.get('[data-testid="edit-agreement-submit"]').click();
                    cy.get(randomSelectors.messageAlert).should('contain', 'successfully');
                    cy.visit(pagePreparation.mainPages.manage);
                    cy.get('div a.w3-bar-item:visible').contains('Agreements').click();
                    cy.get('tbody tr td').eq(7).should('contain', 'Inactive');
                });

                it('should assert Linked to tenant updates after using activation code', () => {
                    getNewTenantAgreementAndAddToUser();
                    signInUsing(managerTestingAccount);
                    cy.wait(100);
                    cy.visit(pagePreparation.mainPages.manage);
                    cy.get('div a.w3-bar-item:visible').contains('Agreements').click();
                    cy.get('td').eq(6).should('contain', 'Yes');
                });
            });
        });
    });
});