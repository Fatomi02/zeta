import api from "@/api/api";

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
            if(response && response.data) {
              commit('setBudgets', response.data);
              commit('SET_FETCH_LOADING', false)
            }
          }
          catch (error) {
            const errRes = { message: error.message, status: false }
            commit('SET_FETCH_LOADING', false)
            commit('SET_RESPONSE', errRes);
            setTimeout(()=> {
              commit('CLEAR_RESPONSE')
            }, 8000);
            console.error("Login error:", error);
          }
        },
        async addBudget({ commit, dispatch }, budget) {
          const payload = {
            title: budget.title,
            total_amount: budget.amount,
            duration: budget.duration.toLowerCase(),
          }
          commit('SET_LOADING', true)
          try {
            const response = await api.post('/budgets', payload);
            const res = {...response.data, status: true};
            if (response && response.data) {
              commit('SET_LOADING', false);
              dispatch('getAllBudget');
              commit('SET_RESPONSE', res);
              setTimeout(()=> {
                commit('CLEAR_RESPONSE')
              }, 8000)
            }
          } catch (error) {
            const errRes = { message: error.message, status: false }
            console.error(error);
            commit('SET_LOADING', false);
            commit('SET_RESPONSE', errRes);
            setTimeout(()=> {
              commit('CLEAR_RESPONSE')
            }, 8000)
          }
        },
        async deleteBudget({ dispatch, commit }, id) {
          try {
            commit('SET_LOADING', true);
            const response = await api.delete(`budgets/:${id}`);
            if(response) {
              commit('SET_LOADING', false);
              dispatch('getAllBudget');
            }
          } catch (error) {
            commit('SET_LOADING', false);
            console.error(error);
          }
        },
        async updateBudget({ dispatch, commit }, data) {
          try {
            commit('SET_LOADING', true);
            const response = await api.put(`/budgets/:${data.id}`, data);
            if(response) {
              commit('SET_LOADING', false);
              dispatch('getAllBudget');
            }
          } catch (error) {
            commit('SET_LOADING', false);
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