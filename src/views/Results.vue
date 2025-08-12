<template>
  <div class="min-h-screen bg-gray-50">
    <AppNavigation />
    
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-fade-in">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('quiz.results') }}</h1>
          <p class="text-gray-600">Consultez vos résultats détaillés et vos progrès</p>
        </div>

        <div v-if="!results" class="card p-8 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText :size="32" class="text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun résultat disponible</h3>
          <p class="text-gray-600 mb-6">Vous n'avez pas encore passé de test</p>
          <router-link to="/quiz" class="btn-primary inline-flex items-center space-x-2">
            <Play :size="18" />
            <span>Commencer un test</span>
          </router-link>
        </div>

        <div v-else class="space-y-8">
          <!-- Résumé des résultats -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Dernier Test</h2>
            
            <div class="grid md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award :size="24" class="text-primary-600" />
                </div>
                <div class="text-2xl font-bold text-primary-600 mb-1">{{ results.score }}%</div>
                <div class="text-sm text-gray-600">Score Total</div>
              </div>
              
              <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle :size="24" class="text-green-600" />
                </div>
                <div class="text-2xl font-bold text-green-600 mb-1">{{ results.correctAnswers }}</div>
                <div class="text-sm text-gray-600">Bonnes Réponses</div>
              </div>
              
              <div class="text-center">
                <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target :size="24" class="text-orange-600" />
                </div>
                <div class="text-2xl font-bold text-orange-600 mb-1">{{ results.totalQuestions }}</div>
                <div class="text-sm text-gray-600">Questions Total</div>
              </div>
              
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock :size="24" class="text-blue-600" />
                </div>
                <div class="text-lg font-bold text-blue-600 mb-1">{{ formattedDate }}</div>
                <div class="text-sm text-gray-600">Date du Test</div>
              </div>
            </div>
          </div>

          <!-- Analyse détaillée -->
          <div class="grid lg:grid-cols-2 gap-8">
            <div class="card p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Analyse par Type</h3>
              <div class="space-y-4">
                <div v-for="(stat, type) in typeStats" :key="type" class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full" :class="getTypeColor(type)"></div>
                    <span class="font-medium text-gray-700 capitalize">{{ type }}</span>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-gray-900">{{ stat.correct }}/{{ stat.total }}</div>
                    <div class="text-sm text-gray-500">{{ Math.round(stat.percentage) }}%</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Recommandations</h3>
              <div class="space-y-3">
                <div v-for="recommendation in recommendations" :key="recommendation.type" 
                     class="p-3 rounded-lg" :class="recommendation.bgColor">
                  <div class="flex items-start space-x-2">
                    <component :is="recommendation.icon" :size="16" :class="recommendation.iconColor" class="mt-0.5" />
                    <div>
                      <h4 class="font-medium" :class="recommendation.textColor">{{ recommendation.title }}</h4>
                      <p class="text-sm" :class="recommendation.textColor + ' opacity-80'">{{ recommendation.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Questions détaillées -->
          <div class="card p-6" v-if="quizStore.questions.length > 0">
            <h3 class="text-lg font-bold text-gray-900 mb-6">Révision des Questions</h3>
            <div class="space-y-6">
              <div 
                v-for="(question, index) in quizStore.questions" 
                :key="question.id"
                class="border-l-4 pl-4 py-3"
                :class="isCorrect(question) ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'"
              >
                <div class="flex items-center space-x-2 mb-2">
                  <span class="text-sm font-medium text-gray-600">Question {{ index + 1 }}</span>
                  <component 
                    :is="isCorrect(question) ? CheckCircle : XCircle" 
                    :size="16" 
                    :class="isCorrect(question) ? 'text-green-600' : 'text-red-600'" 
                  />
                </div>
                
                <h4 class="font-medium text-gray-900 mb-3">{{ question.question }}</h4>
                
                <div class="space-y-2 mb-3">
                  <div 
                    v-for="(option, optionIndex) in question.options" 
                    :key="optionIndex"
                    class="p-2 rounded text-sm"
                    :class="getOptionClass(question, optionIndex)"
                  >
                    {{ String.fromCharCode(65 + optionIndex) }}. {{ option }}
                  </div>
                </div>
                
                <div v-if="question.explanation" class="text-sm text-gray-600 italic">
                  <strong>{{ $t('quiz.explanation') }}:</strong> {{ question.explanation }}
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
import { ref, computed, onMounted } from 'vue'
import { useQuizStore } from '../stores/quiz'
import AppNavigation from '../components/AppNavigation.vue'
import { 
  Award, CheckCircle, Target, Clock, FileText, Play, 
  XCircle, BookOpen, AlertCircle, TrendingUp 
} from 'lucide-vue-next'

const quizStore = useQuizStore()
const results = ref<any>(null)

const formattedDate = computed(() => {
  if (!results.value?.completedAt) return ''
  return new Date(results.value.completedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const typeStats = computed(() => {
  if (!results.value || !quizStore.questions.length) return {}
  
  const stats: Record<string, { correct: number; total: number; percentage: number }> = {}
  
  quizStore.questions.forEach(question => {
    const type = question.type
    if (!stats[type]) {
      stats[type] = { correct: 0, total: 0, percentage: 0 }
    }
    
    stats[type].total++
    if (results.value.answers[question.id] === question.correctAnswer) {
      stats[type].correct++
    }
  })
  
  Object.keys(stats).forEach(type => {
    stats[type].percentage = (stats[type].correct / stats[type].total) * 100
  })
  
  return stats
})

const recommendations = computed(() => {
  const recs = []
  
  if (results.value?.score >= 80) {
    recs.push({
      type: 'excellent',
      title: 'Excellent travail !',
      description: 'Continuez à pratiquer pour maintenir votre niveau.',
      icon: Award,
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      iconColor: 'text-green-600'
    })
  } else if (results.value?.score >= 60) {
    recs.push({
      type: 'good',
      title: 'Bon niveau',
      description: 'Concentrez-vous sur les points faibles pour progresser.',
      icon: TrendingUp,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600'
    })
  } else {
    recs.push({
      type: 'improvement',
      title: 'À améliorer',
      description: 'Révisez les bases et pratiquez régulièrement.',
      icon: BookOpen,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
      iconColor: 'text-orange-600'
    })
  }
  
  // Ajouter des recommandations spécifiques par type
  Object.entries(typeStats.value).forEach(([type, stat]) => {
    if (stat.percentage < 60) {
      recs.push({
        type: `${type}-improvement`,
        title: `Améliorer ${type}`,
        description: `Votre score en ${type} est de ${Math.round(stat.percentage)}%. Pratiquez davantage cette section.`,
        icon: AlertCircle,
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        iconColor: 'text-red-600'
      })
    }
  })
  
  return recs
})

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    grammar: 'bg-blue-500',
    reading: 'bg-green-500',
    listening: 'bg-orange-500'
  }
  return colors[type] || 'bg-gray-500'
}

const isCorrect = (question: any) => {
  return results.value?.answers[question.id] === question.correctAnswer
}

const getOptionClass = (question: any, optionIndex: number) => {
  const userAnswer = results.value?.answers[question.id]
  const correctAnswer = question.correctAnswer
  
  if (optionIndex === correctAnswer) {
    return 'bg-green-100 border border-green-300 text-green-800'
  } else if (optionIndex === userAnswer && userAnswer !== correctAnswer) {
    return 'bg-red-100 border border-red-300 text-red-800'
  }
  return 'bg-gray-50'
}

onMounted(() => {
  const savedResults = localStorage.getItem('quizResults')
  if (savedResults) {
    results.value = JSON.parse(savedResults)
    // Charger les questions pour l'analyse détaillée
    quizStore.loadQuestions()
  }
})
</script>