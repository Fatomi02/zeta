import api from '../api/api';
import router from '@/router';
import { useToast } from 'vue-toastification';

const toast = useToast();

export default{
  state: {
    user: {
      name: localStorage.getItem('user') || null
    },
    token: localStorage.getItem('authToken') || null,
    isLoading: null,
    fetchAllIsLoading: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user.name = user;
      localStorage.setItem('user', user);
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('authToken', token);
    },
    SET_LOADING(state, value) {
      state.isLoading = value
    },
    SET_FETCH_LOADING(state, value) {
      state.fetchAllIsLoading = value
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)
        const response = await api.post('/login', credentials);
        if (response && response.data && response.data.token) {
          commit('SET_LOADING', false)
          commit('SET_TOKEN', response.data.token);
          commit('SET_USER', response.data.data.name);
          toast.success(response.data.message);
          router.push('/dashboard');
        }
      } catch (error) {
        const message = error.response?.data?.message ? error.response?.data?.message : error.message;
        commit('SET_LOADING', false);
        toast.error(message);
        console.error("Login error:", error);
      }
    },
    async signup({ commit }, userDetails) {
      try {
        commit('SET_LOADING', true)
        const response = await api.post('/register', userDetails);
        if (response && response.data) {
          commit('SET_LOADING', false);
          toast.success(response.data.message);
          router.push('/login');
        }
      }
    catch (error) {
      commit('SET_LOADING', false);
      const message = error.response?.data?.message ? error.response?.data?.message : error.message;
      toast.error(message);
      console.error('Signup failed', error);
    }
    },
    logout({ commit }) {
      commit('LOGOUT');
      window.location.href = '/login'
    },
  },
};
