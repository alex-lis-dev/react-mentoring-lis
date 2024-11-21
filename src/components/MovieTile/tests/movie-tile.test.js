import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MovieTile from "../MovieTile";
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockOnClick = jest.fn();
  const defaultProps = {
    movie: {
      id: 454,
      poster_path: "http://example.com/image.jpg",
      title: "Vertigo",
      release_date: "2021-07-20",
      vote_average: 9,
      runtime: 130,
      genres: ["Action", "Comedy"],
      overview: "Long description"
    },
    onClick: mockOnClick,
  };

describe('MovieTile Component', () => {

  it("renders the image, name, release year, and genres", () => {
    render(
      <Router>
        <MovieTile {...defaultProps} />
      </Router>
    );
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", defaultProps.movie.poster_path);
    expect(image).toHaveAttribute("alt", defaultProps.movie.title);

    expect(screen.getByText(defaultProps.movie.title)).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.movie.genres.join(", "))
    ).toBeInTheDocument();
  });

  it('opens edit dialog when edit is clicked', () => {
    render(
      <Router>
        <MovieTile {...defaultProps} />
      </Router>
    );

    const menuButton = screen.getByText("...");
    fireEvent.click(menuButton);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/${defaultProps.movie.id}/edit`);
  });

  it('toggles delete dialog when delete is clicked', () => {
    const { getByText } = render(
      <Router>
        <MovieTile {...defaultProps}/>
      </Router>
    );

    const menuButton = screen.getByText("...");
    fireEvent.click(menuButton);

    const deleteButton = getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
  });

  it('triggers onClick when the movie tile gets clicked', () => {
    render(
      <Router>
        <MovieTile {...defaultProps} />
      </Router>
    );

    fireEvent.click(screen.getByText(defaultProps.movie.title).parentNode);
    expect(mockOnClick).toHaveBeenCalled();
  });
});