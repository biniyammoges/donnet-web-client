<template>
  <div class="bg-white min-h-screen flex justify-center items-center">
    <div class="w-11/12 xs:w-[355px] mx-auto">
      <h1 class="text-4xl font-semibold text-gray-700">
        Welcome! <span class="i-mdi-fingerprint"></span>
      </h1>
      <p class="text-gray-600 text-lg font-medium">
        Please take few steps to create new account
      </p>
      <div
        class="py-2 px-3 rounded-lg bg-red-50 text-red-900 text-base my-2"
        v-if="registerError"
      >
        <p>{{ registerError }}</p>
      </div>
      <form @submit.prevent="validatePersonalInfoStepAndSubmit">
        <div v-if="currentStep === 1">
          <div>
            <base-input
              name="username"
              requried
              label="Username"
              placeholder="username"
              v-model="username"
            />
            <p v-if="hasUsernameValidationError" class="text-sm text-red-400">
              {{ usernameValidationError }}
            </p>
            <p v-if="usernameValidationLoading" class="text-sm text-gray-600">
              Validating username...
            </p>
            <p
              v-if="
                !hasUsernameValidationError &&
                !usernameValidationLoading &&
                username.length >= 5
              "
              class="text-green-600 text-sm"
            >
              Username {{ username }} is available
              <span class="i-mdi-check"></span>
            </p>
          </div>
          <base-input
            type="email"
            name="email"
            requried
            label="Email"
            placeholder="Email"
            v-model="email"
          />
          <base-input
            v-model="password"
            name="password"
            type="password"
            requried
            label="Password"
            placeholder="Password"
          />
          <base-input
            v-model="confirmPassword"
            name="confirmPassword"
            type="password"
            requried
            label="Confirm password"
            placeholder="Confirm password"
          />
          <div class="mt-3 flex justify-end">
            <button
              @click="validateCredentialStep"
              type="button"
              class="h-8 w-8 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center text-lg active:scale-90"
            >
              <span class="i-mdi-arrow-right"></span>
            </button>
          </div>
        </div>
        <div v-if="currentStep === 2">
          <base-input
            name="firstName"
            requried
            label="First name"
            placeholder="First name"
            v-model="firstName"
          />
          <base-input
            name="lastName"
            requried
            label="Last name"
            placeholder="Last name"
            v-model="lastName"
          />
          <base-input
            v-model="dateOfBirth"
            name="dateOfBirth"
            type="date"
            label="Date of birth"
            placeholder="Date of birth"
          />
          <div class="mt-3 flex justify-between items-center">
            <button
              @click="handleStep(1)"
              type="button"
              class="h-8 w-8 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center text-lg active:scale-90"
            >
              <span class="i-mdi-arrow-left"></span>
            </button>
            <base-button type="submit">Create Account</base-button>
          </div>
        </div>
      </form>
      <p class="text-gray-600">
        Already have an account?
        <nuxt-link to="/login" class="text-blue-600 underline">login</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store/useAuthStore";
import useUserApi from "../composables/useUserApi";
import { RegisterValidationSchema as validationSchema } from "~/types";

const { register } = useAuthApi();
const { validateUsername } = useUserApi();
const { storeAuthTokens } = useAuthStore();

const email = ref("bini@gmail.com");
const username = ref("");
const password = ref("123456789");
const confirmPassword = ref("123456789");
const firstName = ref("Bini");
const lastName = ref("Moges");
const bio = ref("");
const dateOfBirth = ref<Date>();

const usernameValidationError = ref<null | string>(null);
const usernameValidationLoading = ref(false);

const loading = ref<boolean>(false);
const registerError = ref<string | null>(null);

const currentStep = ref(1);

// vee-validate form composable
const { validate } = useForm({ validationSchema });

const handleStep = (step: number) => {
  currentStep.value = step;
};

watch(
  () => username.value,
  async (newValue, _oldValue) => {
    if (usernameValidationError.value) {
      usernameValidationError.value = null;
    }

    const usernameRegex = /^[a-zA-Z0-9._]{5,30}$/;
    if (!newValue.match(usernameRegex)) {
      usernameValidationError.value =
        "Username can only contain letters, numbers, underscores, and periods";
      return;
    }

    // validate username api call request starts
    usernameValidationLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data, error } = await validateUsername(username.value);
    // validate username api call request ends
    usernameValidationLoading.value = false;

    if (data.value && !data.value?.valid) {
      usernameValidationError.value = `The username ${newValue} is already taken`;
    }
  }
);

const hasUsernameValidationError = computed(
  () =>
    username.value.length >= 5 &&
    !usernameValidationLoading.value &&
    usernameValidationError.value
);

const validateCredentialStep = async () => {
  registerError.value = null;
  const { errors } = await validate();

  // check for password and confirm password match
  if (password.value !== confirmPassword.value) {
    registerError.value = "Confirm password don't match!";
  }

  // prevent going to step to 2 with out valid value in step 1
  if (
    !errors.username &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    !usernameValidationError.value
  ) {
    handleStep(2);
  }
};

const validatePersonalInfoStepAndSubmit = async () => {
  const { errors } = await validate();

  // prevent submiting form with out valid value in step 2
  if (!errors.firstName && !errors.lastName && !errors.dateOfBirth) {
    await submit();
  }
};

const submit = async () => {
  // reset error
  registerError.value = null;

  // register api call start
  loading.value = true;

  const { data, error } = await register({
    username: username.value,
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    dateOfBirth: dateOfBirth.value!,
    confirmPassword: confirmPassword.value,
    ...(bio.value && { bio: bio.value }),
  });

  // register api call ends
  loading.value = false;

  // checks for expected errors that are sent by server like client (400 - 499) and server (500 - 599) error
  if (error.value && error.value?.data) {
    registerError.value = Array.isArray(error.value?.data?.message)
      ? error.value?.data?.message.join(", ")
      : error.value?.data?.message;
  }

  // checks for unexpected errors like network error
  if (error.value && (error.value?.response || error.value.message)) {
    registerError.value = error.value.response?._data?.error
      ? error.value.response?._data.error
      : error?.value?.message;
  }

  if (data.value) {
    storeAuthTokens(data.value);
    navigateTo("/");
  }
};

useHead({
  title: "Donnet | register new account!",
});
</script>
