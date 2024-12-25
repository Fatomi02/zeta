// import api from "@/api/api";

export default {
    state: {
        budgets: [
            {
                id: 1,
                title: 'Food',
                amount: 50000,
                duration: 'Weekly',
            },
            {
                id: 2,
                title: 'House',
                amount: 200000000,
                duration: 'Monthly',
            },
            {
                id: 3,
                title: 'Dstv',
                amount: 50000,
                duration: 'Monthly',
            },
            {
                id: 4,
                title: 'Fuel',
                amount: 100000,
                duration: 'Monthly',
            },
            {
                id: 5,
                title: 'Data',
                amount: 20000,
                duration: 'Monthly',
            },
            {
                id: 6,
                title: 'Entertainment',
                amount: 200000,
                duration: 'Monthly',
            },
        ],
    },
    mutations: {
        addBudget(state, budget) {
          state.budgets.push(budget);
        },
        removeBudget(state, id) {
          state.budgets = state.budgets.filter(budget => budget.id !== id);
        }
      },
      actions: {
        addBudget({ commit }, budget) {
          const payload = {
            title: budget.title,
            amount: budget.amount,
            duration: budget.duration
          }
          commit('addBudget', payload);
        },
        removeBudget({ commit }, id) {
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