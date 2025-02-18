'use client'

import { NotificationFormValues } from '@/features/notification/config/notification-schema'
import { FormField, FormItem } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import Label from '@/shared/components/ui/label'
import Text from '@/shared/components/ui/text'
import { useFormContext } from 'react-hook-form'

const DetailTitleField = () => {
  const form = useFormContext<NotificationFormValues>()
  const title = form.watch('title') || ''

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="mt-[20px] flex flex-col gap-[8px]">
          <Label essential>
            <Text typography="text2-medium" color="secondary">
              알림 제목 ({title.length}/20자)
            </Text>
          </Label>

          <Input
            placeholder="제목을 입력해주세요"
            colors={title ? 'white' : 'gray'}
            maxLength={20}
            {...field}
          />
        </FormItem>
      )}
    />
  )
}

export default DetailTitleField
