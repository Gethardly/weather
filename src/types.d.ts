export interface Weather {
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  weather: [{ main: string }]
  wind: {
    speed: number
    deg: number
  }
  sys: {
    country: string
  }
  name: string
}

export interface CityName {
  name: string
}
