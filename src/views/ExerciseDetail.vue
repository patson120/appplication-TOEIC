<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppNavigation />
    
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="!exercise" class="text-center py-20">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search :size="32" class="text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Exercice non trouvé</h3>
        <router-link to="/exercises" class="btn-primary inline-flex items-center space-x-2">
          <ArrowLeft :size="18" />
          <span>Retour aux exercices</span>
        </router-link>
      </div>

      <div v-else class="animate-fade-in">
        <!-- Exercise header -->
        <div class="card p-6 mb-8">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-4">
              <div 
                class="w-16 h-16 rounded-xl flex items-center justify-center"
                :class="getTypeColor(exercise.type)"
              >
                <component :is="getTypeIcon(exercise.type)" :size="24" class="text-white" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ exercise.title }}</h1>
                <p class="text-gray-600 dark:text-gray-300">{{ exercise.description }}</p>
              </div>
            </div>
            
            <div class="text-right">
              <div v-if="exercise.completed && exercise.score" class="text-2xl font-bold text-green-600 dark:text-green-400">
                {{ exercise.score }}%
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ exercise.duration }} minutes</div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div 
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="getLevelBadgeColor(exercise.level)"
            >
              {{ exercise.level }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ exercise.questions.length }} questions
            </div>
          </div>
        </div>

        <!-- Exercise content -->
        <div v-if="!isStarted" class="card p-8 text-center">
          <div class="mb-6">
            <component :is="getTypeIcon(exercise.type)" :size="48" class="text-primary-600 dark:text-primary-400 mx-auto mb-4" />
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Prêt à commencer ?</h2>
            <p class="text-gray-600 dark:text-gray-300">Cet exercice contient {{ exercise.questions.length }} questions et prendra environ {{ exercise.duration }} minutes.</p>
          </div>

          <div class="flex justify-center space-x-4">
            <router-link to="/exercises" class="btn-secondary px-6 py-3 inline-flex items-center space-x-2">
              <ArrowLeft :size="18" />
              <span>Retour</span>
            </router-link>
            <button @click="startExercise" class="btn-primary px-6 py-3 inline-flex items-center space-x-2">
              <Play :size="18" />
              <span>Commencer</span>
            </button>
          </div>
        </div>

        <!-- Exercise questions -->
        <div v-else-if="currentQuestion" class="space-y-6">
          <!-- Progress -->
          <div class="card p-4">
            <div class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>Question {{ currentQuestionIndex + 1 }} sur {{ exercise.questions.length }}</span>
              <span>{{ Math.round(((currentQuestionIndex + 1) / exercise.questions.length) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                class="progress-bar h-2 transition-all duration-500" 
                :style="{ width: `${((currentQuestionIndex + 1) / exercise.questions.length) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Question content -->
          <div class="card p-6">
            <!-- Reading passage -->
            <div v-if="currentQuestion.passage" class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-white mb-3">Passage:</h4>
              <div class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {{ currentQuestion.passage }}
              </div>
            </div>

            <!-- Audio player for listening -->
            <div v-if="currentQuestion.audioUrl && exercise.type === 'listening'" class="mb-6">
              <h4 class="font-medium text-gray-900 dark:text-white mb-3">Écoutez l'audio:</h4>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <audio controls class="w-full">
                  <source :src="currentQuestion.audioUrl" type="audio/mpeg">
                  Votre navigateur ne supporte pas l'audio.
                </audio>
              </div>
            </div>

            <!-- Speaking recording -->
            <div v-if="exercise.type === 'speaking'" class="mb-6">
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div class="flex items-center space-x-2 mb-3">
                  <Mic :size="20" class="text-purple-600" />
                  <h4 class="font-medium text-gray-900 dark:text-white">Enregistrez votre réponse</h4>
                </div>
                <button 
                  @click="toggleRecording"
                  class="btn-primary px-4 py-2 inline-flex items-center space-x-2"
                  :class="{ 'bg-red-500 hover:bg-red-600': isRecording }"
                >
                  <component :is="isRecording ? Square : Mic" :size="16" />
                  <span>{{ isRecording ? 'Arrêter' : 'Enregistrer' }}</span>
                </button>
              </div>
            </div>

            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ currentQuestion.question }}</h3>

            <!-- Options for reading/listening -->
            <div v-if="exercise.type !== 'speaking'" class="space-y-3 mb-6">
              <button
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                @click="selectAnswer(index)"
                class="w-full text-left p-4 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
                :class="getOptionClass(index)"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                       :class="getOptionCircleClass(index)">
                    {{ String.fromCharCode(65 + index) }}
                  </div>
                  <span class="font-medium">{{ option }}</span>
                </div>
              </button>
            </div>

            <!-- Navigation -->
            <div class="flex justify-between">
              <button 
                @click="previousQuestion"
                :disabled="currentQuestionIndex === 0"
                class="btn-secondary px-6 py-3 inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft :size="18" />
                <span>Précédent</span>
              </button>

              <button 
                v-if="currentQuestionIndex === exercise.questions.length - 1"
                @click="completeExercise"
                class="btn-primary px-6 py-3 inline-flex items-center space-x-2"
              >
                <span>Terminer</span>
                <CheckCircle :size="18" />
              </button>
              
              <button 
                v-else
                @click="nextQuestion"
                class="btn-primary px-6 py-3 inline-flex items-center space-x-2"
              >
                <span>Suivant</span>
                <ArrowRight :size="18" />
              </button>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div v-else-if="isCompleted" class="card p-8 text-center">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award :size="32" class="text-green-600" />
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Exercice Terminé !</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">Vous avez complété {{ exercise.title }}</p>
          
          <div class="grid md:grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
            <div class="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
              <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{{ finalScore }}%</div>
              <div class="text-primary-700 dark:text-primary-300 text-sm">Score Final</div>
            </div>
            
            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{{ correctAnswers }}</div>
              <div class="text-green-700 dark:text-green-300 text-sm">Bonnes Réponses</div>
            </div>
          </div>
          
          <div class="flex justify-center space-x-4">
            <router-link to="/exercises" class="btn-secondary px-6 py-3 inline-flex items-center space-x-2">
              <ArrowLeft :size="18" />
              <span>Retour aux exercices</span>
            </router-link>
            <button @click="restartExercise" class="btn-primary px-6 py-3 inline-flex items-center space-x-2">
              <RotateCcw :size="18" />
              <span>Recommencer</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppNavigation from '../components/AppNavigation.vue'
import { allExercises } from '../data/exercises'
import { 
  BookOpen, Headphones, Mic, Play, ArrowLeft, ArrowRight, 
  CheckCircle, Award, Search, RotateCcw, Square 
} from 'lucide-vue-next'
import type { Exercise } from '../types'

const route = useRoute()
const exercise = ref<Exercise | null>(null)
const isStarted = ref(false)
const isCompleted = ref(false)
const currentQuestionIndex = ref(0)
const answers = ref<Record<number, number>>({})
const isRecording = ref(false)
const finalScore = ref(0)

const currentQuestion = computed(() => {
  if (!exercise.value || !isStarted.value) return null
  return exercise.value.questions[currentQuestionIndex.value]
})

const correctAnswers = computed(() => {
  if (!exercise.value) return 0
  let count = 0
  exercise.value.questions.forEach(question => {
    if (answers.value[question.id] === question.correctAnswer) {
      count++
    }
  })
  return count
})

const startExercise = () => {
  isStarted.value = true
}

const selectAnswer = (index: number) => {
  if (currentQuestion.value) {
    answers.value[currentQuestion.value.id] = index
  }
}

const nextQuestion = () => {
  if (exercise.value && currentQuestionIndex.value < exercise.value.questions.length - 1) {
    currentQuestionIndex.value++
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const completeExercise = () => {
  if (exercise.value) {
    finalScore.value = Math.round((correctAnswers.value / exercise.value.questions.length) * 100)
    isCompleted.value = true
    
    // Sauvegarder les résultats
    exercise.value.completed = true
    exercise.value.score = finalScore.value
    exercise.value.completedAt = new Date().toISOString()
  }
}

const restartExercise = () => {
  isStarted.value = false
  isCompleted.value = false
  currentQuestionIndex.value = 0
  answers.value = {}
  finalScore.value = 0
}

const toggleRecording = () => {
  isRecording.value = !isRecording.value
  // Ici vous pourriez intégrer une vraie API d'enregistrement
}

const getTypeIcon = (type: string) => {
  const icons: Record<string, any> = {
    reading: BookOpen,
    listening: Headphones,
    speaking: Mic
  }
  return icons[type] || BookOpen
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    reading: 'bg-blue-500',
    listening: 'bg-green-500',
    speaking: 'bg-purple-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getLevelBadgeColor = (level: string) => {
  const colors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    elementary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    intermediate: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    'upper-intermediate': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    proficient: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
  }
  return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
}

const getOptionClass = (index: number) => {
  const currentAnswer = currentQuestion.value ? answers.value[currentQuestion.value.id] : undefined
  
  if (currentAnswer === index) {
    return 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
  }
  return 'border-gray-200 dark:border-gray-600'
}

const getOptionCircleClass = (index: number) => {
  const currentAnswer = currentQuestion.value ? answers.value[currentQuestion.value.id] : undefined
  
  if (currentAnswer === index) {
    return 'border-primary-500 bg-primary-500 text-white'
  }
  return 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
}

onMounted(() => {
  const exerciseId = route.params.id as string
  exercise.value = allExercises.find(ex => ex.id === exerciseId) || null
})
</script>