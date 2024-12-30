<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div @click="closeMenu" class="flex flex-col h-full gap-6">
        <div class="p-6 flex flex-col md:flex-row xl:items-center rounded-2xl bg-blue">
            <div class="flex flex-col items-start gap-4">
                <div class="flex flex-col gap-1">
                    <h2 class="text-2xl lg:text-3xl font-medium text-white">Budget Management</h2>
                    <span class="text-light-grey">Welcome! Easily create, edit, and delete budgets to manage your
                        finances and keep track of your
                        spending.</span>
                </div>
                <button @click="redirectToSummary"
                    class="flex items-center bg-white rounded-lg py-[6px] px-3 text-[14px] text-[#0D3051]">
                    Go to Dashboard <img class="inline-block ml-1" src="@/assets/icons/arrow_diagonal_blue.svg"
                        alt=""></button>
            </div>
        </div>
        <div class="flex flex-col mb-4 gap-4 lg:gap-6">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold">Budget</h2>
                <AppBtn @click="toggleModal(null, 'add')">
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
            <div class="flex flex-col gap-4 lg:gap-6 mb-6"
                :class="isTableView && !isLoading && filteredBudget.length ? 'p-3 big_card bg-white' : ''">
                <div v-if="filteredBudget.length > 0 && !isLoading && !isTableView" class="flex flex-col gap-4">
                    <div v-for="(budget, index) in filteredBudget" :key="index"
                        class="w-full py-3 px-5 lg:p-5 xl:p-8 grid grid-cols-3 item lg:grid-cols-4 gap-4 justify-between bg-blue border border-cyan rounded-2xl">
                        <div class="flex flex-col items-start gap-1 capitalize">
                            <h4 class="text-[12px]">Title</h4>
                            <div class="w-full truncate capitalize text-light-grey">{{ budget.title }}</div>
                        </div>
                        <div class="flex flex-col items-start gap-1">
                            <h4 class="text-[12px]">Total Amount</h4>
                            <div class="w-full truncate text-light-grey"> ${{ budget.total_amount.toLocaleString() }}</div>
                        </div>
                        <div class="hidden lg:flex flex-col items-start w-full truncate gap-1 capitalize text-light-grey">
                            <h4 class="text-[12px]">Duration</h4>
                            {{ budget.duration }}
                        </div>
                        <div class="flex justify-end relative">
                            <img @click.stop.prevent="openMenu(budget)" class="cursor-pointer"
                                src="@/assets/icons/action.svg" alt="action">
                            <div v-if="budget.isOpen"
                                :class="index === filteredBudget.length - 1 && index > 1 ? 'top-[-120px]' : 'top-10'"
                                class="item-menu w-[150px] lg:w-[200px]">
                                <div @click="toggleModal(budget, 'view')"
                                    class="px-6 py-2 text-deep-blue hover:bg-blue">View</div>
                                <div @click="toggleModal(budget, 'edit')"
                                    class="px-6 py-2 text-deep-blue hover:bg-blue">Edit</div>
                                <div @click.stop.prevent="toggleModal(budget._id, 'delete')"
                                    class="px-6 py-2 text-red-800 hover:bg-red-500">Delete</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="filteredBudget.length && !search.title && !search.duration" class="border-t border-t-gray-300 p-3 flex justify-between items-center">
                        <AppPagination :totalItems="budgets.length" :currentPage="currentPage" @pageChange="handlePageChange" />
                    </div>
                </div>
                <div v-if="filteredBudget.length > 0 && !isLoading && isTableView" class="flex flex-col">
                    <div
                        class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-4 bg-blue py-3 px-4 rounded-lg">
                        <div class="pr-4 lg:pr-6 w-full hidden md:block text-white">Id</div>
                        <div class="pr-4 lg:pr-6 w-full text-white">Title</div>
                        <div class="pr-4 lg:pr-6 w-full text-white">Amount</div>
                        <div class="pr-4 lg:pr-6 w-full hidden md:block text-white">Duration</div>
                        <div class="pr-4 lg:pr-6 w-full hidden md:block lg:hidden xl:block text-white">Date</div>
                        <div></div>
                    </div>
                    <div v-for="(budget, index) in filteredBudget" :key="index">
                        <div
                            class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 lg:hover:bg-partial-white cursor-pointer">
                            <div class="pr-4 lg:pr-6 w-full truncate hidden md:block">
                                {{ budget._id }}
                            </div>
                            <div class="pr-4 lg:pr-6 w-full truncate capitalize">
                                {{ budget.title }}
                            </div>
                            <div class="pr-4 lg:pr-6 w-full truncate">
                                ${{ budget.total_amount.toLocaleString() }}
                            </div>
                            <div
                                class="md:flex gap-2 items-center pr-4 lg:pr-6 w-full truncate hidden capitalize">
                                {{ budget.duration }}
                            </div>
                            <div class="pr-4 lg:pr-6 w-full truncate hidden md:block lg:hidden xl:block">
                                {{ new Date(budget.createdAt).toLocaleString("en-US", {
                                    month: "long",
                                    day: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                }) }}</div>
                            <button @click="toggleModal(budget, 'budget')" class="flex justify-end relative">
                                <img @click.stop.prevent="openMenu(budget)" class="cursor-pointer h-6"
                                    src="@/assets/icons/menu.svg" alt="action">
                                <div v-if="budget.isOpen" :class="index === filteredBudget.length - 1 ? 'bottom-0' : 'top-0'"
                                    class="item-menu w-[100px] right-4 lg:w-[200px]">
                                    <div @click="toggleModal(budget, 'view')"
                                        class="px-6 py-2 hover:bg-blue text-start">View</div>
                                    <div @click="toggleModal(budget, 'edit')"
                                        class="px-6 py-2 hover:bg-blue text-start">Edit</div>
                                    <div @click.stop.prevent="toggleModal(budget._id, 'delete')"
                                        class="px-6 py-2 text-red-600 hover:bg-red-400 text-start">Delete</div>
                                </div>
                            </button>
                        </div>
                        <div v-if="index !== filteredBudget.length - 1" class="h-[1px] w-full bg-gray-300">
                        </div>
                        <div v-if="index === filteredBudget.length - 1 && !search.title && !search.duration" class="border-t border-t-gray-300 p-3 flex justify-between items-center">
                            <AppPagination :totalItems="budgets.length" :currentPage="currentPage" @pageChange="handlePageChange" />
                        </div>
                    </div>
                </div>
                <div v-else-if="filteredBudget.length === 0 && !isLoading"
                    class="w-full h-[250px] flex flex-col gap-4 bg-white items-center justify-center text-light-blue text-xl rounded-lg shadow">
                    No budget
                    <AppBtn @click="toggleModal(null, 'add')">
                        <img src="@/assets/icons/Add.svg" alt="add">
                        Add budget
                    </AppBtn>
                </div>
                <div v-if="isLoading"
                    class="w-full h-[250px] flex flex-col gap-4 bg-white items-center justify-center text-light-blue text-xl rounded-md">
                    <span class="loader"></span>
                </div>
            </div>

        </div>
    </div>
    <!-- Add Modal & Edit -->
    <transition name="fade-right">
        <AppModal :isOpen="addEditModalIsOpen" position="left">
            <form @submit.prevent="editModal ? updateBudget() : addBudget()"
                class="h-screen w-[100%] lg:w-[600px] bg-white py-10 px-8 flex flex-col gap-10">
                <div class="flex flex-col gap-2">
                    <h1 class="text-3xl">{{ editModal ? 'Edit Your Budget' : 'Add New Budget' }}</h1>
                    <span>{{ editModal ? 'Edit your budget to keep track of your spending and stay up-to-date.' :
                        'Addnew budget to keep track of your spending.' }}</span>
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
                <div class="flex justify-between gap-6 mt-4">
                    <AppBtn variant="danger" @click="toggleModal(null, 'add')">Cancel</AppBtn>
                    <AppBtn :disabled="!isFormValid" type="submit">{{ editModal ? 'Update' : 'Add Budget' }}</AppBtn>
                </div>
            </form>
        </AppModal>
    </transition>
    <!-- View Modal -->
    <transition name="fade-right">
        <AppModal :isOpen="viewModalIsOpen">
            <div class="w-[96%] lg:w-[600px] rounded-3xl bg-white py-10 px-8 flex flex-col gap-10">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <h2 class="text-xl">Title</h2>
                            <span class="capitalize">{{ viewBudgetData.title }}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2 class="text-xl">Budget Amount</h2>
                            <span>${{ viewBudgetData.total_amount.toLocaleString() }}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2 class="text-xl">Duration</h2>
                            <span class="capitalize">{{ viewBudgetData.duration }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col mt-4 lg:mt-0 gap-4">
                        <div class="flex flex-col gap-1">
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
                        <div class="flex flex-col gap-1">
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
                        <div class="flex flex-col gap-1">
                            <h2 class="text-xl">Budget Id</h2>
                            <span>{{ viewBudgetData._id }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center gap-4">
                    <AppBtn @click="toggleModal(null, 'view')">Close</AppBtn>
                </div>
            </div>
        </AppModal>
    </transition>
    <!-- Delete Modal -->
    <transition name="fade-right">
        <AppModal :isOpen="deleteModalIsOpen">
            <div class="w-[96%] lg:w-[600px] rounded-3xl bg-white py-10 px-8 flex text-dark-grey flex-col gap-4">
                Are you sure you want to delete this budget?
                <div class="flex justify-end items-center gap-4">
                    <AppBtn @click="toggleModal(null, 'delete')">Cancel</AppBtn>
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
import AppPagination from '@/components/AppPagination.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

onMounted(() => {
    store.dispatch('getAllBudget');
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
})
//refs
const store = useStore();
const router = useRouter()
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
const currentPage = computed(() => store.state.budget.currentPage);

function handlePageChange(page) {
  store.commit('setCurrentBudgetPage', page);
}

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

const isLoading = computed(() => store.state.auth.fetchAllIsLoading)

//functions
const toggleModal = (data, modal) => {
    if (modal === 'edit') {
        formData.value = { ...data };
        editModal.value = true;
        addEditModalIsOpen.value = !addEditModalIsOpen.value
    } else if (modal === 'view') {
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

const redirectToSummary = () => {
    router.push('/dashboard');
}
</script>

<style scoped>
.item:hover {
    cursor: pointer;
    box-shadow: 0 2px 4px #34495E;
    /* opacity: 0.9; */
}

.item-menu {
    position: absolute;
    background-color: white;
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0px 4px 4px -4px #14141410;
    box-shadow: 0px 16px 32px -4px #14141430;
    z-index: 9;
}

.active {
    background-color: #2C3E50;
}
</style>