'use client'

import { useMutation } from '@tanstack/react-query'
import { login, signUp } from './client'

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (params: { name: string; password: string }) => signUp(params),
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (params: { name: string; password: string }) => login(params),
    onSuccess: (data) => {
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 3) // 3일 후

      document.cookie = `accessToken=${data.accessToken}; expires=${expiryDate.toUTCString()}; path=/; ${process.env.NODE_ENV === 'production' ? 'secure; ' : ''}samesite=strict`
    },
  })
}
