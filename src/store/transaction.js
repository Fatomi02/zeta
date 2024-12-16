// import api from "@/api/api";

export default {
    state: {
        transactions: [
            {
                id: 1,
                amount: 50000,
                category: 'Income',
                narration: '',
                isOpen: false,
            },
            {
                id: 2,
                amount: 200000000,
                category: 'Spending',
                narration: '',
                isOpen: false,
            },
            {
                id: 3,
                amount: 50000,
                category: 'Spending',
                narration: '',
                isOpen: false,
            },
            {
                id: 4,
                amount: 100000,
                category: 'Income',
                narration: '',
                isOpen: false,
            },
            {
                id: 5,
                amount: 20000,
                category: 'Income',
                narration: '',
                isOpen: false,
            },
            {
                id: 6,
                amount: 200000,
                category: 'Spending',
                narration: '',
                isOpen: false,
            },
        ]
    },
    mutations: {
        addTransaction(state, transaction) {
          state.transactions.push(transaction);
        },
        removeTransaction(state, id) {
          state.transactions = state.transactions.filter(transaction => transaction.id !== id);
        }
      },
      actions: {
        addTransaction({ commit }, transaction) {
          commit('addTransaction', transaction);
        },
        removeTransaction({ commit }, id) {
          commit('removeTransaction', id);
        }
      },
      getters: {
        allTransactions(state) {
          return state.transactions;
        },
      }
}