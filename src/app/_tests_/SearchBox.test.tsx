import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Searchbox from "@/components/Navbar/SearchBox";

describe("Searchbox component", () => {
  it("renders input and button", () => {
    render(<Searchbox value="" onChange={() => {}} onSubmit={() => {}} />);

    expect(screen.getByPlaceholderText("Search..")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = jest.fn();

    render(<Searchbox value="" onChange={handleChange} onSubmit={() => {}} />);

    const input = screen.getByPlaceholderText("Search..");
    fireEvent.change(input, { target: { value: "weather" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
