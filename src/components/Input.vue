<template>
 <div class="flex flex-col gap-1" :class="{ 'checkbox': type === 'checkbox' }">
      <label :for="id">{{ label }}</label>
      <input
        :type="type"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :minlength="type === 'password' ? min : undefined"
        :required=required
        v-model="inputValue"
        autocomplete
      />
    </div>
  </template>
  
  <script>
  export default {
    name: "AppInput",
    props: {
      label: {
        type: String,
        default: "",
      },
      type: {
        type: String,
        default: "text"
      },
      name: {
        type: String,
        default: "",
      },
      id: {
        type: String,
        default: "",
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
      },
    },
    computed: {
      inputValue: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit("update:modelValue", value);
        },
      },
    },
  };
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
  