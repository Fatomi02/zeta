<template>
    <transition name="fade-right">
        <AppModal :isOpen="viewModalIsOpen">
            <div class="w-[96%] lg:w-[800px] rounded-xl bg-white py-10 px-8 flex flex-col gap-8">
                <h2 class="text-xl font-medium">{{ type === 'budget' ? 'Budget Details' : 'Transaction Details' }}</h2>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div class="flex flex-col gap-1">
                            <h2>{{ type === 'budget' ? 'Title' : 'Narration' }}</h2>
                            <span class="capitalize">{{ type === 'budget' ? data.title : data.narration }}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2>{{ type === 'budget' ? 'Budget Amount' : 'Transaction Amount' }}</h2>
                            <span :class="type === 'budget' ? '' :data.category !== 'Income'
                                ? 'text-error'
                                : 'text-green-400'
                                ">${{ type === 'budget' ? data.total_amount.toLocaleString() : data.amount.toLocaleString() }}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2>{{ type === 'budget' ? 'Duration' : 'Category' }}</h2>
                            <span class="capitalize">{{ type === 'budget' ? data.duration : data.category }}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2>{{ type === 'budget' ? 'Budget Id' : 'Transaction Id' }}</h2>
                            <span>{{ data._id }}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2>Time Created</h2>
                            <span>{{ new Date(data.createdAt).toLocaleString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            }) }}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2>Last Time Updated</h2>
                            <span>{{ new Date(data.updatedAt).toLocaleString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            }) }}</span>
                        </div>
                </div>
                <div class="flex justify-end gap-4">
                    <AppBtn size="small" @click="toggleModal(null, type === 'budget' ? 'viewBudget' :'viewTransaction')">Close</AppBtn>
                </div>
            </div>
        </AppModal>
    </transition>
</template>

<script setup>
import AppModal from './AppModal.vue';
import AppBtn from './AppBtn.vue';
import { defineProps } from 'vue';

defineProps({
    type: {type: String, default: ''},
    data: { type: Object },
    headers: {type: Array},
    viewModalIsOpen: {type: Boolean, default: false}
});

const emit = defineEmits();

const toggleModal = (data, modal) => {
    emit('toggleModal', { data, modal });
}

</script>