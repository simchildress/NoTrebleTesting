describe('Keyboard Shortcut Navigation', () => {
  const homepage = 'http://localhost:3000/';
  const lessonsPage = 'http://localhost:3000/Lessons';
  const sheetMusicPage = 'http://localhost:3000/SheetMusicTools';
  const communityPage = 'http://localhost:3000/Community';

  beforeEach(() => {
    cy.visit(homepage);
  });

  it('navigates to Home with ctrl + up arrow', () => {
    cy.get('body').type('{ctrl}{uparrow}');
    cy.url().should('eq', homepage);
  });

  it('navigates to Lessons with ctrl + down arrow', () => {
    cy.get('body').type('{ctrl}{downarrow}');
    cy.url().should('eq', lessonsPage);
  });

  it('navigates to Sheet Music Tools with ctrl + left arrow', () => {
    cy.get('body').type('{ctrl}{leftarrow}');
    cy.url().should('eq', sheetMusicPage);
  });

  it('navigates to Community with ctrl + right arrow', () => {
    cy.get('body').type('{ctrl}{rightarrow}');
    cy.url().should('eq', communityPage);
  });
});
