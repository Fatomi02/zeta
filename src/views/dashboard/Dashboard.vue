<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex flex-col lg-flex-row">
        <SideNav></SideNav>
        <div class="px-8 py-12">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup>
import SideNav from '@/components/SideNav.vue';
</script>