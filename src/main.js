import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import { store } from './store';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';


const app = createApp(App)

app.use(router).use(store).use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    theme: 'colored',
  }).mount('#app')
