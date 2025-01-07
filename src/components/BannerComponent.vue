<template>
            <div class="p-6 flex flex-col md:flex-row xl:items-center rounded-2xl bg-blue">
            <div class="flex flex-col items-start gap-6">
                <div class="flex flex-col gap-2">
                    <h2 class="text-2xl lg:text-3xl font-medium text-light-grey">{{ title }}</h2>
                    <span class="text-white">{{ description }}</span>
                </div>
                <button @click="redirectToSummary"
                    class="flex items-center bg-white rounded-lg py-[6px] px-3 text-[14px] text-[#0D3051]">
                    Go to Dashboard <img class="inline-block ml-1" src="@/assets/icons/arrow_diagonal_blue.svg"
                        alt=""></button>
            </div>
        </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
defineProps({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
});
const router = useRouter()
const redirectToSummary = () => {
    router.push('/dashboard');
}
</script>