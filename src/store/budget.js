// import api from "@/api/api";

export default {
    state: {
        budgets: [
            {
                id: 1,
                title: 'Food',
                amount: '50,000',
                duration: 'Weekly',
                isOpen: false,
            },
            {
                id: 2,
                title: 'House',
                amount: '200,000,000',
                duration: 'Monthly',
                isOpen: false,
            },
            {
                id: 3,
                title: 'Dstv',
                amount: '50,000',
                duration: 'Monthly',
                isOpen: false,
            },
            {
                id: 4,
                title: 'Fuel',
                amount: '100,000',
                duration: 'Monthly',
                isOpen: false,
            },
            {
                id: 5,
                title: 'Data',
                amount: '20,000',
                duration: 'Monthly',
                isOpen: false,
            },
            {
                id: 6,
                title: 'Entertainment',
                amount: '200,000',
                duration: 'Monthly',
                isOpen: false,
            },
        ]
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
          commit('addBudget', budget);
        },
        removeBudget({ commit }, id) {
          commit('removeBudget', id);
        }
      },
      getters: {
        allBudgets(state) {
          return state.budgets;
        },
      }
}