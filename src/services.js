export const getMovies = async (sortBy, searchQuery, genre, signal) => {
  const url = `http://localhost:4000/movies?filter=${genre}&searchBy=title&search=${searchQuery}&sortBy=${sortBy}&sortOrder=desc&limit=5`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //"Cache-Control": "no-cache",
    },
    signal
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }
  return await response.json();
};