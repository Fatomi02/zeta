import api from '../api/api';
import router from '@/router';

export default{
  state: {
    user: {
      name: localStorage.getItem('user') || null
    },
    token: localStorage.getItem('authToken') || null,
    isLoading: null,
    fetchAllIsLoading: null,
    response: {
      message: '',
      status: null
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
    SET_FETCH_LOADING(state, value) {
      state.fetchAllIsLoading = value
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    SET_RESPONSE(state, data) {
      state.response.message = data.message;
      state.response.status = data.status;
    },
    CLEAR_RESPONSE(state) {
      state.response = {
              message: '',
              status: null
      }
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)
        const response = await api.post('/login', credentials);
        const res = {...response.data, status: true};
        if (response && response.data && response.data.token) {
          commit('SET_LOADING', false)
          commit('SET_TOKEN', response.data.token);
          // commit('SET_USER', response.data.user.username);
          commit('SET_RESPONSE', res);
          setTimeout(()=> {
            commit('CLEAR_RESPONSE')
          }, 8000)
          router.push('/dashboard');
        }
      } catch (error) {
        commit('SET_LOADING', false)
        const res = {...error.response.data, status: false};
        commit('SET_RESPONSE', res);
        setTimeout(()=> {
          commit('CLEAR_RESPONSE')
        }, 8000)
        console.error("Login error:", error);
      }
    },
    async signup({ commit }, userDetails) {
      try {
        commit('SET_LOADING', true)
        const response = await api.post('/register', userDetails);
        const res = {...response.data, status: true};
        if (response && response.data) {
          commit('SET_LOADING', false)
          commit('SET_RESPONSE', res);
          commit('SET_TOKEN', response.data.token);
          // commit('SET_USER', response.data.user.username);
          setTimeout(()=> {
            commit('CLEAR_RESPONSE')
          }, 8000)
          router.push('/dashboard');
        }
      }
    catch (error) {
      commit('SET_LOADING', false)
      const res = {...error.response.data, status: false};
      commit('SET_RESPONSE', res);
      setTimeout(()=> {
        commit('CLEAR_RESPONSE')
      }, 8000)
      console.error('Signup failed', error);
    }
    },
    logout({ commit }) {
      commit('LOGOUT');
      window.location.href = '/login'
    },
  },
};
