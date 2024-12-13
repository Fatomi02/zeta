<template>
  <div>
    <button
    :class="variant"
      class="p-2 text-center font-medium w-full hover:opacity-90 rounded-[30px]"
      :type="type"
      :disabled="disabled"
      @click="handleClick"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppBtn",
  props: {
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
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      }
    },
  },
};
</script>

<style scoped>
.primary {
    background: #141414;
    color: white;
}
</style>
