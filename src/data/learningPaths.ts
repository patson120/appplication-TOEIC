import type { LearningPath } from '../types'
import { readingExercises, listeningExercises, speakingExercises } from './exercises'

export const learningPaths: LearningPath[] = [
  {
    id: 'beginner-path',
    title: 'Parcours Débutant',
    description: 'Maîtrisez les bases de l\'anglais professionnel',
    level: 'beginner',
    progress: 25,
    isUnlocked: true,
    exercises: [
      ...speakingExercises.filter(ex => ex.level === 'beginner'),
      ...readingExercises.filter(ex => ex.level === 'beginner'),
      ...listeningExercises.filter(ex => ex.level === 'beginner')
    ]
  },
  {
    id: 'intermediate-path',
    title: 'Parcours Intermédiaire',
    description: 'Développez vos compétences en communication',
    level: 'intermediate',
    progress: 60,
    isUnlocked: true,
    exercises: [
      ...readingExercises.filter(ex => ex.level === 'intermediate'),
      ...listeningExercises.filter(ex => ex.level === 'intermediate'),
      ...speakingExercises.filter(ex => ex.level === 'intermediate')
    ]
  },
  {
    id: 'advanced-path',
    title: 'Parcours Avancé',
    description: 'Perfectionnez votre anglais professionnel',
    level: 'advanced',
    progress: 15,
    isUnlocked: false,
    exercises: [
      ...readingExercises.filter(ex => ex.level === 'advanced'),
      ...listeningExercises.filter(ex => ex.level === 'advanced'),
      ...speakingExercises.filter(ex => ex.level === 'advanced')
    ]
  }
]