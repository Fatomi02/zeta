<template>
<div>
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

const isLoading = computed(()=> store.state.auth.isLoading)
</script>

<style scoped>
.loader {
        width: 64px;
        height: 64px;
        position: relative;
        background-image:
          linear-gradient(#3498DB 16px, transparent 0) ,
          linear-gradient(#2C3E50 16px, transparent 0) ,
          linear-gradient(#2C3E50 16px, transparent 0) ,
          linear-gradient(#3498DB 16px, transparent 0);
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position: left top , left bottom , right top , right bottom;
        animation: rotate 1s linear infinite;
      }
      @keyframes rotate {
        0% {
          width: 64px;
          height: 64px;
          transform: rotate(0deg)
        }
        50% {
          width: 30px;
          height: 30px;
          transform: rotate(180deg)
        }
        100% {
          width: 64px;
          height: 64px;
          transform: rotate(360deg)
        }
      }
    
</style>

