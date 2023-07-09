<template>
  <div class="bg-white min-h-screen flex justify-center items-center">
    <div class="w-11/12 xs:w-[355px] mx-auto">
      <h1 class="text-4xl font-semibold text-gray-700">
        Welcome! <span class="i-mdi-fingerprint"></span>
      </h1>
      <p class="text-gray-600 text-lg font-medium">
        Please take few steps to create new account
      </p>
      <form @submit.prevent="submit">
        <div v-if="currentStep === 1">
          <base-input
            type="usermame"
            name="username"
            requried
            label="Username"
            placeholder="username"
            v-model="username"
          />
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
            type="text"
            name="firstName"
            requried
            label="First name"
            placeholder="First name"
            v-model="firstName"
          />
          <base-input
            type="text"
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
        <!--  -->
        <!-- <base-button type="submit">Register</base-button> -->
      </form>
      <p class="text-gray-600">
        Already have an account?
        <nuxt-link to="/login" class="text-blue-600 underline">login</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstName = ref("");
const lastName = ref("");
const bio = ref("");
const dateOfBirth = ref("");

const currentStep = ref(1);
const handleStep = (step: number) => {
  currentStep.value = step;
};

const validateCredentialStep = async () => {
  const { errors } = await validate();
  if (
    !errors.username ||
    !errors.email ||
    !errors.password ||
    !errors.confirmPassword
  ) {
    handleStep(2);
  }
};

const { handleSubmit, validate } = useForm({
  validationSchema: Yup.object({
    username: Yup.string().label("Username").required().min(5).max(35),
    email: Yup.string().label("Email").required().email(),
    password: Yup.string().label("Password").required().min(8),
    confirmPassword: Yup.string().label("Confirm password").required().min(8),
    firstName: Yup.string().label("First name").required().min(3),
    lastName: Yup.string().label("Last name").required().min(3),
    bio: Yup.string().min(5).max(60),
  }),
});

const submit = handleSubmit(() => {
  console.log(email.value);
  console.log(password.value);
});
</script>
