import { defineConfig } from 'vite'
import react from '@vitejs/react'

export default defineConfig({
  plugins: [react()],
  base: '/-TypingTrainer/', // Назва вашого репозиторію (з дефісом)
})
