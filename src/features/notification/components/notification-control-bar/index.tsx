'use client'

import { useDeleteNotification } from '@/requests/notification/hooks'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { UseCheckListReturn } from '@/shared/hooks/use-check-list'
import { cn } from '@/shared/lib/utils'
import ConfirmDialogWidget from '@/shared/widget/confirm-dialog'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  className?: HTMLElement['className']
  checkNotification: UseCheckListReturn<
    Notification.Response.GetNotificationInfo & { checked: boolean }
  >
  totalDataLength?: number
  totalPageLength?: number
}

const NotificationControlBar = ({
  className,
  checkNotification,
  totalDataLength,
  totalPageLength,
}: Props) => {
  const { mutate: deleteNotificationsMutate } = useDeleteNotification()
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const currentPage = page === null ? 1 : Number(page)

  const movePrevPage = () => {
    const prevPage = currentPage - 1

    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(prevPage))

    router.replace(`?${params.toString()}`)
  }
  const moveNextPage = () => {
    const nextPage = currentPage + 1

    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(nextPage))

    router.replace(`?${params.toString()}`)
  }

  const handleDelete = () => {
    const requestBody = {
      notificationIds: checkNotification.getCheckedIds() as number[],
    }

    deleteNotificationsMutate(requestBody)
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-[10px]">
        <Text typography="text1-medium">총 {totalDataLength?.toLocaleString()}개</Text>
        <div className="flex rounded-[8px] border border-border-divider py-[6px]">
          <Text
            typography="text2-medium"
            color="secondary"
            className="min-w-[66px] border-r border-border-divider pl-[12px] pr-[10px]"
          >
            선택{' '}
            <Text as={'span'} color="accent">
              {checkNotification.getCheckedIds().length}
            </Text>
          </Text>

          <ConfirmDialogWidget
            triggerComponent={
              <button type="button" className="pl-[10px] pr-[12px]">
                <Icon name="bin" className="size-[16px] text-text-wrong" />
              </button>
            }
            title={`선택한 알림 ${checkNotification.getCheckedIds().length}개를 삭제할까요?`}
            content={
              <Text typography="text1-medium" color="secondary">
                삭제한 내용은 다시 복구할 수 없습니다.
              </Text>
            }
            confirmButton={
              <button>
                <Text
                  typography="button2"
                  color="wrong"
                  onClick={handleDelete}
                  className="ml-[32px] p-[4px]"
                >
                  삭제
                </Text>
              </button>
            }
          />
        </div>
      </div>

      <div className="flex items-center gap-[12px]">
        <Button
          variant={'tinySquare'}
          colors={'outlined'}
          className="flex h-[32px] gap-[8px] px-[12px] py-[8px]"
        >
          <Image src={'/image/excel.png'} alt="" width={16} height={16} />
          <Text typography="button5" color="secondary">
            엑셀 다운로드
          </Text>
        </Button>

        <div className="flex items-center gap-[8px]">
          <Text typography="text2-medium" color="secondary">
            {currentPage} / {totalPageLength}
          </Text>

          <div className="flex w-[48px] items-center justify-between">
            <button onClick={movePrevPage} type="button" disabled={currentPage === 1}>
              <Icon
                name="chevron-left"
                className={cn('size-[16px]', currentPage === 1 && 'text-icon-tertiary')}
              />
            </button>
            <button onClick={moveNextPage} disabled={currentPage === totalPageLength}>
              <Icon
                name="chevron-right"
                className={cn(
                  'size-[16px]',
                  currentPage === totalPageLength && 'text-icon-tertiary',
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationControlBar
