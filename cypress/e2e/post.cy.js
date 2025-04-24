describe('Full User Flow: Login → Create/Delete Post → Logout', () => {
    const email = Cypress.env('TEST_EMAIL');
    const password = Cypress.env('TEST_PASSWORD');
    const postContent = 'Automated test post - should be deleted after creation';
  
    it('logs in, creates and deletes a post, then logs out successfully', () => {
      // LOGIN
      cy.visit('http://localhost:3000/Login');
      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password, { log: false });
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'http://localhost:3000/');
  
      // POST CREATION
      cy.visit('http://localhost:3000/Community');
  
      // Check if modal is open - Close it if so - Confirm it's gone
      cy.get('body').then(($body) => {
        if (
          $body.find('button').filter((i, el) => el.innerText.trim() === 'Cancel').length > 0
        ) {
          cy.contains('button', 'Cancel').click();
          cy.get('div[class*="w-3/4"]').should('not.exist'); // Confirm modal is gone
        }
      });
  
      // Now open the modal safely
      cy.contains('button', 'Create New Post').click();
  
      // Fill out the post form
      cy.get('input[placeholder="Post Title"]').type('Test Post Title');
      cy.get('textarea[placeholder="Share your query with the NoTreble Community..."]').type(postContent);
      cy.get('button').contains('Post').click();
      cy.contains(postContent).should('exist');
  
      // POST DELETION
      cy.contains(postContent)
        .parents('div.relative.bg-white.p-4.my-4.rounded-lg.shadow-md')
        .find('button')
        .contains('⋮')
        .click();
      cy.contains('button', 'Delete').click();
      cy.contains(postContent).should('not.exist');
  
      // LOGOUT
      cy.visit('http://localhost:3000/Profile');
      cy.contains('button', 'Logout').click();
      cy.url().should('eq', 'http://localhost:3000/Login');
    });
  });
  