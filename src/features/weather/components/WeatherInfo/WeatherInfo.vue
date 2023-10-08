<template>
  <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
    <div class="location-box">
      <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
      <div class="date">{{ date }}</div>
    </div>

    <div class="weather-box">
      <div class="temp">
        {{ Math.round(weather.main.temp) }} {{ this.unitMark }}
        <p style="font-size: 24px; margin: 0">
          Feels like {{ Math.round(weather.main.feels_like) }}
        </p>
      </div>
      <div class="weather">{{ weather.weather[0].main }}</div>
      <div class="weather">Minimum temp {{ Math.round(weather.main.temp_min) }}</div>
      <div class="weather">Maximum temp {{ Math.round(weather.main.temp_max) }}</div>
      <div class="weather">Humidity {{ weather.main.humidity }}%</div>
    </div>
  </div>
</template>

<script>
import './WeatherInfo.css'
import { defineComponent } from "vue";

export default defineComponent({
  name: 'WeatherInfo',
  props: {
    weather: {},
    unitMark: String
  },
  computed: {
    date() {
      let d = new Date()
      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let day = days[d.getDay()]
      let date = d.getDate()
      let month = months[d.getMonth()]
      let year = d.getFullYear()
      return `${day} ${date} ${month} ${year}`
    }
  }
})
</script>
