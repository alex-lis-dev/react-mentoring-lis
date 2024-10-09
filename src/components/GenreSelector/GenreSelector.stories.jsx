import GenreSelector from './GenreSelector';
import { fn } from '@storybook/test';

const meta = {
  component: GenreSelector,
  args: {
    genres: [
      "All",
      "Action",
      "Mystery",
      "Science Fiction",
      "Thriller",
      "Adventure",
      "Fantasy",
    ],
    selectedGenre: "All",
    onSelect: fn()
  }
};

export default meta;

export const Default = {};