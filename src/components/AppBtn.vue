<template>
  <div>
    <button
    :class="variant"
      class="lg:py-3 lg:px-4 py-2 px-3 flex items-center gap-2 justify-center text-center font-medium w-full rounded-[8px]"
      :type="type"
      :disabled="disabled"
      @click="handleClick"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled) {
    emit("click", event);
  }
};
</script>

<style scoped>
.primary {
    background: #3498DB;
    color: white;
}

.primary:hover {
  background-color: #2C81BA;
  box-shadow: 0 2px 4px #3498DB;
}

.danger {
  background-color: rgb(184, 22, 22);
  color: white;
}

.primary:disabled {
  cursor: not-allowed;
  background-color: #e5e5e5;
}

.danger:hover {
  box-shadow: 0 2px 4px rgb(184, 22, 22);
}
</style>
