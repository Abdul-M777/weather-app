"use client";

import { MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import Searchbox from "./SearchBox";
import SuggestionBox from "./SuggestionBox";
import ThemeToggle from "./ThemeToggle";
import { useSearchCity } from "@/app/hooks/useSearchCity";
import CelsiusFahrenheitToggle from "./CelsiusFahrenheitToggle";

// This component renders the navigation bar with location, search functionality, and unit toggle
// It includes a theme toggle and allows users to search for a city or use their location
type Props = {
  location?: string;
  unit: "celsius" | "fahrenheit";
  setUnit: React.Dispatch<React.SetStateAction<"celsius" | "fahrenheit">>;
};

export default function Navbar({ location, unit, setUnit }: Props) {
  const {
    city,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    error,
    setError,
    handleInputChange,
    handleSuggestionClick,
    handleSearch,
    handleCurrentLocation,
  } = useSearchCity();

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch(city);
  }

  return (
    <>
      <nav className="sticky left-0 top-0 z-50 w-full bg-background shadow-sm backdrop-blur-md dark:bg-background/80">
        <div className="mx-auto flex h-[80px] w-full max-w-7xl items-center justify-between px-3">
          <ThemeToggle />
          <CelsiusFahrenheitToggle unit={unit} setUnit={setUnit} />
          <section className="flex items-center gap-2">
            <MdMyLocation
              title="Your current location"
              onClick={handleCurrentLocation}
              className="cursor-pointer text-2xl text-primary hover:opacity-80"
            />
            <MdOutlineLocationOn className="text-3xl text-foreground" />
            <p className="text-sm text-foreground/80">{location}</p>
            <div className="relative hidden md:flex">
              <Searchbox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <SuggestionBox
                {...{
                  showSuggestions,
                  setShowSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error,
                  setError,
                }}
              />
            </div>
          </section>
        </div>
      </nav>

      {/* Mobile Search */}
      <section className="md:hidden flex max-w-7xl px-3">
        <div className="relative w-full">
          <Searchbox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            {...{
              showSuggestions,
              setShowSuggestions,
              suggestions,
              handleSuggestionClick,
              error,
              setError,
            }}
          />
        </div>
      </section>
    </>
  );
}
