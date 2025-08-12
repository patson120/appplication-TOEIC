<template>
  <div class="min-h-screen bg-gray-50">
    <AppNavigation />
    
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="quizStore.isLoading" class="flex items-center justify-center py-20">
        <LoadingSpinner :text="$t('common.loading')" />
      </div>

      <div v-else-if="quizStore.isCompleted" class="animate-fade-in">
        <!-- Résultats -->
        <div class="card p-8 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award :size="32" class="text-green-600" />
          </div>
          
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('quiz.congratulations') }}</h1>
          <p class="text-gray-600 mb-8">Vous avez terminé le test avec succès !</p>
          
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-primary-50 p-6 rounded-lg">
              <div class="text-3xl font-bold text-primary-600 mb-2">{{ quizStore.score }}%</div>
              <div class="text-primary-700 font-medium">{{ $t('quiz.yourScore') }}</div>
            </div>
            
            <div class="bg-green-50 p-6 rounded-lg">
              <div class="text-3xl font-bold text-green-600 mb-2">
                {{ correctAnswers }}/{{ quizStore.questions.length }}
              </div>
              <div class="text-green-700 font-medium">{{ $t('quiz.correctAnswers') }}</div>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              @click="resetQuiz"
              class="btn-secondary px-6 py-3 inline-flex items-center space-x-2"
            >
              <RotateCcw :size="18" />
              <span>{{ $t('quiz.tryAgain') }}</span>
            </button>
            
            <router-link 
              to="/dashboard"
              class="btn-primary px-6 py-3 inline-flex items-center space-x-2"
            >
              <ArrowLeft :size="18" />
              <span>{{ $t('quiz.backToDashboard') }}</span>
            </router-link>
          </div>
        </div>
      </div>

      <div v-else class="animate-fade-in">
        <!-- Interface de quiz -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-bold text-gray-900">{{ $t('quiz.title') }}</h1>
            <TimerDisplay :time-remaining="quizStore.timeRemaining" />
          </div>
          
          <!-- Barre de progression -->
          <div class="mb-4">
            <div class="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>{{ $t('quiz.progress') }}</span>
              <span>{{ quizStore.currentQuestionIndex + 1 }} {{ $t('common.of') }} {{ quizStore.questions.length }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="progress-bar h-3" 
                :style="{ width: `${quizStore.progress}%` }"
              ></div>
            </div>
          </div>
          
          <!-- Navigation des questions -->
          <div class="flex flex-wrap gap-2 mb-6">
            <button
              v-for="(question, index) in quizStore.questions"
              :key="question.id"
              @click="quizStore.goToQuestion(index)"
              class="w-10 h-10 rounded-lg text-sm font-medium transition-all"
              :class="getQuestionButtonClass(index)"
            >
              {{ index + 1 }}
            </button>
          </div>
        </div>

        <div v-if="quizStore.currentQuestion" class="card p-8">
          <div class="mb-6">
            <div class="flex items-center space-x-2 mb-4">
              <span class="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                {{ quizStore.currentQuestion.type.toUpperCase() }}
              </span>
              <span class="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                {{ quizStore.currentQuestion.difficulty }}
              </span>
            </div>
            
            <h2 class="text-xl font-semibold text-gray-900 leading-relaxed">
              {{ quizStore.currentQuestion.question }}
            </h2>
          </div>

          <div class="space-y-3 mb-8">
            <button
              v-for="(option, index) in quizStore.currentQuestion.options"
              :key="index"
              @click="selectAnswer(index)"
              class="w-full text-left p-4 rounded-lg border-2 transition-all hover:bg-gray-50"
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

          <div class="flex justify-between">
            <button 
              @click="quizStore.previousQuestion"
              :disabled="quizStore.currentQuestionIndex === 0"
              class="btn-secondary px-6 py-3 inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft :size="18" />
              <span>{{ $t('common.previous') }}</span>
            </button>

            <button 
              v-if="quizStore.currentQuestionIndex === quizStore.questions.length - 1"
              @click="completeQuiz"
              class="btn-primary px-6 py-3 inline-flex items-center space-x-2"
            >
              <span>{{ $t('quiz.submitTest') }}</span>
              <CheckCircle :size="18" />
            </button>
            
            <button 
              v-else
              @click="quizStore.nextQuestion"
              class="btn-primary px-6 py-3 inline-flex items-center space-x-2"
            >
              <span>{{ $t('common.next') }}</span>
              <ArrowRight :size="18" />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuizStore } from '../stores/quiz'
import { useAuthStore } from '../stores/auth'
import AppNavigation from '../components/AppNavigation.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import TimerDisplay from '../components/TimerDisplay.vue'
import { ArrowLeft, ArrowRight, CheckCircle, Award, RotateCcw } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const quizStore = useQuizStore()
const authStore = useAuthStore()

const selectedAnswer = ref<number | null>(null)

const correctAnswers = computed(() => {
  let count = 0
  quizStore.questions.forEach(question => {
    if (quizStore.answers[question.id] === question.correctAnswer) {
      count++
    }
  })
  return count
})

const selectAnswer = (index: number) => {
  selectedAnswer.value = index
  if (quizStore.currentQuestion) {
    quizStore.answerQuestion(quizStore.currentQuestion.id, index)
  }
}

const completeQuiz = () => {
  quizStore.completeQuiz()
  
  // Mettre à jour le compteur de tests de l'utilisateur
  if (authStore.user) {
    authStore.updateProfile({
      testsCompleted: (authStore.user.testsCompleted || 0) + 1
    })
  }
}

const resetQuiz = () => {
  quizStore.resetQuiz()
  quizStore.loadQuestions()
}

const getQuestionButtonClass = (index: number) => {
  const isAnswered = quizStore.questions[index] && quizStore.answers[quizStore.questions[index].id] !== undefined
  const isCurrent = index === quizStore.currentQuestionIndex
  
  if (isCurrent) {
    return 'bg-primary-600 text-white'
  } else if (isAnswered) {
    return 'bg-green-100 text-green-700 border-green-200'
  } else {
    return 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  }
}

const getOptionClass = (index: number) => {
  const currentAnswer = quizStore.currentQuestion ? quizStore.answers[quizStore.currentQuestion.id] : undefined
  
  if (currentAnswer === index) {
    return 'border-primary-500 bg-primary-50'
  }
  return 'border-gray-200'
}

const getOptionCircleClass = (index: number) => {
  const currentAnswer = quizStore.currentQuestion ? quizStore.answers[quizStore.currentQuestion.id] : undefined
  
  if (currentAnswer === index) {
    return 'border-primary-500 bg-primary-500 text-white'
  }
  return 'border-gray-300 text-gray-600'
}

onMounted(async () => {
  const level = route.query.level as string || 'intermediate'
  await quizStore.loadQuestions(level)
  quizStore.startTimer()
  
  // Charger la réponse actuelle si elle existe
  if (quizStore.currentQuestion) {
    selectedAnswer.value = quizStore.answers[quizStore.currentQuestion.id] ?? null
  }
})
</script>