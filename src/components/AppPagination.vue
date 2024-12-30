<template>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-2 lg:px-3 py-1 rounded disabled:bg-grey text-white bg-blue">
        Previous
    </button>
    <div class="flex items-center gap-1">
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="['px-3 py-1 border rounded text-dark-grey', currentPage === page ?
            'bg-blue text-white' : 'bg-white', typeof page === 'number' ? '' :
                'cursor-not-allowed']">
            {{ page }}
        </button>
    </div>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-2 lg:px-3 py-1 rounded disabled:bg-grey text-white bg-blue">
        Next
    </button>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  totalItems: { type: Number, required: true },
  pageSize: { type: Number, default: 10 },
  currentPage: { type: Number, required: true },
});

const emit = defineEmits(['pageChange']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));

const visiblePages = computed(() => {
  const maxVisible = 5;
  const pages = [];
  const start = Math.max(props.currentPage - Math.floor(maxVisible / 2), 1);
  const end = Math.min(start + maxVisible - 1, totalPages.value);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (start > 1) {
    pages.unshift('...');
    pages.unshift(1);
  }
  if (end < totalPages.value) {
    pages.push('...');
    pages.push(totalPages.value);
  }

  return pages;
});

function goToPage(page) {
  if (typeof page === 'number' && page > 0 && page <= totalPages.value) {
    emit('pageChange', page);
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  }
}
</script>