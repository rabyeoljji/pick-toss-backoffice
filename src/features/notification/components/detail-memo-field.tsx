'use client'

import { NotificationFormValues } from '@/features/notification/config/notification-schema'
import { FormField, FormItem } from '@/shared/components/ui/form'
import Label from '@/shared/components/ui/label'
import Text from '@/shared/components/ui/text'
import { Textarea } from '@/shared/components/ui/textarea'
import { cn } from '@/shared/lib/utils'
import { useFormContext } from 'react-hook-form'

const DetailMemoField = () => {
  const form = useFormContext<NotificationFormValues>()
  const memo = form.watch('memo') || ''

  return (
    <FormField
      control={form.control}
      name="memo"
      render={({ field }) => (
        <FormItem className="mt-[20px] flex flex-col gap-[8px]">
          <Label>
            <Text typography="text2-medium" color="secondary">
              메모
            </Text>
          </Label>

          <Textarea
            placeholder="내용을 입력해주세요"
            className={cn(
              'min-h-[120px] rounded-[8px] bg-background-base-02 resize-none placeholder:text-icon-disabled',
              memo && 'bg-background-base-01 border border-border-divider',
            )}
            maxLength={50}
            {...field}
          />
        </FormItem>
      )}
    />
  )
}

export default DetailMemoField
