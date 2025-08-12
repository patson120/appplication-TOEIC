import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Question {
  id: number
  type: 'reading' | 'listening' | 'grammar'
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
  level: 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced' | 'proficient'
}

interface QuizState {
  currentQuestionIndex: number
  answers: Record<number, number>
  timeRemaining: number
  isCompleted: boolean
  score: number
}

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref<Question[]>([])
  const currentQuestionIndex = ref(0)
  const answers = ref<Record<number, number>>({})
  const timeRemaining = ref(3600) // 1 heure en secondes
  const isCompleted = ref(false)
  const score = ref(0)
  const isLoading = ref(false)

  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
  const progress = computed(() => 
    questions.value.length > 0 ? ((currentQuestionIndex.value + 1) / questions.value.length) * 100 : 0
  )
  const answeredQuestions = computed(() => Object.keys(answers.value).length)

  const loadQuestions = async (level: string = 'intermediate') => {
    isLoading.value = true
    try {
      // Simulation du chargement des questions
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      questions.value = getQuestionsByLevel(level)
      
      // Charger l'état sauvegardé
      loadSavedState()
    } finally {
      isLoading.value = false
    }
  }

  const getQuestionsByLevel = (level: string): Question[] => {
    const questionBank: Record<string, Question[]> = {
      beginner: [
        {
          id: 1,
          type: 'grammar',
          question: 'What is your name? My name _____ John.',
          options: ['am', 'is', 'are', 'be'],
          correctAnswer: 1,
          explanation: 'We use "is" with singular subjects like "my name".',
          difficulty: 'easy',
          level: 'beginner'
        },
        {
          id: 2,
          type: 'grammar',
          question: 'I _____ a student.',
          options: ['am', 'is', 'are', 'be'],
          correctAnswer: 0,
          explanation: 'We use "am" with the pronoun "I".',
          difficulty: 'easy',
          level: 'beginner'
        },
        {
          id: 3,
          type: 'reading',
          question: 'Choose the correct word: "I have two _____."',
          options: ['cat', 'cats', 'cates', 'catss'],
          correctAnswer: 1,
          explanation: 'The plural of "cat" is "cats".',
          difficulty: 'easy',
          level: 'beginner'
        },
        {
          id: 4,
          type: 'grammar',
          question: 'She _____ to school every day.',
          options: ['go', 'goes', 'going', 'gone'],
          correctAnswer: 1,
          explanation: 'We use "goes" with third person singular (she/he/it).',
          difficulty: 'easy',
          level: 'beginner'
        },
        {
          id: 5,
          type: 'reading',
          question: 'What color is the sun?',
          options: ['blue', 'green', 'yellow', 'purple'],
          correctAnswer: 2,
          explanation: 'The sun appears yellow in color.',
          difficulty: 'easy',
          level: 'beginner'
        }
      ],
      elementary: [
        {
          id: 6,
          type: 'grammar',
          question: 'Yesterday, I _____ to the cinema.',
          options: ['go', 'goes', 'went', 'going'],
          correctAnswer: 2,
          explanation: 'We use past tense "went" for actions completed yesterday.',
          difficulty: 'easy',
          level: 'elementary'
        },
        {
          id: 7,
          type: 'reading',
          question: 'Choose the correct sentence:',
          options: [
            'There is many books on the table.',
            'There are many books on the table.',
            'There be many books on the table.',
            'There have many books on the table.'
          ],
          correctAnswer: 1,
          explanation: 'We use "there are" with plural nouns like "books".',
          difficulty: 'medium',
          level: 'elementary'
        },
        {
          id: 8,
          type: 'grammar',
          question: 'I _____ English for three years.',
          options: ['study', 'studied', 'have studied', 'am studying'],
          correctAnswer: 2,
          explanation: 'Present perfect is used for actions that started in the past and continue to the present.',
          difficulty: 'medium',
          level: 'elementary'
        },
        {
          id: 9,
          type: 'reading',
          question: 'What does "library" mean?',
          options: ['a place to buy books', 'a place to borrow books', 'a place to eat', 'a place to sleep'],
          correctAnswer: 1,
          explanation: 'A library is a place where you can borrow books.',
          difficulty: 'easy',
          level: 'elementary'
        },
        {
          id: 10,
          type: 'grammar',
          question: 'She is _____ than her sister.',
          options: ['tall', 'taller', 'tallest', 'more tall'],
          correctAnswer: 1,
          explanation: 'We use comparative form "taller" when comparing two people.',
          difficulty: 'medium',
          level: 'elementary'
        }
      ],
      intermediate: [
        {
          id: 11,
          type: 'grammar',
          question: 'Choose the correct form: "She _____ to the store yesterday."',
          options: ['go', 'goes', 'went', 'going'],
          correctAnswer: 2,
          explanation: 'Past tense is used for actions completed in the past.',
          difficulty: 'easy',
          level: 'intermediate'
        },
        {
          id: 12,
          type: 'reading',
          question: 'What does the word "meticulous" mean in the following sentence: "He was meticulous in his work"?',
          options: ['careless', 'careful and precise', 'fast', 'lazy'],
          correctAnswer: 1,
          explanation: 'Meticulous means showing great attention to detail; very careful and precise.',
          difficulty: 'medium',
          level: 'intermediate'
        },
        {
          id: 13,
          type: 'grammar',
          question: 'Complete the sentence: "If I _____ you, I would study harder."',
          options: ['am', 'was', 'were', 'will be'],
          correctAnswer: 2,
          explanation: 'In hypothetical situations, we use "were" for all persons.',
          difficulty: 'medium',
          level: 'intermediate'
        },
        {
          id: 14,
          type: 'reading',
          question: 'Which sentence is grammatically correct?',
          options: [
            'Neither the teacher nor the students was ready.',
            'Neither the teacher nor the students were ready.',
            'Neither the teacher or the students were ready.',
            'Neither the teacher and the students were ready.'
          ],
          correctAnswer: 1,
          explanation: 'With "neither...nor", the verb agrees with the subject closer to it.',
          difficulty: 'hard',
          level: 'intermediate'
        },
        {
          id: 15,
          type: 'grammar',
          question: 'Choose the correct preposition: "She is interested _____ learning French."',
          options: ['in', 'on', 'at', 'for'],
          correctAnswer: 0,
          explanation: 'We use "interested in" followed by a gerund or noun.',
          difficulty: 'easy',
          level: 'intermediate'
        }
      ],
      'upper-intermediate': [
        {
          id: 16,
          type: 'grammar',
          question: 'By the time you arrive, I _____ the report.',
          options: ['will finish', 'will have finished', 'finish', 'am finishing'],
          correctAnswer: 1,
          explanation: 'Future perfect is used for actions that will be completed before a specific time in the future.',
          difficulty: 'hard',
          level: 'upper-intermediate'
        },
        {
          id: 17,
          type: 'reading',
          question: 'The word "ubiquitous" in "Smartphones have become ubiquitous in modern society" means:',
          options: ['rare', 'expensive', 'everywhere', 'outdated'],
          correctAnswer: 2,
          explanation: 'Ubiquitous means present, appearing, or found everywhere.',
          difficulty: 'hard',
          level: 'upper-intermediate'
        },
        {
          id: 18,
          type: 'grammar',
          question: 'Choose the correct form: "I wish I _____ more time to study."',
          options: ['have', 'had', 'will have', 'would have'],
          correctAnswer: 1,
          explanation: 'After "I wish" we use past tense to express regret about the present.',
          difficulty: 'hard',
          level: 'upper-intermediate'
        },
        {
          id: 19,
          type: 'reading',
          question: 'Which sentence uses the subjunctive mood correctly?',
          options: [
            'I suggest that he studies harder.',
            'I suggest that he study harder.',
            'I suggest that he will study harder.',
            'I suggest that he is studying harder.'
          ],
          correctAnswer: 1,
          explanation: 'The subjunctive mood uses the base form of the verb after "suggest that".',
          difficulty: 'hard',
          level: 'upper-intermediate'
        },
        {
          id: 20,
          type: 'grammar',
          question: 'The meeting _____ postponed due to unforeseen circumstances.',
          options: ['has been', 'have been', 'was been', 'were been'],
          correctAnswer: 0,
          explanation: 'Present perfect passive voice: "has been" + past participle.',
          difficulty: 'medium',
          level: 'upper-intermediate'
        }
      ],
      advanced: [
        {
          id: 21,
          type: 'grammar',
          question: 'Had it not been for your assistance, the project _____ failed.',
          options: ['would have', 'will have', 'would', 'will'],
          correctAnswer: 0,
          explanation: 'Third conditional with inversion: "would have" + past participle.',
          difficulty: 'hard',
          level: 'advanced'
        },
        {
          id: 22,
          type: 'reading',
          question: 'The author\'s use of "sanguine" in "Despite the setbacks, she remained sanguine about the outcome" suggests she was:',
          options: ['pessimistic', 'optimistic', 'indifferent', 'confused'],
          correctAnswer: 1,
          explanation: 'Sanguine means optimistic or positive, especially in a difficult situation.',
          difficulty: 'hard',
          level: 'advanced'
        },
        {
          id: 23,
          type: 'grammar',
          question: 'Choose the most appropriate form: "The committee _____ its decision after lengthy deliberation."',
          options: ['has reached', 'have reached', 'are reaching', 'were reaching'],
          correctAnswer: 0,
          explanation: 'Collective nouns like "committee" are usually treated as singular in American English.',
          difficulty: 'hard',
          level: 'advanced'
        },
        {
          id: 24,
          type: 'reading',
          question: 'In academic writing, which transition best shows contrast?',
          options: ['Furthermore', 'Nevertheless', 'Consequently', 'Similarly'],
          correctAnswer: 1,
          explanation: 'Nevertheless is a formal transition word that shows contrast or contradiction.',
          difficulty: 'medium',
          level: 'advanced'
        },
        {
          id: 25,
          type: 'grammar',
          question: 'The phenomenon, _____ extensively studied, remains poorly understood.',
          options: ['despite being', 'although being', 'in spite being', 'regardless being'],
          correctAnswer: 0,
          explanation: '"Despite being" is the correct form for this concessive structure.',
          difficulty: 'hard',
          level: 'advanced'
        }
      ],
      proficient: [
        {
          id: 26,
          type: 'grammar',
          question: 'The nuanced implications of the policy, _____ by experts, warrant further scrutiny.',
          options: ['as elucidated', 'as they elucidate', 'elucidating', 'to elucidate'],
          correctAnswer: 0,
          explanation: 'Past participle phrase "as elucidated" correctly modifies "implications".',
          difficulty: 'hard',
          level: 'proficient'
        },
        {
          id: 27,
          type: 'reading',
          question: 'The term "perspicacious" in "Her perspicacious analysis revealed hidden patterns" most closely means:',
          options: ['superficial', 'lengthy', 'insightful', 'biased'],
          correctAnswer: 2,
          explanation: 'Perspicacious means having keen insight or discernment; perceptive.',
          difficulty: 'hard',
          level: 'proficient'
        },
        {
          id: 28,
          type: 'grammar',
          question: 'Select the sentence with the most sophisticated register:',
          options: [
            'The results were really surprising.',
            'The findings were quite unexpected.',
            'The outcomes defied conventional expectations.',
            'The data was pretty shocking.'
          ],
          correctAnswer: 2,
          explanation: 'Option C uses the most formal, academic register appropriate for professional contexts.',
          difficulty: 'hard',
          level: 'proficient'
        },
        {
          id: 29,
          type: 'reading',
          question: 'In the context of literary criticism, "verisimilitude" refers to:',
          options: ['similarity to other works', 'appearance of truth or reality', 'complexity of plot', 'use of metaphor'],
          correctAnswer: 1,
          explanation: 'Verisimilitude means the appearance of being true or real; likelihood.',
          difficulty: 'hard',
          level: 'proficient'
        },
        {
          id: 30,
          type: 'grammar',
          question: 'The research methodology, _____ rigorous peer review, established new paradigms.',
          options: ['having undergone', 'undergoing', 'to undergo', 'underwent'],
          correctAnswer: 0,
          explanation: 'Perfect participle "having undergone" shows completed action before the main verb.',
          difficulty: 'hard',
          level: 'proficient'
        }
      ]
    }
    
    return questionBank[level] || questionBank.intermediate
  }

  const answerQuestion = (questionId: number, answerIndex: number) => {
    answers.value[questionId] = answerIndex
    saveState()
  }

  const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
      saveState()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
      saveState()
    }
  }

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.value.length) {
      currentQuestionIndex.value = index
      saveState()
    }
  }

  const completeQuiz = () => {
    let correctAnswers = 0
    questions.value.forEach(question => {
      if (answers.value[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })
    
    score.value = Math.round((correctAnswers / questions.value.length) * 100)
    isCompleted.value = true
    
    // Sauvegarder les résultats
    const results = {
      score: score.value,
      correctAnswers,
      totalQuestions: questions.value.length,
      answers: answers.value,
      completedAt: new Date().toISOString()
    }
    
    localStorage.setItem('quizResults', JSON.stringify(results))
    localStorage.removeItem('currentQuiz')
  }

  const resetQuiz = () => {
    currentQuestionIndex.value = 0
    answers.value = {}
    timeRemaining.value = 3600
    isCompleted.value = false
    score.value = 0
    localStorage.removeItem('currentQuiz')
    localStorage.removeItem('quizResults')
  }

  const saveState = () => {
    const state = {
      currentQuestionIndex: currentQuestionIndex.value,
      answers: answers.value,
      timeRemaining: timeRemaining.value
    }
    localStorage.setItem('currentQuiz', JSON.stringify(state))
  }

  const loadSavedState = () => {
    const savedState = localStorage.getItem('currentQuiz')
    if (savedState) {
      const state = JSON.parse(savedState)
      currentQuestionIndex.value = state.currentQuestionIndex || 0
      answers.value = state.answers || {}
      timeRemaining.value = state.timeRemaining || 3600
    }
  }

  const startTimer = () => {
    const timer = setInterval(() => {
      if (timeRemaining.value > 0 && !isCompleted.value) {
        timeRemaining.value--
        saveState()
      } else {
        clearInterval(timer)
        if (!isCompleted.value) {
          completeQuiz()
        }
      }
    }, 1000)
    return timer
  }

  return {
    questions,
    currentQuestionIndex,
    answers,
    timeRemaining,
    isCompleted,
    score,
    isLoading,
    currentQuestion,
    progress,
    answeredQuestions,
    loadQuestions,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    completeQuiz,
    resetQuiz,
    startTimer
  }
})