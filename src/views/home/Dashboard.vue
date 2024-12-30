<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <transition name="fade-in">
        <div v-if="isVisible" class="flex flex-col h-screen w-full lg:flex-row">
            <SideNav></SideNav>
            <div class="flex flex-col w-full">
                <div class="hidden w-full lg:block">
                    <NavBar />
                </div>
                <div class="lg:px-8 lg:py-6 pb-6 py-4 px-4 w-full lg:h-full lg:overflow-y-auto bg-[#f1f3ff]">
                    <RouterView></RouterView>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import SideNav from "@/components/SideNav.vue";

const isVisible = ref(false);

onMounted(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    isVisible.value = true;
});
</script>
