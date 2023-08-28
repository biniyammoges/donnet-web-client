<template>
  <div
    class="max-w-[600px] max-h-[90vh] overflow-hidden w-full bg-white rounded-xl mx-3"
  >
    <div class="flex border-b px-5 py-3">
      <h1 class="text-xl text-gray-600">Edit Profile</h1>
    </div>
    <form
      class="px-5 h-full py-2 flex flex-col gap-y-2 justify-center overflow-y-auto"
    >
      <!--Firstname  -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="firstName">First Name *</label>
        <div class="xs:max-w-[350px] w-full">
          <BaseInput
            v-model="firstName"
            id="firstName"
            size="full"
            placeholder="First name"
          />
        </div>
      </div>

      <!-- Lastname -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="lastName">Last Name *</label>
        <div class="xs:max-w-[350px] w-full">
          <BaseInput
            v-model="lastName"
            id="lastName"
            size="full"
            placeholder="Last name"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="email">Email address *</label>
        <div class="xs:max-w-[350px] w-full">
          <BaseInput
            v-model="email"
            type="email"
            id="email"
            size="full"
            placeholder="example@email.com"
          />
        </div>
      </div>

      <!-- Bio -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="bio">Bio</label>
        <div class="xs:max-w-[350px] w-full">
          <textarea
            v-model="bio"
            placeholder="Write something about yourself"
            id="bio"
            cols="30"
            rows="2"
            class="border text-base w-full rounded-xl outline-none resize-none px-3 py-2 focus:border-blue-500"
          ></textarea>
          <p class="text-end text-sm text-gray-500">0/60</p>
        </div>
      </div>

      <!-- Date of birth -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="dob">Date of birth</label>
        <div class="xs:max-w-[350px] w-full">
          <BaseInput
            v-model="birthDate"
            type="date"
            id="dob"
            size="full"
            placeholder="Date of birth"
          />
        </div>
      </div>

      <!-- Username -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="username">Username *</label>
        <div class="xs:max-w-[350px] w-full">
          <BaseInput
            v-model="username"
            disabled
            id="username"
            size="full"
            placeholder="@iambini"
          />
        </div>
      </div>

      <!-- Confirm password -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="username">Confirm password *</label>
        <div class="xs:max-w-[350px] w-full">
          <BaseInput
            v-model="confirmPassword"
            type="password"
            id="username"
            size="full"
            placeholder="Confirm password"
          />
        </div>
      </div>

      <div class="flex justify-end my-2">
        <BaseButton>Save changes</BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useAuthStore());

// states
const firstName = ref(user.value?.firstName ?? "");
const lastName = ref(user.value?.lastName ?? "");
const email = ref(user.value?.email ?? "");
const username = ref(user.value?.username ?? "");
const birthDate = ref(user.value?.birthDate ?? "");
const bio = ref(user.value?.bio ?? "");
const confirmPassword = ref("");
</script>
