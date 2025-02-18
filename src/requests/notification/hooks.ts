'use client'

import { useMutation } from '@tanstack/react-query'
import { createNotification, deleteNotifications, updateNotification } from './client'

/** POST /admin/notifications - 푸시 알림 생성 */
export const useCreateNotification = () => {
  return useMutation({
    mutationFn: async (requestBody: Notification.Request.CreateNotification) =>
      createNotification(requestBody),
    onSuccess: () => window.location.reload(),
  })
}

/** PATCH /api/v2/admin/notifications/{notification_id}/update - 푸시 알림 수정 */
export const useUpdateNotification = () => {
  return useMutation({
    mutationFn: async (payload: {
      notificationId: number
      requestBody: Notification.Request.UpdateNotification
    }) => updateNotification(payload),
    onSuccess: () => window.location.reload(),
  })
}

/** DELETE /api/v2/admin/notifications/delete - 푸시 알림 삭제 */
export const useDeleteNotification = () => {
  return useMutation({
    mutationFn: async (requestBody: { notificationIds: number[] }) =>
      deleteNotifications(requestBody),
    onSuccess: () => window.location.reload(),
  })
}
