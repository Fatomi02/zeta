// import api from "@/api/api";

export default {
    state: {
        transactions: [
            {
                id: 1,
                amount: 50000,
                category: 'Income',
                narration: 'Income from work',
            },
            {
                id: 2,
                amount: 200000000,
                category: 'Spending',
                narration: 'For housing',
            },
            {
                id: 3,
                amount: 50000,
                category: 'Spending',
                narration: 'For data subscription',
            },
            {
                id: 4,
                amount: 100000,
                category: 'Income',
                narration: 'Income from investment',
            },
            {
                id: 5,
                amount: 20000,
                category: 'Income',
                narration: 'Income from event',
            },
            {
                id: 6,
                amount: 200000,
                category: 'Spending',
                narration: 'Spending on transport huygkfwkfwg,hyukfyugw,hfgyukgw,ykf,hbgyklw,fbhgywl,fhebigywlefhhkwiglyer',
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
        recentTransactions(state) {
          return state.transactions.slice(0, 5)
        }
      }
}