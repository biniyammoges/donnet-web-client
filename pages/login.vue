<template>
  <div class="bg-white min-h-screen flex justify-center items-center">
    <div class="w-11/12 sm:w-[355px] mx-auto">
      <h1 class="text-4xl font-semibold text-gray-700">
        Welcome back! <span class="i-mdi-fingerprint"></span>
      </h1>
      <p class="text-gray-600 text-lg font-medium">
        Connect with people and make friends online
      </p>
      <form @submit.prevent="submit">
        <base-input
          type="text"
          name="email"
          label="Email or username"
          placeholder="Email or username"
          v-model="email"
        />
        <base-input
          v-model="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
        />
        <div class="flex justify-between items-center">
          <base-check-box name="rememberPassword" label="remember me" />
          <p class="text-blue-600 cursor-pointer">Forgot password?</p>
        </div>
        <base-button type="submit">Login</base-button>
      </form>
      <p class="text-gray-600">
        No account yet?
        <nuxt-link to="/register" class="text-blue-600 underline"
          >Register</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
const email = ref("");
const password = ref("");

const { handleSubmit } = useForm({
  validationSchema: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  }),
});

const submit = handleSubmit(() => {
  console.log(email.value);
  console.log(password.value);
});
</script>
