export const buildingDetails = {
    name: 'test',
    address: '100 King Street West, Toronto, ON, Canada',
    city: 'Toronto',
    province: 'Ontario',
    postalCode: 'M6K 1J7',
    numberOfUnits: 101,
    latitude: 43.6386155,
    longitude: -79.4457231,
    description: 'automated test created building',
};

export const unitDetails = {
    number: '101',
    size: '2.5',
    description: 'habibi',
};

export const agreementDetails = {
    startDate: '2020-12-31',
    endDate: '2030-12-31',
    rent: '1100',
};

export const facilityDetails = {
    freeOneMaxAlwaysOpen: {
        name: 'oneMaxAlwaysOpen',
        description: 'description',
        maximumCapacity: '1',
        maxHoursPerClient: '1',
        maxDailyPasses: '1',
        location: 'third floor',
    },
    freeOneMaxFiveDays:{
        name: 'oneMaxFiveDaysOpen',
        description: 'description',
        maximumCapacity: '1',
        maxHoursPerClient: '1',
        maxDailyPasses: '1',
        location: 'third floor',
    },
    paidLargeNumbers: {
        name: 'whatever',
        description: 'description',
        maximumCapacity: '10',
        maxHoursPerClient: '10',
        maxDailyPasses: '10',
        location: 'fourth floor',
    },
};
