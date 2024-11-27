export const getMovies = async (sortBy, searchQuery, genre, signal) => {
  const url = `http://localhost:4000/movies?filter=${genre}&searchBy=title&search=${searchQuery}&sortBy=${sortBy}&sortOrder=desc&limit=25`;

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

export const createMovie = async (movie) => {
  const response = await fetch(`http://localhost:4000/movies`, {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }
  return await response.json();
};

export const updateMovie = async (movie) => {
  const response = await fetch(`http://localhost:4000/movies`, {
    method: "PUT",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }
  return await response.json();
};
