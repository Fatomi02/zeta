<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
            <h1 class="font-medium text-2xl md:text-3xl">Financial Insight</h1>
            <span>Keep track of your budget and transaction history.</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-10">
            <div class="bg-[#34495E] min-h-[200px] grid grid-cols-1 md:grid-cols-2  justify-center items-center rounded-[20px]">
                <div class="p-4 flex lg:justify-center">
                    <div class="flex flex-col gap-4 text-[#A6DDEF]">
                        Total Budget Amount
                        <h3 class="text-4xl font-bold">#100, 000</h3>
                    </div>
                </div>
                <div class="p-4 flex flex-col gap-4">
                    <div class="flex flex-col gap-2 text-[#A6DDEF]">
                        Total Weekly Budget Amount
                        <h3 class="text-2xl font-bold">#50, 000</h3>
                    </div>
                    <div class="flex flex-col gap-2 text-[#A6DDEF]">
                        Total Monthly Budget Amount
                        <h3 class="text-2xl font-bold">#50, 000</h3>
                    </div>
                </div>
            </div>
            <div class="bg-[#34495E] min-h-[200px] grid grid-cols-1 md:grid-cols-2  justify-center items-center rounded-[20px]">
                <div class="p-4 flex lg:justify-center">
                    <div class="flex flex-col gap-4 text-[#A6DDEF]">
                        Total Balance
                        <h3 class="text-4xl font-bold">#20, 000</h3>
                    </div>
                </div>
                <div class="p-4 flex flex-col gap-4">
                    <div class="flex flex-col gap-2 text-[#A6DDEF]">
                        Total Income
                        <h3 class="text-2xl font-bold">#60, 000</h3>
                    </div>
                    <div class="flex flex-col gap-2 text-[#A6DDEF]">
                        Total Money Spent
                        <h3 class="text-2xl font-bold">#40, 000</h3>
                    </div>
                </div>
            </div>
            <div class="flex flex-col bg-white rounded-[20px] p-4 gap-4">
                Budget Chart
                <AppChart :data="chartBudgetData" :options="chartBudgetOptions" />
            </div>
            <div class="flex flex-col bg-white rounded-[20px] p-4 gap-4">
                Total Income against Total Money Spent
                <AppChart :data="chartTransactionData" :options="chartTransactionOptions" />
            </div>
        </div>
    </div>
</template>

<script setup>
import AppChart from '@/components/AppChart.vue';

const chartBudgetData = {
    labels: ["Food", "Data", "House", "Fuel"],
    datasets: [
        {
            label: 'Budget',
            data: [20, 30, 10, 40],
            backgroundColor: ["blue", "black", "red", "green"]
        }
    ]
}

const chartBudgetOptions = {
    animation: {
        duration: 1000,
    },
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                color: "#141414"
            }
        }
    }
}

const chartTransactionData = {
    labels: ["Income", "Spending"],
    datasets: [
        {
            label: 'Transaction',
            data: [60, 40],
            backgroundColor: ["blue", "black"]
        }
    ]
}


const chartTransactionOptions = {
    animation: {
        duration: 1000,
    },
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                color: "#141414"
            }
        }
    }
}
</script>