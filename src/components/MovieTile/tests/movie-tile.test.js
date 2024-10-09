import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieTile from '../MovieTile'; // Adjust the import path as necessary

describe('MovieTile Component', () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    imageUrl: 'http://example.com/image.jpg',
    name: 'Vertigo',
    releaseYear: '2010',
    genres: ['Action', 'Comedy'],
    onClick: mockOnClick
  };

  it('renders the image, name, release year, and genres', () => {
    render(<MovieTile {...defaultProps} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', defaultProps.imageUrl);
    expect(image).toHaveAttribute('alt', defaultProps.name);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.releaseYear)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.genres.join(', '))).toBeInTheDocument();
  });

  it('calls onClick when the tile is clicked', () => {
    render(<MovieTile {...defaultProps} />);    
    fireEvent.click(screen.getByText(defaultProps.name).parentNode);    
    expect(mockOnClick).toHaveBeenCalled();
  });
});