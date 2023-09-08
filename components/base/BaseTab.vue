<template>
  <div class="">
    <!-- tabs -->
    <div
      v-if="tabs?.length > 1"
      class="inline-flex h-[44px] p-1 border border-gray-300 rounded-full w-auto items-center"
    >
      <button
        @click="activeTabIdx = idx"
        :class="[
          idx === activeTabIdx
            ? 'bg-blue-500 text-white'
            : 'text-gray-500 hover:text-blue-500',
        ]"
        class="px-6 rounded-full h-full text-sm"
        v-for="(tab, idx) of tabs"
        :key="idx"
      >
        {{ tab }}
      </button>
    </div>

    <!-- tab pages -->
    <template v-for="(tab, idx) of tabs" :key="idx">
      <div v-if="idx === activeTabIdx" :class="[tabs.length > 1 ? 'mt-4' : '']">
        <slot :name="`tab-${idx + 1}`"></slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tabs: {
    type: Array as PropType<String[]>,
    required: true,
  },
});

const activeTabIdx = ref(0);
</script>
