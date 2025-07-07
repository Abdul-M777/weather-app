export function getDayOrNightIcon(
  iconName: string,
  dateTimeString: string
): string {
  const hour = new Date(dateTimeString).getHours();
  const isDayTime = hour >= 6 && hour < 18; // Daytime is between 6 AM and 6 PM
  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n"); // Replace last character with 'd' for day or 'n' for night
}
