<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full h-screen flex justify-center items-center">
    <transition name="fade-left">
      <div v-if="isVisible" class="bg-primary hidden w-1/2 lg:flex h-screen justify-center items-center">
        <img class="xl:h-[60vh] xl:w-[550px] rounded-2xl" src="@/assets/images/encryption.jpg" alt="home-banner" />
      </div>
      </transition>
    <div class="flex justify-center lg:w-1/2 w-[90%] h-screen items-center">
      <transition name="fade-right">
        <div v-if="isVisible" class="flex flex-col gap-8 w-full lg:w-auto">
          <h1 class="lg:text-[50px] text-[40px] logo">FinCore</h1>
        <div  class="flex flex-col gap-6 w-full lg:w-[400px] xl:w-[500px]">
          <div class="flex flex-col gap-2">
            <h1 class="text-3xl font-bold">Log In</h1>
            <span>Enter your email & password to login</span>
          </div>
          <form class="flex flex-col gap-6" @submit.prevent="login">
            <AppInput label="Email address" required type="email" v-model="email" name="email" id="email"
              placeholder="Enter your email address" />
            <AppInput label="Password" required type="password" :min="8" v-model="password" name="password"
              id="password" placeholder="min 8 chars" />
            <AppInput label="I agree to the Terms & Privacy" type="checkbox" v-model="checkbox" name="checkbox"
              id="checkbox" placeholder="min 8 chars" />
            <AppBtn :disabled=!isFormValid type="submit" variant="primary">Log in</AppBtn>
          </form>
          <div class="text-dark-grey w-full">
            Don't have an account? <a class="underline text-light-blue" href="/signup">Sign up</a>
          </div>
        </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import AppInput from "@/components/AppInput.vue";
import AppBtn from "@/components/AppBtn.vue";

import { useStore } from 'vuex';
const store = useStore();
import { computed, onMounted, ref } from 'vue';
const email = ref('');
const password = ref('');
const checkbox = ref(false);
const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
})

const isFormValid = computed(() => {
  return (
    emailValidation(email.value) && 
    password.value.length >= 8
  );
})

const emailValidation = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }


// Login method
const login = () => {
  store.dispatch('login', { email: email.value, password: password.value });
};
</script>

<style scoped>
.logo {
  font-weight: 900;
}
</style>
