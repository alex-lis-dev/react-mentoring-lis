import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MovieListPage from "./components/MovieListPage/MovieListPage";
import SearchContainer from "./components/SearchContainer/SearchContainer";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieListPage />}>
            <Route index element={<SearchContainer />} />
            <Route path="/:movieId" element={<MovieDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
