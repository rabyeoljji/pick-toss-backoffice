'use client'

import { NotificationFormValues } from '@/features/notification/config/notification-schema'
import { FormField, FormItem } from '@/shared/components/ui/form'
import Label from '@/shared/components/ui/label'
import { Switch } from '@/shared/components/ui/switch'
import Text from '@/shared/components/ui/text'
import { useFormContext } from 'react-hook-form'

const DetailActiveField = () => {
  const form = useFormContext<NotificationFormValues>()

  return (
    <FormField
      control={form.control}
      name="isActive"
      render={({ field }) => (
        <FormItem className="mt-[20px] flex flex-col gap-[8px]">
          <Label essential>
            <Text typography="text2-medium" color="secondary">
              상태
            </Text>
          </Label>

          <Switch size={'md'} checked={field.value} onCheckedChange={field.onChange} />
        </FormItem>
      )}
    />
  )
}

export default DetailActiveField
