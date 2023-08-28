<template>
  <div :class="[size === 'small' ? 'h-[28px]' : 'h-[42px]']">
    <button
      :disabled="disabled"
      :type="type"
      class="h-full bg text-center w-full rounded-[10px] px-4 flex items-center justify-center disabled:bg-gray-300 disabled:text-gray-400"
      :class="{
        'bg-blue-600 text-white hover:bg-blue-600 active:bg-blue-700':
          variant === 'primary',
        'bg-blue-50 text-blue-900': variant === 'primaryRevert',
        'bg-yellow-500 text-gray-950': variant === 'warning',
        'bg-yellow-50 text-yellow-700': variant === 'warningRevert',
        'bg-red-600 text-white': variant === 'error',
        'bg-red-50 text-red-700': variant === 'errorRevert',
        'text-sm': size === 'small',
      }"
    >
      <div class="loader" ref="loader"></div>
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
const loader = ref(null);

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
  loading: Boolean,
  disabled: { type: Boolean, default: false },
  size: {
    type: String as PropType<"small" | "default">,
    default: "default",
  },
});

// onMounted(() => {
// $lottie.loadAnimation({
//   container: loader.value!,
//   path: "../../assets/lottie/loading.json",
//   autoplay: true,
//   loop: true,
// });
// });

watchEffect(() => {
  if (props.loading) {
    // $lottie.play();
  }
});
</script>
