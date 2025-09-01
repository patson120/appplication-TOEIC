<template>
  <div 
    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    @click="startExercise"
  >
    <div class="relative">
      <!-- Type indicator -->
      <div class="absolute top-4 left-4 z-10">
        <div 
          class="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
          :class="getTypeColor(exercise.type)"
        >
          {{ exercise.type.toUpperCase() }}
        </div>
      </div>

      <!-- Completion badge -->
      <div v-if="exercise.completed" class="absolute top-4 right-4 z-10">
        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle :size="16" class="text-white" />
        </div>
      </div>

      <!-- Background image or gradient -->
      <div 
        class="h-32 bg-gradient-to-br transition-all duration-300 group-hover:scale-105"
        :class="getBackgroundGradient(exercise.type)"
      >
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300"></div>
        <div class="absolute bottom-4 left-4 right-4">
          <div class="flex items-center space-x-2 text-white">
            <component :is="getTypeIcon(exercise.type)" :size="20" />
            <span class="font-medium">{{ exercise.duration }} min</span>
          </div>
        </div>
      </div>
    </div>

    <div class="p-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ exercise.title }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
        {{ exercise.description }}
      </p>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <div 
            class="px-2 py-1 rounded text-xs font-medium"
            :class="getLevelBadgeColor(exercise.level)"
          >
            {{ exercise.level }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {{ exercise.questions.length }} questions
          </div>
        </div>

        <div v-if="exercise.completed && exercise.score" class="text-right">
          <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ exercise.score }}%</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Score</div>
        </div>
      </div>

      <button 
        class="w-full btn-primary py-3 inline-flex items-center justify-center space-x-2 group-hover:shadow-lg transition-all duration-300"
        :class="{ 'btn-secondary': exercise.completed }"
      >
        <component :is="exercise.completed ? RotateCcw : Play" :size="18" />
        <span>{{ exercise.completed ? 'Refaire' : 'Commencer' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Exercise } from '../types'
import { BookOpen, Headphones, Mic, Play, CheckCircle, RotateCcw } from 'lucide-vue-next'

interface Props {
  exercise: Exercise
}

const props = defineProps<Props>()

const emit = defineEmits<{
  start: [exercise: Exercise]
}>()

const startExercise = () => {
  emit('start', props.exercise)
}

const getTypeIcon = (type: string) => {
  const icons: Record<string, any> = {
    reading: BookOpen,
    listening: Headphones,
    speaking: Mic
  }
  return icons[type] || BookOpen
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    reading: 'bg-blue-500',
    listening: 'bg-green-500',
    speaking: 'bg-purple-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getBackgroundGradient = (type: string) => {
  const gradients: Record<string, string> = {
    reading: 'from-blue-400 to-blue-600',
    listening: 'from-green-400 to-green-600',
    speaking: 'from-purple-400 to-purple-600'
  }
  return gradients[type] || 'from-gray-400 to-gray-600'
}

const getLevelBadgeColor = (level: string) => {
  const colors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    elementary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    intermediate: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    'upper-intermediate': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    proficient: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
  }
  return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
}
</script>