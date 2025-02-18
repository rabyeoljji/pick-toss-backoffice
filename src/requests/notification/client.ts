'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

/** GET /admin/notifications - 푸시 알림 관리 */
export const getNotifications = async (params?: { page: number }) => {
  try {
    const { data } = await http.get<Notification.Response.GetAllNotifications>(
      API_ENDPOINTS.NOTIFICATION.GET.LIST,
      { params },
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /admin/notifications/search - 푸시 알림 검색 */
export const getSearchedNotifications = async (
  params: Notification.Request.SearchedNotificationParams,
) => {
  try {
    const { data } = await http.get<Notification.Response.GetSearchedNotifications>(
      API_ENDPOINTS.NOTIFICATION.GET.SEARCH,
      { params },
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /admin/notifications/{notification_id}/info - 푸시 알림 상세 정보 조회 */
export const getNotificationDetail = async (notificationId: number) => {
  try {
    const { data } = await http.get<Notification.Response.GetNotificationInfo>(
      API_ENDPOINTS.NOTIFICATION.GET.ITEM(notificationId),
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** POST /admin/notifications - 푸시 알림 생성 */
export const createNotification = async (requestBody: Notification.Request.CreateNotification) => {
  try {
    await http.post(API_ENDPOINTS.NOTIFICATION.POST.CREATE, requestBody)
  } catch (error: unknown) {
    throw error
  }
}

/** PATCH /api/v2/admin/notifications/{notification_id}/update - 푸시 알림 수정 */
export const updateNotification = async (payload: {
  notificationId: number
  requestBody: Notification.Request.UpdateNotification
}) => {
  try {
    await http.patch(
      API_ENDPOINTS.NOTIFICATION.PATCH.UPDATE(payload.notificationId),
      payload.requestBody,
    )
  } catch (error: unknown) {
    throw error
  }
}

/** DELETE /api/v2/admin/notifications/delete - 푸시 알림 삭제 */
export const deleteNotifications = async (requestBody: { notificationIds: number[] }) => {
  try {
    await http.delete(API_ENDPOINTS.NOTIFICATION.DELETE.ITEM, { data: requestBody })
  } catch (error: unknown) {
    throw error
  }
}
