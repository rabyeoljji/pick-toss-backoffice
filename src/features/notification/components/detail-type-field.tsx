'use client'

import { NOTIFICATION_TYPE } from '@/features/notification/config/notification-options'
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

const DetailTypeField = () => {
  const form = useFormContext<NotificationFormValues>()

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-[8px]">
          <Label essential>
            <Text typography="text2-medium" color="secondary">
              알림 종류
            </Text>
          </Label>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <div className="flex w-[149px] items-center justify-between rounded-[8px] border border-border-divider bg-background-base-01 px-[10.5px] py-[7px]">
                {field.value ? (
                  <Text typography="text2-medium">
                    {NOTIFICATION_TYPE.find((value) => value.key === field.value)?.label}
                  </Text>
                ) : (
                  <Text typography="text2-medium" color="icon-tertiary">
                    종류 선택
                  </Text>
                )}
                <Icon name="chevron-down" className="size-[12px] text-icon-tertiary" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-[162px] bg-white py-[7px] *:cursor-pointer">
              {NOTIFICATION_TYPE.map((type) => (
                <DropdownMenuItem
                  key={type.key}
                  className="flex justify-between px-[12px] py-[5px] hover:bg-gray-100"
                  onSelect={(e) => e.preventDefault()}
                  onClick={() => field.onChange(type.key)}
                >
                  <Text typography="text2-medium">{type.label}</Text>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </FormItem>
      )}
    />
  )
}

export default DetailTypeField
