import { REQUEST } from '@/requests'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const queries = createQueryKeyStore({
  notification: {
    list: (params?: { page: number }) => ({
      queryKey: [params],
      queryFn: () => REQUEST.notification.getNotifications(params),
    }),
    searchList: (params: Notification.Request.SearchedNotificationParams) => ({
      queryKey: [params],
      queryFn: () => REQUEST.notification.getSearchedNotifications(params),
    }),
    item: (notificationId: number) => ({
      queryKey: [notificationId],
      queryFn: () => REQUEST.notification.getNotificationDetail(notificationId),
    }),
  },
})
