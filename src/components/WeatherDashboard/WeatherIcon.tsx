import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

/// WeatherIcon component to display weather icons based on the iconName prop
/// It accepts iconName as a prop and renders the corresponding weather icon image
export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & { iconName: string }
) {
  return (
    <div {...props} className={cn("relative h-20 w-20")}>
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
      />
    </div>
  );
}
