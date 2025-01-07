<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div @click="closeMenu" class="flex flex-col h-full gap-6">
        <BannerComponent title="Budget Management"
        description="Welcome! Easily create, edit, and delete budgets to manage your finances and keep track of your spending." />
        <div class="flex flex-col mb-4 gap-4 lg:gap-6">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold">Budget</h2>
                <AppBtn @click="toggleModal({ data: null, modal: 'add' })">
                    <img src="@/assets/icons/Add.svg" alt="add">
                    Add budget
                </AppBtn>
            </div>
            <DashboardCard type="budget" :data="budgets"></DashboardCard>
            <div class="flex flex-col md:flex-row justify-between items-center w-full">
                <div class="w-full md:w-auto">
                    <AppInput type="search" name="budgetSearch" id="budgetSearch" v-model="search.title"
                        placeholder="Search budgets"></AppInput>
                </div>
                <div class="flex justify-between md:justify-start md:gap-4 items-center w-full md:w-auto">
                    <AppInput type="select" :selectArray="['Weekly', 'Monthly']" v-model="search.duration"
                        name="duration" id="duration" placeholder="Select a duration"></AppInput>
                    <div class="flex bg-white big_card">
                        <button @click="isTableView = true" :class="isTableView ? 'active' : ''"
                            class="p-2 rounded-s-md"><img class="h-6 w-6" src="@/assets/icons/table.svg"
                                alt=""></button>
                        <button @click="isTableView = false" :class="!isTableView ? 'active' : ''"
                            class="p-2 rounded-e-md"><img class="h-6 w-6" src="@/assets/icons/card.svg" alt=""></button>
                    </div>
                </div>
            </div>
            <h2 v-if="search.title || search.duration" class="font-medium pl-2 lg:my-[-15px]">{{ filteredBudget.length
                }} filtered budget</h2>
            <TableCardComponent :filteredData=filteredBudget :isTableView=isTableView
                :headers="['Id', 'Title', 'Amount', 'Duration', 'Date']" @toggleModal="toggleModal"
                @openMenu="openMenu" :searchValue="search" type="budget" :totalData="budgets" />
        </div>
    </div>
    <!-- Add Modal & Edit -->
    <transition name="fade-right">
        <AppModal :isOpen="addEditModalIsOpen" position="left">
            <form @submit.prevent="editModal ? updateBudget() : addBudget()"
                class="h-screen w-[100%] lg:w-[465px] bg-white py-10 px-8 flex flex-col gap-10">
                <div class="flex flex-col gap-2">
                    <h1 class="text-2xl">{{ editModal ? 'Edit Your Budget' : 'Add New Budget' }}</h1>
                    <span class="text-sm">{{ editModal ? 'Edit your budget to keep track of your spending and stay up-to-date.' :
                        'Add new budget to keep track of your spending.' }}</span>
                </div>
                <div class="flex flex-col gap-7">
                    <AppInput label="Title" required name="title" id="title" v-model="formData.title"
                        placeholder="Enter budget title"></AppInput>
                    <AppInput label="Amount" required type="number" name="amount" id="amount"
                        v-model="formData.total_amount" placeholder="Enter budget amount"></AppInput>
                    <AppInput label="Duration" required type="select" :selectArray="['Weekly', 'Monthly']"
                        v-model="formData.duration" name="duration" id="duration" placeholder="Select a duration">
                    </AppInput>
                </div>
                <div class="flex justify-end gap-6 mt-4">
                    <AppBtn variant="danger" @click="toggleModal({ data: null, modal: 'add' })">Cancel</AppBtn>
                    <AppBtn :disabled="!isFormValid" type="submit">{{ editModal ? 'Update' : 'Add Budget' }}</AppBtn>
                </div>
            </form>
        </AppModal>
    </transition>
    <!-- View Modal -->
    <ViewModal :data="viewBudgetData" :viewModalIsOpen="viewModalIsOpen" @toggleModal="toggleModal" type="budget" />
    <!-- Delete Modal -->
    <transition name="fade-right">
        <AppModal :isOpen="deleteModalIsOpen">
            <div class="w-[96%] lg:w-[600px] rounded-3xl bg-white py-10 px-8 flex items-center text-dark-grey text-center flex-col gap-6">
                <div class="w-[80px] h-[80px] bg-red-200 rounded-full flex items-center justify-center">
                    <img height="40" width="40" src="@/assets/icons/delete.svg" alt="delete">
                </div>
                Are you sure you want to delete this budget?. <br> This action cannot be undone
                <div class="flex justify-end items-center gap-4">
                    <AppBtn variant="outline" @click="toggleModal({ data: null, modal: 'delete' })">Cancel</AppBtn>
                    <AppBtn variant="danger" @click="deleteBudget">Delete</AppBtn>
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
import BannerComponent from '@/components/BannerComponent.vue';
import ViewModal from '@/components/ViewModal.vue';
import TableCardComponent from '@/components/TableCardComponent.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

