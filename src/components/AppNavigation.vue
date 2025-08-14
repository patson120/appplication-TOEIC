<template>
  <nav class="bg-white shadow-lg border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <span class="text-xl font-bold text-gray-900">TOEIC Pro</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Sélecteur de langue -->
          <div class="relative">
            <select 
              v-model="currentLocale" 
              @change="changeLocale"
              class="appearance-none bg-gray-50 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="it">🇮🇹 Italiano</option>
            </select>
          </div>

          <!-- Toggle de thème -->
          <ThemeToggle />

          <!-- Navigation authentifié -->
          <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
            <router-link 
              to="/dashboard" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ $t('navigation.dashboard') }}
            </router-link>
            
            <router-link 
              to="/quiz" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ $t('navigation.quiz') }}
            </router-link>
            
            <router-link 
              to="/results" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ $t('navigation.results') }}
            </router-link>
            
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    v-if="authStore.user?.avatar" 
                    :src="authStore.user.avatar" 
                    :alt="authStore.user.name"
                    class="w-full h-full object-cover"
                  />
                  <span 
                    v-else
                    class="text-primary-600 font-medium text-sm"
                  >
                    {{ authStore.user?.name?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <ChevronDown :size="16" />
              </button>
              
              <transition name="fade">
                <div 
                  v-if="showUserMenu" 
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                >
                  <router-link 
                    to="/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    @click="showUserMenu = false"
                  >
                    {{ $t('navigation.profile') }}
                  </router-link>
                  <button 
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    {{ $t('common.logout') }}
                  </button>
                </div>
              </transition>
            </div>
          </div>

          <!-- Navigation non authentifié -->
          <div v-else class="flex items-center space-x-3">
            <router-link 
              to="/login" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ $t('common.login') }}
            </router-link>
            <router-link 
              to="/register" 
              class="btn-primary text-sm"
            >
              {{ $t('common.register') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'
import ThemeToggle from './ThemeToggle.vue'
import { ChevronDown } from 'lucide-vue-next'

const router = useRouter()
const { locale } = useI18n()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const showUserMenu = ref(false)
const currentLocale = computed({
  get: () => locale.value,
  set: (value: string) => {
    locale.value = value
  }
})

// Charger le thème au montage
themeStore.loadTheme()

const changeLocale = () => {
  localStorage.setItem('locale', currentLocale.value)
}

const logout = () => {
  authStore.logout()
  showUserMenu.value = false
  router.push('/login')
}

// Fermer le menu utilisateur lors du clic à l'extérieur
document.addEventListener('click', (e) => {
  if (showUserMenu.value && !(e.target as Element).closest('.relative')) {
    showUserMenu.value = false
  }
})
</script>