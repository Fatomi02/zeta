<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
            <h1 class="font-medium text-2xl md:text-3xl">Dashboard</h1>
            <span>Welcome! See overview of your recent budgets, transactions and quick
                access to FinCore.</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-3">
            <div class="bg-deep-blue card">
                <div class="p-4 flex flex-col">
                    <div class="flex flex-col gap-2 text-cyan">
                        Total Income
                        <h3 class="text-2xl font-semibold text-green-400">#100,000</h3>
                    </div>
                </div>
            </div>
            <div class="bg-deep-blue card">
                <div class="p-4 flex flex-col">
                    <div class="flex flex-col gap-2 text-cyan">
                        Total Amount Spent
                        <h3 class="text-2xl font-semibold text-red-500">#60,000</h3>
                    </div>
                </div>
            </div>
            <div class="bg-deep-blue card">
                <div class="p-4 flex flex-col">
                    <div class="flex flex-col gap-2 text-cyan">
                        Total Balance
                        <h3 class="text-2xl font-semibold text-white">#40,000</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-3">
            <div class="p-6 flex flex-col gap-4 bg-white card">
                <div class="flex justify-between items-center">
                    <h4>Recent Transactions</h4>
                    <button @click="goToTransactions" class="text-light-blue p-2 hover:opacity-80">
                        Track all >
                    </button>
                </div>
                <div v-if="recentTransactions.length > 0" class="flex flex-col gap-4">
                    <div class="grid grid-cols-3 md:grid-cols-4 gap-4 bg-deep-blue py-3 px-4 rounded-lg">
                        <div class="w-full">Narration</div>
                        <div class="w-full">Amount</div>
                        <div class="w-full hidden md:block">Category</div>
                        <button class="text-light-blue text-right hover:opacity-80">
                            View
                        </button>
                    </div>
                    <div v-for="(transaction, index) in recentTransactions" :key="index">
                        <div class="grid grid-cols-3 md:grid-cols-4 gap-4 py-3 items-center px-4 rounded-lg">
                            <div class="text-deep-blue pr-4 w-full truncate">
                                {{ transaction.narration }}
                            </div>
                            <div class="text-green-400 pr-4 w-full truncate" :class="transaction.category !== 'Income'
                                    ? 'text-red-500'
                                    : 'text-green-400'
                                ">
                                #{{ transaction.amount.toLocaleString() }}
                            </div>
                            <div class="md:flex gap-2 items-center text-deep-blue hidden">
                                <div class="h-[12px] w-[12px] rounded-full" :class="transaction.category !== 'Income'
                                        ? 'bg-red-500'
                                        : 'bg-green-400'
                                    "></div>
                                    <span class="truncate">{{ transaction.category }}</span>
                                
                            </div>
                            <button class="text-light-blue text-right hover:opacity-80">
                                View
                            </button>
                        </div>
                        <div v-if="index !== recentTransactions.length - 1" class="h-[1px] w-full bg-light-grey"></div>
                    </div>
                </div>
                <div v-else class="h-[200px] xl:h-[400px] w-full flex flex-col gap-4 justify-center items-center text-light-blue text-xl">
                    <img height="100" width="100" src="@/assets/images/no transaction.webp" alt="">
                    No recent transaction
                </div>
            </div>
            <div class="p-6 flex flex-col gap-4 bg-white card">
                <div class="flex justify-between items-center">
                    <h2>Recent added budgets</h2>
                    <button @click="goToBudgets" class="text-light-blue p-2 hover:opacity-80">
                        Track all >
                    </button>
                </div>
                <div v-if="recentBudgets.length > 0" class="flex flex-col gap-4">
                    <div class="grid grid-cols-3 md:grid-cols-4 gap-4 bg-deep-blue py-3 px-4 rounded-lg">
                        <div class="pr-4 lg:pr-6 w-full">Title</div>
                        <div class="pr-4 lg:pr-6 w-full">Amount</div>
                        <div class="pr-4 lg:pr-6 w-full hidden md:block">Duration</div>
                        <button class="text-light-blue text-right hover:opacity-80">
                            View
                        </button>
                    </div>
                    <div v-for="(budget, index) in recentBudgets" :key="index">
                        <div class="grid grid-cols-3 md:grid-cols-4 gap-4 py-3 items-center px-4 rounded-lg">
                            <div class="text-deep-blue pr-4 lg:pr-6 w-full truncate">
                                {{ budget.title }}
                            </div>
                            <div class="text-deep-blue pr-4 lg:pr-6 w-full truncate">
                                #{{ budget.amount.toLocaleString() }}
                            </div>
                            <div class="md:flex gap-2 items-center pr-4 lg:pr-6 text-deep-blue w-full truncate hidden">
                                {{ budget.duration }}
                            </div>
                            <button class="text-light-blue text-right hover:opacity-80">
                                View
                            </button>
                        </div>
                        <div v-if="index !== recentTransactions.length - 1" class="h-[1px] w-full bg-light-grey"></div>
                    </div>
                </div>
                <div v-else class="h-[200px] xl:h-[400px] w-full flex flex-col gap-4 justify-center items-center text-light-blue text-xl">
                    <img height="100" width="100" src="@/assets/images/no transaction.webp" alt="">
                    No recent budgets
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const recentTransactions = computed(() => store.getters["recentTransactions"]);
const recentBudgets = computed(() => store.getters["recentBudgets"]);

const goToTransactions = () => {
    router.push("/dashboard/transactions");
};

const goToBudgets = () => {
    router.push("/dashboard/budgets");
};

onMounted(()=> {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log(recentTransactions.value)
})
</script>

<style scoped>
.card {
    border-radius: 8px;
    box-shadow: 0 2px 2px #000;
}
</style>
