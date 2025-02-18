import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <main className="h-fit grow px-[84px] pb-[48px] pt-[63.5px]">
      {header}
      {children}
    </main>
  )
}

export default Layout
