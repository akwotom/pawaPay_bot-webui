import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './base.css'

import App from './App.vue'
import router from './router'
import { appInit } from '.'


const app = createApp(App)

appInit()

app.use(createPinia())
app.use(router)


app.mount('#app')

