import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { useRef } from "react";

// This component renders a suggestion box for displaying search suggestions
// It allows users to click on suggestions and handles outside clicks to close the box
type Props = {
  showSuggestions: boolean;
  setShowSuggestions: (v: boolean) => void;
  suggestions: string[];
  handleSuggestionClick: (value: string) => void;
  error: string;
  setError: (value: string) => void;
};

export default function SuggestionBox({
  showSuggestions,
  setShowSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
  setError,
}: Props) {
  const suggestionBoxRef = useRef<HTMLDivElement>(null);
  useOutsideClick(suggestionBoxRef, () => {
    setShowSuggestions(false);
    setError("");
  });

  if ((!showSuggestions || suggestions.length < 1) && !error) return null;

  return (
    <div ref={suggestionBoxRef}>
      <ul className="absolute top-[44px] left-0 mb-4 min-w-[200px] rounded-md border border-gray-300 bg-background py-2 px-2 text-secondary-foreground">
        {error && <li className="p-1 text-destructive">{error}</li>}
        {suggestions.map((item, i) => (
          <li
            key={i}
            onClick={() => handleSuggestionClick(item)}
            className="cursor-pointer rounded p-1 hover:bg-secondary-foreground/10"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
