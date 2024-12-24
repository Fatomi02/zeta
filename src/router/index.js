import Budget from '@/views/home/Budget.vue';
import Home from '@/views/home/home.vue';
import Dashboard from '@/views/home/Dashboard.vue';
import Insight from '@/views/home/Insight.vue';
import Transaction from '@/views/home/Transaction.vue';
import Login from '@/views/Login.vue'
import Signin from '@/views/Signup.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signin', component: Signin },
  { path: '/dashboard', 
    meta: { requiresAuth: true },
    redirect: '/dashboard/home',
    name: 'Dashboard', 
    component: Dashboard,
    children: [
      {
        path: '/dashboard/home',
        component: Home,
      },
      {
        path: '/dashboard/budgets',
        component: Budget,
      },
      {
        path: '/dashboard/transactions',
        component: Transaction,
      },
      {
        path: '/dashboard/financial-insights',
        component: Insight,
      },
    ]
   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});


export default router;
