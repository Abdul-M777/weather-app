"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { format, fromUnixTime, parseISO } from "date-fns";

import Container from "@/components/Container/Container";
import ForecastWeatherDetail from "@/components/WeatherDashboard/ForecastWeatherDetail";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDashboard/WeatherDetails";
import WeatherIcon from "@/components/WeatherDashboard/WeatherIcon";
import TemperatureLineChart from "@/components/WeatherDashboard/TemperatureLineChart";
import { WeatherSkeleton } from "@/components/WeatherDashboard/WeatherSkeleton";
import { useWeatherForecast } from "@/app/hooks/useWeatherForecast";
import {
  convertTemp,
  convertWindSpeed,
  getDayOrNightIcon,
  metersToKilometers,
} from "@/utils/weather";
import { loadingCityAtom, placeAtom } from "@/app/atoms/atom";
import { WeatherData } from "./types/weather";

/**
 * Formats a date string to a specified format.
 * Returns "N/A" if the date string is undefined or invalid.
 *
 * @param {string | undefined} dateString - The date string to format.
 * @param {string} formatStr - The format string (e.g., "dd/MM/yyyy").
 * @returns {string} - The formatted date or "N/A".
 */
function safeFormatDate(
  dateString: string | undefined,
  formatStr: string
): string {
  if (!dateString) return "N/A";
  const date = parseISO(dateString);
  return isNaN(date.getTime()) ? "N/A" : format(date, formatStr);
}

export default function WeatherDashboard() {
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [place] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);
  const { isPending, error, data, refetch } = useWeatherForecast(place);

  // Refetch the weather data when the place changes
  // This ensures that the weather data is updated when the user searches for a new location
  // or when the current location is updated
  useEffect(() => {
    if (place) void refetch();
  }, [place, refetch]);

  // If the data is still loading, show a loading state
  if (isPending) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  // If there is an error, display an error message
  // This could be due to network issues, invalid API key, or other reasons
  if (error) {
    return (
      <p className="text-red-500">An error has occurred: {error.message}</p>
    );
  }

  // Data for the first weather entry
  // This is used to display the current weather conditions
  const firstData = data?.list[0];

  const chartData = data?.list.map((d: WeatherData) => ({
    time: safeFormatDate(d.dt_txt, "H:mm a"),
    temperature: Math.round(convertTemp(d.main.temp, unit)),
    date: safeFormatDate(d.dt_txt, "dd/MM/yyyy"),
  }));

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry: WeatherData) =>
          new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  // Data for each date, filtering out the first entry of each day
  // This is used to display the forecast for each day
  const DataForEachDate = uniqueDates.map((date) =>
    data?.list.find((entry: WeatherData) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryHour = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryHour >= 0;
    })
  );

  return (
    <div className="flex flex-col gap-4 bg-background min-h-screen">
      <Navbar location={data?.city.name} unit={unit} setUnit={setUnit} />

      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end text-secondary-foreground">
                  <p>{safeFormatDate(firstData?.dt_txt, "EEEE")}</p>
                  <p className="text-lg">
                    ({safeFormatDate(firstData?.dt_txt, "dd/MM/yyyy")})
                  </p>
                </h2>

                <Container className="gap-10 px-6 items-center text-secondary-foreground">
                  <div className="flex flex-col px-4">
                    <span className="text-5xl">
                      {firstData?.main.temp != null
                        ? `${Math.round(
                            convertTemp(firstData.main.temp, unit)
                          )}°`
                        : "N/A"}
                    </span>
                    <p className="text-xs whitespace-nowrap">
                      Feels like{" "}
                      {firstData?.main.feels_like != null
                        ? `${Math.round(
                            convertTemp(firstData.main.feels_like, unit)
                          )}°`
                        : "N/A"}
                    </p>
                    <p className="text-xs">
                      {firstData?.main.temp_min != null
                        ? `${Math.round(
                            convertTemp(firstData.main.temp_min, unit)
                          )}°↓`
                        : "N/A"}{" "}
                      {firstData?.main.temp_max != null
                        ? `${Math.round(
                            convertTemp(firstData.main.temp_max, unit)
                          )}°↑`
                        : "N/A"}
                    </p>
                  </div>

                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3 text-secondary">
                    <div className="overflow-x-auto w-full pr-3">
                      <div className="min-w-[600px] sm:min-w-full">
                        <TemperatureLineChart data={chartData} />
                      </div>
                    </div>
                  </div>
                </Container>
              </div>

              <div className="flex gap-4 text-secondary-foreground">
                <Container className="w-fit justify-center flex-col px4 items-center">
                  <p className="capitalize text-center">
                    {firstData?.weather[0].description ?? "N/A"}
                  </p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(
                      firstData?.weather[0].icon ?? "",
                      firstData?.dt_txt ?? ""
                    )}
                  />
                </Container>

                <Container className="bg-primary/80 px-6 gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visibility={
                      firstData?.visibility != null
                        ? metersToKilometers(firstData.visibility)
                        : "N/A"
                    }
                    airPressure={`${firstData?.main.pressure ?? "N/A"} hPa`}
                    humidity={`${firstData?.main.humidity ?? "N/A"}%`}
                    sunrise={
                      data?.city.sunrise
                        ? format(fromUnixTime(data.city.sunrise), "H:mm a")
                        : "N/A"
                    }
                    sunset={
                      data?.city.sunset
                        ? format(fromUnixTime(data.city.sunset), "H:mm a")
                        : "N/A"
                    }
                    windSpeed={
                      firstData?.wind.speed != null
                        ? convertWindSpeed(firstData.wind.speed)
                        : "N/A"
                    }
                  />
                </Container>
              </div>
            </section>

            <section className="flex w-full flex-col gap-4 text-secondary-foreground">
              <p className="text-2xl">Forecast (6 days)</p>
              {DataForEachDate.map((d, i) => (
                <ForecastWeatherDetail
                  key={i}
                  unit={unit}
                  description={d?.weather[0].description ?? ""}
                  weatherIcon={d?.weather[0].icon ?? "02d"}
                  date={safeFormatDate(d?.dt_txt, "dd/MM")}
                  day={safeFormatDate(d?.dt_txt, "EEEE")}
                  feels_like={d?.main.feels_like}
                  temp={d?.main.temp}
                  temp_min={d?.main.temp_min.toString() ?? "N/A"}
                  temp_max={d?.main.temp_max.toString() ?? "N/A"}
                  visibility={
                    d?.visibility != null
                      ? metersToKilometers(d.visibility)
                      : "N/A"
                  }
                  humidity={`${d?.main.humidity ?? "N/A"}%`}
                  windSpeed={
                    d?.wind.speed != null
                      ? convertWindSpeed(d.wind.speed)
                      : "N/A"
                  }
                  airPressure={`${d?.main.pressure ?? "N/A"} hPa`}
                  sunrise={
                    data?.city.sunrise
                      ? format(fromUnixTime(data.city.sunrise), "H:mm a")
                      : "N/A"
                  }
                  sunset={
                    data?.city.sunset
                      ? format(fromUnixTime(data.city.sunset), "H:mm a")
                      : "N/A"
                  }
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
