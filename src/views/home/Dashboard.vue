<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <transition name="fade-in">
        <div v-if="isVisible" class="flex flex-col h-screen w-full lg:flex-row">
        <SideNav></SideNav>
        <div class="lg:px-8 lg:py-12 py-6 px-4 w-full bg-partial-white h-full overflow-auto scroll-container">
            <RouterView></RouterView>
        </div>
    </div>
    </transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SideNav from "@/components/SideNav.vue";

const isVisible = ref(false);

onMounted(()=> {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    isVisible.value = true;
})
</script>
