import type { Weather } from '@/types'
import type { Commit } from 'vuex'
import axiosApi from '@/axiosApi'

export enum Units {
  Imperial = 'Imperial',
  Metric = 'Metric'
}

interface State {
  isLoading: boolean
  weather: Weather | null
  selectedCity: string | null
  units: string
  unitMark: string
}

export default {
  state: {
    isLoading: false,
    weather: null,
    selectedCity: 'Bishkek',
    units: Units.Metric,
    unitMark: '°c'
  } as State,
  mutations: {
    setLoading(state: State, isLoading: boolean) {
      state.isLoading = isLoading
    },
    setWeather(state: State, weather: null | Weather) {
      state.weather = weather
    },
    setUnitsAndMark(state: State, unitMark: string) {
      state.unitMark = unitMark === Units.Metric ? '°c' : '°f'
      state.units = state.units === Units.Metric ? Units.Imperial : Units.Metric
    },
    setCity(state: State, city: string) {
      state.selectedCity = city
    }
  },
  actions: {
    async getWeather({ commit, state }: { commit: Commit; state: State }) {
      commit('setLoading', true)
      try {
        const response = await axiosApi.get(
          `weather?q=${state.selectedCity}&units=${state.units}&appid=${
            import.meta.env.VITE_API_KEY
          }`
        )
        commit('setWeather', response.data)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
      }
    }
  },
  getters: {
    weatherLoading: (state: State) => state.isLoading,
    getWeatherInfo: (state: State) => state.weather,
    getSelectedCity: (state: State) => state.selectedCity,
    getUnits: (state: State) => state.units,
    getUnitMark: (state: State) => state.unitMark
  }
}
