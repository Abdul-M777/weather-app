export interface WeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: CityInfo;
}

export interface WeatherData {
  dt: number;
  main: MainWeatherInfo;
  weather: WeatherDescription[];
  clouds: {
    all: number;
  };
  wind: WindInfo;
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  sys: {
    pod: "n" | "d";
  };
  dt_txt: string;
}

export interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WindInfo {
  speed: number;
  deg: number;
  gust: number;
}

export interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export type WeatherSearchResult = {
  name: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
};

export type WeatherCurrentResult = {
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
};
