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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (data) => {
      // TODO: accessToken 만료기한 백엔드와 논의 후 통일
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 3) // 30일 후

      // document.cookie = `accessToken=${'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNzM5ODgyMTIyLCJyb2xlIjoiUk9MRV9VU0VSIn0.Sy4dBz9oaU87z1iW0OitC7Jc55Rp8PB981lDjnejrHI'}; expires=${expiryDate.toUTCString()}; path=/; ${process.env.NODE_ENV === 'production' ? 'secure; ' : ''}samesite=strict`
      document.cookie = `accessToken=${data.accessToken}; expires=${expiryDate.toUTCString()}; path=/; ${process.env.NODE_ENV === 'production' ? 'secure; ' : ''}samesite=strict`
    },
  })
}
