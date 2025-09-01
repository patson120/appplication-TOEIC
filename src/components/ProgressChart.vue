<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Progression par Compétence</h3>
    
    <div class="space-y-6">
      <div v-for="skill in skills" :key="skill.name" class="relative">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <component :is="skill.icon" :size="20" :class="skill.color" />
            <span class="font-medium text-gray-900 dark:text-white">{{ skill.label }}</span>
          </div>
          <span class="text-sm font-bold" :class="skill.color">{{ skill.score }}%</span>
        </div>
        
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-1000 ease-out relative"
            :class="skill.bgColor"
            :style="{ width: `${skill.score}%` }"
          >
            <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        <div class="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{{ skill.exercises }} exercices</span>
          <span>+{{ skill.recentGain }} cette semaine</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BookOpen, Headphones, Mic, FileText } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const skills = computed(() => [
  {
    name: 'reading',
    label: 'Compréhension Écrite',
    score: authStore.user?.skillLevels?.reading || 75,
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    exercises: 12,
    recentGain: 5
  },
  {
    name: 'listening',
    label: 'Compréhension Orale',
    score: authStore.user?.skillLevels?.listening || 68,
    icon: Headphones,
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
    exercises: 8,
    recentGain: 3
  },
  {
    name: 'speaking',
    label: 'Expression Orale',
    score: authStore.user?.skillLevels?.speaking || 62,
    icon: Mic,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
    exercises: 6,
    recentGain: 8
  },
  {
    name: 'grammar',
    label: 'Grammaire',
    score: authStore.user?.skillLevels?.grammar || 82,
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600',
    exercises: 15,
    recentGain: 2
  }
])
</script>