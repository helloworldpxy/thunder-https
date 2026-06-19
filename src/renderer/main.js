import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import zh from './i18n/zh.js'
import en from './i18n/en.js'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zh',
  fallbackLocale: 'en',
  messages: { zh, en }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
