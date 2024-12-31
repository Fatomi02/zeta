import api from "@/api/api";
import { useToast } from 'vue-toastification';

const toast = useToast();


export default {
    state: {
        insight: [],
        monthlyInsight: []
    },
    mutations: {
        setInsight(state, insight) {
          state.insight = insight;
        },
        setMonthlyInsight(state, monthlyInsight) {
          state.monthlyInsight = monthlyInsight;
        }
      },
      actions: {
        async getInsight({commit}) {
          commit('SET_LOADING', true)
          try {
            const response = await api.get('/insights/summary');
            if(response && response.data && response.status == 200) {
              commit('setInsight', response.data);
              commit('SET_LOADING', false)
            }
          }
          catch (error) {
            const message = error.response?.data?.message ? error.response?.data?.message : error.message;
            commit('SET_LOADING', false)
            toast.error(message);
            console.error("Login error:", error);
          }
        },
        async getMonthlyInsight({commit}) {
          commit('SET_LOADING', true)
          try {
            const response = await api.get('/insights/monthly');
            if(response && response.data && response.status == 200) {
              commit('setMonthlyInsight', response.data);
              commit('SET_LOADING', false)
            }
          }
          catch (error) {
            const message = error.response?.data?.message ? error.response?.data?.message : error.message;
            commit('SET_LOADING', false)
            toast.error(message);
            console.error("Login error:", error);
          }
        },
      },
      getters: {
        insight(state) {
          return state.insight;
        },
        monthlyInsight(state) {
          return state.monthlyInsight;
        },
      }
}