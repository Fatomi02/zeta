<!-- eslint-disable vue/multi-word-component-names
<template>
    <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
            <h1 class="font-medium text-2xl md:text-3xl">Financial Insight</h1>
            <span>Keep track of your budget and transaction history.</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-10 pb-4">
            <div
                class="bg-deep-blue min-h-[200px] grid grid-cols-1 md:grid-cols-2  justify-center items-center rounded-[20px]">
                <div class="p-4 flex lg:justify-center">
                    <div class="flex flex-col gap-4 text-cyan">
                        Total Budget Amount
                        <h3 class="text-4xl font-bold">#100, 000</h3>
                    </div>
                </div>
                <div class="p-4 flex flex-col gap-4">
                    <div class="flex flex-col gap-2 text-cyan">
                        Total Weekly Budget Amount
                        <h3 class="text-2xl font-bold">#50, 000</h3>
                    </div>
                    <div class="flex flex-col gap-2 text-cyan">
                        Total Monthly Budget Amount
                        <h3 class="text-2xl font-bold">#50, 000</h3>
                    </div>
                </div>
            </div>
            <div
                class="bg-deep-blue min-h-[200px] grid grid-cols-1 md:grid-cols-2  justify-center items-center rounded-[20px]">
                <div class="p-4 flex lg:justify-center">
                    <div class="flex flex-col gap-4 text-cyan">
                        Total Balance
                        <h3 class="text-4xl font-bold">#20, 000</h3>
                    </div>
                </div>
                <div class="p-4 flex flex-col gap-4">
                    <div class="flex flex-col gap-2 text-cyan">
                        Total Income
                        <h3 class="text-2xl font-bold">#60, 000</h3>
                    </div>
                    <div class="flex flex-col gap-2 text-cyan">
                        Total Money Spent
                        <h3 class="text-2xl font-bold">#40, 000</h3>
                    </div>
                </div>
            </div>
            <div class="flex flex-col bg-white text-dark-grey rounded-[20px] p-4 gap-4">
                Budget Chart
                <AppChart :data="chartBudgetData" :options="chartBudgetOptions" />
            </div>
            <div class="flex flex-col bg-white text-dark-grey rounded-[20px] p-4 gap-4">
                Total Income against Total Money Spent
                <AppChart :data="chartTransactionData" :options="chartTransactionOptions" />
            </div>
        </div>
    </div>
</template>

<script setup>
import AppChart from '@/components/AppChart.vue';
import { onMounted } from 'vue';
onMounted(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
})

const chartBudgetData = {
    labels: ["Food", "Data", "House", "Fuel"],
    datasets: [
        {
            label: 'Budget',
            data: [20, 30, 10, 40],
            backgroundColor: ["blue", "black", "red", "green"]
        }
    ]
}

const chartBudgetOptions = {
    animation: {
        duration: 1000,
    },
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                color: "#141414"
            }
        }
    }
}

const chartTransactionData = {
    labels: ["Income", "Spending"],
    datasets: [
        {
            label: 'Transaction',
            data: [60, 40],
            backgroundColor: ["blue", "black"]
        }
    ]
}


