export function convertKelvinToCelsius(kelvin: number): number {
  const tempInCelsius = kelvin - 273.15;
  return Math.floor(tempInCelsius); // Round down to the nearest integer
}
