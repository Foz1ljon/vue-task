<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="props.collapse ? 'rotate-0' : 'rotate-90'"
    class="h-5 w-5 text-gray-500 transition-transform duration-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  collapse: Boolean
})
</script>

<style></style>
