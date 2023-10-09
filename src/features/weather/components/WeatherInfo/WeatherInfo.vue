<template>
  <div>
    <div class="weather-wrap">
      <q-spinner
          class="weatherInfoSpinner"
          color="primary"
          size="10em"
          :thickness="10"
          v-if="loading"
      />
      <div v-else-if="weather !== null && typeof weather.main !== 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ date }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">
            {{ Math.round(weather.main.temp) }} {{ unitMark }}
            <p class="feelsLike">
              {{ $t('feelsLike') }} {{ Math.round(weather.main.feels_like) }}
            </p>
          </div>
          <div class="weather">{{ $t('minimumTemp') }}: {{ Math.round(weather.main.temp_min) }}</div>
          <div class="weather">{{ $t('maximumTemp') }}: {{ Math.round(weather.main.temp_max) }}</div>
          <div class="weather">{{ $t('humidity') }}: {{ weather.main.humidity }}%</div>
          <div class="weather">{{ $t('windSpeed') }}: {{ weather.wind.speed }}</div>
          <div class="weather">
            {{ $t('windDirection') }}: {{ getWindDirection(weather.wind.deg) }}
          </div>
          <div class="weather">
            {{ $t('pressure') }}: {{ weather.main.pressure }} <span>{{ $t('pressureType') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './WeatherInfo.css'
import { defineComponent } from 'vue'
import type { Weather } from '@/types'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'WeatherInfo',
  props: {
    weather: {
      default: null,
      type: Object as () => Weather
    },
    unitMark: String,
    loading: Boolean
  },
  methods: {
    getWindDirection(deg: number) {
      const directionsRu = [
        'Север',
        'Северо-Восток',
        'Восток',
        'Юго-Восток',
        'Юг',
        'Юго-Запад',
        'Запад',
        'Северо-Запад'
      ]
      const directionsEn = [
        'North',
        'Northeast',
        'East',
        'Southeast',
        'South',
        'Southwest',
        'West',
        'Northwest',
      ];
      const index = Math.round((deg % 360) / 45)
      return this.$i18n.locale === 'ru' ? directionsRu[index] : directionsEn[index]
    }
  },
  computed: {
    date() {
      return dayjs().locale(this.$i18n.locale).format('dddd D MMMM YYYY')
    }
  }
})
</script>
