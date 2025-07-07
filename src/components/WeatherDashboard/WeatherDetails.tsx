import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface WeatherDetailsProps {
  visibility?: string;
  humidity?: string;
  windSpeed?: string;
  airPressure?: string;
  sunrise?: string;
  sunset?: string;
}

// WeatherDetails component to display various weather details
// It takes visibility, humidity, windSpeed, airPressure, sunrise, and sunset as props
export default function WeatherDetails(props: WeatherDetailsProps) {
  const {
    visibility = "N/A",
    humidity = "N/A",
    windSpeed = "N/A",
    airPressure = "N/A",
    sunrise = "N/A",
    sunset = "N/A",
  } = props;

  return (
    <>
      <SingleWeatherDetail
        information="Visibility"
        icon={<LuEye />}
        value={visibility}
      />
      <SingleWeatherDetail
        information="Humidity"
        icon={<FiDroplet />}
        value={humidity}
      />
      <SingleWeatherDetail
        information="Wind Speed"
        icon={<MdAir />}
        value={windSpeed}
      />
      <SingleWeatherDetail
        information="Air Pressure"
        icon={<ImMeter />}
        value={airPressure}
      />
      <SingleWeatherDetail
        information="Sunrise"
        icon={<LuSunrise />}
        value={sunrise}
      />
      <SingleWeatherDetail
        information="Sunset"
        icon={<LuSunset />}
        value={sunset}
      />
    </>
  );
}

// SingleWeatherDetailProps interface defines the props for SingleWeatherDetail component
export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string | number | undefined;
}

// SingleWeatherDetail component to display individual weather details
// It takes information, icon, and value as props
function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-foreground">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