onMounted(() => {
    store.dispatch('getAllBudget');
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
})
//refs
const store = useStore();
const active = ref();
const deleteId = ref();
const viewBudgetData = ref();
const isTableView = ref(true);
const viewModalIsOpen = ref(false);
const addEditModalIsOpen = ref(false);
const deleteModalIsOpen = ref(false);
const editModal = ref(false);
const initialFormData = ref({ title: '', total_amount: '', duration: '', });
let formData = ref();
const search = ref({ title: '', duration: '' });

const paginatedBudgets = computed(() => store.getters.paginatedBudgets);

//computed
const budgets = computed(() => store.getters.allBudgets);

const isFormValid = computed(() => {
    return (
        formData.value.title &&
        formData.value.total_amount && formData.value.duration
    );
})

const filteredBudget = computed(() => {
    if(search.value.title || search.value.duration) {
        return budgets.value.filter((item) => (item.title.toLowerCase().includes(search.value.title.toLowerCase()) &&
        item.duration.toLowerCase().includes(search.value.duration.toLowerCase())))
    } else {
        return paginatedBudgets.value.filter((item) => (item.title.toLowerCase().includes(search.value.title.toLowerCase()) &&
        item.duration.toLowerCase().includes(search.value.duration.toLowerCase())))
    }
})

//functions
const toggleModal = ({ data, modal }) => {
    if (modal === 'edit') {
        formData.value = { ...data };
        editModal.value = true;
        addEditModalIsOpen.value = !addEditModalIsOpen.value
    } else if (modal === 'viewBudget') {
        viewBudgetData.value = data;
        viewModalIsOpen.value = !viewModalIsOpen.value;
    } else if (modal === 'add') {
        editModal.value = false;
        formData.value = { ...initialFormData }
        addEditModalIsOpen.value = !addEditModalIsOpen.value
    } else if (modal === 'delete') {
        deleteId.value = data;
        deleteModalIsOpen.value = !deleteModalIsOpen.value
    }
}

const addBudget = () => {
    store.dispatch('addBudget', formData.value)
    formData.value = { ...initialFormData }
    addEditModalIsOpen.value = !addEditModalIsOpen.value
}

const updateBudget = () => {
    store.dispatch('updateBudget', formData.value);
    formData.value = { ...initialFormData }
    addEditModalIsOpen.value = !addEditModalIsOpen.value;
}

const deleteBudget = () => {
    deleteModalIsOpen.value = !deleteModalIsOpen.value;
    closeMenu()
    store.dispatch('deleteBudget', deleteId.value)
}

const openMenu = (item) => {
    active.value = filteredBudget.value.filter((item) => item.isOpen)[0];
    if (active.value) {
        active.value.isOpen = false;
    }
    item.isOpen = true
}

const closeMenu = () => {
    active.value = filteredBudget.value.filter((item) => item.isOpen)[0];
    if (active.value) {
        active.value.isOpen = false;
    }
}
</script>