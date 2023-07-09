<template>
  <div class="my-3">
    <label :for="name" v-if="label" class="text-gray-500 text-base"
      >{{ label }}<span v-if="requried"> *</span></label
    >

    <div class="relative h-[42px] mt-1">
      <input
        :id="name"
        class="animate-color h-full px-4 w-full border rounded-[10px] outline-none focus:border-blue-500 text-gray-600"
        :class="{
          'border border-red-400': errorMessage,
          'border-gray-300': errorMessage,
        }"
        :type="showPassword ? 'text' : type"
        v-model="value"
        :placeholder="placeholder"
      />
      <span
        v-if="type === 'password'"
        class="cursor-pointer text-lg text-gray-500 hover:text-gray-600 active:scale-95 absolute top-1/2 -translate-y-1/2 right-3"
        :class="{
          'i-mdi-eye-outline': showPassword,
          'i-mdi-eye-off-outline': !showPassword,
        }"
        @click="showPassword = !showPassword"
      ></span>
    </div>
    <p class="text-red-400" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    validate: (value: string) =>
      ["text", "password", "email", "datetime", "number", "tel"].includes(
        value
      ),
  },
  label: String,
  modelValue: {
    type: String,
  },
  placeholder: String,
  requried: Boolean,
});

const showPassword = ref(false);

const { errorMessage, value } = useField(() => props.name, undefined, {
  syncVModel: true,
});
</script>

<style scoped>
.animate-color {
  @apply transition-colors ease-linear;
}
</style>
