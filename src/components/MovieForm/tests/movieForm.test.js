import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MovieForm from "../MovieForm";
import {
  MovieForm_Genre_Placeholder,
  MovieForm_MovieUrl_Placeholder,
  MovieForm_Overview_Placeholder,
  MovieForm_Rating_Placeholder,
  MovieForm_ReleaseDate_Placeholder,
  MovieForm_Runtime_Placeholder,
  MovieForm_Title_Placeholder,
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

    expect(screen.getByPlaceholderText(MovieForm_Title_Placeholder).value).toBe(
      dummyMovie.title
    );
    expect(
      screen.getByPlaceholderText(MovieForm_ReleaseDate_Placeholder).value
    ).toBe(dummyMovie.release_date);
    expect(
      screen.getByPlaceholderText(MovieForm_MovieUrl_Placeholder).value
    ).toBe(dummyMovie.poster_path);
    expect(
      parseFloat(
        screen.getByPlaceholderText(MovieForm_Rating_Placeholder).value
      )
    ).toBe(dummyMovie.vote_average);
    expect(
      screen.getByPlaceholderText(MovieForm_Overview_Placeholder).value
    ).toBe(dummyMovie.overview);
    expect(
      parseInt(screen.getByPlaceholderText(MovieForm_Runtime_Placeholder).value)
    ).toBe(dummyMovie.runtime);
    expect(screen.getByPlaceholderText(MovieForm_Genre_Placeholder).value).toBe(
      dummyMovie.genres.join(", ")
    );
  });
    it("handles input changes", () => {
    render(<MovieForm initialMovie={dummyMovie} onSubmit={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText(MovieForm_Title_Placeholder), {
      target: { value: "New Title" },
    });
    expect(screen.getByPlaceholderText(MovieForm_Title_Placeholder).value).toBe(
      "New Title"
    );

    fireEvent.change(
      screen.getByPlaceholderText(MovieForm_Rating_Placeholder),
      {
        target: { value: "9.5" },
      }
    );
    expect(
      parseFloat(
        screen.getByPlaceholderText(MovieForm_Rating_Placeholder).value
      )
    ).toBe(9.5);
  });
});
