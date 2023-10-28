<template>
  <Teleport to="body" v-if="modelValue">
    <div
      @click.self="persistant ? null : emit('update:modelValue', false)"
      class="fixed z-50 top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-60"
    >
      <slot></slot>
      <button
        v-if="showCloseButton"
        @click="emit('update:modelValue', false)"
        class="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white bg-opacity-20 text-white text-3xl"
      >
        <span class="i-mdi-close"></span>
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  persistant: Boolean,
  showCloseButton: Boolean,
});

watchEffect(() => {
  if (process.client) {
    if (props.modelValue) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }
});

const emit = defineEmits(["update:modelValue"]);
</script>
