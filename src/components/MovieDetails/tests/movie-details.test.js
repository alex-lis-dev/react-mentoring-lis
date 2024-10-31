import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import MovieDetails from "../MovieDetails";
import * as router from "react-router";
import * as services from "../../../services";

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
  // Setting up mocks
  const useParams = jest.spyOn(router, "useParams");
  const useNavigate = jest.spyOn(router, "useNavigate");
  const useLocation = jest.spyOn(router, "useLocation");
  const getMovieMock = jest.spyOn(services, "getMovie");

  beforeEach(() => {
    useParams.mockReturnValue({ movieId: "123" });
    useNavigate.mockReturnValue(jest.fn());
    useLocation.mockReturnValue({ search: "?query=test" });
    getMovieMock.mockResolvedValue(mockMovie);
  });

  it("renders the loading state initially", () => {
    render(<MovieDetails />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders movie details after fetching the data", async () => {
    render(<MovieDetails />);

    await waitFor(() => {
      expect(
        screen.getByText(mockMovie.vote_average.toString())
      ).toBeInTheDocument();
      expect(screen.getByAltText(`${mockMovie.title}`)).toBeInTheDocument();
      expect(screen.getByText(`${mockMovie.runtime}`)).toBeInTheDocument();
      expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    });
  });

  it("navigates back to search on button click", async () => {
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);

    render(<MovieDetails />);
    const searchButton = await waitFor(() => screen.getByText("Search"));
    searchButton.click();

    expect(navigateMock).toHaveBeenCalledWith("/?query=test");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
