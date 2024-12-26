import api from "@/api/api";

export default {
    state: {
        budgets: []
    },
    mutations: {
        removeBudget(state, id) {
          state.budgets = state.budgets.filter(budget => budget._id !== id);
        },
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
            commit('SET_FETCH_LOADING', false)
            console.error("Login error:", error);
          }
        },
        async addBudget({ commit, dispatch }, budget) {
          const payload = {
            title: budget.title,
            total_amount: budget.amount,
            duration: budget.duration.toLowerCase()
          }
          commit('SET_LOADING', true)
          try {
            const response = await api.post('/budgets', payload);
            if (response && response.data) {
              dispatch('getAllBudget');
              commit('SET_LOADING', false);
            }
          } catch (error) {
            console.error(error);
            commit('SET_LOADING', false);
          }
        },
        removeBudget({ commit }, id) {
          console.log(id)
          commit('removeBudget', id);
        },
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