<template>
<div class="bg-partial-white h-screen overflow-auto scroll-container">
    <div v-if="isLoading" class="loader_overlay">
        <span class="loader"></span>
    </div>
    <router-view></router-view>
</div>
<div v-if="response.message" :class="response.status ? 'bg-green-500' : 'bg-red-500'" class="flag w-[80%] lg:w-[500px] top-[60px] lg:top-[90px]">
      <div class="flex gap-2 items-center">
        <img src="@/assets/icons/Success.svg" alt="successful">
        {{ response.message }}
      </div>
      <img @click="hideFlag" class="cursor-pointer" src="@/assets/icons/Close.svg" alt="Close">
</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const isLoading = computed(()=> store.state.auth.isLoading)
const response = computed(()=> store.state.auth.response)

const hideFlag = () => {
  store.commit('CLEAR_RESPONSE');
}
</script>

<style scoped>
  .flag {
    position: fixed;
    right: 2px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
  }
    
</style>

