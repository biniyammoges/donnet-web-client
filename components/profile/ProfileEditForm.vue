<template>
  <div
    class="max-w-[600px] max-h-[90vh] overflow-hidden w-full bg-white rounded-xl mx-3"
  >
    <div class="flex items-center justify-between border-b px-5 py-3">
      <h1 class="text-xl text-gray-600">Edit Profile</h1>
      <button
        @click="$emit('close')"
        class="text-2xl text-gray-400 hover:text-gray-700"
      >
        <span class="i-mdi-close"></span>
      </button>
    </div>
    <div v-if="updateError" class="py-2 px-5 bg-red-50 text-red-900">
      {{ updateError }}
    </div>
    <form
      @submit.prevent="submitUpdate"
      class="px-5 h-full py-2 flex flex-col gap-y-2 justify-center overflow-y-auto"
    >
      <!--Firstname  -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="firstName">First Name *</label>
        <div class="xs:max-w-[350px] w-full">
          <BaseInput
            name="firstName"
            v-model="userDto.firstName"
            id="firstName"
            size="full"
            placeholder="First name"
            requried
          />
        </div>
      </div>

      <!-- Lastname -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="lastName">Last Name *</label>
        <div class="xs:max-w-[350px] w-full">
          <BaseInput
            requried
            name="lastName"
            v-model="userDto.lastName"
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
            name="email"
            requried
            v-model="userDto.email"
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
            v-model="userDto.bio"
            placeholder="Write something about yourself"
            id="bio"
            cols="30"
            rows="2"
            class="border text-base w-full rounded-xl outline-none resize-none px-3 py-2 focus:border-blue-50 text-gray-600"
          ></textarea>
          <p class="text-end text-sm text-gray-500">0/60</p>
        </div>
      </div>

      <!-- Date of birth -->
      <div class="flex justify-between flex-col xs:flex-row">
        <label class="text-gray-500" for="dob">Date of birth</label>
        <div class="xs:max-w-[350px] w-full">
          <BaseInput
            disabled
            name="birthDate"
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
            requried
            name="username"
            v-model="userDto.username"
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
            v-model="userDto.password"
            requried
            type="password"
            id="username"
            size="full"
            name="password"
            placeholder="Confirm password"
          />
        </div>
      </div>

      <div class="flex justify-end my-2">
        <BaseButton type="submit">Save changes</BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { UpdateMeDto, UpdateMeValidationSchema } from "~/types";

const { updateMe } = useAuthApi();
const { user } = storeToRefs(useAuthStore());

const $emit = defineEmits(["close"]);

// states
const userDto = reactive<UpdateMeDto>({
  firstName: user.value?.firstName ?? "",
  lastName: user.value?.lastName ?? "",
  email: user.value?.email ?? "",
  username: user.value?.username ?? "",
  password: "",
  bio: user.value?.bio ?? "",
});
const updateError = ref("");

const validationSchema = UpdateMeValidationSchema;
const { handleSubmit } = useForm({ validationSchema });

const submitUpdate = handleSubmit(async () => {
  updateError.value = "";
  const { error, data } = await updateMe(userDto);
  if (error.value) {
    if (error.value?.data) {
      updateError.value = Array.isArray(error.value?.data?.message)
        ? error.value?.data?.message.join(", ")
        : error.value?.data?.message;
    } else {
      updateError.value =
        error.value.response && error.value.response._data.error
          ? error.value.response._data.error
          : error?.value.message;
    }
  }
  if (data.value) {
    $emit("close");
  }
});
</script>
