import React from "react";

// This component provides a toggle between Celsius and Fahrenheit units
// It allows users to switch between the two temperature scales for displaying weather data
type Props = {
  unit: "celsius" | "fahrenheit";
  setUnit: React.Dispatch<React.SetStateAction<"celsius" | "fahrenheit">>;
};

export default function CelsiusFahrenheitToggle({ unit, setUnit }: Props) {
  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setUnit("celsius")}
          className={`px-3 py-1 rounded cursor-pointer hover:scale-105 hover:opacity-80 ${
            unit === "celsius"
              ? "bg-primary text-white"
              : "bg-muted text-foreground"
          }`}
        >
          °C
        </button>
        <button
          onClick={() => setUnit("fahrenheit")}
          className={`px-3 py-1 rounded cursor-pointer hover:scale-105 hover:opacity-80 ${
            unit === "fahrenheit"
              ? "bg-primary text-white"
              : "bg-muted text-foreground"
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
}
