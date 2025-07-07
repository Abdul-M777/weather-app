import React from "react";
import Container from "../Container/Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailsProps } from "./WeatherDetails";
import { convertTemp } from "@/utils/weather";

/// Interface for the props of ForecastWeatherDetail component
/// It extends WeatherDetailsProps to include additional weather details specific to the forecast
export interface ForecastWeatherDetailProps extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number | undefined;
  feels_like: number | undefined;
  temp_min: string;
  temp_max: string;
  description: string;
  unit?: "celsius" | "fahrenheit";
}

/// ForecastWeatherDetail component displays detailed weather information for a specific date
/// It includes the weather icon, date, day of the week, temperature, feels like temperature
export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    weatherIcon = "02d",
    date = "N/A",
    day = "N/A",
    temp,
    feels_like,
    description,
    unit = "celsius",
  } = props;

  return (
    <Container className="gap-4 text-secondary-foreground">
      {/* Left */}
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatherIcon} />
          <p className="">{date}</p>
          <p className="text-sm">{day}</p>
        </div>
        {/* Middle */}
        <div className="flex flex-col px-4">
          <span className="text-5xl">
            {temp ? convertTemp(temp, unit) : "N/A"}°
          </span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>{feels_like ? convertTemp(feels_like, unit) : "N/A"}°</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>

      {/* Right */}

      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
