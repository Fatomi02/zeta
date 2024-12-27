import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue'
import router from './router'
import authModule from './store/auth';
import budgetModule from './store/budget';
import transactionModule from './store/transaction';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const store = createStore({
    modules: {
        auth: authModule,
        budget: budgetModule,
        transaction: transactionModule
    }
})

const app = createApp(App)

app.use(router).use(store).use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
  }).mount('#app')
