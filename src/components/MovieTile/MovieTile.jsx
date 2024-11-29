import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import ContextMenu from "./components/ContextMenu.jsx";
import styles from "./styles.module.css";
import DeleteMovieDialog from "../MovieForm/components/DeleteMovieDialog/DeleteMovieDialog.jsx";
import { useRouter } from "next/router.js";
import Link from "next/link.js";

const MovieTile = ({ movie, onClick }) => {
  const releaseYear = useMemo(
    () => new Date(movie.release_date).getFullYear(),
    [movie.release_date]
  );
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toggleDeleteDialog = () => setIsDeleteDialogOpen(!isDeleteDialogOpen);
  const onEditClick = () => router.push(`/${movie.id}/edit`);
  const onDeleteClick = () => toggleDeleteDialog();

  return (
    <div className={styles.movieTileContainer}>
      <div>
        <ContextMenu
          id={movie.id}
          handleEditItemCLick={onEditClick}
          handleDeleteItemClick={onDeleteClick}
        />
      </div>
      <DeleteMovieDialog
        isOpen={isDeleteDialogOpen}
        onClose={toggleDeleteDialog}
        movieToDelete={movie}
      />
      <div onClick={onClick}>
        <Link href={`${movie.id}`} passHref>
          <img
            src={movie.poster_path}
            alt={movie.title}
            className={styles.moviePoster}
          />
        </Link>
        <div className={styles.movieName}>{movie.title}</div>
        <div className={styles.movieYear}>{releaseYear}</div>
        <div className={styles.movieGenres}>{movie.genres.join(", ")}</div>
      </div>
    </div>
  );
};

export default MovieTile;

MovieTile.propTypes = {
  onClick: PropTypes.func,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    runtime: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.array.isRequired,
  }),
};
