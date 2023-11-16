export const baseUrl = 'http://localhost:3000';

export const pagePreparation = {
    mainPages: {
        login: `${baseUrl}/login`,
        resetPassword: `${baseUrl}/reset-password`,
        signUp: `${baseUrl}/register`,
        manage: `${baseUrl}/dashboard`,
        createBuilding: `${baseUrl}/createBuilding`,
        profile: `${baseUrl}/profile`,
        news: `${baseUrl}/news`,
        facilities: `${baseUrl}/facilities`,
        events: `${baseUrl}/events`,
        forum: `${baseUrl}/forum`,
        marketPlace: `${baseUrl}/marketplace`,
    },
};

export const requestDetails = {
    deleteUser: {
        method: 'DELETE',
        url: 'http://127.0.0.1:8000/api/users/deleteUser/',
    },
    deleteBuilding: {
        method: 'DELETE',
        url: 'http://127.0.0.1:8000/api/building/deleteBuilding/',
    },
    createUser: {
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/users/register/',
    }
};

export const userTestingAccount = {
    firstName: 'qa',
    lastName: 'qa',
    email: 'donotdelete@userqatesting.com',
    password: 'test.qa1',
    user: true,
    manager: false
};

export const managerTestingAccount = {
    firstName: 'qa',
    lastName: 'qa',
    email: 'donotdelete@managerqatesting.com',
    password: 'test.qa1',
    user: false,
    manager: true
};

export const stripeManagerTestingAccount = {
    firstName: 'manager',
    lastName: 'manager',
    email: 'donotdelete@fixedmanager.com',
    password: 'test.qa1',
    user: false,
    manager: true
};

export const alertMessages = {
    signUpFoundAccount: 'failed',
    signInWrongPassword: 'Invalid credentials',
};
