import CreateNotification from '@/features/notification/screen/create-notification'
// import Icon from '@/shared/components/custom/icon'
// import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Text typography="title2">푸시 알림 관리</Text>

        <CreateNotification />
        {/* <Button variant={'smallSquare'} onClick={() => setOpenCreateNoti(true)}>
          <Icon name="plus" className="size-[16px]" />새 알림 등록
        </Button> */}
      </div>
    </>
  )
}

export default Header
