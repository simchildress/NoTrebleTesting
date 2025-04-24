describe('Keyboard Shortcut Navigation (Page Cycling)', () => {
  const email = Cypress.env('TEST_EMAIL');
  const password = Cypress.env('TEST_PASSWORD');

  const waitForPathChange = (previousPath, timeout = 10000) => {
    const start = Date.now();
    const check = () => {
      cy.location('pathname').then((newPath) => {
        if (newPath !== previousPath) {
          cy.log(`✅ Navigated to: ${newPath}`);
        } else if (Date.now() - start > timeout) {
          throw new Error(`❌ Timeout: Path did not change from ${previousPath}`);
        } else {
          cy.wait(200).then(check); // Retry after 200ms
        }
      });
    };
    check();
  };

  before(() => {
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
      cy.location('pathname').then((previousPath) => {
        cy.get('body').type('{ctrl}{rightarrow}');
        waitForPathChange(previousPath);
      });
    }
  });

  it('cycles backward through pages with ctrl + left arrow 4 times', () => {
    cy.visit('http://localhost:3000/Community'); // Start at the last page

    for (let i = 0; i < 4; i++) {
      cy.location('pathname').then((previousPath) => {
        cy.get('body').type('{ctrl}{leftarrow}');
        waitForPathChange(previousPath);
      });
    }
  });
});
