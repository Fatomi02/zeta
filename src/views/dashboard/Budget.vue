<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div @click="closeMenu" class="flex flex-col gap-6 h-full">
        <div class="flex flex-col gap-2">
            <h1 class="font-medium text-2xl md:text-3xl">Budget Management</h1>
            <span>Welcome! Easily create, edit, and delete budgets to manage your finances and keep track of your spending.</span>
        </div>
            <div class="flex flex-col mb-4 gap-6 h-full lg:gap-10">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-semibold">Budget</h2>
                    <AppBtn @click="toggleModal(null, 'add')">
                        <img src="@/assets/icons/Add.svg" alt="add">
                        Add budget
                    </AppBtn>
                </div>
                <h2 class="font-medium pl-2 lg:my-[-20px]">{{ budgets.length }} total budget</h2>  
                <div v-if="budgets.length > 0" class="flex flex-col gap-4">                 
                    <div v-for="(budget, index) in budgets" :key="index" class="w-full py-4 px-6 lg:p-8 grid grid-cols-3 item lg:grid-cols-4 gap-4 justify-between bg-[#34495E] border border-[#A6DDEF] rounded-2xl">
                        <div class="flex flex-col items-start gap-1 capitalize">
                            <div class="text-[12px] text-[#A6DDEF]">Title</div>
                            <div class="w-full truncate">{{ budget.title }}</div>
                        </div>
                        <div class="flex flex-col items-start gap-1">
                            <div class="text-[12px] text-[#A6DDEF]">Total Amount</div>
                            <div class="w-full truncate">  #{{ budget.amount.toLocaleString() }}</div>
                        </div>
                        <div class="hidden lg:flex flex-col items-start w-full truncate gap-1">
                            <div class="text-[12px] text-[#A6DDEF]">Duration</div>
                            {{ budget.duration }}
                        </div>
                        <div class="flex justify-end relative">
                            <img @click.stop.prevent="openMenu(budget)" class="cursor-pointer" src="@/assets/icons/action.svg" alt="action">
                            <div v-if="budget.isOpen" class="item-menu w-[150px] lg:w-[200px] lg:top-10">
                                <div @click="toggleModal(budget, 'view')" class="px-6 py-2 text-[#34495E] hover:bg-[#3498DB]">View</div>
                                <div @click="toggleModal(budget, 'edit')" class="px-6 py-2 text-[#34495E] hover:bg-[#3498DB]">Edit</div>
                                <div @click.stop.prevent="deleteBudget(budget.id)" class="px-6 py-2 text-red-800 hover:bg-red-500">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="w-full h-full flex flex-col gap-4 bg-white items-center justify-center text-[#3498DB] text-xl rounded-md">
                    No budget
                    <AppBtn @click="toggleModal(null, 'add')">
                        <img src="@/assets/icons/Add.svg" alt="add">
                        Add budget
                    </AppBtn>
                </div>
            </div>
    </div>
    <transition name="fade-right">
        <AppModal :isOpen="addModalIsOpen" position="left">
        <form @submit.prevent="addBudget" class="h-screen w-[100%] lg:w-[600px] bg-white py-10 px-8 flex flex-col gap-10">
            <div class="flex flex-col gap-2">
                <h1 class="text-3xl">Add New Budget</h1>
                <span>Add new budget to keep track of your spending.</span>
            </div>
            <div class="flex flex-col gap-7">
                <AppInput label="Title" required name="title" id="title" v-model="formData.title" placeholder="Enter budget title"></AppInput>
                <AppInput label="Amount" required type="number" name="amount" id="amount" v-model="formData.amount" placeholder="Enter budget amount"></AppInput>
                <AppInput label="Duration" required type="select" :selectArray="durationArray" v-model="formData.duration" name="duration" id="duration" placeholder="Select a duration"></AppInput>
            </div>
            <div class="flex justify-between gap-6 mt-4">
                <AppBtn variant="danger" @click="toggleModal(null, 'add')">Cancel</AppBtn>
                <AppBtn type="submit">Add Budget</AppBtn>
            </div>
        </form>
    </AppModal>
    </transition>
    <transition name="fade-right">
        <AppModal :isOpen="editModalIsOpen" position="left">
        <form @submit.prevent="" class="h-screen w-[100%] lg:w-[600px] bg-white py-10 px-8 flex flex-col gap-10">
            <div class="flex flex-col gap-2">
                <h1 class="text-3xl">Edit Your Budget</h1>
                <span>Edit your budget to keep track of your spending and stay up-to-date.</span>
            </div>
            <div class="flex flex-col gap-7">
                <AppInput label="Title" required name="title" id="title" v-model="editBudgetData.title" placeholder="Enter budget title"></AppInput>
                <AppInput label="Amount" required type="number" name="amount" id="amount" v-model="editBudgetData.amount" placeholder="Enter budget amount"></AppInput>
                <AppInput label="Duration" required type="select" :selectArray="durationArray" v-model="editBudgetData.duration" name="duration" id="duration" placeholder="Select a duration"></AppInput>
            </div>
            <div class="flex justify-between gap-4">
                <AppBtn variant="danger" @click="toggleModal(null, 'edit')">Cancel</AppBtn>
                <AppBtn type="submit">Update</AppBtn>
            </div>
        </form>
        </AppModal>
    </transition>
    <transition name="fade-right">
        <AppModal :isOpen="viewModalIsOpen">
        <div class="w-[100%] lg:w-[600px] rounded-3xl bg-white py-10 px-8 flex flex-col gap-10">
            <div class="flex flex-col gap-7">
                <div class="flex flex-col gap-2">
                    <h2 class="text-xl">Title</h2>
                    <span>{{ viewBudgetData.title }}</span>
                </div>
                <div class="flex flex-col gap-2">
                    <h2 class="text-xl">Budget Amount</h2>
                    <span>{{ viewBudgetData.amount.toLocaleString() }}</span>
                </div>
                <div class="flex flex-col gap-2">
                    <h2 class="text-xl">Duration</h2>
                    <span>{{ viewBudgetData.duration }}</span>
                </div>
            </div>
            <div class="flex justify-center gap-4">
                <AppBtn @click="toggleModal(null, 'view')">Close</AppBtn>
            </div>
        </div>
    </AppModal>
    </transition>
