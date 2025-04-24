describe('Keyboard Shortcut Navigation (Page Cycling)', () => {
  const email = Cypress.env('TEST_EMAIL');
  const password = Cypress.env('TEST_PASSWORD');

  const logCurrentPath = () => {
    cy.location('pathname').then((path) => {
      cy.log(`Current Path: ${path}`);
      console.log(`Current Path: ${path}`); // Console log as well
    });
  };

  before(() => {
    // Login
    cy.visit('http://localhost:3000/Login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password, { log: false });
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('cycles forward through pages with ctrl + right arrow 4 times', () => {
    for (let i = 0; i < 4; i++) {
      cy.wait(500); // Give time between key presses
      cy.get('body').type('{ctrl}{rightarrow}');
      cy.wait(500); // Wait a little for the page to update
      logCurrentPath();
    }
  });

  it('cycles backward through pages with ctrl + left arrow 4 times', () => {
    cy.visit('http://localhost:3000/Community'); // Start at last page
    for (let i = 0; i < 4; i++) {
      cy.wait(500); // Wait between key presses
      cy.get('body').type('{ctrl}{leftarrow}');
      cy.wait(500); // Wait a little for the page to update
      logCurrentPath();
    }
  });
});
