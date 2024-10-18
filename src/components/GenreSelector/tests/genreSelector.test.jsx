import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenreSelector from '../GenreSelector'

describe('Genre selector component', () => {
  const genres = ['ALL', 'ROMANCE', 'ACTION', "HORROR"];
  const selectedGenre = 'ROMANCE';
  const mockOnChangeEvent = jest.fn();

  it('renders all genres passed in props', () => {
    render(<GenreSelector genres={genres} selectedGenre={selectedGenre} onSelect={mockOnChangeEvent} />);
    genres.forEach(genre => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it('highlights the selected genre passed in props', () => {
    render(<GenreSelector genres={genres} selectedGenre={selectedGenre} onSelect={mockOnChangeEvent} />);
    const selectedButton = screen.getByText(selectedGenre);
    expect(selectedButton).toHaveStyle('border-bottom: 3px solid #F65261');
  });

  it('calls an event to change the button style on genre button click', () => {
    render(<GenreSelector genres={genres} selectedGenre={selectedGenre} onSelect={mockOnChangeEvent} />);
    const genreToSelect = screen.getByText('ACTION');
    fireEvent.click(genreToSelect);
    expect(mockOnChangeEvent).toHaveBeenCalledWith('ACTION');
  });
});