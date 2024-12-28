<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-5 gap-8">
        <div class="flex flex-col gap-6 2xl:col-span-3">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-3">
                <div class="card">
                    <div class="md:p-6 p-4 flex flex-col gap-2 md:gap-4">
                        <div class="flex flex-col gap-2 md:text-lg">
                            <div class="md:w-16 md:h-16 w-12 h-12 flex items-center justify-center bg-[#355C7D] rounded-2xl">
                                <img class="md:w-8 md:h-8 w-6 h-6" src="@/assets/icons/wallet.svg" alt="wallet">
                            </div>
                            My Balance
                        </div>
                        <div class="md:text-3xl text-xl font-semibold w-full truncate">#100,000</div>
                    </div>
                </div>
                <div class="card">
                    <div class="md:p-6 p-4 flex flex-col gap-2 md:gap-4">
                        <div class="flex flex-col gap-2 md:text-lg">
                            <div class="md:w-16 md:h-16 w-12 h-12 flex items-center justify-center bg-[#56B870] rounded-2xl">
                                <img class="md:w-8 md:h-8 w-6 h-6" src="@/assets/icons/income.svg" alt="wallet">
                            </div>
                            Total Income
                        </div>
                        <div class="md:text-3xl text-xl font-semibold w-full truncate">#100,000</div>
                    </div>
                </div>
                <div class="card">
                    <div class="md:p-6 p-4 flex flex-col gap-2 md:gap-4">
                        <div class="flex flex-col gap-2 md:text-lg">
                            <div class="md:w-16 md:h-16 w-12 h-12 flex items-center justify-center bg-red-600 rounded-2xl">
                                <img class="md:w-8 md:h-8 w-6 h-6" src="@/assets/icons/expense.svg" alt="wallet">
                            </div>
                            Total Expense
                        </div>
                        <div class="md:text-3xl text-xl font-semibold w-full truncate">#100,000</div>
                    </div>
                </div>
                <div class="card">
                    <div class="md:p-6 p-4 flex flex-col gap-2 md:gap-4">
                        <div class="flex flex-col gap-2 md:text-lg">
                            <div class="md:w-16 md:h-16 w-12 h-12 flex items-center justify-center bg-[#047857] rounded-2xl">
                                <img class="md:w-8 md:h-8 w-6 h-6" src="@/assets/icons/amount.svg" alt="wallet">
                            </div>
                            Total Budget Amount
                        </div>
                        <div class="md:text-3xl text-xl font-semibold w-full truncate">#100,000</div>
                    </div>
                </div>
                <div class="card">
                    <div class="md:p-6 p-4 flex flex-col gap-2 md:gap-4">
                        <div class="flex flex-col gap-2 md:text-lg">
                            <div class="md:w-16 md:h-16 w-12 h-12 flex items-center justify-center bg-[#6D28D9] rounded-2xl">
                                <img class="md:w-8 md:h-8 w-6 h-6" src="@/assets/icons/budgetWhite.svg" alt="wallet">
                            </div>
                            Total Weekly Budget
                        </div>
                        <div class="md:text-3xl text-xl font-semibold w-full truncate">#100,000</div>
                    </div>
                </div>
                <div class="card">
                    <div class="md:p-6 p-4 flex flex-col gap-2 md:gap-4">
                        <div class="flex flex-col gap-2 md:text-lg">
                            <div class="md:w-16 md:h-16 w-12 h-12 flex items-center justify-center bg-[#FFDAB9] rounded-2xl">
                                <img class="md:w-8 md:h-8 w-6 h-6" src="@/assets/icons/budget.svg" alt="wallet">
                            </div>
                            Total Monthly Budget
                        </div>
                        <div class="md:text-3xl text-xl font-semibold w-full truncate">#100,000</div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-x-6 gap-y-3">
                <div class="p-6 flex flex-col gap-4 bg-white big_card">
                    <div class="flex justify-between items-center">
                        <h4>Recent Transactions</h4>
                        <button @click="goToTransactions" class="text-light-blue p-2 hover:opacity-80">
                            Track all >
                        </button>
                    </div>
                    <div v-if="recentTransactions.length > 0 && !isLoading" class="flex flex-col gap-4">
                        <div class="grid grid-cols-3 md:grid-cols-4 gap-4 bg-deep-blue py-3 px-4 rounded-lg">
                            <div class="w-full">Amount</div>
                            <div class="w-full hidden md:block">Category</div>
                            <div class="w-full">Narration</div>
                            <div></div>
                        </div>
                        <div v-for="(transaction, index) in recentTransactions" :key="index">
                            <div class="grid grid-cols-3 md:grid-cols-4 gap-4 py-3 items-center px-4 rounded-lg">
                                <div class="text-green-400 pr-4 w-full truncate" :class="transaction.category !== 'Income'
                                    ? 'text-red-500'
                                    : 'text-green-400'
                                    ">
                                    #{{ transaction.amount.toLocaleString() }}
                                </div>
                                <div class="md:flex gap-2 items-center text-deep-blue hidden">
                                    <div class="md:h-[12px] md:w-[12px] w-2 h-2 rounded-full" :class="transaction.category !== 'Income'
                                        ? 'bg-red-500'
                                        : 'bg-green-400'
                                        "></div>
                                    <span class="truncate capitalize">{{ transaction.category }}</span>

                                </div>
                                <div class="text-deep-blue pr-4 w-full truncate capitalize flex">
                                    {{ transaction.narration }}
                                </div>
                                <button @click="toggleModal(transaction, 'transaction')"
                                    class="text-light-blue text-right hover:opacity-80">
                                    View
                                </button>
                            </div>
                            <div v-if="index !== recentTransactions.length - 1" class="h-[1px] w-full bg-light-grey">
                            </div>
                        </div>
                    </div>
                    <div v-else-if="recentTransactions.length === 0 && !isLoading"
                        class="h-[200px] w-full flex flex-col gap-4 justify-center items-center text-light-blue text-xl">
                        <img height="100" width="100" src="@/assets/images/no transaction.webp" alt="">
                        No recent transaction
                    </div>
                    <div v-if="isLoading"
                        class="h-[250px] xl:h-[400px] w-full flex flex-col gap-4 justify-center items-center">
                        <span class="loader"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="2xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 2xl:flex 2xl:flex-col gap-4">
            <div class="flex flex-col big_card order-2 xl:order-1 items-center graph rounded-[20px] p-4 gap-4">
                <div class="w-full text-start text-white">Total Income against Total Expense</div>
                <AppChart :data="chartTransactionData" :options="chartTransactionOptions" />
            </div>
            <div class="p-6 flex flex-col order-1 xl:order-2 gap-4 bg-white big_card h-full">
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
                                <button @click="toggleModal(budget, 'budget')"
                                    class="text-light-blue text-right hover:opacity-80">
                                    View
                                </button>
                            </div>
                            <div v-if="index !== recentBudgets.length - 1" class="h-[1px] w-full bg-light-grey">
                            </div>
                        </div>
                    </div>
                    <div v-else-if="recentBudgets.length === 0 && !isLoading"
                        class="w-full h-full flex flex-col gap-4 justify-center items-center text-light-blue text-xl">
                        <img height="100" width="100" src="@/assets/images/no transaction.webp" alt="">
                        No recent budgets
                    </div>
                    <div v-if="isLoading"
                        class="h-[250px] xl:h-[300px] w-full flex flex-col gap-4 justify-center items-center">
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
import AppChart from "@/components/AppChart.vue";
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
    if (type === 'budget') {
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

const chartTransactionData = {
    labels: ["Income", "Spending"],
    datasets: [
        {
            label: 'Transaction',
            data: [60, 40],
            backgroundColor: ["#95c6dd", "#2C3E50"]
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
                color: "white"
            }
        }
    }
}
</script>

<style scoped>
.card {
    background: #95c6dd;
    border-radius: 8px;
    box-shadow: 0 1px 1px #000;
}

.graph {
    background: #4c92c0;
}
</style>
