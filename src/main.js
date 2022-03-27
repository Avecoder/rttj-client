import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'v-calendar/dist/style.css'; // Исходные стили
import './assets/styles/calendar.scss'


const app = createApp(App).use(router)

import VCalendar from 'v-calendar';

app.use(VCalendar, {})


app.mount('#app')
