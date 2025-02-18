'use client'

import { ServerEnv } from '@/requests/api-client/server-env'
import axios, { isAxiosError } from 'axios'

export const http = axios.create({
  baseURL: ServerEnv.apiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

http.interceptors.request.use(
  (config) => {
    // HTTP Only 쿠키는 자동으로 요청에 포함되므로
    // 별도의 토큰 설정이 필요 없음
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1]

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (isAxiosError(error)) {
      // 401 에러 처리 (토큰 만료 등)
      if (error.response?.status === 401) {
        // 로그인 페이지로 리다이렉트 또는 토큰 갱신 로직
        window.location.href = '/'
      }
      console.error(error.response?.data)
    }
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(error)
  },
)
