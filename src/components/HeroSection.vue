<template>
  <section class="relative min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10 dark:opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0); background-size: 20px 20px;"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div class="text-center">
        <!-- Animated Logo -->
        <div class="mb-8 animate-fade-in">
          <div class="w-24 h-24 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <span class="text-white font-bold text-4xl">T</span>
          </div>
        </div>

        <!-- Slides Container -->
        <div class="relative h-96 mb-12">
          <transition name="slide-fade" mode="out-in">
            <div :key="currentSlide" class="absolute inset-0 flex flex-col justify-center">
              <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {{ slides[currentSlide].title }}
              </h1>
              <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                {{ slides[currentSlide].description }}
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <router-link 
                  :to="slides[currentSlide].primaryAction.link" 
                  class="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <component :is="slides[currentSlide].primaryAction.icon" :size="24" />
                  <span>{{ slides[currentSlide].primaryAction.text }}</span>
                </router-link>
                
                <router-link 
                  :to="slides[currentSlide].secondaryAction.link" 
                  class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-lg transition-colors duration-300"
                >
                  {{ slides[currentSlide].secondaryAction.text }}
                </router-link>
              </div>
            </div>
          </transition>
        </div>

        <!-- Slide Indicators -->
        <div class="flex justify-center space-x-3 mb-12">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="index === currentSlide 
              ? 'bg-primary-600 dark:bg-primary-400 scale-125' 
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'"
          ></button>
        </div>

        <!-- Features Preview -->
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <component :is="feature.icon" :size="32" class="text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Elements -->
    <div class="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-bounce" style="animation-delay: 0s;"></div>
    <div class="absolute top-40 right-20 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-bounce" style="animation-delay: 1s;"></div>
    <div class="absolute bottom-40 left-20 w-12 h-12 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-bounce" style="animation-delay: 2s;"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, Play, BookOpen, Award, TrendingUp, Target } from 'lucide-vue-next'

const currentSlide = ref(0)
let slideInterval: NodeJS.Timeout

const slides = [
  {
    title: "Évaluez votre Niveau d'Anglais",
    description: "Tests TOEIC professionnels avec analyse détaillée de vos compétences linguistiques",
    primaryAction: {
      text: "Commencer le Test",
      link: "/register",
      icon: Play
    },
    secondaryAction: {
      text: "Déjà inscrit ? Se connecter",
      link: "/login"
    }
  },
  {
    title: "6 Niveaux de Difficulté",
    description: "Du débutant à l'expert, choisissez le niveau qui correspond à vos compétences actuelles",
    primaryAction: {
      text: "Découvrir les Niveaux",
      link: "/register",
      icon: BookOpen
    },
    secondaryAction: {
      text: "Voir les exemples",
      link: "/login"
    }
  },
  {
    title: "Résultats Détaillés",
    description: "Obtenez une analyse complète de vos performances avec des recommandations personnalisées",
    primaryAction: {
      text: "Voir un Exemple",
      link: "/register",
      icon: Award
    },
    secondaryAction: {
      text: "En savoir plus",
      link: "/login"
    }
  },
  {
    title: "Suivez vos Progrès",
    description: "Tableau de bord personnalisé pour suivre votre évolution et vos améliorations",
    primaryAction: {
      text: "Créer mon Compte",
      link: "/register",
      icon: TrendingUp
    },
    secondaryAction: {
      text: "Connexion rapide",
      link: "/login"
    }
  }
]

const features = [
  {
    icon: Target,
    title: "Tests Précis",
    description: "Questions calibrées selon les standards TOEIC internationaux"
  },
  {
    icon: Award,
    title: "Certification",
    description: "Résultats détaillés avec équivalence de niveau officiel"
  },
  {
    icon: TrendingUp,
    title: "Progression",
    description: "Suivi de votre évolution avec statistiques avancées"
  }
]

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetInterval()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const resetInterval = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  slideInterval = setInterval(nextSlide, 5000)
}

onMounted(() => {
  resetInterval()
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
}
</style>