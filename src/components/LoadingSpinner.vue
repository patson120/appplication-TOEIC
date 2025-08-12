<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
    <span v-if="text" class="ml-3 text-gray-600">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
}

defineProps<Props>()
</script>