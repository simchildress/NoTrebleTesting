describe('Keyboard Shortcut Navigation (Page Cycling)', () => {
  const homepage = '/';
  const lessonsPath = '/Lessons';
  const sheetMusicPath = '/SheetMusicTools';
  const communityPath = '/Community';

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
    [homepage, lessonsPath, sheetMusicPath, communityPath].forEach((page) => {
      cy.visit(`http://localhost:3000${page}`);
    });
    [homepage, lessonsPath, sheetMusicPath, communityPath].forEach((page) => {
      cy.visit(`http://localhost:3000${page}`);
    });
    cy.visit('http://localhost:3000/'); // Return home after prewarming
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('cycles forward 4 times to Community with ctrl + right arrow', () => {
    const forwardPresses = [
      lessonsPath,
      sheetMusicPath,
      communityPath,
      homepage // assuming it cycles back to home after community
    ];

    forwardPresses.forEach((expectedPath) => {
      cy.get('body').type('{ctrl}{rightarrow}');
      cy.location('pathname', { timeout: 10000 }).should('eq', expectedPath);
    });
  });

  it('cycles backward 4 times back to Home with ctrl + left arrow', () => {
    cy.visit('http://localhost:3000/Community'); // Start at Community

    const backwardPresses = [
      sheetMusicPath,
      lessonsPath,
      homepage,
      communityPath // assuming cycling continues backward to community again
    ];

    backwardPresses.forEach((expectedPath) => {
      cy.get('body').type('{ctrl}{leftarrow}');
      cy.location('pathname', { timeout: 10000 }).should('eq', expectedPath);
    });
  });
});
