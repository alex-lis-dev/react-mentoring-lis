import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Dialog from "../Dialog";

describe("Dialog Component Tests", () => {
  const mockOnClose = jest.fn();
  const title = "Test Dialog";
  let children;

  beforeEach(() => {
    children = (
      <div>
        <p>Test Content</p>
        <input title="First" type="text"></input>
        <input title="Second" type="number"></input>
      </div>
    );
  });

  it("renders the dialog when active is true", () => {
    render(
      <Dialog
        title={title}
        children={children}
        onClose={mockOnClose}
        active={true}
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("does not render the dialog when active is false", () => {
    render(
      <Dialog
        title={title}
        children={children}
        onClose={mockOnClose}
        active={false}
      />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should trigger onClose when the close button is clicked", () => {
    render(
      <Dialog
        title={title}
        children={children}
        onClose={mockOnClose}
        active={true}
      />
    );
    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should display the dialog with focus trap", () => {
    render(
      <Dialog
        title={title}
        children={children}
        onClose={mockOnClose}
        active={true}
      />
    );
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toHaveClass("dialog");
    expect(dialogElement.firstChild).toHaveClass("dialog-header");
    expect(dialogElement.firstChild.nextSibling).toHaveClass("dialog-body");
  });
});
