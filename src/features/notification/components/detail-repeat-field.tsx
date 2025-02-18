'use client'

import { REPEAT_DAYS } from '@/features/notification/config/notification-options'
import { NotificationFormValues } from '@/features/notification/config/notification-schema'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { FormField, FormItem } from '@/shared/components/ui/form'
import Label from '@/shared/components/ui/label'
import Text from '@/shared/components/ui/text'
import { useFormContext } from 'react-hook-form'

const DetailRepeatField = () => {
  const form = useFormContext<NotificationFormValues>()
  const repeat = form.watch('repeat') || []

  const toggleRepeatDay = (checked: boolean | string, day: Notification.Days) => {
    const currentValues = [...repeat]
    if (checked) {
      if (!currentValues.includes(day)) {
        form.setValue('repeat', [...currentValues, day], { shouldValidate: true })
      }
    } else {
      form.setValue(
        'repeat',
        currentValues.filter((value) => value !== day),
        { shouldValidate: true },
      )
    }
  }

  return (
    <FormField
      control={form.control}
      name="repeat"
      render={() => (
        <FormItem className="flex w-full max-w-[226px] flex-col gap-[8px]">
          <Label essential>
            <Text typography="text2-medium" color="secondary">
              반복
            </Text>
          </Label>

          <div className="flex max-w-[220px] items-center justify-between">
            {REPEAT_DAYS.map((day) => (
              <div key={day.key} className="flex-center flex-col gap-[4px]">
                <Label htmlFor={day.key}>
                  <Text typography="caption-medium" color="secondary">
                    {day.label}
                  </Text>
                </Label>
                <Checkbox
                  id={day.key}
                  value={day.key}
                  checked={repeat.includes(day.key)}
                  onCheckedChange={(checked) => toggleRepeatDay(checked, day.key)}
                  className="bg-background-base-01"
                />
              </div>
            ))}
          </div>
        </FormItem>
      )}
    />
  )
}

export default DetailRepeatField
