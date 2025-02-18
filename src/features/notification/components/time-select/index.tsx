'use client'

import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { convertToTimeObject, TimeInputWithMeridiem } from '@/shared/utils/time'
import { useEffect, useState } from 'react'

interface TimeSelectProps {
  onChangeTime: (selectedTime: TimeInputWithMeridiem) => void
  formTime: string
}

const TimeSelect = ({ onChangeTime, formTime }: TimeSelectProps) => {
  const [selectedTime, setSelectedTime] = useState<TimeInputWithMeridiem>(
    convertToTimeObject(formTime),
  )
  const meridiem = ['오전', '오후'] as TimeInputWithMeridiem['meridiem'][]
  const hours = Array.from({ length: 12 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  useEffect(() => {
    onChangeTime(selectedTime)
  }, [onChangeTime, selectedTime])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex w-[149px] items-center justify-between rounded-[8px] border border-border-divider px-[12px] py-[10px] text-text1-medium">
          <Text typography="text1-medium">
            {selectedTime.hour.toString().padStart(2, '0')}:
            {selectedTime.minutes.toString().padStart(2, '0')} {selectedTime.meridiem}
          </Text>

          <Icon name="calendar" className="text-icon-tertiary" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex h-[226px] w-[150px] overflow-hidden bg-white">
        <div className="flex h-full w-1/3 flex-col overflow-y-scroll scrollbar-hide">
          {meridiem.map((value) => (
            <DropdownMenuItem
              className="w-full cursor-pointer hover:bg-gray-100"
              key={'meridiem-' + value}
              onSelect={(e) => e.preventDefault()}
              onClick={() => setSelectedTime((prev) => ({ ...prev, meridiem: value }))}
            >
              {value}
            </DropdownMenuItem>
          ))}
        </div>
        <div className="flex h-full w-1/3 flex-col overflow-y-scroll scrollbar-hide">
          {hours.map((hour) => (
            <DropdownMenuItem
              className="w-full cursor-pointer hover:bg-gray-100"
              key={'hour-' + hour}
              onSelect={(e) => e.preventDefault()}
              onClick={() => setSelectedTime((prev) => ({ ...prev, hour }))}
            >
              {hour.toString().padStart(2, '0')}
            </DropdownMenuItem>
          ))}
        </div>
        <div className="flex h-full w-1/3 flex-col overflow-y-scroll scrollbar-hide">
          {minutes.map((minutes) => (
            <DropdownMenuItem
              className="w-full cursor-pointer hover:bg-gray-100"
              key={'minute-' + minutes}
              onSelect={(e) => e.preventDefault()}
              onClick={() => setSelectedTime((prev) => ({ ...prev, minutes }))}
            >
              {minutes.toString().padStart(2, '0')}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TimeSelect
