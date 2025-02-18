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
import { useCreateNotification } from '@/requests/notification/hooks'
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
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateNotification = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: createNotificationMutate } = useCreateNotification()

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: initialNotification,
    mode: 'onChange',
  })

  const closeDialog = () => {
    form.reset()
    setIsOpen(false)
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

    // api 요청
    createNotificationMutate(newNotification)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'smallSquare'}>
          <Icon name="plus" className="size-[16px]" />새 알림 등록
        </Button>
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

              <DialogClose onClick={closeDialog}>
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
                <Button onClick={closeDialog} variant={'mediumSquare'} colors={'tertiary'}>
                  취소
                </Button>
                <Button
                  type="submit"
                  variant={'mediumSquare'}
                  disabled={form.formState.isSubmitting}
                >
                  등록
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNotification
