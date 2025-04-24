describe('Keyboard Shortcut Navigation (Page Cycling)', () => {
  const homepage = '/';
  const lessonsPath = '/Lessons';
  const quickReferencePath = '/QuickReference'; // include this if needed
  const sheetMusicPath = '/SheetMusicTools';
  const communityPath = '/Community';

  const pages = [lessonsPath, quickReferencePath, sheetMusicPath, communityPath, homepage];

  before(() => {
    // Prewarm pages twice
    pages.forEach((page) => {
      cy.visit(`http://localhost:3000${page}`);
    });
    pages.forEach((page) => {
      cy.visit(`http://localhost:3000${page}`);
    });
    cy.visit('http://localhost:3000/'); // Return home
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('cycles through all pages forward with ctrl + right arrow', () => {
    pages.forEach((expectedPath) => {
      cy.get('body').type('{ctrl}{rightarrow}');
      cy.location('pathname', { timeout: 10000 }).should('eq', expectedPath);
    });
  });

  it('cycles through all pages backward with ctrl + left arrow', () => {
    // Start at home first
    cy.visit('http://localhost:3000/');

    pages.slice().reverse().forEach((expectedPath) => {
      cy.get('body').type('{ctrl}{leftarrow}');
      cy.location('pathname', { timeout: 10000 }).should('eq', expectedPath);
    });
  });
});
