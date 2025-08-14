<template>
  <div class="min-h-screen bg-gray-50">
    <AppNavigation />
    
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-fade-in">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('navigation.profile') }}</h1>
          <p class="text-gray-600">Gérez vos informations personnelles et vos préférences</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <!-- Informations personnelles -->
            <div class="card p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Informations Personnelles</h2>
              
              <form @submit.prevent="updateProfile" class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('common.name') }}
                  </label>
                  <input 
                    id="name"
                    v-model="profileForm.name" 
                    type="text" 
                    required
                    class="input-field"
                  />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('common.email') }}
                  </label>
                  <input 
                    id="email"
                    v-model="profileForm.email" 
                    type="email" 
                    required
                    class="input-field"
                  />
                </div>

                <div>
                  <label for="level" class="block text-sm font-medium text-gray-700 mb-1">
                    Niveau d'anglais
                  </label>
                  <select 
                    id="level"
                    v-model="profileForm.level" 
                    class="input-field"
                  >
                    <option value="Beginner">Débutant</option>
                    <option value="Elementary">Élémentaire</option>
                    <option value="Intermediate">Intermédiaire</option>
                    <option value="Upper-Intermediate">Intermédiaire avancé</option>
                    <option value="Advanced">Avancé</option>
                    <option value="Proficient">Expert</option>
                  </select>
                </div>

                <div v-if="updateMessage" 
                     class="p-4 rounded-lg" 
                     :class="updateMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'"
                >
                  {{ updateMessage.text }}
                </div>

                <button 
                  type="submit" 
                  :disabled="isUpdating"
                  class="btn-primary px-6 py-3 inline-flex items-center space-x-2"
                >
                  <LoadingSpinner v-if="isUpdating" />
                  <Save v-else :size="18" />
                  <span>{{ isUpdating ? 'Enregistrement...' : 'Enregistrer' }}</span>
                </button>
              </form>
            </div>

            <!-- Préférences -->
            <div class="card p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Préférences</h2>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900">Langue de l'interface</h3>
                    <p class="text-sm text-gray-600">Choisissez votre langue préférée</p>
                  </div>
                  <select 
                    v-model="currentLocale" 
                    @change="changeLocale"
                    class="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="fr">🇫🇷 Français</option>
                    <option value="en">🇬🇧 English</option>
                    <option value="es">🇪🇸 Español</option>
                    <option value="de">🇩🇪 Deutsch</option>
                    <option value="it">🇮🇹 Italiano</option>
                  </select>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900 dark:text-white">Notifications</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Recevoir des notifications de progression</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="notifications" 
                      type="checkbox" 
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Statistiques -->
          <div class="space-y-6">
            <div class="card p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Statistiques</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Tests complétés</span>
                  <span class="font-bold text-gray-900">{{ authStore.user?.testsCompleted || 0 }}</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Niveau actuel</span>
                  <span class="font-bold text-primary-600">{{ authStore.user?.level || 'Beginner' }}</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Dernier score</span>
                  <span class="font-bold text-green-600">{{ lastScore }}%</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Membre depuis</span>
                  <span class="font-bold text-gray-900">{{ memberSince }}</span>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Badge</h3>
              
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award :size="32" class="text-white" />
                </div>
                <h4 class="font-bold text-gray-900 mb-1">{{ getBadgeTitle() }}</h4>
                <p class="text-sm text-gray-600">{{ getBadgeDescription() }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="card p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              
              <div class="space-y-3">
                <router-link 
                  to="/quiz"
                  class="w-full btn-primary py-3 text-center inline-flex items-center justify-center space-x-2"
                >
                  <Play :size="18" />
                  <span>Nouveau test</span>
                </router-link>
                
                <button 
                  @click="exportData"
                  class="w-full btn-secondary py-3 inline-flex items-center justify-center space-x-2"
                >
                  <Download :size="18" />
                  <span>Exporter mes données</span>
                </button>
                
                <button 
                  @click="confirmReset"
                  class="w-full bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 px-4 rounded-lg transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <Trash2 :size="18" />
                  <span>Réinitialiser les données</span>
                </button>
                
                <button 
                  @click="resetOnboarding"
                  class="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <Play :size="18" />
                  <span>Relancer l'introduction</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'
import { useOnboardingStore } from '../stores/onboarding'
import AppNavigation from '../components/AppNavigation.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { Save, Award, Play, Download, Trash2 } from 'lucide-vue-next'

const { locale } = useI18n()
const authStore = useAuthStore()
const onboardingStore = useOnboardingStore()

const profileForm = ref({
  name: '',
  email: '',
  level: 'Beginner'
})

const currentLocale = computed({
  get: () => locale.value,
  set: (value: string) => {
    locale.value = value
  }
})

const notifications = ref(true)
const isUpdating = ref(false)
const updateMessage = ref<{ type: string; text: string } | null>(null)
const lastScore = ref(0)

const memberSince = computed(() => {
  return new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
})

const changeLocale = () => {
  localStorage.setItem('locale', currentLocale.value)
}

const updateProfile = async () => {
  isUpdating.value = true
  updateMessage.value = null
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    authStore.updateProfile({
      name: profileForm.value.name,
      email: profileForm.value.email,
      level: profileForm.value.level
    })
    
    updateMessage.value = {
      type: 'success',
      text: 'Profil mis à jour avec succès'
    }
  } catch (error) {
    updateMessage.value = {
      type: 'error',
      text: 'Erreur lors de la mise à jour'
    }
  } finally {
    isUpdating.value = false
    setTimeout(() => {
      updateMessage.value = null
    }, 3000)
  }
}

const getBadgeTitle = () => {
  const testsCompleted = authStore.user?.testsCompleted || 0
  if (testsCompleted >= 10) return 'Expert'
  if (testsCompleted >= 5) return 'Avancé'
  if (testsCompleted >= 1) return 'Pratiquant'
  return 'Débutant'
}

const getBadgeDescription = () => {
  const testsCompleted = authStore.user?.testsCompleted || 0
  if (testsCompleted >= 10) return 'Plus de 10 tests complétés'
  if (testsCompleted >= 5) return 'Plus de 5 tests complétés'
  if (testsCompleted >= 1) return 'Premier test complété'
  return 'Commencez votre premier test'
}

const exportData = () => {
  const data = {
    profile: authStore.user,
    results: JSON.parse(localStorage.getItem('quizResults') || '{}'),
    exportDate: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `toeic-data-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const confirmReset = () => {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes vos données ? Cette action est irréversible.')) {
    localStorage.removeItem('quizResults')
    localStorage.removeItem('currentQuiz')
    authStore.updateProfile({
      testsCompleted: 0,
      level: 'Beginner'
    })
    lastScore.value = 0
    alert('Données réinitialisées avec succès')
  }
}

const resetOnboarding = () => {
  onboardingStore.resetOnboarding()
  alert('Introduction réinitialisée ! Elle s\'affichera lors de votre prochaine visite du tableau de bord.')
}

onMounted(() => {
  if (authStore.user) {
    profileForm.value = {
      name: authStore.user.name,
      email: authStore.user.email,
      level: authStore.user.level || 'Beginner'
    }
  }
  
  const savedResults = localStorage.getItem('quizResults')
  if (savedResults) {
    const results = JSON.parse(savedResults)
    lastScore.value = results.score || 0
  }
})
</script>