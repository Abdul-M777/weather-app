import { useQuery } from "@tanstack/react-query";
import { fetchWeatherForecast } from "@/lib/api/weather";
import type { WeatherForecastResponse } from "@/app/types/weather";

/**
 * Custom hook to fetch weather forecast data for a given place.
 * Uses React Query for data fetching and caching.
 *
 * @param {string} place - The name of the place to fetch the weather forecast for.
 * @returns {Object} - The query object containing the weather forecast data, loading state, and error information.
 */
export function useWeatherForecast(place: string) {
  return useQuery<WeatherForecastResponse>({
    queryKey: ["weatherForecast", place],
    queryFn: () => fetchWeatherForecast(place),
    enabled: !!place, // only fetch if place exists
    staleTime: 1000 * 60 * 5,
  });
}
