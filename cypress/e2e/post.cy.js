describe('Post Creation and Deletion', () => {
  const email = Cypress.env('TEST_EMAIL');
  const password = Cypress.env('TEST_PASSWORD');
  const postContent = 'Automated test post - should be deleted after creation';

  beforeEach(() => {
    // Login first using your test user from GitHub Secrets
    cy.visit('http://localhost:3001/Login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password, { log: false });
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3001/');
  });

  it('creates and deletes a post successfully', () => {
    cy.visit('http://localhost:3001/Community');

    // Open the Create New Post modal
    cy.contains('button', 'Create New Post').click();

    // Fill out the post creation form (confirmed placeholders)
    cy.get('input[placeholder="Post Title"]').type('Test Post Title');
    cy.get('textarea[placeholder="Share your query with the NoTreble Community..."]').type(postContent);
    cy.get('button').contains('Post').click();

    // Confirm the post appears
    cy.contains(postContent).should('exist');

    // Navigate to the post container and open the ⋮ menu (confirmed structure)
    cy.contains(postContent)
      .parents('div.relative.bg-white.p-4.my-4.rounded-lg.shadow-md')
      .find('button')
      .contains('⋮')
      .click();

    // Delete the post (confirmed delete button text)
    cy.contains('button', 'Delete').click();

    // Confirm the post is gone
    cy.contains(postContent).should('not.exist');
  });
});
