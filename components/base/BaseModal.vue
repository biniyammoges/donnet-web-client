<template>
  <Teleport to="body" v-if="modelValue">
    <div
      @click.self="emit('update:modelValue', false)"
      class="fixed z-50 top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)]"
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
