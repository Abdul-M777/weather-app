export function convertWindSpeed(speedInMetersPerSecond: number): string {
  const speedInKilometersPerHour = speedInMetersPerSecond * 3.6; // Convert m/s to km/h
  return `${speedInKilometersPerHour.toFixed(0)}km/h`; // Round to the nearest integer and append 'km/h'
}
