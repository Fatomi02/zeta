<template>
<div class="bg-light-grey">
    <div v-if="isLoading" class="loader_overlay">
        <span class="loader"></span>
    </div>
    <router-view></router-view>
</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();


const isLoading = computed(()=> store.state.auth.isLoading);

</script>

<style scoped>

</style>

