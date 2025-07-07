# 🌦️ Weather App

A responsive weather dashboard built with **Next.js**, **TypeScript**, and **Tailwind CSS**. This app fetches and displays real-time weather data, including current conditions and a 6-day forecast, using the OpenWeatherMap API.

---

## ✨ Features

- 🔍 **Search for any city** to see current weather and forecast
- 📊 **Interactive temperature chart**
- 🌡️ Toggle between **Celsius and Fahrenheit**
- 🌇 See sunrise/sunset, humidity, wind speed, and more
- 📱 Responsive UI using Tailwind CSS
- 🔁 Automatically refetches weather data when location changes

---

## 🧠 Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Jotai** (state management)
- **React Query** (data fetching & caching)
- **date-fns** (date formatting)
- **OpenWeatherMap API**

---

## 🧪 Functionality Overview

This app consists of one main page:

- The main weather dashboard:
  - Fetches weather data using a custom hook `useWeatherForecast`
  - Displays:
    - Today's temperature with chart
    - Weather icon and description
    - Wind, visibility, humidity, air pressure
    - Sunrise and sunset time
    - A 6-day forecast (daily summary)
  - Controlled with state for temperature unit (Celsius/Fahrenheit)
  - Loading and error handling built-in

---

## 🚀 Getting Started

Follow these steps to run the project on your machine:

### 1. Clone the Repository

```bash
git clone https://github.com/Abdul-M777/weather-app.git
cd weather-app

```

### 2. Install Dependencies

```bash
npm install


```

### 3. Add Environment Variables

Create a .env.local file in the root with your OpenWeatherMap API key:

```ini

NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here


```

### 4. Run App

```bash

npm run dev

Then open http://localhost:3000 in your browser.
```

## 🧪 Running Tests

This project uses Jest and React Testing Library.

To run tests:

```bash
npm run test
```

Make sure to install test dependencies if you haven't already:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## 📁 Folder Structure

```bash

/app
  └── page.tsx           # Main weather dashboard
  └── hooks/             # Custom hooks like useWeatherForecast
  └── atoms/             # Jotai atoms for global state
/components
  └── WeatherDashboard/  # Weather chart, forecast detail, etc.
  └── Navbar/            # Search, unit toggle
  └── Container/         # Reusable layout wrapper
/utils
  └── weather/         # Unit conversions
  └── cn.ts              # Utility for conditional classnames

```
