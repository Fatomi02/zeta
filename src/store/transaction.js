import api from "@/api/api";

export default {
    state: {
        transactions: [
        ]
    },
    mutations: {
      setTransactions(state, budgets) {
        state.transactions = budgets;
      }
      },

      actions: {
        async getAllTransactions({commit}) {
          commit('SET_FETCH_LOADING', true)
          try {
            const response = await api.get('/transactions');
            if(response && response.data) {
              commit('setTransactions', response.data);
              commit('SET_FETCH_LOADING', false)
            }
          }
          catch (error) {
            commit('SET_FETCH_LOADING', false)
            console.error("Login error:", error);
          }
        },
        async addTransaction({ commit, dispatch }, transaction) {
          const payload = {
            narration: transaction.narration,
            amount: transaction.amount,
            category: transaction.category,
          }
          commit('SET_LOADING', true);
          try {
            const response = await api.post('/transactions', payload);
            if(response && response.data) {
              commit('SET_LOADING', false);
              dispatch('getAllTransactions', transaction);
            }
          } catch(error) {
            commit('SET_LOADING', false);
            console.error(error);
          }

        },
        async deleteTransaction({ commit, dispatch }, id) {
          try {
            commit('SET_LOADING', true);
            const response = await api.delete(`/transactions/:${id}`);
            if(response) {
              commit('SET_LOADING', false);
              dispatch('getAllTransactions');
            }
          } catch (error) {
            commit('SET_LOADING', false);
            console.error(error);
          }
        },
        async updateTransactions({ dispatch, commit }, data) {
          try {
            commit('SET_LOADING', true);
            const response = await api.put(`/transactions/:${data.id}`, data);
            if(response) {
              commit('SET_LOADING', false);
              dispatch('getAllTransactions');
            }
          } catch (error) {
            commit('SET_LOADING', false);
            console.error(error);
          }
        }
      },

      getters: {
        allTransactions(state) {
          return state.transactions.slice().reverse();
        },
        recentTransactions(state) {
          return state.transactions.slice().reverse().slice(0, 5);
        }
      }
}