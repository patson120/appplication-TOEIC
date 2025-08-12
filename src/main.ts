import { createApp } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import { i18n } from './i18n'
import './style.css'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'
})

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')