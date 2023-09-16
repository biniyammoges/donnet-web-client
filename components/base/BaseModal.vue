<template>
  <Teleport to="body" v-if="modelValue">
    <div
      @click.self="persistant ? null : emit('update:modelValue', false)"
      class="fixed z-50 top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-[2px]"
    >
      <slot></slot>
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
