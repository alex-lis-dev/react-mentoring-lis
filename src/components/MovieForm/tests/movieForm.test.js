import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MovieForm from "../MovieForm";
import {
  MovieForm_Genre,
  MovieForm_MovieUrl,
  MovieForm_Overview,
  MovieForm_Rating,
  MovieForm_ReleaseDate,
  MovieForm_Runtime,
  MovieForm_Title,
} from "../../../helpers/constants";

const dummyMovie = {
  title: "Inception",
  release_date: "2010-07-16",
  poster_path: "http://example.com/inception.jpg",
  vote_average: 8.8,
  runtime: 148,
  overview: "A thief who steals corporate secrets...",
  genres: ["Action", "Drama"],
};

describe("MovieForm Component", () => {
  it("renders with initial movie data", () => {
    render(<MovieForm initialMovie={dummyMovie} onSubmit={() => {}} />);

    expect(screen.getByLabelText(MovieForm_Title).value).toBe(dummyMovie.title);
    expect(screen.getByLabelText(MovieForm_ReleaseDate).value).toBe(
      dummyMovie.release_date
    );
    expect(screen.getByLabelText(MovieForm_MovieUrl).value).toBe(
      dummyMovie.poster_path
    );
    expect(parseFloat(screen.getByLabelText(MovieForm_Rating).value)).toBe(
      dummyMovie.vote_average
    );
    expect(screen.getByLabelText(MovieForm_Overview).value).toBe(
      dummyMovie.overview
    );
    expect(parseInt(screen.getByLabelText(MovieForm_Runtime).value)).toBe(
      dummyMovie.runtime
    );
    expect(screen.getByLabelText(MovieForm_Genre).value).toBe(
      dummyMovie.genres.join(", ")
    );
  });

  it("submits correct data", () => {
    const mockOnSubmit = jest.fn();
    render(<MovieForm initialMovie={dummyMovie} onSubmit={mockOnSubmit} />);

    fireEvent.submit(screen.getByRole("form"));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: dummyMovie.title,
      releaseDate: dummyMovie.release_date,
      movieUrl: dummyMovie.poster_path,
      rating: dummyMovie.vote_average,
      genres: dummyMovie.genres.join(", "),
      runtime: dummyMovie.runtime,
      overview: dummyMovie.overview,
    });
  });

  it("handles input changes", () => {
    render(<MovieForm initialMovie={dummyMovie} onSubmit={() => {}} />);

    fireEvent.change(screen.getByLabelText(MovieForm_Title), {
      target: { value: "New Title" },
    });
    expect(screen.getByLabelText(MovieForm_Title).value).toBe("New Title");

    fireEvent.change(screen.getByLabelText(MovieForm_Rating), {
      target: { value: 9.5 },
    });
    expect(parseFloat(screen.getByLabelText(MovieForm_Rating).value)).toBe(9.5);
  });
});
