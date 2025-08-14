<template>
  <button
    @click="themeStore.toggleTheme"
    class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
    :title="themeStore.isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
  >
    <transition name="theme-icon" mode="out-in">
      <Sun v-if="themeStore.isDark" :size="20" class="text-yellow-500 animate-pulse" />
      <Moon v-else :size="20" class="text-gray-600 dark:text-gray-300" />
    </transition>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '../stores/theme'
import { Sun, Moon } from 'lucide-vue-next'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}
</style>