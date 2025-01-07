<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div @click="closeMenu" class="flex flex-col gap-6 h-full">
        <BannerComponent title="Transaction Management"
            description="Welcome! Easily create, edit, and delete transactions to manage your finances and keep track of your spending.." />
        <div class="flex flex-col mb-4 gap-4 lg:gap-6">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold">Transaction</h2>
                <AppBtn @click="toggleModal({ data: null, modal: 'add' })">
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
            <TableCardComponent :filteredData=filteredTransaction :isTableView=isTableView
                :headers="['Id', 'Narration', 'Amount', 'Category', 'Date']" @toggleModal="toggleModal"
                @openMenu="openMenu" :searchValue="search" type="transaction" :totalData="transactions" />
        </div>
    </div>
    <!-- Add & Edit Modal -->
    <transition name="fade-right">
        <AppModal :isOpen="addEditModalIsOpen" position="left">
            <form @submit.prevent="editModal ? updateTransaction() : addTransaction()"
                class="h-screen w-[100%] lg:w-[465px] bg-white py-10 px-8 flex flex-col gap-10">
                <div class="flex flex-col gap-2">
                    <h1 class="text-2xl">{{ editModal ? 'Edit Transaction' : 'Add New Transaction' }}</h1>
                    <span class="text-sm">{{ editModal ? 'Edit this transaction to stay up-to-date with your spending.'
                        : 'Add new transaction to keep track of your spending.' }}</span>
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
                <div class="flex justify-end gap-6">
                    <AppBtn variant="danger" @click="toggleModal({ data: null, modal: 'add' })">Cancel</AppBtn>
                    <AppBtn :disabled="!isFormValid" type="submit">{{ editModal ? 'Update' : 'Add Transaction' }}
                    </AppBtn>
                </div>
            </form>
        </AppModal>
    </transition>
    <!-- View Modal -->
    <ViewModal :data="viewTransactionData" :viewModalIsOpen="viewModalIsOpen" @toggleModal="toggleModal" type="transaction" />
    <!-- Delete Modal -->
    <transition name="fade-right">
        <AppModal :isOpen="deleteModalIsOpen">
            <div class="w-[96%] lg:w-[600px] rounded-3xl bg-white py-10 px-8 flex items-center text-dark-grey text-center flex-col gap-6">
                <div class="w-[80px] h-[80px] bg-red-200 rounded-full flex items-center justify-center">
                    <img height="40" width="40" src="@/assets/icons/delete.svg" alt="delete">
                </div>
                Are you sure you want to delete this transaction?. <br> This action cannot be undone
                <div class="flex justify-end items-center gap-4">
                    <AppBtn variant="outline" @click="toggleModal({ data: null, modal: 'delete' })">Cancel</AppBtn>
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
import TableCardComponent from '@/components/TableCardComponent.vue';
import BannerComponent from '@/components/BannerComponent.vue';
import ViewModal from '@/components/ViewModal.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

onMounted(() => {
    store.dispatch('getAllTransactions');
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
})

const store = useStore();
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
const active = ref();

const transactions = computed(() => store.getters.allTransactions);
const paginatedTransactions = computed(() => store.getters.paginatedTransactions);

const isFormValid = computed(() => {
    return (
        formData.value.category &&
        formData.value.amount && formData.value.narration
    );
})

const filteredTransaction = computed(() => {
    if (search.value.narration || search.value.category) {
        return transactions.value.filter((item) => (item.narration.toLowerCase().includes(search.value.narration.toLowerCase()) &&
            item.category.toLowerCase().includes(search.value.category.toLowerCase())))
    } else {
        return paginatedTransactions.value.filter((item) => (item.narration.toLowerCase().includes(search.value.narration.toLowerCase()) &&
            item.category.toLowerCase().includes(search.value.category.toLowerCase())))
    }

})


const toggleModal = ({ data, modal }) => {
    if (modal === 'edit') {
        formData.value = { ...data };
        editModal.value = true;
        addEditModalIsOpen.value = !addEditModalIsOpen.value
    } else if (modal === 'viewTransaction') {
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
</script>
