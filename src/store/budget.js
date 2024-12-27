import api from "@/api/api";
import { useToast } from 'vue-toastification';

const toast = useToast();


export default {
    state: {
        budgets: []
    },
    mutations: {
        setBudgets(state, budgets) {
          state.budgets = budgets;
        }
      },
      actions: {
        async getAllBudget({commit}) {
          commit('SET_FETCH_LOADING', true)
          try {
            const response = await api.get('/budgets');
            if(response && response.data && response.status == 200) {
              commit('setBudgets', response.data);
              commit('SET_FETCH_LOADING', false)
            }
          }
          catch (error) {
            const message = error.response.data.message ? error.response.data.message : error.message;
            commit('SET_FETCH_LOADING', false)
            toast.error(message);
            console.error("Login error:", error);
          }
        },

        async addBudget({ commit, dispatch }, budget) {
          const payload = {
            title: budget.title,
            total_amount: budget.total_amount,
            duration: budget.duration.toLowerCase(),
          }
          commit('SET_LOADING', true)
          try {
            const response = await api.post('/budgets', payload);
            if (response && response.data && response.status === 201) {
              const message = response.data.message ? response.data.message : 'Added successfully';
              commit('SET_LOADING', false);
              toast.success(message);
              dispatch('getAllBudget');
            }
          } catch (error) {
            const message = error.response.data.message ? error.response.data.message : error.message;
            commit('SET_LOADING', false);
            toast.error(message);
            console.error(error);
          }
        },

        async deleteBudget({ dispatch, commit }, id) {
          try {
            commit('SET_LOADING', true);
            const response = await api.delete(`budgets/${id}`);
            if(response && response.status === 204) {
              const message = response.data.message ? response.data.message : 'Deleted successfully';
              commit('SET_LOADING', false);
              toast.success(message);
              dispatch('getAllBudget');
            }
          } catch (error) {
            const message = error.response.data.message ? error.response.data.message : error.message;
            commit('SET_LOADING', false);
            toast.error(message);
            console.error(error);
          }
        },

        async updateBudget({ dispatch, commit }, budget) {
          const payload = {
            title: budget.title,
            total_amount: budget.total_amount,
            duration: budget.duration.toLowerCase(),
          }
          try {
            commit('SET_LOADING', true);
            const response = await api.put(`/budgets/${budget._id}`, payload);
            if(response) {
              const message = response.data.message ? response.data.message : 'Updated successfully';
              commit('SET_LOADING', false);
              toast.success(message);
              dispatch('getAllBudget');
            }
          } catch (error) {
            const message = error.response.data.message ? error.response.data.message : error.message;
            commit('SET_LOADING', false);
            toast.error(message);
            console.error(error);
          }
        }
      },
      getters: {
        allBudgets(state) {
          return state.budgets.slice().reverse();
        },

        recentBudgets(state) {
          return state.budgets.slice().reverse().slice(0, 5);
        }
      }
}