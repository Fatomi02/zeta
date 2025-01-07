<template>
    <div class="flex flex-col gap-4 lg:gap-6 mb-6"
        :class="isTableView && !isLoading && filteredData.length ? 'p-3 big_card bg-white' : ''">
        <div v-if="filteredData.length > 0 && !isLoading && !isTableView" class="flex flex-col gap-4">
            <div v-for="(data, index) in filteredData" :key="index"
                class="w-full py-3 px-5 lg:p-5 xl:p-8 grid grid-cols-3 item lg:grid-cols-4 gap-4 justify-between bg-blue border border-cyan rounded-2xl">
                <div class="hidden lg:flex flex-col items-start gap-1 capitalize">
                    <h4 class="text-[14px] text-light-grey">{{ type === 'transaction' ? 'Narration' : 'Title'}}</h4>
                    <div class="truncate w-full text-white">{{ type === 'transaction' ? data.narration : data.title }}</div>
                </div>
                <div class="flex w-full flex-col items-start gap-1">
                    <h4 class="text-[14px] text-light-grey">Amount</h4>
                    <div class="w-full truncate" :class="type === 'transaction' ? data.category.toLowerCase() !== 'income'
                        ? 'text-red-500'
                        : 'text-green-400'
                        : 'text-white'">${{ type === 'transaction' ? data.amount.toLocaleString() : data.total_amount.toLocaleString() }}</div>
                </div>
                <div class="flex truncate w-full flex-col items-start gap-1 capitalize text-white">
                    <h4 class="text-[14px] text-light-grey">{{ type === 'transaction' ? 'Category' : 'Duration' }}</h4>
                    {{ type === 'transaction' ? data.category : data.duration }}
                </div>
                <div class="flex justify-end relative">
                    <img @click.stop.prevent="openMenu(data)" class="cursor-pointer" src="@/assets/icons/action.svg"
                        alt="action">
                    <div v-if="data.isOpen"
                        :class="index === filteredData.length - 1 && index > 1 ? 'top-[-110px]' : 'top-10'"
                        class="item-menu w-[150px] lg:w-[200px]">
                        <div @click="toggleModal(data, type === 'budget' ? 'viewBudget' :'viewTransaction')" class="px-6 py-2 text-deep-blue hover:bg-light-grey">
                            View</div>
                        <div @click="toggleModal(data, 'edit')" class="px-6 py-2 text-deep-blue hover:bg-light-grey">
                            Edit</div>
                        <div @click.stop.prevent="toggleModal(data._id, 'delete')"
                            class="px-6 py-2 text-red-800 hover:bg-light-grey">Delete</div>
                    </div>
                </div>
            </div>
            <div v-if="filteredData.length && (
                (type === 'transaction' && !searchValue.narration && !searchValue.category) ||
                (type === 'budget' && !searchValue.duration && !searchValue.title)
            )
            " class="border-t border-t-gray-300 p-3 flex justify-between items-center">
                <AppPagination :totalItems="filteredData.length" :currentPage="currentPage"
                    @pageChange="handlePageChange" />
            </div>
        </div>
        <div v-if="filteredData.length > 0 && !isLoading && isTableView" class="flex flex-col">
            <div
                class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-4 bg-blue py-3 px-4 rounded-lg">
                <div class="pr-4 lg:pr-6 w-full hidden md:block text-white">{{ headers[0] }}</div>
                <div class="pr-4 lg:pr-6 w-full text-white">{{ headers[1] }}</div>
                <div class="pr-4 lg:pr-6 w-full text-white">{{ headers[2] }}</div>
                <div class="pr-4 lg:pr-6 w-full hidden md:block text-white">{{ headers[3] }}</div>
                <div class="pr-4 lg:pr-6 w-full hidden md:block lg:hidden xl:block text-white">{{ headers[4] }}</div>
                <div></div>
            </div>
            <div v-for="(data, index) in filteredData" :key="index">
                <div
                    class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-4 px-4 lg:hover:bg-partial-white cursor-pointer">
                    <div class="pr-4 lg:pr-6 w-full truncate hidden md:block">
                        {{ data._id }}
                    </div>
                    <div class="flex gap-2 items-center pr-4 lg:pr-6w-full truncate capitalize">
                        {{ type === 'transaction' ? data.narration : data.title }}
                    </div>
                    <div class="pr-4 lg:pr-6 w-full truncate capitalize" :class="type === 'transaction' ? data.category.toLowerCase() !== 'income'
                        ? 'text-error'
                        : 'text-green-400' : ''
                        ">
                        {{ type === 'transaction' ? data.category.toLowerCase() !== 'income' ? '-' : '+' : '' }}
                        ${{ type === 'transaction' ? data.amount.toLocaleString() : data.total_amount.toLocaleString()
                        }}
                    </div>
                    <div
                        class="text-deep-blue pr-4 lg:pr-6 w-full overflow-hidden capitalize truncate hidden md:flex gap-2 items-center">
                        <div v-if="type === 'transaction'" class="md:h-[12px] md:w-[12px] w-2 h-2 rounded-full" :class="data.category.toLowerCase() !== 'income'
                            ? 'bg-error'
                            : 'bg-green-400'"></div>
                        {{ type === 'transaction' ? data.category : data.duration }}
                    </div>
                    <div class="pr-4 lg:pr-6 w-full truncate hidden md:block lg:hidden xl:block">
                        {{ new Date(data.createdAt).toLocaleString("en-US", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        }) }}</div>
                    <button @click="toggleModal(data, 'transaction')" class="flex justify-end relative">
                        <img @click.stop.prevent="openMenu(data)" class="cursor-pointer h-6"
                            src="@/assets/icons/menu.svg" alt="action">
                        <div v-if="data.isOpen" :class="index === filteredData.length - 1 ? 'bottom-0' : 'top-0'"
                            class="item-menu w-[100px] right-4 lg:w-[200px]">
                            <div @click="toggleModal(data, type === 'budget' ? 'viewBudget' :'viewTransaction')" class="px-6 py-2 hover:bg-light-grey text-start">
                                View</div>
                            <div @click="toggleModal(data, 'edit')" class="px-6 py-2 hover:bg-light-grey text-start">
                                Edit</div>
                            <div @click.stop.prevent="toggleModal(data._id, 'delete')"
                                class="px-6 py-2 text-error hover:bg-light-grey text-start">Delete</div>
                        </div>
                    </button>
                </div>
                <div v-if="index !== filteredData.length - 1 && isTableView" class="h-[1px] w-full bg-gray-300">
                </div>
                <div v-if="index === filteredData.length - 1 && (
                    (type === 'transaction' && !searchValue.narration && !searchValue.category) ||
                    (type === 'budget' && !searchValue.duration && !searchValue.title)
                )" class="border-t border-t-gray-300 p-3 flex justify-between items-center">
                    <AppPagination :totalItems=totalData.length :currentPage="currentPage"
                        @pageChange="handlePageChange" />
                </div>
            </div>
        </div>
        <div v-else-if="filteredData.length === 0 && !isLoading"
            class="w-full py-6 flex flex-col gap-4 bg-white items-center justify-center text-light-blue text-xl rounded-lg shadow">
            <img height="200" width="300" src="@/assets/images/empty.png" alt="no-record-found">
        </div>
        <div v-if="isLoading"
            class="w-full h-[250px] flex flex-col gap-4 bg-white items-center justify-center text-light-blue text-xl rounded-md">
            <span class="loader"></span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import AppPagination from './AppPagination.vue';
