<template>
  <div class="h-[42px] my-2">
    <button
      :type="type"
      class="h-full bg text-center w-full rounded-[10px] px-4"
      :class="{
        'bg-blue-600 text-white hover:bg-blue-600 active:bg-blue-700':
          variant === 'primary',
        'bg-blue-50 text-blue-700': variant === 'primaryRevert',
        'bg-yellow-500 text-gray-950': variant === 'warning',
        'bg-yellow-50 text-yellow-700': variant === 'warningRevert',
        'bg-red-600 text-white': variant === 'error',
        'bg-red-50 text-red-700': variant === 'errorRevert',
      }"
    >
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
  variant: {
    type: String as PropType<
      | "primary"
      | "primaryRevert"
      | "secondary"
      | "secondaryRevert"
      | "warning"
      | "warningRevert"
      | "error"
      | "errorRevert"
    >,
    default: "primary",
  },
});
</script>
