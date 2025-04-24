describe('Keyboard Shortcut Navigation (Page Cycling)', () => {
  const pages = [
    '/',                // Home
    '/QuickReference',  // Quick Reference
    '/SheetMusicTools', // Sheet Music Tools
    '/Community',       // Community
    '/Lessons'          // Lessons
  ];

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('cycles through all pages forward with ctrl + right arrow', () => {
    pages.slice(1).forEach((page) => {
      cy.realPress(['Control', 'ArrowRight']);                // Press ctrl + →
      cy.location('pathname', { timeout: 10000 }).should('eq', page);
    });

    // Check that after Lessons it loops back to Home
    cy.realPress(['Control', 'ArrowRight']);
    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
  });

  it('cycles through all pages backward with ctrl + left arrow', () => {
    // First, cycle forward to the last page so we can test going backward
    pages.slice(1).forEach(() => {
      cy.realPress(['Control', 'ArrowRight']);
    });

    // Now go backward through the pages
    [...pages].reverse().slice(1).forEach((page) => {
      cy.realPress(['Control', 'ArrowLeft']);                 // Press ctrl + ←
      cy.location('pathname', { timeout: 10000 }).should('eq', page);
    });

    // Check that after Home it loops back to Lessons
    cy.realPress(['Control', 'ArrowLeft']);
    cy.location('pathname', { timeout: 10000 }).should('eq', '/Lessons');
  });
});
