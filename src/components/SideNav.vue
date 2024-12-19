<template>
    <div class="h-screen hidden lg:block min-w-[350px] bg-[#2C3E50] border-r border-r-[#6C757D]">
        <div class="p-8 flex flex-col gap-10">
            <h1 class="text-4xl text-[#FFFFFF] text-center font-extrabold">FinCore</h1>
            <div class="flex gap-4 items-center">
                <div class="w-[60px] h-[60px] rounded-full bg-[#3498DB]"></div>
                <div class="flex flex-col gap-1">
                    <h2 class="font-medium text-[#FFFFFF]">{{ user?.name }}</h2>
                    <span class="text-sm cursor-pointer text-[#FFFFFF]">Edit Profile</span>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <router-link to="/dashboard/budget"
                    class="py-4 px-5 w-full flex font-medium items-center gap-2 rounded-[30px] text-[#FFFFFF]"
                    exact-active-class="active_link">
                    <img class="h-6 w-6" src="@/assets/icons/budget.svg" alt="">
                    Budget
                </router-link>
                <router-link to="/dashboard/transaction"
                    class="py-4 px-5 w-full font-medium flex items-center gap-2 rounded-[30px] text-[#FFFFFF]"
                    exact-active-class="active_link">
                    <img class="h-6 w-6" src="@/assets/icons/transaction.svg" alt="">
                    Transaction
                </router-link>
                <router-link to="/dashboard/financial-insight"
                    class="py-4 px-5 w-full font-medium flex items-center gap-2 rounded-[30px] text-[#FFFFFF]"
                    exact-active-class="active_link">
                    <img class="h-6 w-6" src="@/assets/icons/insight.svg" alt="">
                    Financial Insights
                </router-link>
            </div>
        </div>
    </div>
    <div class="py-3 lg:hidden bg-[#2C3E50] border-0 px-4 flex items-center justify-between sticky top-0">
        <h1 class="text-4xl text-center font-extrabold text-[#FFFFFF] logo">FinCore</h1>
        <img @click="toggleMenu" class="w-8 h-8" src="@/assets/icons/hamburger.svg" alt="hamburger">
    </div>
    <transition name="fade-left">
        <div v-if="isOpen" @click="toggleMenu" class="modal_overlay lg:hidden">
        <div @click.stop.prevent class="h-screen relative w-[78%] bg-[#2C3E50]">
        <div class="p-6 flex flex-col gap-10">
            <h1 class="text-4xl text-center text-[#FFFFFF] font-extrabold">FinCore</h1>
            <div class="flex gap-4 items-center">
                <div class="w-[60px] h-[60px] rounded-full bg-[#3498DB]"></div>
                <div class="flex flex-col gap-1">
                    <h2 class="font-medium text-[#FFFFFF]">{{ user?.name }}</h2>
                    <span class="text-sm cursor-pointer text-[#FFFFFF]">Edit Profile</span>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <router-link to="/dashboard/budget"
                    class="py-4 px-5 w-full flex font-medium items-center gap-2 rounded-[30px] text-[#FFFFFF]"
                    exact-active-class="active_link"
                    @click="toggleMenu">
                    <img class="h-6 w-6" src="@/assets/icons/budget.svg" alt="">
                    Budget
                </router-link>
                <router-link to="/dashboard/transaction"
                    class="py-4 px-5 w-full font-medium flex items-center gap-2 rounded-[30px] text-[#FFFFFF]"
                    exact-active-class="active_link"
                    @click="toggleMenu">
                    <img class="h-6 w-6" src="@/assets/icons/transaction.svg" alt="">
                    Transaction
                </router-link>
                <router-link to="/dashboard/financial-insight"
                    class="py-4 px-5 w-full font-medium flex items-center gap-2 rounded-[30px] text-[#FFFFFF]"
                    exact-active-class="active_link"
                    @click="toggleMenu">
                    <img class="h-6 w-6" src="@/assets/icons/insight.svg" alt="">
                    Financial Insights
                </router-link>
            </div>
        </div>
        </div>
    </div>
    </transition>

</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const isOpen = ref(false);
const user = computed(() => store.state.auth.user)
const toggleMenu = () => {
    isOpen.value = !isOpen.value
}
</script>

<style scoped>
.active_link {
    background: #3498DB;
    font-weight: 600;
    color: white;
}
</style>