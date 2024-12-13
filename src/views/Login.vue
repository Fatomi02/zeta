<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-screen h-screen p-6 lg:p-10 flex flex-col gap-4 lg:gap-8">
    <h1 class="text-4xl logo">Zeta</h1>
    <div class="flex gap-10 justify-center">
      <div class="flex flex-col gap-6 lg:gap-10 w-[100%] xl:w-[500px] mt-10">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold">Get Started Now</h1>
          <span>Enter your details to access your account</span>
        </div>
        <form class="flex flex-col gap-6" @submit.prevent="login">
          <AppInput
            label="Email address"
            required
            type="email"
            v-model="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
          />
          <AppInput
            label="Password"
            required
            type="password"
            :min="8"
            v-model="password"
            name="password"
            id="password"
            placeholder="min 8 chars"
          />
          <AppInput
            label="I agree to the Terms & Privacy"
            type="checkbox"
            v-model="checkbox"
            name="checkbox"
            id="checkbox"
            placeholder="min 8 chars"
          />
          <AppBtn type="submit" variant="primary">Log in</AppBtn>
        </form>
        <div>
          Don't have an account? <a class="underline" href="/signup">Sign up</a>
        </div>
      </div>
      <img
        class="rounded-2xl hidden lg:flex h-[80vh] w-[490px] xl:w-fit"
        src="../assets/images/auth-banner.png"
        alt="home-banner"
      />
    </div>
  </div>
</template>

<script>
import AppInput from "../components/Input.vue";
import AppBtn from "../components/Button.vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    AppInput,
    AppBtn,
  },
  data() {
    return {
      email: "",
      password: "",
      checkbox: false,
      store: useStore(),
      router: useRouter(),
    };
  },
  methods: {
  async login() {
    try {
        const response = await this.store.dispatch('login', { email: this.email, password: this.password });
    if (response && response.data && response.data.token) {
      this.router.push('/dashboard');
    }} catch (error) {
      console.error('Login failed', error);
    }
  }
}
};
</script>

<style scoped>
.logo {
  font-weight: 800;
}
</style>
