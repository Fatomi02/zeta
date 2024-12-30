<template>
    <div class="h-screen hidden lg:block min-w-[330px] bg-white border-r border-[#f5f5f5]">
        <div class="p-8 flex flex-col mt-[50px] gap-10">
            <h1 class="text-4xl text-center font-extrabold">FinCore</h1>
            <div class="flex flex-col gap-5">
                <router-link to="/dashboard/home"
                    class="py-4 px-5 w-full flex font-medium items-center gap-2"
                    exact-active-class="active_link">
                    <img class="h-6 w-6" src="@/assets/icons/Home.svg" alt="">
                    Dashboard
                </router-link>
                <router-link to="/dashboard/budgets"
                    class="py-4 px-5 w-full flex font-medium items-center gap-2"
                    exact-active-class="active_link">
                    <img class="h-6 w-6" src="@/assets/icons/budget.svg" alt="">
                    Budgets
                </router-link>
                <router-link to="/dashboard/transactions"
                    class="py-4 px-5 w-full font-medium flex items-center gap-2"
                    exact-active-class="active_link">
                    <img class="h-6 w-6" src="@/assets/icons/transaction.svg" alt="">
                    Transactions
                </router-link>
            </div>
        </div>
    </div>
    <div class="py-3 lg:hidden  bg-white border-0 px-4 flex items-center justify-between sticky top-0 z-10">
        <h1 class="text-4xl text-center font-extrabold logo">FinCore</h1>
        <img @click="toggleMenu" class="w-8 h-8" src="@/assets/icons/hamburger.svg" alt="hamburger">
    </div>
    <transition name="fade-left">
        <div v-if="isOpen" @click="toggleMenu" class="modal_overlay lg:hidden">
            <div @click.stop.prevent class="h-screen relative w-[78%] bg-white flex flex-col justify-between pb-10">
                <div class="p-6 flex flex-col gap-10">
                    <h1 class="text-4xl text-center font-extrabold">FinCore</h1>
                    <div class="flex gap-4 items-center">
                        <div class="w-[60px] h-[60px] rounded-full text-xl bg-blue text-white flex justify-center items-center">
                            {{ user?.name ? user?.name.slice(0, 1) : 'U' }}
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2 class="font-medium capitalize"> {{ user?.name ? user?.name : 'Unknown User'
                                }}</h2>
                            <span class="text-sm cursor-pointer">Edit Profile</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-5">
                        <router-link to="/dashboard/home"
                            class="py-4 px-5 w-full flex font-medium items-center gap-2 rounded-[30px]"
                            exact-active-class="active_link" @click="toggleMenu">
                            <img class="h-6 w-6" src="@/assets/icons/Home.svg" alt="">
                            Dashboard
                        </router-link>
                        <router-link to="/dashboard/budgets"
                            class="py-4 px-5 w-full flex font-medium items-center gap-2 rounded-[30px]"
                            exact-active-class="active_link" @click="toggleMenu">
                            <img class="h-6 w-6" src="@/assets/icons/budget.svg" alt="">
                            Budgets
                        </router-link>
                        <router-link to="/dashboard/transactions"
                            class="py-4 px-5 w-full font-medium flex items-center gap-2 rounded-[30px]"
                            exact-active-class="active_link" @click="toggleMenu">
                            <img class="h-6 w-6" src="@/assets/icons/transaction.svg" alt="">
                            Transactions
                        </router-link>
                    </div>
                </div>
                <div class="flex items-start w-full p-6">
                    <AppBtn variant="" @click="logout">
                    <img src="@/assets/icons/Logout.svg" alt="Logout">
                    Log Out
                </AppBtn>
                </div>
            </div>
        </div>
    </transition>

</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AppBtn from './AppBtn.vue';
const store = useStore();

const isOpen = ref(false);
const user = computed(() => store.state.auth.user)
const toggleMenu = () => {
    isOpen.value = !isOpen.value
}


const logout = () => {
    store.dispatch('logout')
}
</script>

<style scoped>
.active_link {
    background: #386cf4;
    font-weight: 600;
    color: white;
    border-radius: 16px;
}
</style>