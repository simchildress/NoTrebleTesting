describe('Keyboard Shortcut Navigation', () => {
  const homepage = 'http://localhost:3000/';
  const lessonsPage = 'http://localhost:3000/Lessons';
  const sheetMusicPage = 'http://localhost:3000/SheetMusicTools';
  const communityPage = 'http://localhost:3000/Community';

  beforeEach(() => {
    cy.visit(homepage);
  });

  it('navigates to Lessons with ctrl + down arrow', () => {
    const keys = '{ctrl}{downarrow}';
    console.log(`Pressing keys: ${keys}`);
    cy.get('body').type(keys);
    cy.url().should('eq', lessonsPage);
  });

  it('navigates to Sheet Music Tools with ctrl + left arrow', () => {
    const keys = '{ctrl}{leftarrow}';
    console.log(`Pressing keys: ${keys}`);
    cy.get('body').type(keys);
    cy.url().should('eq', sheetMusicPage);
  });

  it('navigates to Community with ctrl + right arrow', () => {
    const keys = '{ctrl}{rightarrow}';
    console.log(`Pressing keys: ${keys}`);
    cy.get('body').type(keys);
    cy.url().should('eq', communityPage);
  });

  it('navigates back to Home with ctrl + up arrow', () => {
    const keys = '{ctrl}{uparrow}';
    console.log(`Pressing keys: ${keys}`);
    cy.get('body').type(keys);
    cy.url().should('eq', homepage);
  });
});
