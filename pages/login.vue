<template>
  <div class="bg-white min-h-screen flex justify-center items-center">
    <div class="w-11/12 sm:w-[355px] mx-auto">
      <h1 class="text-4xl font-semibold text-gray-700">
        Welcome back! <span class="i-mdi-fingerprint"></span>
      </h1>
      <p class="text-gray-600 text-lg font-medium">
        Connect with people and make friends online
      </p>
      <div
        class="py-2 px-3 rounded-lg bg-red-50 text-red-900 text-lg my-2"
        v-if="loginError"
      >
        <p>{{ loginError }}</p>
      </div>
      <form @submit.prevent="submit">
        <base-input
          type="email"
          name="email"
          label="Email or username"
          placeholder="Email or username"
          v-model="email"
          requried
        />
        <base-input
          v-model="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          requried
        />
        <div class="flex justify-between items-center flex-wrap">
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
import useAuthApi from "../composables/useAuthApi";
import { useAuthStore } from "../store/useAuthStore";
import { LoginValidationSchema as validationSchema } from "~/types";

const { login } = useAuthApi();
const { storeAuthTokens } = useAuthStore();

const loading = ref<boolean>(false);
const loginError = ref<string | null>(null);

const email = ref("");
const password = ref("");

const { handleSubmit } = useForm({ validationSchema });

const submit = handleSubmit(async () => {
  // reset error
  loginError.value = null;

  loading.value = true;

  const { data, error } = await login({
    emailOrUsername: email.value,
    password: password.value,
  });

  loading.value = false;

  if (error.value) {
    if (error.value?.data) {
      loginError.value = error.value?.data?.message;
    } else {
      loginError.value =
        error.value.response && error.value.response._data.error
          ? error.value.response._data.error
          : error?.value.message;
    }

    return;
  }

  if (data.value) {
    storeAuthTokens(data.value);
    navigateTo("/");
  }
});

useHead({
  title: "Donnet | Login",
});
</script>
