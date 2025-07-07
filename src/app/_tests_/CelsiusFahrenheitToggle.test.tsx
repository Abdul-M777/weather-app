import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CelsiusFahrenheitToggle from "@/components/Navbar/CelsiusFahrenheitToggle";

// This test suite is for the CelsiusFahrenheitToggle component
// It checks if the component renders correctly, handles clicks, and applies the correct styles
describe("CelsiusFahrenheitToggle", () => {
  it("renders both Celsius and Fahrenheit buttons", () => {
    // Mock the setUnit function
    // and render the component with 'celsius' as the initial unit
    const setUnit = jest.fn();
    render(<CelsiusFahrenheitToggle unit="celsius" setUnit={setUnit} />);

    expect(screen.getByText("°C")).toBeInTheDocument();
    expect(screen.getByText("°F")).toBeInTheDocument();
  });

  it("calls setUnit with 'fahrenheit' when Fahrenheit button is clicked", () => {
    // Mock the setUnit function
    // and render the component with 'celsius' as the initial unit
    const setUnit = jest.fn();
    render(<CelsiusFahrenheitToggle unit="celsius" setUnit={setUnit} />);

    fireEvent.click(screen.getByText("°F"));
    expect(setUnit).toHaveBeenCalledWith("fahrenheit");
  });

  it("calls setUnit with 'celsius' when Celsius button is clicked", () => {
    const setUnit = jest.fn();
    render(<CelsiusFahrenheitToggle unit="fahrenheit" setUnit={setUnit} />);

    fireEvent.click(screen.getByText("°C"));
    expect(setUnit).toHaveBeenCalledWith("celsius");
  });

  it("applies correct styling to active unit", () => {
    const setUnit = jest.fn();
    const { rerender } = render(
      <CelsiusFahrenheitToggle unit="celsius" setUnit={setUnit} />
    );

    const celsiusBtn = screen.getByText("°C");
    const fahrenheitBtn = screen.getByText("°F");

    expect(celsiusBtn.className).toMatch(/bg-primary/);
    expect(fahrenheitBtn.className).toMatch(/bg-muted/);

    rerender(<CelsiusFahrenheitToggle unit="fahrenheit" setUnit={setUnit} />);
    expect(fahrenheitBtn.className).toMatch(/bg-primary/);
    expect(celsiusBtn.className).toMatch(/bg-muted/);
  });
});
