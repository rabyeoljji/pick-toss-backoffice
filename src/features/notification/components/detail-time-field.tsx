'use client'

import { NotificationFormValues } from '@/features/notification/config/notification-schema'
import TimeSelect from '@/features/notification/components/time-select'
import { FormField, FormItem } from '@/shared/components/ui/form'
import Label from '@/shared/components/ui/label'
import Text from '@/shared/components/ui/text'
import { convertToISOString, TimeInputWithMeridiem } from '@/shared/utils/time'
import { useFormContext } from 'react-hook-form'

const DetailTimeField = () => {
  const form = useFormContext<NotificationFormValues>()

  const handleTime = (selectedTime: TimeInputWithMeridiem) => {
    const timeString = convertToISOString(selectedTime)
    form.setValue('time', timeString, { shouldValidate: true })
  }

  return (
    <FormField
      control={form.control}
      name="time"
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field }) => (
        <FormItem className="flex flex-col gap-[8px]">
          <Label essential>
            <Text typography="text2-medium" color="secondary">
              발송 시간
            </Text>
          </Label>

          <TimeSelect onChangeTime={handleTime} formTime={field.value} />
        </FormItem>
      )}
    />
  )
}

export default DetailTimeField
