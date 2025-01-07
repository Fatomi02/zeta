import { createStore } from "vuex";
import authModule from './auth'
import budgetModule from './budget';
import transactionModule from './transaction';
import insightModule from './insight'

export const store = createStore({
    modules: {
        auth: authModule,
        budget: budgetModule,
        transaction: transactionModule,
        insight: insightModule
    }
})
