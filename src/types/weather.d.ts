export interface WeatherAPI {
  coord?: { lon: number; lat: number };
  weather: Array<{ id: number; main: string; description: string; icon: string }>;

  main: {
    temp: number;
    // 온도
    feels_like?: number;
    // 체감온도
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number;
    // 습도
  };

  wind?: {
    speed?: number;
    deg?: number;
  };
  sys?: {
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  name: string;
  dt?: number;
}

export interface WeatherData {
  city: string;
  temp: number;
  icon: string;
  desc: string;
  pm2_5?: number;
  pm10?: number;
}
