import CreateNotification from '@/features/notification/screen/create-notification'
import Text from '@/shared/components/ui/text'

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Text typography="title2">푸시 알림 관리</Text>

        <CreateNotification />
      </div>
    </>
  )
}

export default Header
