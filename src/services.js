export const getMovies = async (sortBy, searchQuery, genre, signal) => {
  const url = `http://localhost:4000/movies?filter=${genre}&searchBy=title&search=${searchQuery}&sortBy=${sortBy}&sortOrder=desc&limit=5000`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }
  return await response.json();
};

export const getMovie = async (id) => {
  const url = `http://localhost:4000/movies/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }
  return await response.json();
};
