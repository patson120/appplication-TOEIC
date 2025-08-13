<template>
  <div v-if="!onboardingStore.hasCompletedOnboarding" 
       class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
      <!-- Progress bar -->
      <div class="mb-6">
        <div class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <span>Étape {{ onboardingStore.currentStep + 1 }} sur {{ onboardingStore.steps.length }}</span>
          <span>{{ Math.round(((onboardingStore.currentStep + 1) / onboardingStore.steps.length) * 100) }}%</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            class="progress-bar h-2 transition-all duration-500" 
            :style="{ width: `${((onboardingStore.currentStep + 1) / onboardingStore.steps.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Content -->
      <div class="text-center mb-8">
        <div class="text-6xl mb-4 animate-bounce">
          {{ currentStep.icon }}
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {{ currentStep.title }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ currentStep.description }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex justify-between items-center">
        <button 
          v-if="onboardingStore.currentStep > 0"
          @click="onboardingStore.previousStep"
          class="btn-secondary px-6 py-3 inline-flex items-center space-x-2"
        >
          <ArrowLeft :size="18" />
          <span>Précédent</span>
        </button>
        <div v-else></div>

        <button 
          @click="onboardingStore.nextStep"
          class="btn-primary px-6 py-3 inline-flex items-center space-x-2"
        >
          <span>{{ currentStep.action }}</span>
          <ArrowRight v-if="onboardingStore.currentStep < onboardingStore.steps.length - 1" :size="18" />
          <CheckCircle v-else :size="18" />
        </button>
      </div>

      <!-- Skip option -->
      <div class="text-center mt-6">
        <button 
          @click="onboardingStore.completeOnboarding"
          class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm transition-colors"
        >
          Passer l'introduction
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOnboardingStore } from '../stores/onboarding'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-vue-next'

const onboardingStore = useOnboardingStore()

const currentStep = computed(() => onboardingStore.steps[onboardingStore.currentStep])
</script>