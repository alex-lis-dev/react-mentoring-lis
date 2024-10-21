import React from "react";
import Dialog from "./Dialog";
import { fn } from "@storybook/test";
import MovieForm from "../MovieForm/MovieForm";
import DeleteMovie from "../MovieForm/components/DeleteMovie/DeleteMovie";

export default {
  component: Dialog,
  argTypes: {
    onClose: { action: "closed" },
  },
};

const Template = (args) => <Dialog {...args} />;

const movie = {
  title: "Black Panther",
  release_date: "2018-02-13",
  poster_path:
    "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
  vote_average: 9.8,
  runtime: 120,
  overview:
    "King T'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without.  Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister,  members of the Dora Milaje (the Wakandan \"special forces\"), and an American secret agent, to prevent Wakanda from being dragged into a world war.",
  genres: ["Action", "Adventure", "Fantasy", "Science Fiction"],
};

export const TestDialog = Template.bind({});
TestDialog.args = {
  title: "Dialog Title",
  children: <p>Test Dialog</p>,
  onClose: fn(),
};

export const AddMovieDialog = Template.bind({});
AddMovieDialog.args = {
  title: "ADD MOVIE",
  children: <MovieForm onSubmit={() => fn()}></MovieForm>,
  onClose: fn(),
};

export const EditMovieDialog = Template.bind({});
EditMovieDialog.args = {
  title: "EDIT MOVIE",
  children: <MovieForm initialMovie={movie} onSubmit={() => fn()}></MovieForm>,
  onClose: fn(),
};

export const DeleteMovieDialog = Template.bind({});
DeleteMovieDialog.args = {
  title: "DELETE MOVIE",
  children: <DeleteMovie deleteMovieCLick={() => fn()}></DeleteMovie>,
  onClose: fn(),
};
