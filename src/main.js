import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue'
import router from './router'
import authModule from './store/auth';

const store = createStore({
    modules: {
        auth: authModule
    }
})

const app = createApp(App)

app.use(router).use(store).mount('#app')
