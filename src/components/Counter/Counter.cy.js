import React from 'react'
import Counter from './Counter'

describe('<Counter />', () => {
  beforeEach(() => {
    cy.mount(<Counter initialValue={10} />);
  });

  it('renders initial value', () => {
    cy.get('[data-cy="counter-value"]').should('contain', '10');
  });

  it('decrements the displayed value', () => {
    cy.get('[data-cy="decrement-button"]').click();
    cy.get('[data-cy="counter-value"]').should('contain', '9');
  });

  it('increments the displayed value', () => {
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="counter-value"]').should('contain', '11');
  });
})