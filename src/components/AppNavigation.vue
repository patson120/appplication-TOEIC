<template>
  <nav class="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">TOEIC Pro</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Sélecteur de langue -->
          <div class="relative">
            <select 
              v-model="currentLocale" 
              @change="changeLocale"
              class="appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
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
              class="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group"
              :class="getNavLinkClass('/dashboard')"
            >
              <span class="relative z-10">{{ $t('navigation.dashboard') }}</span>
              <div 
                class="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300"
                :class="{ 'scale-100': isActiveRoute('/dashboard') }"
              ></div>
            </router-link>
            
            <router-link 
              to="/quiz" 
              class="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group"
              :class="getNavLinkClass('/quiz')"
            >
              <span class="relative z-10">{{ $t('navigation.quiz') }}</span>
              <div 
                class="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300"
                :class="{ 'scale-100': isActiveRoute('/quiz') }"
              ></div>
            </router-link>
            
            <router-link 
              to="/learning-path" 
              class="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group"
              :class="getNavLinkClass('/learning-path')"
            >
              <span class="relative z-10">Parcours</span>
              <div 
                class="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300"
                :class="{ 'scale-100': isActiveRoute('/learning-path') }"
              ></div>
            </router-link>
            
            <router-link 
              to="/exercises" 
              class="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group"
              :class="getNavLinkClass('/exercises')"
            >
              <span class="relative z-10">Exercices</span>
              <div 
                class="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300"
                :class="{ 'scale-100': isActiveRoute('/exercises') }"
              ></div>
            </router-link>
            
            <router-link 
              to="/results" 
              class="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group"
              :class="getNavLinkClass('/results')"
            >
              <span class="relative z-10">{{ $t('navigation.results') }}</span>
              <div 
                class="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-300"
                :class="{ 'scale-100': isActiveRoute('/results') }"
              ></div>
            </router-link>
            
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                <div class="w-8 h-8 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    v-if="authStore.user?.avatar" 
                    :src="authStore.user.avatar" 
                    :alt="authStore.user.name"
                    class="w-full h-full object-cover"
                  />
                  <span 
                    v-else
                    class="text-primary-600 dark:text-primary-400 font-medium text-sm"
                  >
                    {{ authStore.user?.name?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <ChevronDown :size="16" />
              </button>
              
              <transition name="fade">
                <div 
                  v-if="showUserMenu" 
                  class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                >
                  <router-link 
                    to="/profile" 
                    class="flex items-center px-4 py-2 text-sm transition-colors duration-300"
                    :class="isActiveRoute('/profile') 
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
                    @click="showUserMenu = false"
                  >
                    <User :size="16" class="mr-2" />
                    {{ $t('navigation.profile') }}
                  </router-link>
                  <button 
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
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
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              {{ $t('common.login') }}
            </router-link>
            <router-link 
              to="/register" 
              class="btn-primary text-sm px-4 py-2"
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
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'
import ThemeToggle from './ThemeToggle.vue'
import { ChevronDown, User } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
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

const isActiveRoute = (path: string) => {
  return route.path === path
}

const getNavLinkClass = (path: string) => {
  const isActive = isActiveRoute(path)
  
  if (isActive) {
    return 'text-primary-700 dark:text-primary-300 font-semibold nav-link-active nav-pulse'
  }
  
  return 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
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