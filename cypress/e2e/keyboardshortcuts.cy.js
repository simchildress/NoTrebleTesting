describe('Keyboard Shortcut Navigation', () => {
  const homepage = 'http://localhost:3000/';
  const lessonsPath = '/Lessons';
  const sheetMusicPath = '/SheetMusicTools';
  const communityPath = '/Community';

  // Pre-warm (cache) the pages twice before the tests run
  before(() => {
    const pages = [homepage, lessonsPath, sheetMusicPath, communityPath];
    pages.forEach((page) => {
      cy.visit(page);
    });
    pages.forEach((page) => {
      cy.visit(page);
    });
    cy.visit(homepage); // Return to home after pre-warming
  });

  beforeEach(() => {
    cy.visit(homepage);
  });

  it('navigates to Lessons with ctrl + down arrow', () => {
    const keys = '{ctrl}{downarrow}';
    console.log(`Pressing keys: ${keys}`);
    cy.get('body').type(keys);
    cy.location('pathname', { timeout: 10000 }).should('eq', lessonsPath);
  });

  it('navigates to Sheet Music Tools with ctrl + left arrow', () => {
    const keys = '{ctrl}{leftarrow}';
    console.log(`Pressing keys: ${keys}`);
    cy.get('body').type(keys);
    cy.location('pathname', { timeout: 10000 }).should('eq', sheetMusicPath);
  });

  it('navigates to Community with ctrl + right arrow', () => {
    const keys = '{ctrl}{rightarrow}';
    console.log(`Pressing keys: ${keys}`);
    cy.get('body').type(keys);
    cy.location('pathname', { timeout: 10000 }).should('eq', communityPath);
  });

  it('navigates back to Home with ctrl + up arrow', () => {
    const keys = '{ctrl}{uparrow}';
    console.log(`Pressing keys: ${keys}`);
    cy.get('body').type(keys);
    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
  });
});
