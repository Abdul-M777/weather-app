import { atom } from "jotai";

// export const placeAtom = atom("Århus");

// Read from localStorage on initial load
const getInitialPlace = () => {
  // Check if we are in a browser environment
  // If so, read from localStorage, otherwise return a default value
  if (typeof window !== "undefined") {
    return localStorage.getItem("place") || "Århus";
  }
  return "Århus";
};

export const placeAtom = atom(getInitialPlace());

// Listen for changes and store it in localStorage
placeAtom.onMount = (setAtom) => {
  const saved = localStorage.getItem("place");
  if (saved) setAtom(saved);
};

export const loadingCityAtom = atom(false);
