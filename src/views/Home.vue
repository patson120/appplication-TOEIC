<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
    <AppNavigation />
    
    <!-- Hero Section with Slides -->
    <HeroSection />

    <!-- Additional Content Section -->
    <section class="bg-white dark:bg-gray-900 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Niveaux de Test Disponibles
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choisissez le niveau qui correspond le mieux à vos compétences actuelles
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <BookOpen :size="32" class="text-white" />
            </div>
            <h3 class="text-2xl font-bold text-green-800 dark:text-green-300 mb-4 text-center">Débutant - Élémentaire</h3>
            <p class="text-green-700 dark:text-green-400 text-center leading-relaxed">
              Bases de la grammaire, vocabulaire simple et structures fondamentales
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Award :size="32" class="text-white" />
            </div>
            <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 text-center">Intermédiaire</h3>
            <p class="text-blue-700 dark:text-blue-400 text-center leading-relaxed">
              Structures complexes, compréhension avancée et expression nuancée
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp :size="32" class="text-white" />
            </div>
            <h3 class="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-4 text-center">Avancé - Expert</h3>
            <p class="text-purple-700 dark:text-purple-400 text-center leading-relaxed">
              Maîtrise linguistique, nuances subtiles et expression sophistiquée
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import AppNavigation from '../components/AppNavigation.vue'
import HeroSection from '../components/HeroSection.vue'
import { BookOpen, Award, TrendingUp, ArrowRight } from 'lucide-vue-next'
</script>