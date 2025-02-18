import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Text typography="title2">컬렉션 관리</Text>

        <Button variant={'smallSquare'}>
          <Icon name="plus" className="size-[16px]" />새 컬렉션 등록
        </Button>
      </div>
    </>
  )
}

export default Header
