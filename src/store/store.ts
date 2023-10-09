import { createStore } from 'vuex'
import weatherModule from './modules/weatherModule'

const store = createStore({
  modules: {
    weather: weatherModule
  }
})

export default store
