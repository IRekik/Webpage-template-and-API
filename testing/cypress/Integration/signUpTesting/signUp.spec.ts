import { deleteAccount } from "../commonActions";
import { randomSelectors } from "../commonSelectors";
import { alertMessages, managerTestingAccount, pagePreparation, userTestingAccount } from "../commonTestingData";
import {pageTitle} from "./signUpData";
import {accountTypeRadio, buttons, links, textBoxEmptyErrors, textBoxes} from "./signUpSelectors";

describe("Sign Up", () => {
    before(() => {
        deleteAccount(userTestingAccount.email);
        deleteAccount(managerTestingAccount.email);
    });

    beforeEach(() => {
        cy.visit(pagePreparation.mainPages.signUp);
    });     
  
    it("should assert tested page is correct", () => {
        cy.get(randomSelectors.pageTitle).should('contain', pageTitle);
    });
  
    it("should assert links in buttons are correct", () => {
        cy.get(links.logIn).click();
        cy.url().should('equal', pagePreparation.mainPages.login)
    });
  
    it("should sign up as user happy path", () => {
        cy.get(accountTypeRadio.user).should('be.checked');
        cy.get(accountTypeRadio.manager).should('not.be.checked');
        cy.get(textBoxes.firstName).type(userTestingAccount.firstName);
        cy.get(textBoxes.lastName).type(userTestingAccount.lastName);
        cy.get(textBoxes.email).type(userTestingAccount.email);
        cy.get(textBoxes.password).type(userTestingAccount.password);
        cy.get(textBoxes.confirmPassword).type(userTestingAccount.password);
        cy.get(buttons.signUp).click();
        cy.get(randomSelectors.messageAlert).should('exist');
        cy.get(randomSelectors.messageAlert).should('contain', 'succesfully');
    });

    it("should sign up as user sad path", () => {
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.firstName).should('be.visible');
        cy.get(textBoxes.firstName).type(userTestingAccount.firstName);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.lastName).should('be.visible');
        cy.get(textBoxes.lastName).type(userTestingAccount.lastName);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.email).should('be.visible');
        cy.get(textBoxes.email).type(userTestingAccount.email);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.password).should('be.visible');
        cy.get(textBoxes.password).type(userTestingAccount.password);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.confirmPassword).should('be.visible');
        cy.get(textBoxes.confirmPassword).type(`${userTestingAccount.password}wrongPassword`);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.confirmPassword).should('be.visible');
        cy.get(textBoxes.confirmPassword).clear();
        cy.get(textBoxes.confirmPassword).type(userTestingAccount.password);
        cy.get(buttons.signUp).click();
        cy.get(randomSelectors.messageAlert).should('exist');
        cy.get(randomSelectors.messageAlert).should('contain', alertMessages.signUpFoundAccount);
    });
      
    it("should sign up as manager happy path", () => {
        cy.get(accountTypeRadio.manager).click();
        cy.get(accountTypeRadio.user).should('not.be.checked');
        cy.get(accountTypeRadio.manager).should('be.checked');
        cy.get(textBoxes.firstName).type(managerTestingAccount.firstName);
        cy.get(textBoxes.lastName).type(managerTestingAccount.lastName);
        cy.get(textBoxes.email).type(managerTestingAccount.email);
        cy.get(textBoxes.password).type(managerTestingAccount.password);
        cy.get(textBoxes.confirmPassword).type(managerTestingAccount.password);
        cy.get(buttons.signUp).click();
        cy.get(randomSelectors.messageAlert).should('exist');
        cy.get(randomSelectors.messageAlert).should('contain', 'succesfully');
    });
    
    it("should sign up as manager sad path", () => {
        cy.get(accountTypeRadio.manager).click();
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.firstName).should('be.visible');
        cy.get(textBoxes.firstName).type(managerTestingAccount.firstName);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.lastName).should('be.visible');
        cy.get(textBoxes.lastName).type(managerTestingAccount.lastName);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.email).should('be.visible');
        cy.get(textBoxes.email).type(managerTestingAccount.email);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.password).should('be.visible');
        cy.get(textBoxes.password).type(managerTestingAccount.password);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.confirmPassword).should('be.visible');
        cy.get(textBoxes.confirmPassword).type(`${managerTestingAccount.password}wrongPassword`);
        cy.get(buttons.signUp).click();
        cy.get(textBoxEmptyErrors.confirmPassword).should('be.visible');
        cy.get(textBoxes.confirmPassword).clear();
        cy.get(textBoxes.confirmPassword).type(managerTestingAccount.password);
        cy.get(buttons.signUp).click();
        cy.get(randomSelectors.messageAlert).should('exist');
        cy.get(randomSelectors.messageAlert).should('contain', alertMessages.signUpFoundAccount);
    });
  });
  