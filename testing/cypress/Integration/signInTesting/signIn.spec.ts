import {randomSelectors} from "../commonSelectors";
import {alertMessages, baseUrl, pagePreparation, userTestingAccount} from "../commonTestingData";
import {buttonsSignIn, links, textBoxEmptyErrors, textBoxesSignIn} from "./signInSelectors";
import {pageTitle} from "./signInData";
import { renewAccount } from "../commonActions";

describe("Log In", () => {
  before(() => {
    renewAccount(userTestingAccount, "")
  });
  
  beforeEach(() => {
    cy.visit(pagePreparation.mainPages.login);
  });

  it("should assert tested page is correct", () => {
    cy.get(randomSelectors.pageTitle).should('contain', pageTitle);
  });

  it("should assert links in buttonsSignIn are correct", () => {
    cy.get(links.resetPassword).click();
    cy.url().should('equal', pagePreparation.mainPages.resetPassword)
    cy.go('back');
    cy.get(links.signUp).click();
    cy.url().should('equal', pagePreparation.mainPages.signUp);
  });

  it("should sign in happy path", () => {
    cy.get(textBoxesSignIn.email).type(userTestingAccount.email);
    cy.get(textBoxesSignIn.password).type(userTestingAccount.password);
    cy.get(buttonsSignIn.rememberMeSwitch).should('not.be.checked');
    cy.get(buttonsSignIn.rememberMeSwitch).click();
    cy.get(buttonsSignIn.rememberMeSwitch).should('be.checked');
    cy.get(buttonsSignIn.login).click();
    cy.url().should('equal', `${baseUrl}/`);
  });

  it("should sign in sad path", () => {
    cy.get(buttonsSignIn.login).click();
    cy.get(textBoxEmptyErrors.email).should('exist');
    cy.get(textBoxesSignIn.email).type(userTestingAccount.email);
    cy.get(buttonsSignIn.login).click();
    cy.get(textBoxEmptyErrors.password).should('exist');
    cy.get(textBoxesSignIn.password).type(`${userTestingAccount.password}wrongPassword`);
    cy.get(buttonsSignIn.rememberMeSwitch).should('not.be.checked');
    cy.get(buttonsSignIn.rememberMeSwitch).click();
    cy.get(buttonsSignIn.rememberMeSwitch).should('be.checked');
    cy.get(buttonsSignIn.login).click();
    cy.get(randomSelectors.messageAlert).should('contain', alertMessages.signInWrongPassword);
  });
});
