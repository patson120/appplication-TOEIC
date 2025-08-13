<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
    <AppNavigation />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center animate-fade-in">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          {{ $t('quiz.title') }}
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Évaluez votre niveau d'anglais avec notre test TOEIC professionnel. 
          Obtenez des résultats détaillés et des recommandations personnalisées.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link 
            to="/register" 
            class="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
          >
            <span>{{ $t('common.start') }}</span>
            <ArrowRight :size="20" />
          </router-link>
          
          <router-link 
            to="/login" 
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            Déjà inscrit ? Se connecter
          </router-link>
        </div>
        
        <!-- Aperçu des niveaux disponibles -->
        <div class="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Niveaux de Test Disponibles</h2>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <h3 class="font-semibold text-green-800 mb-2">Débutant - Élémentaire</h3>
              <p class="text-sm text-green-700">Bases de la grammaire et vocabulaire simple</p>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <h3 class="font-semibold text-blue-800 mb-2">Intermédiaire</h3>
              <p class="text-sm text-blue-700">Structures complexes et compréhension avancée</p>
            </div>
            <div class="text-center p-4 bg-purple-50 rounded-lg">
              <h3 class="font-semibold text-purple-800 mb-2">Avancé - Expert</h3>
              <p class="text-sm text-purple-700">Maîtrise linguistique et nuances subtiles</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 grid md:grid-cols-3 gap-8">
        <div class="card p-6 text-center animate-slide-up" style="animation-delay: 0.1s">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen :size="24" class="text-primary-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Test Complet</h3>
          <p class="text-gray-600">Évaluation complète de vos compétences en anglais</p>
        </div>
        
        <div class="card p-6 text-center animate-slide-up" style="animation-delay: 0.2s">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award :size="24" class="text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Résultats Détaillés</h3>
          <p class="text-gray-600 dark:text-gray-300">Analyse approfondie de vos points forts et faibles</p>
        </div>
        
        <div class="card p-6 text-center animate-slide-up" style="animation-delay: 0.3s">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp :size="24" class="text-orange-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Suivi Progressif</h3>
          <p class="text-gray-600 dark:text-gray-300">Suivez votre évolution au fil du temps</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNavigation from '../components/AppNavigation.vue'
import { BookOpen, Award, TrendingUp, ArrowRight } from 'lucide-vue-next'
</script>