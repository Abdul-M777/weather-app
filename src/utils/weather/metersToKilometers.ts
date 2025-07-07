export function metersToKilometers(visibilityInMeters: number): string {
  const visibilityInKilometers = visibilityInMeters / 1000; // Convert meters to kilometers
  return `${visibilityInKilometers.toFixed(0)}km`; // Round to the nearest integer and append 'km'
}
