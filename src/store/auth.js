import api from '../api/api';
import router from '@/router';

export default{
  state: {
    user: {
      name: localStorage.getItem('user') || null
    },
    token: localStorage.getItem('authToken') || null,
    isLoading: null,
    response: {
      message: '',
      status: ''
    }
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
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    SET_RESPONSE(state, data) {
      state.response.message = data.data.message;
      state.response.status = data.status;
    },
    CLEAR_RESPONSE(state) {
      state.response = {
              message: '',
              status: ''
      }
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)
        const response = await api.post('/api/login', credentials);
        console.log(response);
        if (response && response.data && response.data.token) {
          commit('SET_LOADING', false)
          commit('SET_TOKEN', response.data.token);
          commit('SET_USER', response.data.user.username);
          commit('SET_RESPONSE', response);
          setTimeout(()=> {
            commit('CLEAR_RESPONSE')
          }, 8000)
          router.push('/dashboard');
        }
      } catch (error) {
        commit('SET_LOADING', false)
        console.error("Login error:", error);
      }
    },
    async signup({ commit }, userDetails) {
      try {
        commit('SET_LOADING', true)
        const response = await api.post('/api/register', userDetails);
        if (response && response.data && response.data.token) {
          commit('SET_LOADING', false)
          commit('SET_TOKEN', response.data.token);
          commit('SET_USER', response.data.user.username);
          router.push('/dashboard');
        }
      }
    catch (error) {
      commit('SET_LOADING', false)
      console.error('Signup failed', error);
    }
    },
    logout({ commit }) {
      commit('LOGOUT');
      window.location.href = '/login'
    },
  },
};
