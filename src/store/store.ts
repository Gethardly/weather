import { createStore } from 'vuex'
import type { Weather } from '@/types'
import axiosApi from '@/axiosApi'

export enum Units {
  Imperial = 'Imperial',
  Metric = 'Metric'
}

interface State {
  unitMark: string
  units: string
  city: string
  selectLoading: boolean
  weather: Weather
  toggle: boolean
}

const store = createStore<State>({
  state: {
    unitMark: '',
    units: Units.Metric,
    city: 'Bishkek',
    selectLoading: false,
    weather: {} as Weather,
    toggle: false
  },
  mutations: {
    setUnitMark(state, mark) {
      state.unitMark = mark
    },
    setUnits(state, units) {
      state.units = units
    },
    setCity(state, city) {
      state.city = city
    },
    setSelectLoading(state, loading) {
      state.selectLoading = loading
    },
    setWeather(state, weather) {
      state.weather = weather
    },
    setToggle(state, toggle) {
      state.toggle = toggle
    }
  },
  actions: {
    async getWeather(context) {
      context.commit('setSelectLoading', true)
      try {
        const response = await axiosApi.get(
          `weather?q=${context.state.city}&units=${context.state.units}&appid=${
            import.meta.env.VITE_API_KEY
          }`
        )
        context.commit('setWeather', response.data)
        const unitMark = context.state.units === Units.Metric ? '°C' : '°F'
        context.commit('setUnitMark', unitMark)
      } catch (e) {
        console.error(e)
      } finally {
        context.commit('setSelectLoading', false)
      }
    }
  }
})

export default store
