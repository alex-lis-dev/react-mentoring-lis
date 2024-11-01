import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { enableFetchMocks } from "jest-fetch-mock";
import { SortByText, TitleText } from "../../../helpers/constants";
import sortOptions from "../../../helpers/sortOptions";

enableFetchMocks();

beforeEach(() => {
  cleanup();
  fetch.resetMocks();
});

const mockMovies = [
  { id: 1, title: "Movie A", genres: ["Action"], rating: 8 },
  { id: 2, title: "Movie B", genres: ["Comedy", "Adventure"], rating: 5 },
];

fetch.mockResponseOnce(JSON.stringify({ data: mockMovies }));

function setup(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Layout />
    </MemoryRouter>
  );
}

test("fetches movies on initial load", async () => {
  setup("/?genre=All&sortBy=title");

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("sortBy=title"),
    expect.anything()
  );
});

test("changes movies based on genre selection", async () => {
  const { getByText } = setup();

  fireEvent.click(getByText("COMEDY"));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("filter=Comedy"),
      expect.anything()
    );
  });
});

test("changes movies based on sort option", async () => {
  const { getByLabelText, getByText } = setup();

  const sortSelect = getByLabelText(SortByText);
  fireEvent.change(sortSelect, { target: { value: sortOptions[1] } });

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("sortBy=title"),
      expect.anything()
    );
  });
  expect(getByText(TitleText).parentNode.value).toBe("title");
});

test("updates movie list when navigation occurs", async () => {
  const { getByText } = setup("/?sortBy=release_date");

  fireEvent.click(getByText("ACTION"));

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("filter=Action"),
    expect.anything()
  );
});

test("aborts pending fetches when new fetch is initiated", async () => {
  const { getByText } = setup();

  fireEvent.click(getByText("HORROR"));
  fireEvent.click(getByText("COMEDY"));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch.mock.calls[1][1].signal.aborted).toBe(true);
  });
});
