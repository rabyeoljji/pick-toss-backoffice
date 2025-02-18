import { DeepRequired } from 'react-hook-form'
import { paths } from './schema'

declare global {
  declare namespace Notification {
    // api 변경 후 수정 필요
    type Type = Notification.Request.CreateNotification['notificationType']
    type Target = Notification.Request.CreateNotification['notificationTarget']
    type Days = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

    declare namespace Request {
      /** PATCH /api/v2/admin/notifications/{notification_id}/update
       * 푸시 알림 상세 및 수정
       */
      type UpdateNotification = DeepRequired<
        paths['/api/v2/admin/notifications/{notification_id}/update']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** POST /api/v2/admin/notifications
       * 푸시 알림 생성
       */
      type CreateNotification = DeepRequired<
        paths['/api/v2/admin/notifications']['post']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/admin/notifications/search
       * 푸시 알림 검색
       */
      type SearchedNotificationParams = DeepRequired<
        paths['/api/v2/admin/notifications/search']['get']['parameters']['query']
      >
    }

    declare namespace Response {
      /** GET /api/v2/admin/notifications
       * 푸시 알림 관리
       */
      type GetAllNotifications = DeepRequired<
        paths['/api/v2/admin/notifications']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/admin/notifications/search
       * 푸시 알림 검색
       */
      type GetSearchedNotifications = DeepRequired<
        paths['/api/v2/admin/notifications/search']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/admin/notifications/{notification_id}/info
       * 푸시 알림 상세 정보 조회
       */
      type GetNotificationInfo = DeepRequired<
        paths['/api/v2/admin/notifications/{notification_id}/info']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