import { useStore } from 'vuex';

const props = defineProps({
    headers: { type: Array, default: () => [] },
    filteredData: { type: Array, default: () => [] },
    totalData: { type: Array, default: () => [] },
    isTableView: { type: Boolean, default: false },
    searchValue: { type: Object },
    type: { type: String, default: '' },
});
const store = useStore();

const currentPage = computed(() => {

    if (props.type === 'transaction') {
        return store.state.transaction.currentPage
    } else {
        return store.state.budget.currentPage
    }
});

function handlePageChange(page) {
    if (props.type === 'transaction') {
        store.commit('setCurrentTransactionPage', page);
    }
    else if (props.type === 'budget') {
        store.commit('setCurrentBudgetPage', page);
    }
}

const emit = defineEmits();

const toggleModal = (data, modal) => {
    emit('toggleModal', { data, modal });
}

const openMenu = (data) => {
    emit('openMenu', data);
}


const isLoading = computed(() => store.state.auth.fetchAllIsLoading);
</script>

<style scoped>
.item:hover {
    cursor: pointer;
    box-shadow: 0 2px 4px #34495E;
}

.item-menu {
    position: absolute;
    background-color: white;
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0px 4px 4px -4px #14141410;
    box-shadow: 0px 16px 32px -4px #14141430;
    z-index: 99999;
}
</style>