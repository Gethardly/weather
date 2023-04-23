import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(Quasar, {
  config: {},
  plugins: {} // import Quasar plugins and add here
})

app.mount(`#app`)
