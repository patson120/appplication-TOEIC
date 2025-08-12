import axios from 'axios'

// Configuration Axios
const api = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Intercepteurs pour l'authentification
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      config.headers.Authorization = `Bearer ${userData.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Services API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  refreshToken: () => api.post('/auth/refresh')
}

export const quizAPI = {
  getQuestions: (level?: string) =>
    api.get('/quiz/questions', { params: { level } }),
  
  submitAnswers: (answers: Record<number, number>) =>
    api.post('/quiz/submit', { answers }),
  
  getResults: (quizId: string) =>
    api.get(`/quiz/results/${quizId}`)
}

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  
  updateProfile: (data: any) =>
    api.put('/user/profile', data),
  
  getTestHistory: () =>
    api.get('/user/test-history')
}

export default api