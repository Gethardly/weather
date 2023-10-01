<template>
  <q-layout
      id="main-box"
      :class="typeof weather.main !== 'undefined' && weather.main.temp > 16 ? 'warm' : ''"
  >
    <q-page-container>
        <q-page id="main-weather">
            <AutoCompleteSelect
                v-on:cityChanged="cityChanged"
                :loading="selectLoading"
                :units="units"
            />
            <q-card-actions>
              <q-toggle v-model="toggle" :label="units" :disable="!city" style="color: white"/>
            </q-card-actions>
          <WeatherInfo :weather="weather" :unit-mark="unitMark"/>
        </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import './WeatherLayout.css'
import { defineComponent } from 'vue'
import type { Weather } from '@/types'
import axiosApi from '@/axiosApi'
import WeatherInfo from '@/features/weather/components/WeatherInfo/WeatherInfo.vue'
import AutoCompleteSelect from '@/features/weather/components/AutoCompleteSelect/AutoCompleteSelect.vue'

export enum Units {
  Imperial = 'Imperial',
  Metric = 'Metric'
}

export default defineComponent({
  name: 'WeatherLayout',
  components: {AutoCompleteSelect, WeatherInfo},
  data() {
    return {
      unitMark: '',
      units: Units.Metric,
      city: 'Bishkek',
      selectLoading: false,
      weather: {} as Weather,
      toggle: false,
    }
  },
  methods: {
    async getWeather() {
      this.selectLoading = true
      try {
        const response = await axiosApi.get(
            `weather?q=${this.city}&units=${this.units}&appid=${import.meta.env.VITE_API_KEY}`
        )
        this.weather = response.data
        this.unitMark = this.units === Units.Metric ? '°c' : '°f'
      } catch (e) {
        console.error(e)
      } finally {
        this.selectLoading = false
      }
    },
    cityChanged(value: string) {
      this.city = value
      this.getWeather()
    }
  },
  watch: {
    toggle() {
      if (this.units === Units.Metric) {
        this.units = Units.Imperial
      } else {
        this.units = Units.Metric
      }
      this.getWeather()
    }
  },
  created() {
    this.getWeather()
  }
})
</script>
