<template>
  <q-layout id="main-box"
            :class="getWeatherInfo && getUnits === 'Metric' && (getWeatherInfo.main.temp > 16 ? 'warm' : '') || (getWeatherInfo.main.temp > 60 ? 'warm' : '')">
    <q-page-container>
      <q-page id="main-weather">
        <div>
          <button @click="changeLanguage('en')">en</button>
          <button @click="changeLanguage('ru')">ru</button>
        </div>
        <AutoCompleteSelect
            :selectedCity="getSelectedCity"
            @cityChanged="cityChanged"
            :units="getUnits"
            @toggleUnits="toggleUnits"
        />
        <WeatherInfo :loading="weatherLoading" :weather="getWeatherInfo" :unitMark="getUnitMark"/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import './WeatherLayout.css'
import { defineComponent } from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import WeatherInfo from '@/features/weather/components/WeatherInfo/WeatherInfo.vue'
import AutoCompleteSelect from '@/features/weather/components/AutoCompleteSelect/AutoCompleteSelect.vue'

export default defineComponent({
  name: 'WeatherLayout',
  computed: {
    ...mapGetters([
      'getWeatherInfo',
      'weatherLoading',
      'getSelectedCity',
      'getUnits',
      'getUnitMark'
    ])
  },
  methods: {
    ...mapActions(['getWeather']),
    ...mapMutations(['setUnitsAndMark', 'setCity']),
    cityChanged(city: string) {
      this.setCity(city)
      this.getWeather()
    },
    toggleUnits(units: string) {
      this.setUnitsAndMark(units)
      this.getWeather()
    },
    changeLanguage(locale: string) {
      this.$i18n.locale = locale
    }
  },
  components: {AutoCompleteSelect, WeatherInfo},
  watch: {
    getUnits() {
      this.getWeather()
    }
  },
  created() {
    this.getWeather()
  }
})
</script>
