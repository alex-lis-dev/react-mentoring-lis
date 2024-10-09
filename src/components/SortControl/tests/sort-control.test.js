import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortControl from '../SortControl';

describe('SortControl Component', () => {
  const mockOnSortChange = jest.fn();
  const props = {
    currentSelection: 'title',
    onSortChange: mockOnSortChange
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial selection', () => {
    render(<SortControl {...props} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement.value).toBe('title');
  });

  it('calls onSortChange when selection is changed', async () => {
    render(<SortControl {...props} />);
    const selectElement = screen.getByRole('combobox');
    await userEvent.selectOptions(selectElement, 'releaseDate');
    expect(mockOnSortChange).toHaveBeenCalledWith('releaseDate');
    await userEvent.selectOptions(selectElement, 'title');
    expect(mockOnSortChange).toHaveBeenCalledWith('title');
  });
});