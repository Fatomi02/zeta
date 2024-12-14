<template>
 <div class="flex flex-col gap-1" :class="{ 'checkbox': type === 'checkbox' }">
      <label :for="id">{{ label }}</label>
      <input
        :type="showPassword ? 'text' : type"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :minlength="type === 'password' ? min : undefined"
        :required=required
        v-model="inputValue"
        autocomplete
      />
      <div v-if="type === 'password'" class="relative">
        <img @click="toggleVisibility" class="absolute cursor-pointer right-3 top-[-35px]" src="@/assets/icons/hidden.svg" alt="">
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed, ref } from 'vue';
  const props = defineProps({
    label: {
      type: String,
      default: "",
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    id: {
      type: String,
      default: "",
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    min: {
      type: [String, Number],
      default: 0,
    },
    modelValue: {
      type: [String, Boolean],
      default: "",
      required: true,
    },
  });

const showPassword = ref(false);

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const toggleVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>
  
  <style scoped>
 input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid grey;
    border-radius: 20px;
    outline: none;
}

input:hover {
    box-shadow: 0 4px 8px rgb(226, 226, 104, 0.2);
    border: 1px solid rgb(226, 226, 104);
    cursor: pointer;
}

input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px; /* 20px */
  height: 20px;
  border-radius: 4px;
  padding: 0;
  background-color: white;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #141414;
  border-color: #141414;
}

input[type="checkbox"]:checked::after {
  content: "✓";
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.checkbox {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
}
  </style>
  