</template>

<script setup>
import AppBtn from '@/components/AppBtn.vue';
import AppInput from '@/components/AppInput.vue';
import AppModal from '@/components/AppModal.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const durationArray = ref(["Weekly", "Monthly"]);

const store = useStore();
const addModalIsOpen = ref(false);
const active = ref();
const initialFormData = ref({
    title: '',
    amount: '',
    duration: '',
    isOpen: false
});
let formData = ref({
    title: '',
    amount: '',
    duration: '',
    isOpen: false
});
const viewBudgetData = ref();
const editBudgetData = ref();
const viewModalIsOpen = ref(false);
const editModalIsOpen = ref(false);

const budgets = computed(()=> store.state.budget.budgets);

const toggleModal = (data, modal) => {
    if(modal === 'edit') {
        editBudgetData.value = data;
        editModalIsOpen.value = !editModalIsOpen.value;
    } else if (modal === 'view') {
        viewBudgetData.value = data;
        viewModalIsOpen.value = !viewModalIsOpen.value;
    } else if (modal === 'add') {
        formData.value = {...initialFormData}
        addModalIsOpen.value = !addModalIsOpen.value
    }
}

const addBudget = () => {
    store.dispatch('addBudget', formData.value)
    formData.value = {...initialFormData}
    addModalIsOpen.value = !addModalIsOpen.value
}

const openMenu = (item) => {
    active.value = budgets.value.filter((item) => item.isOpen)[0];
    if(active.value) {
        active.value.isOpen = false; 
    }
    item.isOpen = true
}

const closeMenu = () => {
    active.value = budgets.value.filter((item) => item.isOpen)[0];
    if(active.value) {
        active.value.isOpen = false; 
    }
}

const deleteBudget = (id) => {
    store.dispatch('removeBudget', id)
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