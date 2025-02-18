'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

interface SignUpParams {
  name: string
  password: string
}

/** POST /admin/sign-up - 운영진 회원가입 */
export const signUp = async (params: SignUpParams) => {
  try {
    await http.post(API_ENDPOINTS.AUTH.SIGN_UP, params)
  } catch (error: unknown) {
    throw error
  }
}

/** POST /admin/login - 운영진 로그인 */
export const login = async (params: SignUpParams) => {
  try {
    const { data } = await http.post<{ accessToken: string }>(API_ENDPOINTS.AUTH.LOGIN, params)
    return data
  } catch (error: unknown) {
    throw error
  }
}
