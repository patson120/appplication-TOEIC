<template>
  <div class="min-h-screen bg-gray-50">
    <AppNavigation />
    
    <!-- Onboarding Modal -->
    <OnboardingModal />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-fade-in">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ $t('dashboard.welcome', { name: authStore.user?.name }) }}
          </h1>
          <p class="text-gray-600 mt-2">Suivez vos progrès et continuez à améliorer votre anglais</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ $t('dashboard.currentLevel') }}</h3>
              <Award :size="24" class="text-primary-600" />
            </div>
            <div class="text-2xl font-bold text-primary-600">{{ authStore.user?.level || 'Beginner' }}</div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('dashboard.testsCompleted') }}</h3>
              <BarChart3 :size="24" class="text-green-600" />
            </div>
            <div class="text-2xl font-bold text-green-600">{{ authStore.user?.testsCompleted || 0 }}</div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Dernier Score</h3>
              <Target :size="24" class="text-orange-600" />
            </div>
            <div class="text-2xl font-bold text-orange-600">{{ lastScore }}%</div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <div class="card p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Actions Rapides</h3>
            <div class="space-y-3">
              <router-link 
                to="/quiz"
                class="flex items-center justify-between p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors group"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Play :size="18" class="text-white" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ $t('dashboard.startNewTest') }}</h4>
                    <p class="text-sm text-gray-600">Évaluez votre niveau d'anglais</p>
                  </div>
                </div>
                <ArrowRight :size="18" class="text-gray-400 group-hover:text-primary-600 transition-colors" />
              </router-link>

              <!-- Sélecteur de niveau pour le test -->
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-3">Choisir le niveau de test</h4>
                <div class="grid grid-cols-2 gap-2">
                  <router-link 
                    :to="{ name: 'Quiz', query: { level: 'beginner' } }"
                    class="text-center py-2 px-3 bg-white hover:bg-blue-100 rounded border text-sm font-medium transition-colors"
                  >
                    Débutant
                  </router-link>
                  <router-link 
                    :to="{ name: 'Quiz', query: { level: 'elementary' } }"
                    class="text-center py-2 px-3 bg-white hover:bg-blue-100 rounded border text-sm font-medium transition-colors"
                  >
                    Élémentaire
                  </router-link>
                  <router-link 
                    :to="{ name: 'Quiz', query: { level: 'intermediate' } }"
                    class="text-center py-2 px-3 bg-white hover:bg-blue-100 rounded border text-sm font-medium transition-colors"
                  >
                    Intermédiaire
                  </router-link>
                  <router-link 
                    :to="{ name: 'Quiz', query: { level: 'upper-intermediate' } }"
                    class="text-center py-2 px-3 bg-white hover:bg-blue-100 rounded border text-sm font-medium transition-colors"
                  >
                    Inter. Avancé
                  </router-link>
                  <router-link 
                    :to="{ name: 'Quiz', query: { level: 'advanced' } }"
                    class="text-center py-2 px-3 bg-white hover:bg-blue-100 rounded border text-sm font-medium transition-colors"
                  >
                    Avancé
                  </router-link>
                  <router-link 
                    :to="{ name: 'Quiz', query: { level: 'proficient' } }"
                    class="text-center py-2 px-3 bg-white hover:bg-blue-100 rounded border text-sm font-medium transition-colors"
                  >
                    Expert
                  </router-link>
                </div>
              </div>

              <router-link 
                to="/results"
                class="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <TrendingUp :size="18" class="text-white" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ $t('dashboard.viewResults') }}</h4>
                    <p class="text-sm text-gray-600">Consultez vos résultats précédents</p>
                  </div>
                </div>
                <ArrowRight :size="18" class="text-gray-400 group-hover:text-green-600 transition-colors" />
              </router-link>

              <router-link 
                to="/profile"
                class="flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <User :size="18" class="text-white" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ $t('dashboard.profile') }}</h4>
                    <p class="text-sm text-gray-600">Gérez votre profil</p>
                  </div>
                </div>
                <ArrowRight :size="18" class="text-gray-400 group-hover:text-orange-600 transition-colors" />
              </router-link>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Progression</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Grammaire</span>
                  <span>75%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="progress-bar w-3/4"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Compréhension écrite</span>
                  <span>60%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="progress-bar w-3/5"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Vocabulaire</span>
                  <span>85%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="progress-bar w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useOnboardingStore } from '../stores/onboarding'
import AppNavigation from '../components/AppNavigation.vue'
import OnboardingModal from '../components/OnboardingModal.vue'
import { Award, BarChart3, Target, Play, TrendingUp, User, ArrowRight } from 'lucide-vue-next'

const authStore = useAuthStore()
const onboardingStore = useOnboardingStore()
const lastScore = ref(0)

onMounted(() => {
  // Charger le statut de l'onboarding
  onboardingStore.loadOnboardingStatus()
  
  const savedResults = localStorage.getItem('quizResults')
  if (savedResults) {
    const results = JSON.parse(savedResults)
    lastScore.value = results.score
  }
})
</script>