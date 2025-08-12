<template>
  <div class="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
    <Clock :size="18" class="text-gray-500" />
    <span class="font-mono text-sm" :class="timeClass">
      {{ formattedTime }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Clock } from 'lucide-vue-next'

interface Props {
  timeRemaining: number
}

const props = defineProps<Props>()

const formattedTime = computed(() => {
  const hours = Math.floor(props.timeRemaining / 3600)
  const minutes = Math.floor((props.timeRemaining % 3600) / 60)
  const seconds = props.timeRemaining % 60
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const timeClass = computed(() => {
  if (props.timeRemaining < 300) return 'text-red-600 font-bold'
  if (props.timeRemaining < 600) return 'text-orange-600'
  return 'text-gray-700'
})
</script>