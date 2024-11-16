import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchContainer from "./components/SearchContainer/SearchContainer";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SearchContainer />} />
            <Route path="/:movieId" element={<MovieDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
