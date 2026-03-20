describe('ShopSmart Flow', () => {
  it('should display the app and allow creating, editing, and deleting products', () => {
    cy.visit('http://localhost:5173');
    
    cy.contains('ShopSmart').should('be.visible');

    cy.contains('button', 'Add Product').click();
    cy.get('input[name="name"]').type('Cypress Test Product');
    cy.get('input[name="price"]').type('49.99');
    cy.get('textarea[name="description"]').type('Created by Cypress');
    cy.contains('button', 'Save').click();

    cy.contains('Cypress Test Product').should('be.visible');
    
    cy.contains('.product-card', 'Cypress Test Product').within(() => {
        cy.contains('button', 'Edit').click();
    });
    
    cy.get('input[name="price"]').clear().type('59.99');
    cy.contains('button', 'Save').click();
    cy.contains('$59.99').should('be.visible');

    cy.on('window:confirm', () => true);
    cy.contains('.product-card', 'Cypress Test Product').within(() => {
        cy.contains('button', 'Delete').click();
    });
    
    cy.contains('Cypress Test Product').should('not.exist');
  });
});
