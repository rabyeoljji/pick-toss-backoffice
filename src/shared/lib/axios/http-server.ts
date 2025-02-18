import { ServerEnv } from '@/requests/api-client/server-env'
import { cookies } from 'next/headers'
import axios, { isAxiosError } from 'axios'

export const httpServer = axios.create({
  baseURL: ServerEnv.apiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

httpServer.interceptors.request.use(
  async (config) => {
    if (config.url === '/') {
      return config
    }

    if (typeof window !== 'undefined') {
      throw new Error('httpServer should only be used in server-side code.')
    }

    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(error)
  },
)

httpServer.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (isAxiosError(error)) {
      console.error(error.response?.data)
    }
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(error)
  },
)
