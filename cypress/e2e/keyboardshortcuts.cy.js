describe('Keyboard Shortcut Navigation (Page Cycling)', () => {
  const email = Cypress.env('TEST_EMAIL');
  const password = Cypress.env('TEST_PASSWORD');

  before(() => {
    // LOGIN FIRST
    cy.visit('http://localhost:3000/Login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password, { log: false });
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('cycles forward through pages with ctrl + right arrow', () => {
    for (let i = 0; i < 4; i++) {
      cy.location('pathname').then((initialPath) => {
        cy.get('body').type('{ctrl}{rightarrow}');
        cy.wait(500); // Let the page change
        cy.location('pathname', { timeout: 10000 }).should((newPath) => {
          expect(newPath).to.not.equal(initialPath);
          cy.log(`->  Navigated to: ${newPath}`);
          console.log(`->  Navigated to: ${newPath}`); // This shows in the terminal output
        });
      });
    }
  });

  it('cycles backward through pages with ctrl + left arrow', () => {
    cy.visit('http://localhost:3000/Community'); // Start at last page

    for (let i = 0; i < 4; i++) {
      cy.location('pathname').then((initialPath) => {
        cy.get('body').type('{ctrl}{leftarrow}');
        cy.wait(500); // Let the page change
        cy.location('pathname', { timeout: 10000 }).should((newPath) => {
          expect(newPath).to.not.equal(initialPath);
          cy.log(`<- Navigated to: ${newPath}`);
          console.log(`<- Navigated to: ${newPath}`); // Also logs to terminal
        });
      });
    }
  });
});
