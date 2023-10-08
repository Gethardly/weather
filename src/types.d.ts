export interface Weather {
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  weather: [{ main: string }]
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
  name: string
}

export interface Countries {
  data: [
    {
      cities: string[]
    }
  ]
}

export interface City {
  id: number
  name: string
  state: string
  country: string
  coord: {
    lon: number
    lat: number
  }
}
