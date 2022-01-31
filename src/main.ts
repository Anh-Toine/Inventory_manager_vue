/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import i18n from './i18n'

createApp(App).use(i18n).use(store).use(router).mount('#app')
