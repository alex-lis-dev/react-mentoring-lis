import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Dialog from "../Dialog";

describe("Dialog Component Tests", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(
      <Dialog title="Test Dialog" onClose={mockOnClose}>
        <div >
          <p >Test Content</p>
          <input  title="First" type="text"></input>
          <input title="Second" type="number"></input>
        </div>
      </Dialog>
    );
  });

  it("should display the dialog with proper content", () => {
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should trigger onClose when the close button is clicked", () => {
    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should display the dialog with focus trap", () => {
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toHaveClass("dialog");
    expect(dialogElement.firstChild).toHaveClass("dialog-header");
    expect(dialogElement.firstChild.nextSibling).toHaveClass("dialog-body");
  });
});
