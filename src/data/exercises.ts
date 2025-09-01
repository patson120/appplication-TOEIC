import type { Exercise, Question } from '../types'

export const readingExercises: Exercise[] = [
  {
    id: 'reading-1',
    type: 'reading',
    title: 'Business Email Comprehension',
    description: 'Understand professional email communication',
    level: 'intermediate',
    duration: 15,
    completed: false,
    questions: [
      {
        id: 101,
        type: 'reading',
        question: 'What is the main purpose of this email?',
        passage: `Subject: Quarterly Sales Meeting
        
Dear Team,

I hope this email finds you well. I am writing to inform you about our upcoming quarterly sales meeting scheduled for next Friday, March 15th, at 2:00 PM in Conference Room A.

During this meeting, we will review our Q1 performance, discuss upcoming product launches, and set targets for Q2. Please come prepared with your individual sales reports and any questions you might have.

Best regards,
Sarah Johnson
Sales Manager`,
        options: [
          'To schedule a performance review',
          'To announce a quarterly sales meeting',
          'To discuss product launches only',
          'To request sales reports'
        ],
        correctAnswer: 1,
        explanation: 'The email clearly states its purpose is to inform about the quarterly sales meeting.',
        difficulty: 'medium',
        level: 'intermediate'
      },
      {
        id: 102,
        type: 'reading',
        question: 'When is the meeting scheduled?',
        passage: `Subject: Quarterly Sales Meeting
        
Dear Team,

I hope this email finds you well. I am writing to inform you about our upcoming quarterly sales meeting scheduled for next Friday, March 15th, at 2:00 PM in Conference Room A.

During this meeting, we will review our Q1 performance, discuss upcoming product launches, and set targets for Q2. Please come prepared with your individual sales reports and any questions you might have.

Best regards,
Sarah Johnson
Sales Manager`,
        options: [
          'Thursday, March 14th at 2:00 PM',
          'Friday, March 15th at 2:00 PM',
          'Friday, March 15th at 3:00 PM',
          'Next Monday at 2:00 PM'
        ],
        correctAnswer: 1,
        explanation: 'The email specifically mentions "next Friday, March 15th, at 2:00 PM".',
        difficulty: 'easy',
        level: 'intermediate'
      }
    ]
  },
  {
    id: 'reading-2',
    type: 'reading',
    title: 'Travel Advertisement Analysis',
    description: 'Analyze travel brochure content and details',
    level: 'upper-intermediate',
    duration: 20,
    completed: true,
    score: 85,
    completedAt: '2024-12-15T10:30:00Z',
    questions: [
      {
        id: 103,
        type: 'reading',
        question: 'What makes this destination unique according to the brochure?',
        passage: `DISCOVER SANTORINI
        
Experience the magic of Greece's most spectacular island. Santorini offers breathtaking sunsets, pristine white-washed villages, and crystal-clear waters. Our exclusive 7-day package includes luxury accommodation, guided tours of ancient ruins, wine tasting at local vineyards, and traditional cooking classes.

Special offer: Book before January 31st and receive a complimentary sunset cruise worth €150.

Starting from €1,299 per person (flights not included)`,
        options: [
          'The affordable pricing',
          'The breathtaking sunsets and white-washed villages',
          'The included flights',
          'The short duration of the trip'
        ],
        correctAnswer: 1,
        explanation: 'The brochure highlights the breathtaking sunsets and pristine white-washed villages as unique features.',
        difficulty: 'medium',
        level: 'upper-intermediate'
      }
    ]
  }
]

export const listeningExercises: Exercise[] = [
  {
    id: 'listening-1',
    type: 'listening',
    title: 'Airport Announcements',
    description: 'Understand common airport announcements and instructions',
    level: 'intermediate',
    duration: 10,
    completed: false,
    questions: [
      {
        id: 201,
        type: 'listening',
        question: 'What gate should passengers go to for Flight BA 247?',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        options: [
          'Gate A12',
          'Gate B15',
          'Gate C8',
          'Gate D3'
        ],
        correctAnswer: 1,
        explanation: 'The announcement clearly states "Flight BA 247 to London, please proceed to Gate B15".',
        difficulty: 'medium',
        level: 'intermediate'
      },
      {
        id: 202,
        type: 'listening',
        question: 'What time is the final boarding call?',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        options: [
          '3:15 PM',
          '3:30 PM',
          '3:45 PM',
          '4:00 PM'
        ],
        correctAnswer: 2,
        explanation: 'The final boarding call is announced for 3:45 PM.',
        difficulty: 'easy',
        level: 'intermediate'
      }
    ]
  },
  {
    id: 'listening-2',
    type: 'listening',
    title: 'Phone Conversations',
    description: 'Practice understanding telephone conversations',
    level: 'upper-intermediate',
    duration: 15,
    completed: true,
    score: 92,
    completedAt: '2024-12-14T14:20:00Z',
    questions: [
      {
        id: 203,
        type: 'listening',
        question: 'Why is the caller contacting customer service?',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        options: [
          'To make a complaint',
          'To request a refund',
          'To change an appointment',
          'To ask for information'
        ],
        correctAnswer: 2,
        explanation: 'The caller wants to reschedule their appointment due to a conflict.',
        difficulty: 'medium',
        level: 'upper-intermediate'
      }
    ]
  }
]

export const speakingExercises: Exercise[] = [
  {
    id: 'speaking-1',
    type: 'speaking',
    title: 'Self Introduction',
    description: 'Practice introducing yourself in professional settings',
    level: 'beginner',
    duration: 5,
    completed: false,
    questions: [
      {
        id: 301,
        type: 'speaking',
        question: 'Introduce yourself as if you were meeting a new colleague. Include your name, role, and one interesting fact about yourself. (60 seconds)',
        options: [],
        correctAnswer: 0,
        explanation: 'Focus on clear pronunciation, appropriate pace, and professional tone.',
        difficulty: 'easy',
        level: 'beginner'
      }
    ]
  },
  {
    id: 'speaking-2',
    type: 'speaking',
    title: 'Describing Graphs and Charts',
    description: 'Learn to describe visual data effectively',
    level: 'advanced',
    duration: 20,
    completed: true,
    score: 78,
    completedAt: '2024-12-13T16:45:00Z',
    questions: [
      {
        id: 302,
        type: 'speaking',
        question: 'Describe the trends shown in this sales chart. Explain what the data reveals about company performance. (90 seconds)',
        imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
        options: [],
        correctAnswer: 0,
        explanation: 'Use appropriate vocabulary for trends (increase, decrease, fluctuate) and time expressions.',
        difficulty: 'hard',
        level: 'advanced'
      }
    ]
  }
]

export const allExercises = [...readingExercises, ...listeningExercises, ...speakingExercises]