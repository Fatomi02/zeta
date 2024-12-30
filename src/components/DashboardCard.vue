<template>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center rounded-2xl bg-white shadow">
            <div class="border-r h-full border-r-grey flex items-center justify-center p-4 xl:py-6 xl:px-4">
                <span class="font-semibold text-blue">{{ formattedDate }}</span>
            </div>
            <div class="border-r border-r-grey flex flex-col gap-2 p-4 xl:py-6 xl:px-4">
                <span>{{ type === 'budget' ? 'Total Budgets' : 'Total Transactions' }}</span>
                <span>{{ data?.length }}</span>
            </div>
            <div class="border-r border-r-grey flex flex-col gap-2 p-4 xl:py-6 xl:px-4">
                <span>{{ type === 'budget' ? 'Total Monthly Budgets' : 'Total Income' }}</span>
                <span>{{ type === 'budget' ? subData.monthlyBudget?.length : subData.income.length }}</span>
            </div>
            <div class="flex flex-col gap-2 p-4 xl:py-6 xl:px-4">
                <span>{{ type === 'budget' ? 'Total Weekly Budgets' : 'Total Spending' }}</span>
                <span>{{ type === 'budget' ? subData.weeklyBudget?.length : subData.spending.length }}</span>
            </div>
        </div>
</template>

<script setup>
import { defineProps, computed, onMounted, ref } from 'vue';
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

const formattedDate = ref('')

onMounted(() => {
    formattedDate.value = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
})

const subData = computed(()=> {
    if(props.type === 'budget') {
        const monthlyBudget = props.data.filter((item) => item.duration.toLowerCase() === 'monthly');
        const weeklyBudget = props.data.filter((item) => item.duration.toLowerCase() === 'weekly');
        return {
            monthlyBudget,
            weeklyBudget
        }}  else if(props.type === 'transaction') {
            const income = props.data.filter((item) => item.category.toLowerCase() === 'income');
            const spending = props.data.filter((item) => item.category.toLowerCase() === 'spending');
            return {
                income,
                spending
            }
        }
return []
})


</script>