import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieTile from "../MovieTile";

describe("MovieTile Component", () => {
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

  it("renders the image, name, release year, and genres", () => {
    render(<MovieTile {...defaultProps} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", defaultProps.movie.poster_path);
    expect(image).toHaveAttribute("alt", defaultProps.movie.title);

    expect(screen.getByText(defaultProps.movie.title)).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.movie.genres.join(", "))
    ).toBeInTheDocument();
  });

  it("calls onClick when the tile is clicked", () => {
    render(<MovieTile {...defaultProps} />);
    fireEvent.click(screen.getByText(defaultProps.movie.title).parentNode);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
