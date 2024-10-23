import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenreSelector from '../GenreSelector';

describe('Genre selector component', () => {
  const genres = ['All', 'Romance','Action', 'Horror'];  
  const selectedGenre = 'Romance';
  const mockOnSelect = jest.fn();

  it('renders all genres passed in props', () => {
    render(<GenreSelector genres={genres} onSelect={mockOnSelect} />);
    genres.forEach(genre => {
      expect(screen.getByText(genre.toUpperCase())).toBeInTheDocument();
    });
  });

  it('highlights the selected genre', () => {
    render(<GenreSelector genres={genres} selectedGenre={selectedGenre} onSelect={mockOnSelect} />);
    const dramaButton = screen.getByText(selectedGenre.toUpperCase());
    expect(dramaButton).toHaveClass('active');
  });

  it('calls onSelect with genre when a genre button is clicked', () => {
    render(<GenreSelector genres={genres} onSelect={mockOnSelect} />);
    const actionButton = screen.getByText('ACTION');
    fireEvent.click(actionButton);
    expect(mockOnSelect).toHaveBeenCalledWith('Action');
  });

  it('changes active class on click', () => {
    render(<GenreSelector genres={genres} onSelect={mockOnSelect} />);
    const actionButton = screen.getByText('ACTION');
    const comedyButton = screen.getByText('ROMANCE');
    fireEvent.click(actionButton);
    expect(actionButton).toHaveClass('active');
    expect(comedyButton).not.toHaveClass('active');
    fireEvent.click(comedyButton);
    expect(actionButton).not.toHaveClass('active');
    expect(comedyButton).toHaveClass('active');
  });
});