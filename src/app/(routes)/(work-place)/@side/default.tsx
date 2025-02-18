'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideMenuBar = () => {
  const pathname = usePathname()

  return (
    <div className="flex min-w-[240px] flex-col items-center border-r border-[#D2D6DB] pt-[47px]">
      <div className="flex-center py-[6.73px]">
        <Icon name="picktoss-color" className="size-[35px]" />
        <Icon name="logo" className="w-[120px]" />
      </div>

      <div className="flex w-full flex-col gap-[14px] px-[59px] py-[29px]">
        <Link href={'/notification'}>
          <Text
            typography="subtitle2-bold"
            color={pathname === '/notification' ? 'accent' : 'disabled'}
          >
            푸시 알림 관리
          </Text>
        </Link>
        <Link href={'/collections'}>
          <Text
            typography="subtitle2-bold"
            color={pathname === '/collections' ? 'accent' : 'disabled'}
          >
            컬렉션 관리
          </Text>
        </Link>
      </div>
    </div>
  )
}

export default SideMenuBar
