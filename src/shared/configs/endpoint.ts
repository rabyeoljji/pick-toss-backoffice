export const API_ENDPOINTS = {
  AUTH: {
    /** POST /api/v2/admin/sign-up - 운영진 회원가입 */
    SIGN_UP: '/admin/sign-up',
    /** POST /api/v2/admin/login - 운영진 로그인 */
    LOGIN: '/admin/login',
  },

  COLLECTIONS: {
    GET: {
      /** GET /api/v2/admin/collections - 컬렉션 관리 */
      LIST: '/admin/collections',
      /** GET /api/v2/admin/collections/search - 컬렉션 검색하기 */
      SEARCH: '/admin/collections/search',
    },
    PATCH: {
      /** PATCH /api/v2/admin/collections/{collection_id}/info/update - 컬렉션 공개여부 수정 */
      UPDATE: (collectionId: number) => `/admin/collections/${collectionId}/info/update`,
    },
  },

  NOTIFICATION: {
    GET: {
      /** GET /api/v2/admin/notifications - 푸시 알림 관리 */
      LIST: '/admin/notifications',
      /** GET /api/v2/admin/notifications/{notification_id}/info - 푸시 알림 상세 정보 조회 */
      ITEM: (notificationId: number) => `/admin/notifications/${notificationId}/info`,
      /** GET /api/v2/admin/notifications/search - 푸시 알림 검색 */
      SEARCH: '/admin/notifications/search',
    },
    PATCH: {
      /** PATCH /api/v2/admin/notifications/{notification_id}/update - 푸시 알림 상세 및 수정 */
      UPDATE: (notificationId: number) => `/admin/notifications/${notificationId}/update`,
    },
    POST: {
      /** POST /api/v2/admin/test/notifications - 자신에게 푸시 알림 보내기(테스트 용도) */
      TEST: '/admin/notifications',
      /** POST /api/v2/admin/notifications - 푸시 알림 생성 */
      CREATE: '/admin/notifications',
    },
    DELETE: {
      /** DELETE /api/v2/admin/notifications/delete - 푸시 알림 삭제 */
      ITEM: '/admin/notifications/delete',
    },
  },
} as const

export type ApiEndpoints = typeof API_ENDPOINTS
