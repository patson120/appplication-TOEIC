<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppNavigation />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-fade-in">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Exercices d'Entraînement</h1>
          <p class="text-gray-600 dark:text-gray-300">Pratiquez vos compétences avec des exercices ciblés</p>
        </div>

        <!-- Filter tabs -->
        <div class="mb-8">
          <div class="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
            <button
              v-for="filter in filters"
              :key="filter.value"
              @click="activeFilter = filter.value"
              class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2"
              :class="activeFilter === filter.value 
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
            >
              <component :is="filter.icon" :size="16" />
              <span>{{ filter.label }}</span>
            </button>
          </div>
        </div>

        <!-- Exercises grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExerciseCard
            v-for="exercise in filteredExercises"
            :key="exercise.id"
            :exercise="exercise"
            @start="startExercise"
          />
        </div>

        <!-- Empty state -->
        <div v-if="filteredExercises.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search :size="32" class="text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucun exercice trouvé</h3>
          <p class="text-gray-600 dark:text-gray-300">Essayez de changer le filtre pour voir plus d'exercices</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppNavigation from '../components/AppNavigation.vue'
import ExerciseCard from '../components/ExerciseCard.vue'
import { allExercises } from '../data/exercises'
import { BookOpen, Headphones, Mic, Grid3X3, Search } from 'lucide-vue-next'
import type { Exercise } from '../types'

const router = useRouter()
const activeFilter = ref('all')

const filters = [
  { value: 'all', label: 'Tous', icon: Grid3X3 },
  { value: 'reading', label: 'Reading', icon: BookOpen },
  { value: 'listening', label: 'Listening', icon: Headphones },
  { value: 'speaking', label: 'Speaking', icon: Mic }
]

const filteredExercises = computed(() => {
  if (activeFilter.value === 'all') {
    return allExercises
  }
  return allExercises.filter(exercise => exercise.type === activeFilter.value)
})

const startExercise = (exercise: Exercise) => {
  // Rediriger vers l'exercice spécifique
  router.push(`/exercise/${exercise.id}`)
}
</script>