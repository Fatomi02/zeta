<template>
  <div class="min-w-[120px]">
    <button
      :class="[variant, size]"
      class="xl:py-3 xl:px-4 py-2 px-3 min-h-12 flex items-center gap-2 justify-center text-center font-medium w-full lg:rounded-[16px] rounded-[12px]"
      :type="type"
      :disabled="disabled"
      @click="handleClick"
    >
      <slot v-if="!isLoading"></slot>
      <span v-else class="btn-loader"></span>
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
  size: {
    type: String,
    default: 'Big'
  },
  isLoading: {
    type: Boolean,
    default: false
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
.small {
  padding: 10px 16px;
}

.primary {
    background: #3f75b3;
    color: white;
}

.primary:hover {
  box-shadow: 0px 4px 4px -1px #14141405;
  box-shadow: 0px 4px 4px -1px #14141410;
}

.outline {
  background-color: transparent;
  border: 1px solid #141414;
  outline: none;
}

.outline:hover {
  box-shadow: 0px 4px 4px -1px #14141405;
  box-shadow: 0px 4px 4px -1px #14141410;
}

.danger {
  background-color: #e02424;
  color: white;
}

.primary:disabled {
  cursor: not-allowed;
  box-shadow: none !important;
  background-color: #e5e5e5;
}

.danger:hover {
  box-shadow: 0px 4px 4px -1px #14141405;
  box-shadow: 0px 4px 4px -1px #14141410;
}

.btn-loader {
    width: 24px;
    height: 24px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>
