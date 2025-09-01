<template>
  <div 
    class="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    :class="{ 'opacity-60': !path.isUnlocked }"
  >
    <!-- Progress overlay -->
    <div 
      class="absolute top-0 left-0 h-1 bg-gradient-to-r transition-all duration-1000"
      :class="getProgressColor(path.level)"
      :style="{ width: `${path.progress}%` }"
    ></div>
    
    <!-- Lock overlay for locked paths -->
    <div v-if="!path.isUnlocked" class="absolute inset-0 bg-gray-900/20 flex items-center justify-center z-10">
      <div class="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
        <Lock :size="24" class="text-gray-600 dark:text-gray-400" />
      </div>
    </div>

    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :class="getLevelColor(path.level)"
          >
            <component :is="getLevelIcon(path.level)" :size="24" class="text-white" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ path.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 capitalize">{{ path.level }}</p>
          </div>
        </div>
        
        <div class="text-right">
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ path.progress }}%</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Complété</div>
        </div>
      </div>

      <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{{ path.description }}</p>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center space-x-1">
            <BookOpen :size="16" />
            <span>{{ getExerciseCount(path, 'reading') }} Reading</span>
          </div>
          <div class="flex items-center space-x-1">
            <Headphones :size="16" />
            <span>{{ getExerciseCount(path, 'listening') }} Listening</span>
          </div>
          <div class="flex items-center space-x-1">
            <Mic :size="16" />
            <span>{{ getExerciseCount(path, 'speaking') }} Speaking</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex -space-x-2">
          <div 
            v-for="exercise in path.exercises.slice(0, 3)" 
            :key="exercise.id"
            class="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold"
            :class="exercise.completed ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'"
          >
            <CheckCircle v-if="exercise.completed" :size="16" />
            <span v-else>{{ path.exercises.indexOf(exercise) + 1 }}</span>
          </div>
          <div 
            v-if="path.exercises.length > 3"
            class="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400"
          >
            +{{ path.exercises.length - 3 }}
          </div>
        </div>

        <button 
          @click="startPath"
          :disabled="!path.isUnlocked"
          class="btn-primary px-4 py-2 text-sm inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play :size="16" />
          <span>{{ path.progress > 0 ? 'Continuer' : 'Commencer' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LearningPath } from '../types'
import { BookOpen, Headphones, Mic, Play, CheckCircle, Lock, Star, Award, Target } from 'lucide-vue-next'

interface Props {
  path: LearningPath
}

const props = defineProps<Props>()

const emit = defineEmits<{
  start: [path: LearningPath]
}>()

const startPath = () => {
  if (props.path.isUnlocked) {
    emit('start', props.path)
  }
}

const getLevelIcon = (level: string) => {
  const icons: Record<string, any> = {
    beginner: Star,
    elementary: BookOpen,
    intermediate: Award,
    'upper-intermediate': Target,
    advanced: Award,
    proficient: Target
  }
  return icons[level] || Star
}

const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    beginner: 'bg-green-500',
    elementary: 'bg-blue-500',
    intermediate: 'bg-purple-500',
    'upper-intermediate': 'bg-orange-500',
    advanced: 'bg-red-500',
    proficient: 'bg-indigo-500'
  }
  return colors[level] || 'bg-gray-500'
}

const getProgressColor = (level: string) => {
  const colors: Record<string, string> = {
    beginner: 'from-green-500 to-green-600',
    elementary: 'from-blue-500 to-blue-600',
    intermediate: 'from-purple-500 to-purple-600',
    'upper-intermediate': 'from-orange-500 to-orange-600',
    advanced: 'from-red-500 to-red-600',
    proficient: 'from-indigo-500 to-indigo-600'
  }
  return colors[level] || 'from-gray-500 to-gray-600'
}

const getExerciseCount = (path: LearningPath, type: string) => {
  return path.exercises.filter(ex => ex.type === type).length
}
</script>