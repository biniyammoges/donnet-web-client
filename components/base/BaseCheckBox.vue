<template>
  <div class="my-2">
    <div class="flex items-center gap-x-3">
      <input :id="name" type="checkbox" v-model="value" class="h-4 w-4" />
      <label :for="name" class="text-gray-500">{{ label }}</label>
    </div>
    <p class="text-red-400 mt-2">{{ errorMessage }}</p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: String,
});

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});
</script>
