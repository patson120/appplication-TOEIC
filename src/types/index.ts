export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  provider?: 'email' | 'google'
  level?: string
  testsCompleted: number
  currentLevel: 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced' | 'proficient'
  skillLevels: {
    reading: number
    listening: number
    speaking: number
    grammar: number
  }
  totalPoints: number
  streak: number
  lastActivity: string
}

export interface Question {
  id: number
  type: 'reading' | 'listening' | 'speaking' | 'grammar'
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
  level: 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced' | 'proficient'
  audioUrl?: string
  imageUrl?: string
  passage?: string
}

export interface Exercise {
  id: string
  type: 'reading' | 'listening' | 'speaking'
  title: string
  description: string
  level: string
  duration: number
  questions: Question[]
  completed: boolean
  score?: number
  completedAt?: string
}

export interface LearningPath {
  id: string
  title: string
  description: string
  level: string
  exercises: Exercise[]
  progress: number
  isUnlocked: boolean
}

export interface Statistics {
  totalTime: number
  averageScore: number
  skillBreakdown: {
    reading: { score: number; progress: number; exercises: number }
    listening: { score: number; progress: number; exercises: number }
    speaking: { score: number; progress: number; exercises: number }
    grammar: { score: number; progress: number; exercises: number }
  }
  weeklyProgress: Array<{ date: string; score: number; exercises: number }>
  achievements: Array<{ id: string; title: string; description: string; unlockedAt: string }>
}