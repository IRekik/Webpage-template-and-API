/// <reference types="cypress" />

import { buildingPageRelated, facilityCreationRelated, unitCreationRelated } from './manageBuildingSelectors';

export const createBuildingWithDataFrom = (buildingDetails: any) => {
    cy.get(buildingPageRelated.buildingCreatingInformationTextBoxes.name).type(buildingDetails.name);
    cy.get(buildingPageRelated.buildingCreatingInformationTextBoxes.address).type('100 King');
    cy.contains('div', '100 King Street West, Toronto, ON, Canada', {timeout: 10000}).should('be.visible')
    cy.contains('100 King Street West, Toronto, ON, Canada').click();
    cy.get(buildingPageRelated.buildingCreatingInformationTextBoxes.numberOfUnits).type(buildingDetails.numberOfUnits);
    cy.get(buildingPageRelated.buildingCreatingInformationTextBoxes.description).type(buildingDetails.description);
    cy.get(buildingPageRelated.createBuildingSubmitButton).click();
};

export const createUnitWithDataFrom = (unitDetails: any) => {
    cy.get(unitCreationRelated.unitCreationTextBoxes.unitNumber).type(unitDetails.number);
    cy.get(unitCreationRelated.unitCreationTextBoxes.unitSize).type(unitDetails.size);
    cy.get(unitCreationRelated.unitCreationTextBoxes.unitDescription).type(unitDetails.description);
    cy.get(unitCreationRelated.createUnitSubmitButton).click();
};

export const deleteDay = (day: string) => {
    cy.get(facilityCreationRelated.facilityCreationForm.daysOpen).contains(day).within(() => {
        cy.get(facilityCreationRelated.facilityCreationForm.removeDay).click();
    });
};