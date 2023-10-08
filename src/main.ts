import { createApp } from 'vue'
import { Quasar } from 'quasar'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'
import store from './store/store'

const app = createApp(App)
app.use(store)
app.use(Quasar, {
  config: {},
  plugins: {}
})

app.mount(`#app`)
