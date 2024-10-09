import MovieTile from './MovieTile';
import { fn } from '@storybook/test';

const meta = {
  component: MovieTile,
  args:{
    onClick: fn(),
    imageUrl: "https://image.tmdb.org/t/p/w500/7GgZ6DGezkh3szFdvskH5XD4V0t.jpg",
    name: "Maze Runner: The Death Cure", 
    releaseYear: 2018,
    genres: [
      "Action",
      "Mystery",
      "Science Fiction",
      "Thriller",
      "Adventure",
      "Fantasy",
    ]
  }
};

export default meta;

export const Default = {};