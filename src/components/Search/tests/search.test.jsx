import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from "../Search"

describe('Search Component', () => {
  it('renders initial value', () => {
    const initialValue = "Initial query";
    render(<Search initialQuery={initialValue} onSearch={() => {}} />);
    const input = screen.getByDisplayValue(initialValue);
    expect(input.value).toBe(initialValue);
  });

  it('calls onChange event on form submit', () => {
    const initialValue = "Initial query";
    const newQuery = "New query";
    const mockOnChangeEvent = jest.fn();
    render(<Search initialQuery={initialValue} onSearch={mockOnChangeEvent} />);
    const input = screen.getByDisplayValue(initialValue);
    fireEvent.change(input, { target: { value: newQuery } });
    fireEvent.click(screen.getByText('Search'));
    expect(mockOnChangeEvent).toHaveBeenCalledWith(newQuery);
  });

  it('calls onChange event on Enter key', () => {
    const initialValue = "Initial query";
    const newQuery = "New query";
    const mockOnChangeEvent = jest.fn();
    render(<Search initialQuery={initialValue} onSearch={mockOnChangeEvent} />);
    const input = screen.getByDisplayValue(initialValue);
    fireEvent.change(input, { target: { value: newQuery } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockOnChangeEvent).toHaveBeenCalledWith(newQuery);
  });
});