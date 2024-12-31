<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div @click="closeMenu" class="flex flex-col gap-6 h-full">
        <div class="p-6 flex flex-col md:flex-row xl:items-center rounded-2xl bg-blue">
            <div class="flex flex-col items-start gap-4">
                <div class="flex flex-col gap-1">
                    <h2 class="text-2xl lg:text-3xl font-medium text-white">Transaction Management</h2>
                    <span class="text-light-grey">Welcome! Easily create, edit, and delete transactions to manage your
                        finances and keep track of your
                        spending..</span>
                </div>
                <button @click="redirectToSummary"
                    class="flex items-center bg-white rounded-lg py-[6px] px-3 text-[14px] text-[#0D3051]">
                    Go to Dashboard <img class="inline-block ml-1" src="@/assets/icons/arrow_diagonal_blue.svg"
                        alt=""></button>
            </div>
        </div>
        <div class="flex flex-col mb-4 gap-4 lg:gap-6">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold">Transaction</h2>
                <AppBtn @click="toggleModal(null, 'add')">
                    <img src="@/assets/icons/Add.svg" alt="add">
                    Add transaction
                </AppBtn>
            </div>
            <DashboardCard type="transaction" :data="transactions"></DashboardCard>
            <div class="flex flex-col md:flex-row justify-between items-center w-full">
                <div class="w-full md:w-auto">
                    <AppInput type="search" name="narrationSearch" id="narrationSearch" v-model="search.narration"
                        placeholder="Search transactions"></AppInput>
                </div>
                <div class="flex justify-between md:justify-start md:gap-4 items-center w-full md:w-auto">
                    <AppInput type="select" :selectArray="['Income', 'Spending']" v-model="search.category"
                        name="categorySearch" id="categorySearch" placeholder="Select a category"></AppInput>
                    <div class="flex bg-white big_card">
                        <button @click="isTableView = true" :class="isTableView ? 'active' : ''"
                            class="p-2 rounded-s-md"><img class="h-6 w-6" src="@/assets/icons/table.svg"
                                alt=""></button>
                        <button @click="isTableView = false" :class="!isTableView ? 'active' : ''"
                            class="p-2 rounded-e-md"><img class="h-6 w-6" src="@/assets/icons/card.svg" alt=""></button>
                    </div>
                </div>
            </div>
            <h2 v-if="search.narration || search.category" class="font-medium pl-2 lg:my-[-15px]">{{
                filteredTransaction.length }} filtered transaction</h2>
            <div class="flex flex-col gap-4 lg:gap-6 mb-6" :class="isTableView && !isLoading && filteredTransaction.length ? 'p-3 big_card bg-white': ''">
                <div v-if="filteredTransaction.length > 0 && !isLoading && !isTableView" class="flex flex-col gap-4">
                    <div v-for="(transaction, index) in filteredTransaction" :key="index"
                        class="w-full py-3 px-5 lg:p-5 xl:p-8 grid grid-cols-3 item lg:grid-cols-4 gap-4 justify-between bg-blue border border-cyan rounded-2xl">
                        <div class="hidden lg:flex flex-col items-start gap-1 capitalize">
                            <h4 class="text-[12px] font-semibold">Narration</h4>
                            <div class="truncate w-full text-light-grey">{{ transaction.narration }}</div>
                        </div>
                        <div class="flex w-full flex-col items-start gap-1">
                            <h4 class="text-[12px] font-semibold">Amount</h4>
                            <div class="w-full truncate font-semibold" :class="transaction.category.toLowerCase() !== 'income'
                                ? 'text-red-400'
                                : 'text-green-400'
                                ">${{ transaction.amount.toLocaleString() }}</div>
                        </div>
                        <div class="flex truncate w-full flex-col items-start gap-1 capitalize text-light-grey">
                            <h4 class="text-[12px] font-semibold">Category</h4>
                            {{ transaction.category }}
                        </div>
                        <div class="flex justify-end relative">
                            <img @click.stop.prevent="openMenu(transaction)" class="cursor-pointer"
                                src="@/assets/icons/action.svg" alt="action">
                            <div v-if="transaction.isOpen"
                                :class="index === filteredTransaction.length - 1 && index > 1 ? 'top-[-110px]' : 'top-10'"
                                class="item-menu w-[150px] lg:w-[200px]">
                                <div @click="toggleModal(transaction, 'view')"
                                    class="px-6 py-2 text-deep-blue hover:bg-blue">View</div>
                                <div @click="toggleModal(transaction, 'edit')"
                                    class="px-6 py-2 text-deep-blue hover:bg-blue">Edit</div>
                                <div @click.stop.prevent="toggleModal(transaction._id, 'delete')"
                                    class="px-6 py-2 text-red-800 hover:bg-red-500">Delete</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="filteredTransaction.length && !search.narration && !search.category" class="border-t border-t-gray-300 p-3 flex justify-between items-center">
                            <AppPagination :totalItems="transactions.length" :currentPage="currentPage" @pageChange="handlePageChange" />
                    </div>
                </div>
                <div v-if="filteredTransaction.length > 0 && !isLoading && isTableView" class="flex flex-col">
                    <div
                        class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-4 bg-blue py-3 px-4 rounded-lg">
                        <div class="pr-4 lg:pr-6 w-full hidden md:block text-white">Id</div>
                        <div class="pr-4 lg:pr-6 w-full text-white">Narration</div>
                        <div class="pr-4 lg:pr-6 w-full text-white">Amount</div>
                        <div class="pr-4 lg:pr-6 w-full hidden md:block text-white">Category</div>
                        <div class="pr-4 lg:pr-6 w-full hidden md:block lg:hidden xl:block text-white">Date</div>
                        <div></div>
                    </div>
                    <div v-for="(transaction, index) in filteredTransaction" :key="index">
                        <div
                            class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-4 px-4 lg:hover:bg-partial-white cursor-pointer">
                            <div class="pr-4 lg:pr-6 w-full truncate hidden md:block">
                                {{ transaction._id }}
                            </div>
                            <div
                                class="flex gap-2 items-center pr-4 lg:pr-6w-full truncate capitalize">
                                {{ transaction.narration }}
                            </div>
                            <div class="pr-4 lg:pr-6 w-full truncate capitalize" :class="transaction.category.toLowerCase() !== 'income'
                                ? 'text-red-500'
                                : 'text-green-400'
                                ">
                                {{ transaction.category.toLowerCase() !== 'income' ?  '-' : '+'}}${{ transaction.amount.toLocaleString() }}
                            </div>
                            <div
                                class="text-deep-blue pr-4 lg:pr-6 w-full overflow-hidden truncate hidden md:flex gap-2 items-center">
                                <div class="md:h-[12px] md:w-[12px] w-2 h-2 rounded-full" :class="transaction.category.toLowerCase() !== 'income'
                                    ? 'bg-red-500'
                                    : 'bg-green-400'
                                    "></div>
                                {{ transaction.category }}
                            </div>
                            <div class="pr-4 lg:pr-6 w-full truncate hidden md:block lg:hidden xl:block">
                                {{ new Date(transaction.createdAt).toLocaleString("en-US", {
                                    month: "long",
                                    day: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                }) }}</div>
                            <button @click="toggleModal(transaction, 'transaction')" class="flex justify-end relative">
                                <img @click.stop.prevent="openMenu(transaction)" class="cursor-pointer h-6"
                                    src="@/assets/icons/menu.svg" alt="action">
                                <div v-if="transaction.isOpen"
                                    :class="index === filteredTransaction.length - 1 ? 'bottom-0' : 'top-0'"
                                    class="item-menu w-[100px] right-4 lg:w-[200px]">
                                    <div @click="toggleModal(transaction, 'view')"
                                        class="px-6 py-2 hover:bg-blue text-start">View</div>
                                    <div @click="toggleModal(transaction, 'edit')"
                                        class="px-6 py-2 hover:bg-blue text-start">Edit</div>
                                    <div @click.stop.prevent="toggleModal(transaction._id, 'delete')"
                                        class="px-6 py-2 text-red-600 hover:bg-red-400 text-start">Delete</div>
                                </div>
                            </button>
                        </div>
                        <div v-if="index !== filteredTransaction.length - 1 && isTableView" class="h-[1px] w-full bg-gray-300">
                        </div>
                        <div v-if="index === filteredTransaction.length - 1 && !search.narration && !search.category" class="border-t border-t-gray-300 p-3 flex justify-between items-center">
                            <AppPagination :totalItems="transactions.length" :currentPage="currentPage" @pageChange="handlePageChange" />
                        </div>
                    </div>
                </div>
                <div v-else-if="filteredTransaction.length === 0 && !isLoading"
                    class="w-full h-[250px] flex flex-col gap-4 bg-white items-center justify-center text-light-blue text-xl rounded-lg shadow">
                    No transaction
                    <AppBtn @click="toggleModal(null, 'add')">
                        <img src="@/assets/icons/Add.svg" alt="add">
                        Add transaction
                    </AppBtn>
                </div>
                <div v-if="isLoading"
                    class="w-full h-[250px] flex flex-col gap-4 bg-white items-center justify-center text-light-blue text-xl rounded-md">
                    <span class="loader"></span>
                </div>
            </div>
        </div>
    </div>
    <!-- Add & Edit Modal -->
    <transition name="fade-right">
        <AppModal :isOpen="addEditModalIsOpen" position="left">
            <form @submit.prevent="editModal ? updateTransaction() : addTransaction()"
                class="h-screen w-[100%] lg:w-[600px] bg-white py-10 px-8 flex flex-col gap-10">
                <div class="flex flex-col gap-2">
                    <h1 class="text-3xl">{{ editModal ? 'Edit Transaction' : 'Add New Transaction' }}</h1>
                    <span>{{ editModal ? 'Edit this transaction to stay up-to-date with your spending.' : 'Add new transaction to keep track of your spending.'}}</span>
                </div>
                <div class="flex flex-col gap-7">
                    <AppInput label="Budget Id" :optional="true" name="budgetId" id="budgetId"
                        v-model="formData.budget_id" placeholder="Enter budget id if linked to a budget"></AppInput>
                    <AppInput label="Transaction Amount" required type="number" name="amount" id="amount"
                        v-model="formData.amount" placeholder="Enter transaction amount"></AppInput>
                    <AppInput label="Category" required type="select" :selectArray="['Income', 'Spending']"
                        v-model="formData.category" name="category" id="category" placeholder="Select a category">
                    </AppInput>
                    <AppInput label="Narration" required type="textarea" name="narration" id="narration"
                        v-model="formData.narration" placeholder="Enter a narration"></AppInput>
                </div>
                <div class="flex justify-between gap-6">
                    <AppBtn variant="danger" @click="toggleModal(null, 'add')">Cancel</AppBtn>
                    <AppBtn :disabled="!isFormValid" type="submit">{{ editModal ? 'Update' : 'Add Transaction' }}
                    </AppBtn>
                </div>
            </form>
        </AppModal>
    </transition>
    <!-- View Modal -->
    <transition name="fade-right">
        <AppModal :isOpen="viewModalIsOpen">
            <div class="w-[90%] lg:w-[600px] rounded-3xl bg-white py-10 px-8 flex flex-col gap-10">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <h2 class="text-xl">Budget Amount</h2>
                            <span :class="viewTransactionData.category.toLowerCase() !== 'income'
                                    ? 'text-red-500'
                                    : 'text-green-400'
                                    ">${{ viewTransactionData.amount.toLocaleString() }}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2 class="text-xl">Category</h2>
                            <span class="capitalize">{{ viewTransactionData.category }}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2 class="text-xl">Narration</h2>
                            <span class="capitalize">{{ viewTransactionData.narration }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col mt-4 lg:mt-0 gap-4">
                        <div class="flex flex-col gap-1">
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
                        <div class="flex flex-col gap-1">
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
                <div class="flex justify-end gap-4">
                    <AppBtn @click="toggleModal(null, 'view')">Close</AppBtn>
                </div>
            </div>
        </AppModal>
    </transition>
    <!-- Delete Modal -->
    <transition name="fade-right">
        <AppModal :isOpen="deleteModalIsOpen">
            <div class="w-[96%] lg:w-[600px] rounded-3xl bg-white py-10 px-8 flex text-dark-grey flex-col gap-4">
                Are you sure you want to delete this transaction?
                <div class="flex justify-end items-center gap-4">
                    <AppBtn @click="toggleModal(null, 'delete')">Cancel</AppBtn>
                    <AppBtn variant="danger" @click="deleteTransaction">Delete</AppBtn>
                </div>
            </div>
        </AppModal>
    </transition>
</template>

<script setup>
import AppBtn from '@/components/AppBtn.vue';
import AppInput from '@/components/AppInput.vue';
import AppModal from '@/components/AppModal.vue';
import DashboardCard from '@/components/DashboardCard.vue';
import AppPagination from '@/components/AppPagination.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

onMounted(() => {
    store.dispatch('getAllTransactions');
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
})

const store = useStore();
const router = useRouter()
const active = ref();
let formData = ref();
const viewTransactionData = ref();
const deleteId = ref();
const isTableView = ref(true);
const addEditModalIsOpen = ref(false);
const viewModalIsOpen = ref(false);
const editModal = ref(false);
const deleteModalIsOpen = ref(false);
const initialFormData = ref({ amount: '', category: '', narration: '', budget_id: '' });
const search = ref({ narration: '', category: '' });

const transactions = computed(() => store.getters.allTransactions);

const paginatedTransactions = computed(() => store.getters.paginatedTransactions);
const currentPage = computed(() => store.state.transaction.currentPage);

function handlePageChange(page) {
  store.commit('setCurrentTransactionPage', page);
}


const isLoading = computed(() => store.state.auth.fetchAllIsLoading)

const isFormValid = computed(() => {
    return (
        formData.value.category &&
        formData.value.amount && formData.value.narration
    );
})

const filteredTransaction = computed(() => {
    if(search.value.narration || search.value.category) {
        return transactions.value.filter((item) => (item.narration.toLowerCase().includes(search.value.narration.toLowerCase()) &&
        item.category.toLowerCase().includes(search.value.category.toLowerCase())))
    } else {
        return paginatedTransactions.value.filter((item) => (item.narration.toLowerCase().includes(search.value.narration.toLowerCase()) &&
        item.category.toLowerCase().includes(search.value.category.toLowerCase())))
    }

})


const toggleModal = (data, modal) => {
    if (modal === 'edit') {
        formData.value = { ...data };
        editModal.value = true;
        addEditModalIsOpen.value = !addEditModalIsOpen.value
    } else if (modal === 'view') {
        viewTransactionData.value = data;
        viewModalIsOpen.value = !viewModalIsOpen.value;
    } else if (modal === 'add') {
        editModal.value = false;
        formData.value = { ...initialFormData };
        addEditModalIsOpen.value = !addEditModalIsOpen.value;
    } else if (modal === 'delete') {
        deleteId.value = data;
        deleteModalIsOpen.value = !deleteModalIsOpen.value;
    }
}

const addTransaction = () => {
    store.dispatch('addTransaction', formData.value);
    formData.value = { ...initialFormData };
    addEditModalIsOpen.value = !addEditModalIsOpen.value;
}

const updateTransaction = () => {
    store.dispatch('updateTransactions', formData.value);
    formData.value = { ...initialFormData };
    addEditModalIsOpen.value = !addEditModalIsOpen.value
}

const deleteTransaction = () => {
    deleteModalIsOpen.value = !deleteModalIsOpen.value;
    closeMenu()
    store.dispatch('deleteTransaction', deleteId.value)
}

const openMenu = (item) => {
    active.value = filteredTransaction.value.filter((item) => item.isOpen)[0];
    if (active.value) {
        active.value.isOpen = false;
    }
    item.isOpen = true
}

const closeMenu = () => {
    active.value = filteredTransaction.value.filter((item) => item.isOpen)[0];
    if (active.value) {
        active.value.isOpen = false;
    }
}

const redirectToSummary = () => {
    router.push('/dashboard');
}

</script>

<style scoped>
.item:hover {
    cursor: pointer;
    box-shadow: 0 2px 4px #34495E;
}

.item-menu {
    position: absolute;
    background-color: white;
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0px 4px 4px -4px #14141410;
    box-shadow: 0px 16px 32px -4px #14141430;
    z-index: 99999;
}

.active {
    background-color: #2C3E50;
}
</style>