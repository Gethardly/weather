import { createApp } from 'vue'
import { Quasar } from 'quasar'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'
import store from './store/store'
import { createI18n } from 'vue-i18n'
import english from './locales/en.json'
import russian from './locales/ru.json'
import 'dayjs/locale/ru'

const app = createApp(App)

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    en: english,
    ru: russian
  }
})
app.use(store)
app.use(i18n)
app.use(Quasar, {
  config: {},
  plugins: {}
})

app.mount(`#app`)
