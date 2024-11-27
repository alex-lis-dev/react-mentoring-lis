import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from "../Search";
import { SearchForm_Button_Search } from '../../../helpers/constants';

describe('Search Component', () => {
  it('renders initial value', () => {
    const initialValue = "Initial query";
    render(<Search initialQuery={initialValue} onSearch={() => {}} />);
    const input = screen.getByTestId('search-input');
    expect(input.value).toBe(initialValue);
  });

  it('calls onSearch with new query on form submit', () => {
    const initialValue = "Initial query";
    const newQuery = "New query";
    const mockOnSearch = jest.fn();
    render(<Search initialQuery={initialValue} onSearch={mockOnSearch} />);
    
    const input = screen.getByTestId('search-input');
    const button = screen.getByText(SearchForm_Button_Search);

    fireEvent.change(input, { target: { value: newQuery } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith(newQuery);
  });

  it('calls onSearch with new query when pressing Enter', () => {
    const initialValue = "Initial query";
    const newQuery = "New query";
    const mockOnSearch = jest.fn();
    render(<Search initialQuery={initialValue} onSearch={mockOnSearch} />);
    
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: newQuery } });
    fireEvent.submit(input);

    expect(mockOnSearch).toHaveBeenCalledWith(newQuery);
  });
});