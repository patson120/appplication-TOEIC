<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
    <div class="card max-w-md w-full p-8 animate-fade-in">
      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-bold text-2xl">T</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">{{ $t('auth.registerTitle') }}</h1>
        <p class="text-gray-600 mt-2">{{ $t('auth.registerSubtitle') }}</p>
      </div>

      <!-- Connexion Google -->
      <div class="mb-6">
        <GoogleLoginButton @error="error = $event" />
        
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">{{ $t('auth.orContinueWith') }}</span>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('common.name') }}
          </label>
          <input 
            id="name"
            v-model="form.name" 
            type="text" 
            required
            class="input-field"
            :placeholder="$t('common.name')"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('common.email') }}
          </label>
          <input 
            id="email"
            v-model="form.email" 
            type="email" 
            required
            class="input-field"
            :placeholder="$t('common.email')"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('common.password') }}
          </label>
          <input 
            id="password"
            v-model="form.password" 
            type="password" 
            required
            minlength="6"
            class="input-field"
            :placeholder="$t('common.password')"
          />
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <button 
          type="submit" 
          :disabled="authStore.isLoading"
          class="w-full btn-primary py-3 flex items-center justify-center space-x-2"
        >
          <LoadingSpinner v-if="authStore.isLoading" />
          <span v-else>{{ $t('common.register') }}</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-gray-600">
          {{ $t('auth.hasAccount') }}
          <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-medium">
            {{ $t('common.login') }}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import GoogleLoginButton from '../components/GoogleLoginButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const error = ref('')

const handleRegister = async () => {
  error.value = ''
  
  const result = await authStore.register(form.value.name, form.value.email, form.value.password)
  
  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.error || 'Erreur d\'inscription'
  }
}
</script>