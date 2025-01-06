import api from "@/api/api";
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
    state: {
        transactions: [
        ],
        pageSize: 10,
        currentPage: 1,
    },
    mutations: {
      setTransactions(state, budgets) {
        state.transactions = budgets;
      },
      setCurrentTransactionPage(state, page) {
        state.currentPage = page;
      },
      },

      actions: {
        async getAllTransactions({commit}) {
          commit('SET_FETCH_LOADING', true)
          try {
            const response = await api.get('/transactions');
            if(response && response.data && response.status == 200) {
              commit('setTransactions', response.data);
              commit('SET_FETCH_LOADING', false)
            }
          }
          catch (error) {
            const message = error.response?.data?.message ? error.response?.data?.message : error.message;
            commit('SET_FETCH_LOADING', false);
            toast.error(message);
            console.error("Login error:", error);
          }
        },

        async addTransaction({ commit, dispatch }, transaction) {
          const payload = {
            narration: transaction.narration,
            amount: transaction.amount,
            category: transaction.category,
            budget_id: transaction.budget_id
          }
          commit('SET_LOADING', true);
          try {
            const response = await api.post('/transactions', payload);
            if(response && response.data && response.status === 201) {
              const message = response.data.message ? response.data.message : 'Added successfully';
              commit('SET_LOADING', false);
              toast.success(message);
              dispatch('getAllTransactions', transaction);
            }
          } catch(error) {
            const message = error.response?.data?.message ? error.response?.data?.message : error.message;
            commit('SET_LOADING', false);
            toast.error(message);
            console.error(error);
          }

        },

        async deleteTransaction({ commit, dispatch }, id) {
          try {
            commit('SET_LOADING', true);
            const response = await api.delete(`/transactions/${id}`);
            if(response && response.status == 200) {
              const message = response.data.message ? response.data.message : 'Deleted successfully';
              commit('SET_LOADING', false);
              toast.success(message);
              dispatch('getAllTransactions');
            }
          } catch (error) {
            const message = error.response?.data?.message ? error.response?.data?.message : error.message;
            commit('SET_LOADING', false);
            toast.error(message);
            console.error(error);
          }
        },
        async updateTransactions({ dispatch, commit }, transaction) {
          const payload = {
            narration: transaction.narration,
            amount: transaction.amount,
            category: transaction.category,
          }
          try {
            commit('SET_LOADING', true);
            const response = await api.put(`/transactions/${transaction._id}`, payload);
            if(response) {
              const message = response.data.message ? response.data.message : 'Updated successfully';
              commit('SET_LOADING', false);
              toast.success(message);
              dispatch('getAllTransactions');
            }
          } catch (error) {
            const message = error.response?.data?.message ? error.response?.data?.message : error.message;
            commit('SET_LOADING', false);
            toast.error(message);
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
        },
        paginatedTransactions(state) {
          const start = (state.currentPage - 1) * state.pageSize;
          const end = state.currentPage * state.pageSize;
          return state.transactions.slice().reverse().slice(start, end);
        },
        totalTransactionPage(state) {
          return Math.ceil(state.transactions.length / state.pageSize);
        },
        totalIncome(state) {
          return state.transactions
            .filter(transaction => transaction.category.toLowerCase() === "income")
            .reduce((total, transaction) => total + transaction.amount, 0);
        },
        totalExpense(state) {
          return state.transactions
            .filter(transaction => transaction.category.toLowerCase() === "spending")
            .reduce((total, transaction) => total + transaction.amount, 0);
        },
      }
}