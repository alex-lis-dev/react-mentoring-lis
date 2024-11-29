import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./styles.module.css";
import SearchContainer from "./components/SearchContainer/SearchContainer";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Layout from "./components/Layout/Layout";
import AddAndEditMovieDialog from "./components/MovieForm/components/AddAndEditMovieDialog/AddAndEditMovieDialog";

function App() {
  return (
    <Router>
      <div className={styles.app}>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<SearchContainer />}>
              <Route path="new" element={<AddAndEditMovieDialog />} />
            </Route>
            <Route path=":movieId" element={<MovieDetails />}>
              <Route path="edit" element={<AddAndEditMovieDialog />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
