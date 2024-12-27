<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div @click="closeMenu" class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
            <h1 class="font-medium text-2xl md:text-3xl">Budget Management</h1>
            <span>Welcome! Easily create, edit, and delete budgets to manage your finances and keep track of your
                spending.</span>
        </div>
        <div class="flex flex-col mb-4 gap-4 lg:gap-8">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold">Budget</h2>
                <AppBtn @click="toggleModal(null, 'add')">
                    <img src="@/assets/icons/Add.svg" alt="add">
                    Add budget
                </AppBtn>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                <div class="w-full">
                    <AppInput type="search" name="budgetSearch" id="budgetSearch" v-model="search.title"
                        placeholder="Search through the budget with the title"></AppInput>
                </div>
                <div class="w-full">
                    <AppInput type="select" :selectArray="['Weekly', 'Monthly']" v-model="search.duration" name="duration"
                        id="duration" placeholder="Select a duration"></AppInput>
                </div>
            </div>
            <h2 class="font-medium pl-2 lg:my-[-20px]">{{ filteredBudget.length }} total budget</h2>
            <div v-if="budgets.length > 0 && !isLoading" class="flex flex-col gap-4">
                <div v-for="(budget, index) in filteredBudget" :key="index"
                    class="w-full py-3 px-5 lg:p-6 xl:p-8 grid grid-cols-3 item lg:grid-cols-4 gap-4 justify-between bg-deep-blue border border-cyan rounded-2xl">
                    <div class="flex flex-col items-start gap-1 capitalize">
                        <h4 class="text-[12px]">Title</h4>
                        <div class="w-full truncate capitalize">{{ budget.title }}</div>
                    </div>
                    <div class="flex flex-col items-start gap-1">
                        <h4 class="text-[12px]">Total Amount</h4>
                        <div class="w-full truncate"> #{{ budget.total_amount.toLocaleString() }}</div>
                    </div>
                    <div class="hidden lg:flex flex-col items-start w-full truncate gap-1 capitalize">
                        <h4 class="text-[12px]">Duration</h4>
                        {{ budget.duration }}
                    </div>
                    <div class="flex justify-end relative">
                        <img @click.stop.prevent="openMenu(budget)" class="cursor-pointer"
                            src="@/assets/icons/action.svg" alt="action">
                        <div v-if="budget.isOpen" :class="index === budgets.length - 1 && index > 1 ? 'top-[-120px]' : 'top-10'" class="item-menu w-[150px] lg:w-[200px]">
                            <div @click="toggleModal(budget, 'view')"
                                class="px-6 py-2 text-deep-blue hover:bg-light-blue">View</div>
                            <div @click="toggleModal(budget, 'edit')"
                                class="px-6 py-2 text-deep-blue hover:bg-light-blue">Edit</div>
                            <div @click.stop.prevent="toggleModal(budget._id, 'delete')"
                                class="px-6 py-2 text-red-800 hover:bg-red-500">Delete</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="budgets.length === 0 && !isLoading"
                class="w-full h-[250px] flex flex-col gap-4 bg-white items-center justify-center text-light-blue text-xl rounded-md">
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
      <!-- Add Modal & Edit -->
    <transition name="fade-right">
        <AppModal :isOpen="addEditModalIsOpen" position="left">
            <form @submit.prevent="editModal ? updateBudget() : addBudget()"
                class="h-screen w-[100%] lg:w-[600px] bg-white py-10 px-8 flex flex-col gap-10">
                <div class="flex flex-col gap-2">
                    <h1 class="text-3xl">{{ editModal ? 'Edit Your Budget' : 'Add New Budget'}}</h1>
                    <span>{{ editModal ? 'Edit your budget to keep track of your spending and stay up-to-date.' : 'Add new budget to keep track of your spending.'}}</span>
                </div>
                <div class="flex flex-col gap-7">
                    <AppInput label="Title" required name="title" id="title" v-model="formData.title"
                        placeholder="Enter budget title"></AppInput>
                    <AppInput label="Amount" required type="number" name="amount" id="amount" v-model="formData.total_amount"
                        placeholder="Enter budget amount"></AppInput>
                    <AppInput label="Duration" required type="select" :selectArray="['Weekly', 'Monthly']"
                        v-model="formData.duration" name="duration" id="duration" placeholder="Select a duration">
                    </AppInput>
                </div>
                <div class="flex justify-between gap-6 mt-4">
                    <AppBtn variant="danger" @click="toggleModal(null, 'add')">Cancel</AppBtn>
                    <AppBtn :disabled="!isFormValid" type="submit">{{ editModal ? 'Update' : 'Add Budget'}}</AppBtn>
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
                        <div class="flex flex-col gap-2">
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
const viewModalIsOpen = ref(false);
const addEditModalIsOpen = ref(false);
const deleteModalIsOpen = ref(false);
const editModal = ref(false);
const initialFormData = ref({title: '', total_amount: '', duration: '', });
let formData = ref();
const search = ref({title: '', duration: '' });

//computed
const budgets = computed(() => store.getters['allBudgets']);

const isFormValid = computed(() => {
    return (
        formData.value.title &&
        formData.value.total_amount && formData.value.duration
    );
})

const filteredBudget = computed(() => {
    return budgets.value.filter((item) => (item.title.toLowerCase().includes(search.value.title.toLowerCase()) && 
           item.duration.toLowerCase().includes(search.value.duration.toLowerCase())))
})

const isLoading = computed(() => store.state.auth.fetchAllIsLoading)

//functions
const toggleModal = (data, modal) => {
    if (modal === 'edit') {
        formData.value = data;
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
    formData.value = null
    addEditModalIsOpen.value = !addEditModalIsOpen.value
}

const updateBudget = () => {
    store.dispatch('updateBudget', formData.value);
    formData.value = null;
    addEditModalIsOpen.value = !addEditModalIsOpen.value;
}

const deleteBudget = () => {
    deleteModalIsOpen.value = !deleteModalIsOpen.value
    store.dispatch('deleteBudget', deleteId.value)
}

const openMenu = (item) => {
    active.value = budgets.value.filter((item) => item.isOpen)[0];
    if (active.value) {
        active.value.isOpen = false;
    }
    item.isOpen = true
}

const closeMenu = () => {
    active.value = budgets.value.filter((item) => item.isOpen)[0];
    if (active.value) {
        active.value.isOpen = false;
    }
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
    right: 0;
    background-color: white;
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0px 4px 4px -4px #14141410;
    box-shadow: 0px 16px 32px -4px #14141430;
    z-index: 9;
}
</style>