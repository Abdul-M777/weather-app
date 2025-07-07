export function convertKelvinToFahrenheit(kelvin: number): number {
  const tempInFahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
  return Math.floor(tempInFahrenheit); // Round down to the nearest integer
}
