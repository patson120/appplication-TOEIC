<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppNavigation />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-fade-in">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Parcours d'Apprentissage</h1>
          <p class="text-gray-600 dark:text-gray-300">Suivez un parcours structuré adapté à votre niveau</p>
        </div>

        <!-- Current level highlight -->
        <div class="mb-8 p-6 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold mb-2">Votre Niveau Actuel</h2>
              <p class="text-primary-100">{{ authStore.user?.currentLevel || 'intermediate' }}</p>
            </div>
            <div class="text-right">
              <div class="text-3xl font-bold">{{ currentLevelProgress }}%</div>
              <div class="text-primary-100 text-sm">Progression</div>
            </div>
          </div>
        </div>

        <!-- Learning paths -->
        <div class="space-y-6">
          <LearningPathCard
            v-for="path in learningPaths"
            :key="path.id"
            :path="path"
            @start="startLearningPath"
          />
        </div>

        <!-- Statistics section -->
        <div class="mt-12 grid lg:grid-cols-2 gap-8">
          <ProgressChart />
          <StatisticsChart />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppNavigation from '../components/AppNavigation.vue'
import LearningPathCard from '../components/LearningPathCard.vue'
import ProgressChart from '../components/ProgressChart.vue'
import StatisticsChart from '../components/StatisticsChart.vue'
import { learningPaths } from '../data/learningPaths'
import type { LearningPath } from '../types'

const router = useRouter()
const authStore = useAuthStore()

const currentLevelProgress = computed(() => {
  const currentLevel = authStore.user?.currentLevel || 'intermediate'
  const path = learningPaths.find(p => p.level === currentLevel)
  return path?.progress || 0
})

const startLearningPath = (path: LearningPath) => {
  router.push(`/exercises?path=${path.id}`)
}
</script>