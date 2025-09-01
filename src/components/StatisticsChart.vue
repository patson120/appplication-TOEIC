<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white">Progression Hebdomadaire</h3>
      <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <TrendingUp :size="16" />
        <span>+12% cette semaine</span>
      </div>
    </div>

    <div class="relative h-64 mb-4">
      <!-- Chart container -->
      <div class="absolute inset-0 flex items-end justify-between space-x-2">
        <div 
          v-for="(day, index) in weeklyData" 
          :key="index"
          class="flex-1 flex flex-col items-center group cursor-pointer"
          @mouseenter="hoveredDay = index"
          @mouseleave="hoveredDay = null"
        >
          <!-- Bar -->
          <div 
            class="w-full bg-gradient-to-t from-primary-500 to-primary-400 dark:from-primary-600 dark:to-primary-500 rounded-t-lg transition-all duration-500 hover:from-primary-600 hover:to-primary-500 relative overflow-hidden"
            :style="{ height: `${(day.score / 100) * 200}px` }"
          >
            <!-- Animated shine effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
            
            <!-- Tooltip -->
            <div 
              v-if="hoveredDay === index"
              class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10"
            >
              {{ day.score }}% - {{ day.exercises }} exercices
              <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
          
          <!-- Day label -->
          <div class="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex items-center justify-center space-x-6 text-sm">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-primary-500 rounded-full"></div>
        <span class="text-gray-600 dark:text-gray-400">Score moyen</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        <span class="text-gray-600 dark:text-gray-400">Objectif: 80%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TrendingUp } from 'lucide-vue-next'

const hoveredDay = ref<number | null>(null)

const weeklyData = computed(() => [
  { day: 'Lun', score: 65, exercises: 2 },
  { day: 'Mar', score: 72, exercises: 3 },
  { day: 'Mer', score: 68, exercises: 1 },
  { day: 'Jeu', score: 78, exercises: 4 },
  { day: 'Ven', score: 85, exercises: 2 },
  { day: 'Sam', score: 82, exercises: 3 },
  { day: 'Dim', score: 88, exercises: 2 }
])
</script>