/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Input } from '@/shared/components/ui/input'
import Label from '@/shared/components/ui/label'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { NOTIFICATION_TYPE, SEARCH_OPTIONS } from '../../config/notification-options'
import { useRouter, useSearchParams } from 'next/navigation'
import { useNotification } from '../../context/notification-context'

interface Props {
  className?: HTMLElement['className']
}

const NotificationFilterBar = ({ className }: Props) => {
  const router = useRouter()
  const { filterState, setType, setStatus, setOption, setKeyword, reset } = useNotification()

  const handleClickSearch = () => {
    const type = filterState['type']
    let isActive = null
    const option = filterState['option']
    const keyword = filterState['keyword']

    if (
      (filterState['status'].on && filterState['status'].off) ||
      (!filterState['status'].on && !filterState['status'].off)
    ) {
      isActive = null
    } else if (filterState['status'].on) {
      isActive = true
    } else if (filterState['status'].off) {
      isActive = false
    }

    router.replace(
      '/notification?' +
        `${type ? 'type=' + type : ''}` +
        `${isActive !== null ? '&isActive=' + isActive : ''}` +
        `&option=${option}` +
        `${keyword ? '&keyword=' + keyword : ''}`,
    )
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center rounded-[8px] border border-border-divider bg-background-base-02 py-[12px] pl-[16px] pr-[21px]',
        className,
      )}
    >
      <div className="flex-center mr-[16px] py-[12px]">
        <Text typography="text2-medium" color="secondary" className="mr-[8px] px-[8px]">
          <Text as={'span'} className="mr-[8px]">
            ·
          </Text>
          알림 종류
        </Text>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex w-[138px] items-center justify-between rounded-[8px] border-border-divider bg-background-base-01 px-[10.5px] py-[7px]">
              <Text typography="text2-medium" color="sub">
                {NOTIFICATION_TYPE.find((type) => type.key === filterState['type'])?.label ??
                  '선택'}
              </Text>
              <Icon name="chevron-down" className="text-icon-tertiary" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[162px] bg-white py-[7px] *:cursor-pointer">
            {NOTIFICATION_TYPE.map((type) => (
              <DropdownMenuItem
                key={type.key}
                onClick={() => setType(type.key)}
                className="flex justify-between px-[12px] py-[5px] hover:bg-gray-100"
              >
                <Text typography="text2-medium">{type.label}</Text>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-center mr-[37px] gap-[16px] py-[12px]">
        <Text typography="text2-medium" color="secondary" className="px-[8px]">
          <Text as={'span'} className="mr-[8px]">
            ·
          </Text>
          상태
        </Text>

        <div className="flex-center">
          <Checkbox
            defaultChecked
            id="ON"
            value={'ON'}
            checked={filterState['status'].on}
            onCheckedChange={(checked) => setStatus({ ...filterState['status'], on: !!checked })}
            className="mr-[8px] border-none bg-background-base-01"
          />
          <Label htmlFor="ON">
            <Text typography="text2-medium" color="secondary">
              ON
            </Text>
          </Label>
        </div>
        <div className="flex-center">
          <Checkbox
            defaultChecked
            id="OFF"
            value={'OFF'}
            checked={filterState['status'].off}
            onCheckedChange={(checked) => setStatus({ ...filterState['status'], off: !!checked })}
            className="mr-[8px] border-none bg-background-base-01"
          />
          <Label htmlFor="OFF">
            <Text typography="text2-medium" color="secondary">
              OFF
            </Text>
          </Label>
        </div>
      </div>

      <div className="flex-center flex-wrap gap-[4px]">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex w-[108px] items-center justify-between gap-[8px] rounded-[8px] border border-border-divider bg-background-base-01 px-[12.5px] py-[7px]">
              <Text typography="text2-medium" color="secondary" className="min-w-fit">
                {SEARCH_OPTIONS.find((option) => option.key === filterState['option'])?.label ??
                  '제목 및 내용'}
              </Text>
              <Icon name="chevron-down" className="text-icon-tertiary" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[162px] bg-white py-[7px] *:cursor-pointer">
            {SEARCH_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.key}
                onClick={() => setOption(option.key)}
                className="flex justify-between px-[12px] py-[5px] hover:bg-gray-100"
              >
                <Text typography="text2-medium">{option.label}</Text>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          value={filterState['keyword'] ?? ''}
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-[19px] w-[340px] text-text2-medium placeholder:text-text2-medium"
          placeholder="검색할 내용을 입력해주세요"
          left={<Icon name="search" className="size-[20px] text-icon-tertiary" />}
        />

        <Button
          onClick={handleClickSearch}
          variant={'smallSquare'}
          colors={'toast'}
          className="mr-[8px]"
        >
          조회
        </Button>

        <button
          onClick={reset}
          type="button"
          className="rounded-[8px] border border-border-divider bg-background-base-01 p-[8px] text-icon-tertiary"
        >
          <Icon name="refresh" className="size-[20px]" />
        </button>
      </div>
    </div>
  )
}

export default NotificationFilterBar
