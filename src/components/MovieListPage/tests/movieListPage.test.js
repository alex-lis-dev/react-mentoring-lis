
import React
 from 'react'; import { render, fireEvent, waitFor } from '@testing-library/react';
import MovieListPage from '../MovieListPage';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test('aborts fetching movies when inputs change rapidly', async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: [] })); // Simulate initial load response
  fetch.mockResponseOnce(JSON.stringify({ data: [] })); // Response for first input change
  fetch.mockResponseOnce(JSON.stringify({ data: [] })); // Response for second input change

  const { getByTestId } = render(<MovieListPage />);
  const searchInput = getByTestId('search-input');

  // Initial load
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  // Rapidly change search query
  fireEvent.change(searchInput, { target: { value: 'Action' } });
  fireEvent.change(searchInput, { target: { value: 'Drama' } });

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch.mock.calls[1][1].signal.aborted).toBe(true);
  });
});