export const buildingPageRelated = {
    createBuildingButton: '[data-testid="manager-screen-create-building-btn"]',
    createBuildingSubmitButton: '[data-testid="create-building-submit-button"]',
    buildingCard: 'div.card',
    buildingNameInCard: 'div.card-header',
    buildingCreatingInformationTextBoxes: {
        name: '[data-testid="input-with-icon-input-create-building-name"]',
        address: 'input[placeholder="Type the address ..."]',
        city: '[data-testid="input-with-icon-input-create-building-city"]',
        province: '[data-testid="input-with-icon-input-create-building-province"]',
        postalCode: '[data-testid="input-with-icon-input-create-building-postal-code"]',
        numberOfUnits: '[data-testid="input-with-icon-input-create-building-num-units"]',
        latitude: '[data-testid="input-with-icon-input-create-building-latitude"]',
        longitude: '[data-testid="input-with-icon-input-create-building-longitude"]',
        description: '[data-testid="input-with-icon-input-create-building-desc"]',
    },
    manageFirstBuildingButton: '[data-testid="manager-screen-view-units-btn-0"]',
    buildingDetails: '[data-testid="manage-building-screen"] h',
};

export const unitCreationRelated = {
    unitCreationTextBoxes: {
        unitNumber: '[data-testid="input-with-icon-input-add-unit-number"]',
        unitSize: '[data-testid="input-with-icon-input-add-unit-size"]',
        unitDescription: '[data-testid="input-with-icon-input-add-unit-desc"]',
    },
    createUnitButton: '[data-testid="view-units-add-unit-btn"]',
    createUnitSubmitButton: '[data-testid="add-unit-submit-button"]',
};

export const agreementCreationRelated = {
    rentTextBox: '[data-testid="input-with-icon-input-add-aggreement-rent"]',
    editUnitButton: '[data-testid="view-units-add-agreement-btn-0"]',
    addAgreementButton: '[data-testid="building-screen-create-agreement-btn-0"]',
    startDateInput: '[data-testid="add-agreement-startdate"]',
    endDateInput: '[data-testid="add-agreement-enddate"]',
    isActiveCheck: '[data-testid="add-aggreement-is-active"]',
    createAgreementSubmitButton: '[data-testid="add-agreement-submit-button"]',
};

export const facilityCreationRelated = {
    createFacilityButton: '[data-testid="view-units-create-facility"]',
    createTheFacilityButton: '[data-testid="facility-submit-button"]',
    facilityCreationForm: {
        checkBoxes: {
            free: '[data_testid="facility-free-check"]',
            paid: '[data_testid="facility-fee-check"]',
            alwaysOpen: '[data-testid="facility-alwaysOpen-check"]',
            bookedByDaily: '[data-testid="facility-has_daily_pass-check"]',
            bookedByYearly: '[data-testid="facility-has_yearly_pass-check"]',

        },
        textBoxes: {
            name: '[data-testid="input-with-icon-input-facility-name"]',
            description: '[data_testid="facility-description"]',
            daysAdding: '[data-testid="input"]',
            capacity: '[data-testid="input-with-icon-input-facility-capacity"]',
            maxHours: '[data-testid="input-with-icon-input-facility-max_hours_per_client"]',
            maxDailyPasses: '[data-testid="input-with-icon-input-facility-create-max-daily-bookings"]',
            location: '[data-testid="input-with-icon-input-facility-create-location"]',
            pricing: {
                hourly: '[data-testid="input-with-icon-input-facility-hourly-price"]',
                daily: '[data-testid="input-with-icon-input-facility-daily-price"]',
                weekly: '[data-testid="input-with-icon-input-facility-weekly_price"]',
                monthly: '[data-testid="input-with-icon-input-facility-monthly-price"]',
                yearly: '[data-testid="input-with-icon-input-facility-yearly-price"]',
            },
        },
        daysOpen: 'div span.tag-wrapper',
        removeDay: 'button',
        openAtSelect: '[data-testid="input-with-icon-input-facility-open-at"]',
        closeAtSelect: '[data-testid="input-with-icon-input-facility-close_at"]',
    },
};
