import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import './style.css'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'

import App from './App.vue'

createApp(App).mount('#app')
