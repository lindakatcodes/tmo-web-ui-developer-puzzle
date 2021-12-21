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
  it('When: I mark a book as finished, I see the date I finished it', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]:last').find('button').click();

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item--details--buttons > .mat-primary')
      .should('be.visible')
      .click();
    cy.get('.reading-list-item--details > em').should('be.visible');

    cy.get('[data-testing="reading-list-container"]')
      .find('h2')
      .find('button')
      .click();
    cy.get('[data-testing="book-item"]:last')
      .find('button')
      .should('contain.text', 'Finished');
  });

  it('Then: if I select a book I already finished that was removed from the list, it does not so as finished', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="remove-item-button"]:last')
      .should('be.visible')
      .click();

    cy.get('[data-testing="reading-list-container"]')
      .find('h2')
      .find('button')
      .click();

    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();

    cy.get('[data-testing="book-item"]:last')
      .find('button')
      .should('contain.text', 'Want to Read')
      .click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-item--details--buttons > .mat-primary').should(
      'be.visible'
    );
    cy.get('.reading-list-item--details > em').should('not.exist');
  });
});
