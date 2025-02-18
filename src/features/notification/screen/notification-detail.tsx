'use client'

import {
  initialNotification,
  NotificationFormValues,
  notificationSchema,
} from '@/features/notification/config/notification-schema'
import DetailActiveField from '@/features/notification/components/detail-active-field'
import DetailContentField from '@/features/notification/components/detail-content-field'
import DetailMemoField from '@/features/notification/components/detail-memo-field'
import DetailRepeatField from '@/features/notification/components/detail-repeat-field'
import DetailTargetField from '@/features/notification/components/detail-target-field'
import DetailTimeField from '@/features/notification/components/detail-time-field'
import DetailTitleField from '@/features/notification/components/detail-title-field'
import DetailTypeField from '@/features/notification/components/detail-type-field'
import { useUpdateNotification } from '@/requests/notification/hooks'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Form } from '@/shared/components/ui/form'
import Text from '@/shared/components/ui/text'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import ConfirmDialogWidget from '@/shared/widget/confirm-dialog'

interface Props {
  triggerComponent: React.ReactNode
  notificationId: number
}

const NotificationDetail = ({ triggerComponent, notificationId }: Props) => {
  const { data } = useQuery(queries.notification.item(notificationId))
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: updateNotificationMutate } = useUpdateNotification()

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: initialNotification,
    mode: 'onChange',
  })

  useEffect(() => {
    if (data) {
      const values = {
        type: data.notificationType,
        target: data.notificationTarget,
        title: data.title,
        content: data.content,
        time: data.notificationTime,
        repeat: data.repeatDays as Notification.Days[],
        memo: data.memo,
        isActive: data.isActive || false,
      }

      form.reset(values)
    }
  }, [notificationId, data])

  const handleOpen = (open: boolean) => {
    if (!open) {
      form.reset()
    }
    setIsOpen(open)
  }

  const onSubmit = (data: NotificationFormValues) => {
    const validationResult = notificationSchema.safeParse(data)
    if (!validationResult.success) {
      console.error('유효성 검사 실패', validationResult.error)
      alert('입력값을 확인하세요.')
      return
    }

    const newNotification = {
      title: data.title,
      content: data.content,
      memo: data.memo ?? '',
      notificationType: data.type,
      notificationTarget: data.target,
      isActive: data.isActive,
      notificationTime: data.time,
      repeatDays: data.repeat,
    }

    const payload = {
      notificationId,
      requestBody: newNotification,
    }

    updateNotificationMutate(payload)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {triggerComponent}
      </DialogTrigger>

      <DialogContent
        displayCloseButton={false}
        className="flex h-[90dvh] min-w-[70dvh] flex-col overflow-hidden rounded-[12px] bg-background-base-01 p-0 shadow-custom-shadow"
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              // eslint-disable-next-line no-console
              console.log('유효성 검사 실패:', errors)
              alert('입력값을 확인하세요.')
            })}
          >
            <div className="flex h-[5.5dvh] w-full items-center justify-between bg-border-divider pb-[11px] pl-[19px] pr-[22.5px] pt-[13px]">
              <DialogTitle className="w-fit">
                <Text typography="subtitle2-bold" color="secondary">
                  푸시 알림 등록
                </Text>
              </DialogTitle>

              <DialogClose onClick={() => setIsOpen(false)}>
                <Icon name="cancel" className="size-[13.5px] text-text-secondary" />
              </DialogClose>
            </div>

            <div className="flex h-[84.5dvh] flex-col overflow-y-auto px-[38px] pb-[33px] pt-[26px]">
              <div className="flex items-center gap-[14px]">
                <DetailTypeField />

                <DetailTargetField />
              </div>

              <DetailTitleField />

              <DetailContentField />

              <div className="mt-[20px] flex items-center gap-[14px]">
                <DetailTimeField />

                <DetailRepeatField />
              </div>

              <DetailMemoField />

              <DetailActiveField />

              <div className="mt-[40px] flex items-center justify-end gap-[12px]">
                <ConfirmDialogWidget
                  triggerComponent={
                    <Button type="button" variant={'mediumSquare'} colors={'tertiary'}>
                      취소
                    </Button>
                  }
                  title={`수정을 취소할까요?`}
                  content={
                    <Text typography="text1-medium" color="secondary">
                      지금까지 수정한 내용은 저장되지 않습니다.
                    </Text>
                  }
                  cancelText="계속 작성"
                  confirmButton={
                    <button>
                      <Text
                        typography="button2"
                        color="accent"
                        onClick={() => setIsOpen(false)}
                        className="ml-[32px] p-[4px]"
                      >
                        수정 취소
                      </Text>
                    </button>
                  }
                />
                <Button
                  type="submit"
                  variant={'mediumSquare'}
                  disabled={form.formState.isSubmitting}
                >
                  저장
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NotificationDetail
