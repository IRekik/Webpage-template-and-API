import { pagePreparation, stripeManagerTestingAccount, userTestingAccount } from "../commonTestingData";
import { deleteDay } from "../manageBuildingTesting/manageBuildingActions";
import { facilityDetails } from "../manageBuildingTesting/manageBuildingData";
import { buildingPageRelated, facilityCreationRelated } from "../manageBuildingTesting/manageBuildingSelectors";
import { createNewAgreementAndRenewBuilding, getNewTenantAgreementAndAddToUser, signInUsing } from "../commonActions"
import { randomSelectors } from "../commonSelectors";

before('renew accounts and delete created building', () => {
    createNewAgreementAndRenewBuilding(stripeManagerTestingAccount);
    getNewTenantAgreementAndAddToUser();
})

describe("Add a facility", () => {
    beforeEach(() => {
        signInUsing(stripeManagerTestingAccount);
        cy.visit(pagePreparation.mainPages.manage);
    })

    it('should create a free 24/7 facility', () => {
        cy.get(buildingPageRelated.manageFirstBuildingButton).click();
        cy.get(facilityCreationRelated.createFacilityButton).click();
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.free).should('be.checked');
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.name).type(facilityDetails.freeOneMaxAlwaysOpen.name);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.description).type(facilityDetails.freeOneMaxAlwaysOpen.description);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.capacity).type(facilityDetails.freeOneMaxAlwaysOpen.maximumCapacity);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.maxHours).type(facilityDetails.freeOneMaxAlwaysOpen.maxHoursPerClient);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.maxDailyPasses).type(facilityDetails.freeOneMaxAlwaysOpen.maxDailyPasses);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.location).type(facilityDetails.freeOneMaxAlwaysOpen.location);
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.alwaysOpen).click();
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.alwaysOpen).should('be.checked');
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.bookedByDaily).click();
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.bookedByYearly).click();
        cy.get(facilityCreationRelated.createTheFacilityButton).click();
        cy.get(randomSelectors.messageAlert).should('contain', 'created');
    });

    it('should create a free 5 day facility', () => {
        cy.get(buildingPageRelated.manageFirstBuildingButton).click();
        cy.get(facilityCreationRelated.createFacilityButton).click();
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.free).should('be.checked');
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.name).type(facilityDetails.freeOneMaxFiveDays.name);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.description).type(facilityDetails.freeOneMaxFiveDays.description);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.capacity).type(facilityDetails.freeOneMaxFiveDays.maximumCapacity);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.maxHours).type(facilityDetails.freeOneMaxFiveDays.maxHoursPerClient);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.maxDailyPasses).type(facilityDetails.freeOneMaxFiveDays.maxDailyPasses);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.location).type(facilityDetails.freeOneMaxFiveDays.location);
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.alwaysOpen).should('not.be.checked');
        deleteDay('Sunday');
        deleteDay('Saturday');
        deleteDay('Monday');
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.daysAdding).type('Mon{enter}');
        cy.get(facilityCreationRelated.facilityCreationForm.openAtSelect).select('02:00');
        cy.get(facilityCreationRelated.facilityCreationForm.closeAtSelect).select('22:00');
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.bookedByDaily).click();
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.bookedByYearly).click();
        cy.get(facilityCreationRelated.createTheFacilityButton).click();
        cy.get(randomSelectors.messageAlert).should('contain', 'created');
    });

    it('should create a paid 5 day facility', () => {
        cy.get(buildingPageRelated.manageFirstBuildingButton).click();
        cy.get(facilityCreationRelated.createFacilityButton).click();
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.paid).click();
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.paid).should('be.checked');
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.free).should('not.be.checked');
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.name).type(facilityDetails.paidLargeNumbers.name);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.description).type(facilityDetails.paidLargeNumbers.description);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.capacity).type(facilityDetails.paidLargeNumbers.maximumCapacity);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.maxHours).type(facilityDetails.paidLargeNumbers.maxHoursPerClient);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.maxDailyPasses).type(facilityDetails.paidLargeNumbers.maxDailyPasses);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.location).type(facilityDetails.paidLargeNumbers.location);
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.pricing.hourly).type('1');
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.pricing.daily).type('2');
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.pricing.weekly).type('3');
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.pricing.monthly).type('4');
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.pricing.yearly).type('5');
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.alwaysOpen).should('not.be.checked');
        deleteDay('Sunday');
        deleteDay('Saturday');
        deleteDay('Monday');
        cy.get(facilityCreationRelated.facilityCreationForm.textBoxes.daysAdding).type('Mon{enter}');
        cy.get(facilityCreationRelated.facilityCreationForm.openAtSelect).select('02:00');
        cy.get(facilityCreationRelated.facilityCreationForm.closeAtSelect).select('22:00');
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.bookedByDaily).click();
        cy.get(facilityCreationRelated.facilityCreationForm.checkBoxes.bookedByYearly).click();
        cy.get(facilityCreationRelated.createTheFacilityButton).click();
        cy.get(randomSelectors.messageAlert).should('contain', 'created');
    });
                
    it('should assert facilities are visible', () => {
        cy.get('div a.w3-bar-item:visible').contains('Facilities').click();
        cy.get('table tbody tr').should('have.length', '3');
    });
});


describe('Tenant Book Facilities', () => {
    beforeEach(() => {
        signInUsing(userTestingAccount);
        cy.visit(pagePreparation.mainPages.facilities);
    });

    it('should assert facilities are visible', () => {
        cy.get('table tbody tr').should('have.length', '3');
    });

    it('should assert changing in Filters will change number of visible elements', () => {
        cy.get('[data-testid="facilities-filter-checkbox2-sub-yearly,true"]').click();
        cy.get('[data-testid="facilities-filter-checkbox2-sub-daily,true"]').click();
        cy.get('[data-testid="facilities-filter-applybtn2"]').click();
        cy.get('table tbody tr').should('have.length', '0');
        cy.get('[data-testid="facilities-filter-checkbox2-sub-yearly,false"]').click();
        cy.get('[data-testid="facilities-filter-checkbox2-sub-daily,false"]').click();
        cy.get('[data-testid="facilities-filter-checkbox2-loc-fourth floor,true"]').click();
        cy.get('[data-testid="facilities-filter-applybtn2"]').click();
        cy.get('table tbody tr').should('have.length', '2');
        cy.get('[data-testid="facilities-filter-checkbox2-loc-fourth floor,false"]').click();
        cy.get('[data-testid="facilities-filter-applybtn2"]').click();
    });

    it('should assert booking works', () => {
        cy.get('tbody tr').eq(0).click();
        cy.get('[data-testid="facilities-detail-select-booking-type"]').select('1 Day');
        cy.get('[data-testid="facilities-detail-book-daily-btn"]').click();
        cy.get('[data-testid="facilities-detail-modal-yes-button"]').click();
        cy.get('div.modal-header').should('contain', 'Facility Booked');
        cy.get('button.btn-secondary:visible').click();
        cy.get('table tbody tr').eq(1).should('have.length', 1);
    });

    it('should assert booking on same time does not work', () => {
        cy.get('tbody tr').eq(0).click();
        cy.get('[data-testid="facilities-detail-select-booking-type"]').select('1 Day');
        cy.get('[data-testid="facilities-detail-book-daily-btn"]').click();
        cy.get('[data-testid="facilities-detail-modal-yes-button"]').click();
        cy.get('div.modal-header').should('contain', 'Already Booked');
        cy.get('button.btn-secondary:visible').click();
        cy.get('table tbody tr').eq(1).should('have.length', 1);
    });
});