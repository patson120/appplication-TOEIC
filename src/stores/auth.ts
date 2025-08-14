import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { decodeCredential, type CredentialResponse } from 'vue3-google-login'
import { useOnboardingStore } from './onboarding'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  provider?: 'email' | 'google'
  level?: string
  testsCompleted: number
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    isLoading.value = true
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Données utilisateur simulées
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
        provider: 'email' as const,
        level: 'Intermediate',
        testsCompleted: 0
      }
      
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Réinitialiser l'onboarding pour les nouveaux utilisateurs
      const onboardingStore = useOnboardingStore()
      onboardingStore.resetOnboarding()
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData = {
        id: Date.now().toString(),
        email,
        name,
        provider: 'email' as const,
        level: 'Beginner',
        testsCompleted: 0
      }
      
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Réinitialiser l'onboarding pour les nouveaux utilisateurs
      const onboardingStore = useOnboardingStore()
      onboardingStore.resetOnboarding()
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    } finally {
      isLoading.value = false
    }
  }

  const loginWithGoogle = async (response: CredentialResponse) => {
    isLoading.value = true
    try {
      const userData = decodeCredential(response.credential)
      
      const user = {
        id: userData.sub,
        email: userData.email,
        name: userData.name,
        avatar: userData.picture,
        provider: 'google' as const,
        level: 'Beginner',
        testsCompleted: 0
      }
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = localStorage.getItem(`user_${userData.email}`)
      if (existingUser) {
        const savedUser = JSON.parse(existingUser)
        user.level = savedUser.level
        user.testsCompleted = savedUser.testsCompleted
      }
      
      user.value = user
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem(`user_${userData.email}`, JSON.stringify(user))
      
      return { success: true }
    } catch (error) {
      console.error('Google login error:', error)
      return { success: false, error: 'Erreur de connexion Google' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('currentQuiz')
    localStorage.removeItem('quizResults')
  }

  const loadUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
    loadUser,
    updateProfile
  }
})