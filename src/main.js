import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue'
import router from './router'
import authModule from './store/auth';
import budgetModule from './store/budget';

const store = createStore({
    modules: {
        auth: authModule,
        budget: budgetModule
    }
})

const app = createApp(App)

app.use(router).use(store).mount('#app')
