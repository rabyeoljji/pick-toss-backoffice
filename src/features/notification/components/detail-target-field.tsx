'use client'

import { NOTIFICATION_TARGET } from '@/features/notification/config/notification-options'
import { NotificationFormValues } from '@/features/notification/config/notification-schema'
import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { FormField, FormItem } from '@/shared/components/ui/form'
import Label from '@/shared/components/ui/label'
import Text from '@/shared/components/ui/text'
import { useFormContext } from 'react-hook-form'

const DetailTargetField = () => {
  const form = useFormContext<NotificationFormValues>()
  const type = form.watch('type')

  return (
    <FormField
      control={form.control}
      name="target"
      render={({ field }) => (
        <FormItem className="flex w-full max-w-[226px] flex-col gap-[8px]">
          <Label essential>
            <Text typography="text2-medium" color="secondary">
              발송 대상
            </Text>
          </Label>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <div className="flex w-full max-w-[226px] items-center justify-between rounded-[8px] border border-border-divider bg-background-base-01 px-[10.5px] py-[7px]">
                {field.value ? (
                  <Text typography="text2-medium">
                    {NOTIFICATION_TARGET[type].find((type) => type.key === field.value)?.label}
                  </Text>
                ) : (
                  <Text typography="text2-medium" color="icon-tertiary">
                    대상 선택
                  </Text>
                )}
                <Icon name="chevron-down" className="size-[12px] text-icon-tertiary" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[226px] bg-white py-[7px] *:cursor-pointer">
              {type &&
                NOTIFICATION_TARGET[type]?.map((target, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex justify-between px-[12px] py-[5px] hover:bg-gray-100"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => field.onChange(target.key)}
                  >
                    <Text typography="text2-medium">{target.label}</Text>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </FormItem>
      )}
    />
  )
}

export default DetailTargetField
