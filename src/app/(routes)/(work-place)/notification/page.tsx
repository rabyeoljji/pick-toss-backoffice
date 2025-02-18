import NotificationFilterBar from '@/features/notification/components/notification-filter-bar'
import NotificationListWithControlBar from '@/features/notification/components/notification-list-with-control-bar'
import { getNotifications } from '@/requests/notification/server'

const NotificationPage = async () => {
  const { notifications } = await getNotifications()

  return (
    <main>
      <NotificationFilterBar className="mt-[24.5px]" />

      <NotificationListWithControlBar initialNotifications={notifications} />
    </main>
  )
}

export default NotificationPage
