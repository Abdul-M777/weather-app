import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "@/app/atoms/atom";
import { fetchWeatherByCoords, searchCity } from "@/lib/api/weather";

export function useSearchCity() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Atoms for global state management
  // These atoms are used to manage the state of the selected place and loading status
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);

  // Input handler
  async function handleInputChange(value: string) {
    setCity(value);

    // Reset suggestions and error when input changes
    if (value.length >= 3) {
      const results = await searchCity(value);
      setSuggestions(results.map((c) => c.name + ", " + c.country));
      setError("");
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  // Suggestion click
  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
    handleSearch(value);
  }

  // Search logic
  function handleSearch(value: string) {
    setLoadingCity(true);

    if (!suggestions.length) {
      setError("No suggestions available");
      setLoadingCity(false);
      return;
    }

    setTimeout(() => {
      setPlace(value);
      localStorage.setItem("place", value);
      setLoadingCity(false);
      setShowSuggestions(false);
    }, 500);
  }

  // Current location
  async function handleCurrentLocation() {
    setLoadingCity(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoadingCity(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const result = await fetchWeatherByCoords(latitude, longitude);

        if (result?.name) {
          setTimeout(() => {
            setCity(result.name);
            setPlace(result.name);
            localStorage.setItem("place", result.name);
            setLoadingCity(false);
          }, 500);
        } else {
          setLoadingCity(false);
        }
      },
      (error) => {
        setError(`Geolocation error: ${error.message}`);
        setLoadingCity(false);
      }
    );
  }

  return {
    city,
    setCity,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    error,
    setError,
    handleInputChange,
    handleSuggestionClick,
    handleSearch,
    handleCurrentLocation,
  };
}
