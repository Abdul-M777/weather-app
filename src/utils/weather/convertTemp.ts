import { convertKelvinToCelsius } from "./convertKelvinToCelsius";
import { convertKelvinToFahrenheit } from "./convertKelvinToFahrenheit";

export function convertTemp(temp: number, unit: string) {
  const tempInFahrenheit = convertKelvinToFahrenheit(temp);
  const tempInCelsius = convertKelvinToCelsius(temp);
  // Convert Kelvin to Celsius or Fahrenheit based on the unit
  if (unit === "celsius") {
    return tempInCelsius;
  } else {
    return tempInFahrenheit;
  }
}
