// lib/api/weather.ts
import axios from "axios";
import type {
  WeatherSearchResult,
  WeatherCurrentResult,
  WeatherForecastResponse,
  CityApiItem,
} from "@/app/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/// Fetches current weather data for a given place.
export async function fetchWeatherForecast(
  place: string
): Promise<WeatherForecastResponse> {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: place,
      appid: API_KEY,
    },
  });
  return res.data;
}

/**
 * Fetches city search results (autocomplete-style).
 */
export async function searchCity(
  query: string
): Promise<WeatherSearchResult[]> {
  if (query.length < 3) return [];

  try {
    const response = await axios.get(`${BASE_URL}/find`, {
      params: {
        q: query,
        appid: API_KEY,
      },
    });

    return response.data.list.map((item: CityApiItem) => ({
      name: item.name,
      country: item.sys.country,
      coord: item.coord,
    }));
  } catch (error) {
    console.error("Error searching city:", error);
    return [];
  }
}

/**
 * Fetches weather for a specific coordinate.
 */
export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherCurrentResult | null> {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });

    return {
      name: response.data.name,
      weather: response.data.weather,
      main: response.data.main,
      wind: response.data.wind,
    };
  } catch (error) {
    console.error("Error fetching current location weather:", error);
    return null;
  }
}
