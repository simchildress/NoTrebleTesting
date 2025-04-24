describe('Keyboard Shortcut Navigation (Page Cycling)', () => {
  const homepage = '/';
  const lessonsPath = '/Lessons';
  const quickReferencePath = '/QuickReference';
  const sheetMusicPath = '/SheetMusicTools';
  const communityPath = '/Community';

  const pages = [lessonsPath, quickReferencePath, sheetMusicPath, communityPath, homepage];

  const email = Cypress.env('TEST_EMAIL');
  const password = Cypress.env('TEST_PASSWORD');

  before(() => {
    // LOGIN FIRST
    cy.visit('http://localhost:3000/Login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password, { log: false });
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/');

    // Prewarm pages twice
    pages.forEach((page) => {
      cy.visit(`http://localhost:3000${page}`);
    });
    pages.forEach((page) => {
      cy.visit(`http://localhost:3000${page}`);
    });
    cy.visit('http://localhost:3000/'); // Return home after prewarming
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('cycles forward through all pages with ctrl + right arrow', () => {
    pages.forEach((expectedPath) => {
      cy.get('body').type('{ctrl}{rightarrow}');
      cy.location('pathname', { timeout: 10000 }).should('eq', expectedPath);
    });
  });

  it('cycles backward through all pages with ctrl + left arrow', () => {
    // Start at Community page to cycle backward
    cy.visit('http://localhost:3000/Community');

    const reversedPages = [sheetMusicPath, quickReferencePath, lessonsPath, homepage, communityPath];
    reversedPages.forEach((expectedPath) => {
      cy.get('body').type('{ctrl}{leftarrow}');
      cy.location('pathname', { timeout: 10000 }).should('eq', expectedPath);
    });
  });
});
