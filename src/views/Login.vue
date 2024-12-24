<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-screen h-screen p-6 lg:p-10 flex flex-col justify-center lg:justify-start gap-4 lg:gap-8">
    <transition name="fade-left">
      <h1 v-if="isVisible" class="lg:text-4xl text-center lg:text-start text-[40px] logo">FinCore</h1>
    </transition>
    <div class="flex gap-10 justify-center">
      <transition name="fade-left">
        <div v-if="isVisible" class="flex flex-col gap-6 lg:gap-10 w-[100%] xl:w-[500px] mt-10">
          <div class="flex flex-col gap-2 text-center xl:text-left">
            <h1 class="text-3xl font-bold">Get Started Now</h1>
            <span>Enter your details to access your account</span>
          </div>
          <form class="flex flex-col gap-6" @submit.prevent="login">
            <AppInput label="Email address" required type="email" v-model="email" name="email" id="email"
              placeholder="Enter your email address" />
            <AppInput label="Password" required type="password" :min="8" v-model="password" name="password"
              id="password" placeholder="min 8 chars" />
            <AppInput label="I agree to the Terms & Privacy" type="checkbox" v-model="checkbox" name="checkbox"
              id="checkbox" placeholder="min 8 chars" />
            <AppBtn type="submit" variant="primary">Log in</AppBtn>
          </form>
          <div class="text-[#333333]">
            Don't have an account? <a class="underline" href="/signup">Sign up</a>
          </div>
        </div>
      </transition>
      <transition name="fade-right">
        <img v-if="isVisible" class="rounded-2xl hidden lg:flex h-[80vh] w-[490px] xl:w-fit"
          src="@/assets/images/auth-banner.png" alt="home-banner" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import AppInput from "@/components/AppInput.vue";
import AppBtn from "@/components/AppBtn.vue";

import { useStore } from 'vuex';
const store = useStore();
import { onMounted, ref } from 'vue';
const email = ref('');
const password = ref('');
const checkbox = ref(false);
const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
})

// Login method
const login = () => {
  store.dispatch('login', { email: email.value, password: password.value });
};
</script>

<style scoped>
.logo {
  font-weight: 800;
}
</style>
