'use client'

import { Checkbox } from '@/shared/components/ui/checkbox'
import Text from '@/shared/components/ui/text'
import { NOTIFICATION_TYPE } from '../../config/notification-options'
import { convertToFormattedTime, formatRepeatDays } from '@/shared/utils/time'
import NotificationDetail from '../../screen/notification-detail'
import { UseCheckListReturn } from '@/shared/hooks/use-check-list'

interface Props {
  id: number
  type: string
  title: string
  content: string
  target: string
  time: string
  repeat: string[]
  isActive: boolean
  checkNotification: UseCheckListReturn<
    Notification.Response.GetNotificationInfo & { checked: boolean }
  >
}

const NotificationItem = ({
  id,
  type,
  title,
  content,
  target,
  time,
  repeat,
  isActive,
  checkNotification,
}: Props) => {
  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      checkNotification.check(id)
    } else {
      checkNotification.unCheck(id)
    }
  }

  return (
    <>
      <NotificationDetail
        triggerComponent={
          <div className="flex w-full items-center justify-between border-t border-border-divider px-[24px] py-[10px]">
            <Checkbox
              id={'check_noti_' + id}
              value={id}
              checked={checkNotification.isChecked(id)}
              onCheckedChange={handleCheckedChange}
              onClick={(e) => e.stopPropagation()}
              className="bg-background-base-01"
            />
            <Text typography="text2-bold" color="sub" className="w-[6%] min-w-fit">
              {NOTIFICATION_TYPE.find((value) => value.key === type)?.label}
            </Text>
            <Text typography="text2-bold" color="sub" className="w-[15%] truncate">
              {title}
            </Text>
            <Text typography="text2-bold" color="sub" className="w-1/4 truncate">
              {content}
            </Text>
            <Text typography="text2-bold" color="sub" className="w-[6%] pl-[10px]">
              {target === 'ALL' ? '전체' : '일부'}
            </Text>
            <Text typography="text2-bold" color="sub" className="w-[6%]">
              {convertToFormattedTime(time)}
            </Text>
            <Text typography="text2-bold" color="sub" className="w-[3%]">
              {formatRepeatDays(repeat)}
            </Text>
            <Text typography="text2-bold" color="sub" className="flex-center w-[4%] flex-wrap">
              {isActive ? (
                <div className="mr-[4px] size-[8px] rounded-full bg-text-accent" />
              ) : (
                <div className="mr-[4px] size-[8px] rounded-full bg-icon-disabled" />
              )}
              {isActive ? 'ON' : 'OFF'}
            </Text>
          </div>
        }
        notificationId={id}
      />
    </>
  )
}

export default NotificationItem
