describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the logo', () => {
    cy.get('[data-cy=logo]').should('exist');
  });
});
