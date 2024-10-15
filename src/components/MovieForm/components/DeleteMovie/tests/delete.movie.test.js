import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteMovie from "../DeleteMovie";
import { DeleteMovieConfirmationQuestion, DeleteMovieConfirm } from "../../../../../helpers/constants";

test("renders DeleteMovie component", () => {
  const mockDeleteClick = jest.fn();
  render(<DeleteMovie deleteMovieCLick={mockDeleteClick} />);

  expect(
    screen.getByText(DeleteMovieConfirmationQuestion)
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: DeleteMovieConfirm })).toBeInTheDocument();
});

test("calls delete function on button click", () => {
  const mockDeleteClick = jest.fn();
  render(<DeleteMovie deleteMovieCLick={mockDeleteClick} />);

  fireEvent.click(screen.getByRole("button", { name: DeleteMovieConfirm }));

  expect(mockDeleteClick).toHaveBeenCalled();
});
