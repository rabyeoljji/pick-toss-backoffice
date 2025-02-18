import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

/** GET /admin/notifications - 푸시 알림 관리 */
export const getNotifications = async (params?: { page: number }) => {
  try {
    const { data } = await httpServer.get<Notification.Response.GetAllNotifications>(
      API_ENDPOINTS.NOTIFICATION.GET.LIST,
      { params },
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}
