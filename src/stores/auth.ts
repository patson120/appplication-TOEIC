import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: string
  email: string
  name: string
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
        level: 'Intermediate',
        testsCompleted: 0
      }
      
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
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
        level: 'Beginner',
        testsCompleted: 0
      }
      
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
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
    logout,
    loadUser,
    updateProfile
  }
})