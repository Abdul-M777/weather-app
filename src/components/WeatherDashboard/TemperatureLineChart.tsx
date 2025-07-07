"use client";

import { color } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: { time: string; temperature: number; date: string }[];
};

// This component renders a line chart for temperature data
// It uses recharts to display the temperature over time with tooltips showing detailed information
export default function TemperatureLineChart({ data }: Props) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="bg-card rounded-xl p-4 shadow"
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis padding={{ left: 50, right: 50 }} dataKey="time" />
          <YAxis unit="°" />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const { date, temperature } = payload[0].payload;
                return (
                  <div className="rounded-md bg-background p-2 shadow text-foreground text-sm">
                    <p>
                      <strong>Time:</strong> {label}
                    </p>
                    <p>
                      <strong>Temp:</strong> {temperature}°
                    </p>
                    <p>
                      <strong>Date:</strong> {date}
                    </p>
                  </div>
                );
              }
              return null;
            }}
            animationEasing="ease"
            labelStyle={{ color: "black" }}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#f59e0a"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
