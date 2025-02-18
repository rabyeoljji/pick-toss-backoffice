'use client'

import { Checkbox } from '@/shared/components/ui/checkbox'
import Text from '@/shared/components/ui/text'
import NotificationControlBar from '../notification-control-bar'
import NotificationItem from '../notification-item'
import { useCheckList } from '@/shared/hooks/use-check-list'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useSearchParams } from 'next/navigation'
import { makeRequestSearchParams, SearchOptions } from '../../utils'

interface Props {
  initialNotifications: Notification.Response.GetAllNotifications['notifications']
}

const NotificationListWithControlBar = ({ initialNotifications }: Props) => {
  const page = useSearchParams().get('page')
  const type = useSearchParams().get('type') as SearchOptions['type']
  const isActive = useSearchParams().get('isActive') as SearchOptions['isActive']
  const option = useSearchParams().get('option') as SearchOptions['option']
  const keyword = useSearchParams().get('keyword')

  const params = makeRequestSearchParams({ type, isActive, option, keyword, page })
  const { data, isPending } = useQuery(queries.notification.searchList(params))

  const notifications = useMemo(
    () => data?.notifications ?? initialNotifications,
    [initialNotifications, data],
  )

  const notificationCheckList = useMemo(
    () => notifications.map((notification) => ({ ...notification, checked: false })),
    [notifications],
  )

  const checkNotification = useCheckList(notificationCheckList)

  const handleAllChecked = (checked: boolean) => {
    if (checked) {
      checkNotification.checkAll()
    } else {
      checkNotification.unCheckAll()
    }
  }

  return (
    <>
      <NotificationControlBar
        className="mt-[23px]"
        checkNotification={checkNotification}
        totalDataLength={data?.totalNotifications}
        totalPageLength={data?.totalPages}
      />

      <div className="mt-[10px] flex min-h-[589px] w-full flex-col overflow-hidden rounded-[8px] border border-border-divider bg-background-base-01">
        <div className="flex h-[40px] w-full items-center justify-between bg-background-base-02 px-[24px]">
          <Checkbox
            id="check_noti_ALL"
            value={'check_noti_ALL'}
            checked={!data ? false : checkNotification.isAllChecked()}
            onCheckedChange={handleAllChecked}
            className="bg-background-base-01"
          />
          <Text typography="text2-bold" color="sub" className="w-[6%]">
            알림 종류
          </Text>
          <Text typography="text2-bold" color="sub" className="w-[15%] pl-[30px]">
            알림 제목
          </Text>
          <Text typography="text2-bold" color="sub" className="w-1/4 pl-[50px]">
            알림 내용
          </Text>
          <Text typography="text2-bold" color="sub" className="w-[6%]">
            발송 대상
          </Text>
          <Text typography="text2-bold" color="sub" className="w-[6%]">
            발송 시간
          </Text>
          <Text typography="text2-bold" color="sub" className="w-[3%]">
            반복
          </Text>
          <Text typography="text2-bold" color="sub" className="w-[4%] text-center">
            상태
          </Text>
        </div>

        {!isPending && (!notifications || notifications.length === 0) ? (
          // 리스트 길이가 0이거나 존재하지 않을 경우 아래 렌더링
          <Text
            typography="subtitle2-medium"
            color="sub"
            className="flex-center size-full min-h-[550px]"
          >
            등록된 내용이 없습니다
          </Text>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              type={notification.notificationType}
              title={notification.title}
              content={notification.content}
              target={notification.notificationTarget}
              time={notification.notificationTime}
              repeat={notification.repeatDays}
              isActive={notification.isActive}
              checkNotification={checkNotification}
            />
          ))
        )}
      </div>
    </>
  )
}

export default NotificationListWithControlBar
