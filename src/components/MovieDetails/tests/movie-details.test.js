import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDetails from "../MovieDetails";

describe("MovieDetails Component", () => {
  const mockMovie = {
    poster_path: "http://example.com/poster.jpg",
    title: "Interstellar",
    release_date: "2014-11-05",
    vote_average: 8.6,
    runtime: 169,
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  };

  const mockHandleSearchIconClick = jest.fn();

  it("renders correctly when movie prop is provided", () => {
    render(
      <MovieDetails
        movie={mockMovie}
        handleSearchIconClick={mockHandleSearchIconClick}
      />
    );

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      mockMovie.poster_path
    );
    expect(screen.getByRole("img")).toHaveAttribute("alt", mockMovie.title);
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(mockMovie.release_date).getFullYear().toString()
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockMovie.vote_average.toString())
    ).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.runtime}`)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
  });

  it("calls handleSearchIconClick when the search button is clicked", () => {
    render(
      <MovieDetails
        movie={mockMovie}
        handleSearchIconClick={mockHandleSearchIconClick}
      />
    );
    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);
    expect(mockHandleSearchIconClick).toHaveBeenCalledTimes(1);
  });  
});
