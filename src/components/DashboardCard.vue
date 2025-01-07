<template>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 items-center rounded-2xl bg-white shadow">
        <div
            class="border-r border-r-grey border-b border-b-grey lg:border-b-none col-span-2 lg:col-span-1 items-center lg:items-start flex flex-col gap-2 p-4 xl:py-6 xl:px-4">
            <span>{{
                type === "budget" ? "Total Budgets" : "Total Transactions"
                }}</span>
            <span class="text-xl">{{ data?.length }}</span>
        </div>
        <div class="border-r border-r-grey flex flex-col gap-2 p-4 xl:py-6 xl:px-4">
            <span>{{
                type === "budget" ? "Total Monthly Budgets" : "Total Income"
                }}</span>
            <span class="text-xl">{{
                type === "budget"
                    ? subData.monthlyBudget?.length
                    : subData.income.length
                }}</span>
        </div>
        <div class="flex flex-col gap-2 p-4 xl:py-6 xl:px-4">
            <span>{{
                type === "budget" ? "Total Weekly Budgets" : "Total Spending"
                }}</span>
            <span class="text-xl">{{
                type === "budget"
                    ? subData.weeklyBudget?.length
                    : subData.spending.length
                }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

const subData = computed(() => {
    if (props.type === "budget") {
        const monthlyBudget = props.data.filter(
            (item) => item.duration.toLowerCase() === "monthly"
        );
        const weeklyBudget = props.data.filter(
            (item) => item.duration.toLowerCase() === "weekly"
        );
        return {
            monthlyBudget,
            weeklyBudget,
        };
    } else if (props.type === "transaction") {
        const income = props.data.filter(
            (item) => item.category.toLowerCase() === "income"
        );
        const spending = props.data.filter(
            (item) => item.category.toLowerCase() === "spending"
        );
        return {
            income,
            spending,
        };
    }
    return [];
});
</script>
