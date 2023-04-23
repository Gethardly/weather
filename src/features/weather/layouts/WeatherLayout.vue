<template>
  <q-layout
    id="main-box"
    :class="typeof weather.main !== 'undefined' && weather.main.temp > 16 ? 'warm' : ''"
  >
    <q-page-container>
      <q-layout>
        <q-page id="main-weather">
          <AutoCompleteSelect
            v-on:cityChanged="cityChanged"
            v-on:toggleUnits="toggleUnits"
            :loading="loading"
            :city="city"
            :units="units"
          />
          <WeatherInfo :weather="weather" :unit-mark="unitMark" />
        </q-page>
      </q-layout>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Weather } from '@/types'
import axiosApi from '@/axiosApi'
import { api_key } from '@/constants'
import WeatherInfo from '@/features/weather/components/WeatherInfo.vue'
import AutoCompleteSelect from '@/features/weather/components/AutoCompleteSelect.vue'

export enum Units {
  Imperial = 'Imperial',
  Metric = 'Metric'
}

export default defineComponent({
  name: 'WeatherLayout',
  components: { AutoCompleteSelect, WeatherInfo },
  data() {
    return {
      unitMark: '°c',
      units: 'Metric',
      city: '',
      loading: false,
      weather: {} as Weather
    }
  },
  methods: {
    async getWeather() {
      this.loading = true
      try {
        const response = await axiosApi.get(
          `weather?q=${this.city}&units=${this.units}&appid=${api_key}`
        )
        this.weather = response.data
        this.unitMark = this.units === Units.Metric ? '°c' : '°f'
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    toggleUnits(value: string) {
      this.units = value
      this.getWeather()
    },
    cityChanged(value: string) {
      this.city = value
      this.getWeather()
    }
  }
})
</script>

<style>
body {
  font-family: 'montserrat', sans-serif;
}

#main-box {
  background-color: cornflowerblue;
  transition: 0.4s;
}

#main-box.warm {
  background-color: #d55f98;
  transition: 0.4s;
}

#main-weather {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

#main-weather {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

@media screen and (max-width: 480px) {
  #main-box {
    background: url('../../../assets/cold-bg.jpg') bottom / cover no-repeat;
    transition: 0.4s;
  }

  #main-box.warm {
    background: url('../../../assets/warm-bg.jpg') bottom / cover no-repeat;
    transition: 0.4s;
  }
}
</style>
