import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOnboardingStore = defineStore('onboarding', () => {
  const hasCompletedOnboarding = ref(false)
  const currentStep = ref(0)

  const steps = [
    {
      title: 'Bienvenue sur TOEIC Pro',
      description: 'Évaluez votre niveau d\'anglais avec nos tests professionnels',
      icon: '🎯',
      action: 'Commencer'
    },
    {
      title: 'Choisissez votre niveau',
      description: 'Sélectionnez le niveau qui correspond le mieux à vos compétences actuelles',
      icon: '📚',
      action: 'Continuer'
    },
    {
      title: 'Passez le test',
      description: 'Répondez aux questions dans le temps imparti pour obtenir votre score',
      icon: '⏱️',
      action: 'Continuer'
    },
    {
      title: 'Consultez vos résultats',
      description: 'Obtenez une analyse détaillée de vos performances et des recommandations',
      icon: '📊',
      action: 'Terminer'
    }
  ]

  const loadOnboardingStatus = () => {
    const completed = localStorage.getItem('onboarding_completed')
    hasCompletedOnboarding.value = completed === 'true'
  }

  const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    } else {
      completeOnboarding()
    }
  }

  const previousStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }

  const completeOnboarding = () => {
    hasCompletedOnboarding.value = true
    localStorage.setItem('onboarding_completed', 'true')
    currentStep.value = 0
  }

  const resetOnboarding = () => {
    hasCompletedOnboarding.value = false
    currentStep.value = 0
    localStorage.removeItem('onboarding_completed')
  }

  const shouldShowOnboarding = () => {
    return !hasCompletedOnboarding.value
  }

  return {
    hasCompletedOnboarding,
    currentStep,
    steps,
    loadOnboardingStatus,
    nextStep,
    previousStep,
    completeOnboarding,
    resetOnboarding,
    shouldShowOnboarding
  }
})