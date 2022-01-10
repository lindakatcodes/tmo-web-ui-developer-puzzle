describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  // reading list should be cleared for test to work properly
  it('When: I remove a book from my reading list, I can undo that action', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]:last').find('button').click();

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="remove-item-button"]:last')
      .should('be.visible')
      .click();

    cy.get('snack-bar-container').should('be.visible');
    cy.get('[data-testing="reading-list-container"]').should(
      'not.include.text',
      'JavaScript and JQuery'
    );
    cy.get('snack-bar-container').find('button').click();
    cy.get('[data-testing="reading-list-container"]').should(
      'include.text',
      'JavaScript and JQuery'
    );
  });
});
