import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../Counter';

describe('Counter Component', () => {
  it('renders initial value', () => {
    const initialValue = 10;
    render(<Counter initialValue={initialValue} />);
    const valueDisplay = screen.getByText(initialValue.toString());
    expect(valueDisplay).toBeInTheDocument();
  });

  it('decrements the value on button click', () => {
    const initialValue = 10;
    render(<Counter initialValue={initialValue} />);
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);
    const valueDisplay = screen.getByText((initialValue - 1).toString());
    expect(valueDisplay).toBeInTheDocument();
  });

  it('increment the value on button click', () => {
    const initialValue = 10;
    render(<Counter initialValue={initialValue} />);
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    const valueDisplay = screen.getByText((initialValue + 1).toString());
    expect(valueDisplay).toBeInTheDocument();
  });
});