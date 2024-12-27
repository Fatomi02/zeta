<template>
  <div class="flex flex-col gap-1" :class="{ 'checkbox': type === 'checkbox' }">
    <label class="text-dark-grey" :for="id">{{ label }}</label>
    <input v-if="type !== 'select' && type !== 'textarea'" :type="showPassword ? 'text' : type" :name="name" :id="id"
      :placeholder="placeholder" :minlength="type === 'password' ? min : undefined" :required=required
      v-model="inputValue" autocomplete />
      <div v-if="type === 'search' && !inputValue" class="relative">
        <img class="absolute cursor-pointer top-[-34px] lg:top-[-38px] right-4" src="@/assets/icons/Search o.svg" alt="search">
      </div>
    <div v-if="type === 'password'" class="relative">
      <img v-if="showPassword" @click="toggleVisibility" class="absolute cursor-pointer right-5 top-[-38px]" src="@/assets/icons/hidden.svg"
        alt="">
      <img v-else @click="toggleVisibility" class="absolute cursor-pointer right-5 top-[-38px] w-[20px] h-[20px]" src="@/assets/icons/open eye.svg"
        alt="">
    </div>
    <textarea rows="4" :required="required" v-if="type === 'textarea'" :name="name" :id="id"
      :placeholder="placeholder" v-model="inputValue"></textarea>
    <div @click.prevent="toggleDropdown" ref="dropdownContainer" v-if="type === 'select'" class="relative m-0 p-0">
      <input :name="name" :id="id" :required="required" :placeholder="placeholder" readonly v-model="inputValue">
      <img class="absolute cursor-pointer top-3 lg:top-4 right-4" src="@/assets/icons/dropdown.svg" alt="dropdown">
      <div v-if="showDropdown" class="dropdown_box">
        <div @click="selectItem('')" class="py-3 px-4 hover:bg-light-grey cursor-pointer text-dark-grey">--Select--</div>
        <div v-for="(item, index) in selectArray" :key="index" class="py-3 text-dark-grey px-4 hover:bg-light-grey cursor-pointer"
          @click="selectItem(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, onMounted, onBeforeUnmount } from 'vue';
const props = defineProps({
  label: {
    type: String,
    default: "",
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
    type: [String, Boolean, Number],
    default: "",
    required: true,
  },
  selectArray: {
    type: Array,
  }
});

const showPassword = ref(false);
const showDropdown = ref(false);

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const toggleVisibility = () => {
  showPassword.value = !showPassword.value
}
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectItem = (item) => {
  toggleDropdown
  emit('update:modelValue', item);
}

const dropdownContainer = ref(null);

const handleClickOutside = (event) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<style scoped>
input,
textarea {
  width: 100%;
  padding: 12px 18px 12px 16px;
  border: 1px solid #3498DB;
  border-radius: 8px;
  outline: none;
  background-color: #FFFFFF;
  color: #333333;
}

input:hover {
  box-shadow: 0 2px 4px #3498DB;
  border: 1px solid #2C81BA;
  cursor: pointer;
}

input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  /* 20px */
  height: 20px;
  border-radius: 4px;
  padding: 0;
  background-color: white;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #3498DB;
  border-color: #3498DB;
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

.dropdown_box {
  position: absolute;
  width: 100%;
  margin-top: 8px;
  background-color: white;
  padding: 8px 0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px -4px #14141410;
  box-shadow: 0px 16px 32px -4px #14141430;
  z-index: 99999;
}

@media only screen and (max-width: 640px) {
  input,
textarea {
  padding: 8px 20px 8px 12px;
}

}
</style>