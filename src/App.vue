<template>
  <div id="app" class="min-h-screen transition-colors duration-300">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'

const authStore = useAuthStore()
const themeStore = useThemeStore()

onMounted(() => {
  // Charger l'utilisateur depuis localStorage si disponible
  authStore.loadUser()
  
  // Charger le thème
  themeStore.loadTheme()
})
</script>