const chartTransactionOptions = {
    animation: {
        duration: 1000,
    },
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                color: "#141414"
            }
        }
    }
}
</script> -->
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
                <div v-if="recentTransactions.length > 0 && !isLoading" class="flex flex-col gap-4">
                    <div class="grid grid-cols-3 md:grid-cols-4 gap-4 bg-deep-blue py-3 px-4 rounded-lg">
                        <div class="w-full">Narration</div>
                        <div class="w-full">Amount</div>
                        <div class="w-full hidden md:block">Category</div>
                        <div></div>
                    </div>
                    <div v-for="(transaction, index) in recentTransactions" :key="index">
                        <div class="grid grid-cols-3 md:grid-cols-4 gap-4 py-3 items-center px-4 rounded-lg">
                            <div class="text-deep-blue pr-4 w-full truncate capitalize">
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
                                <span class="truncate capitalize">{{ transaction.category }}</span>

                            </div>
                            <button @click="toggleModal(transaction, 'transaction')" class="text-light-blue text-right hover:opacity-80">
                                View
                            </button>
                        </div>
                        <div v-if="index !== recentTransactions.length - 1" class="h-[1px] w-full bg-light-grey"></div>
                    </div>
                </div>
                <div v-else-if="recentTransactions.length === 0 && !isLoading"
                    class="h-[200px] xl:h-[400px] w-full flex flex-col gap-4 justify-center items-center text-light-blue text-xl">
                    <img height="100" width="100" src="@/assets/images/no transaction.webp" alt="">
                    No recent transaction
                </div>
                <div v-if="isLoading"
                    class="h-[250px] xl:h-[400px] w-full flex flex-col gap-4 justify-center items-center">
                    <span class="loader"></span>
                </div>
            </div>
            <div class="p-6 flex flex-col gap-4 bg-white card">
                <div class="flex justify-between items-center">
                    <h2>Recent added budgets</h2>
                    <button @click="goToBudgets" class="text-light-blue p-2 hover:opacity-80">
                        Track all >
                    </button>
                </div>
                <div v-if="recentBudgets.length > 0 && !isLoading" class="flex flex-col gap-4">
                    <div class="grid grid-cols-3 md:grid-cols-4 gap-4 bg-deep-blue py-3 px-4 rounded-lg">
                        <div class="pr-4 lg:pr-6 w-full">Title</div>
                        <div class="pr-4 lg:pr-6 w-full">Amount</div>
                        <div class="pr-4 lg:pr-6 w-full hidden md:block">Duration</div>
                        <div></div>
                    </div>
                    <div v-for="(budget, index) in recentBudgets" :key="index">
                        <div class="grid grid-cols-3 md:grid-cols-4 gap-4 py-3 items-center px-4 rounded-lg">
                            <div class="text-deep-blue pr-4 lg:pr-6 w-full truncate capitalize">
                                {{ budget.title }}
                            </div>
                            <div class="text-deep-blue pr-4 lg:pr-6 w-full truncate">
                                #{{ budget.total_amount.toLocaleString() }}
                            </div>
                            <div
                                class="md:flex gap-2 items-center pr-4 lg:pr-6 text-deep-blue w-full truncate hidden capitalize">
                                {{ budget.duration }}
                            </div>
                            <button @click="toggleModal(budget, 'budget')" class="text-light-blue text-right hover:opacity-80">
                                View
                            </button>
                        </div>
                        <div v-if="index !== recentTransactions.length - 1" class="h-[1px] w-full bg-light-grey"></div>
                    </div>
                </div>
                <div v-else-if="recentBudgets.length === 0 && !isLoading"
                    class="h-[200px] xl:h-[400px] w-full flex flex-col gap-4 justify-center items-center text-light-blue text-xl">
                    <img height="100" width="100" src="@/assets/images/no transaction.webp" alt="">
                    No recent budgets
                </div>
                <div v-if="isLoading"
                    class="h-[250px] xl:h-[400px] w-full flex flex-col gap-4 justify-center items-center">
                    <span class="loader"></span>
                </div>
            </div>
        </div>
    </div>
    <transition name="fade-right">
        <AppModal :isOpen="viewBudgetModalIsOpen">
            <div class="w-[96%] lg:w-[600px] rounded-3xl bg-white py-10 px-8 flex flex-col gap-10">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Title</h2>
                            <span class="capitalize">{{ viewBudgetData.title }}</span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Budget Amount</h2>
                            <span>{{ viewBudgetData.total_amount.toLocaleString() }}</span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Duration</h2>
                            <span class="capitalize">{{ viewBudgetData.duration }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col mt-4 lg:mt-0 gap-4">
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Time Created</h2>
                            <span>{{ new Date(viewBudgetData.createdAt).toLocaleString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                }) }}</span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Last Time Updated</h2>
                            <span>{{ new Date(viewBudgetData.updatedAt).toLocaleString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                }) }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center gap-4">
                    <AppBtn @click="toggleModal(null, 'budget')">Close</AppBtn>
                </div>
            </div>
        </AppModal>
    </transition>
    <transition name="fade-right">
        <AppModal :isOpen="viewTransactionModalIsOpen">
            <div class="w-[90%] lg:w-[600px] rounded-3xl bg-white py-10 px-8 flex flex-col gap-10">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Budget Amount</h2>
                            <span>{{ viewTransactionData.amount.toLocaleString() }}</span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Duration</h2>
                            <span class="capitalize">{{ viewTransactionData.category }}</span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Narration</h2>
                            <span class="capitalize">{{ viewTransactionData.narration }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col mt-4 lg:mt-0 gap-4">
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Time Created</h2>
                            <span>{{ new Date(viewTransactionData.createdAt).toLocaleString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                }) }}</span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl">Last Time Updated</h2>
                            <span>{{ new Date(viewTransactionData.updatedAt).toLocaleString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                }) }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center gap-4">
                    <AppBtn @click="toggleModal(null, 'transaction')">Close</AppBtn>
                </div>
            </div>
        </AppModal>
    </transition>
</template>

<script setup>
import AppBtn from "@/components/AppBtn.vue";
import AppModal from "@/components/AppModal.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const viewBudgetData = ref();
const viewTransactionData = ref();
const viewBudgetModalIsOpen = ref(false);
const viewTransactionModalIsOpen = ref(false);
const recentTransactions = computed(() => store.getters["recentTransactions"]);
const recentBudgets = computed(() => store.getters["recentBudgets"]);

const goToTransactions = () => {
    router.push("/dashboard/transactions");
};

const goToBudgets = () => {
    router.push("/dashboard/budgets");
};

const toggleModal = (data, type) => {
    if(type === 'budget') {
        viewBudgetData.value = data;
        viewBudgetModalIsOpen.value = !viewBudgetModalIsOpen.value;
    }
    else {
        viewTransactionData.value = data;
        viewTransactionModalIsOpen.value = !viewTransactionModalIsOpen.value;
    }
}

const isLoading = computed(() => store.state.auth.fetchAllIsLoading)

onMounted(() => {
    store.dispatch('getAllBudget');
    store.dispatch('getAllTransactions');
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

})
</script>

<style scoped>
.card {
    border-radius: 8px;
    box-shadow: 0 2px 2px #000;
}
</style>