import { FunctionComponent, PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {
  side: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ side, children }) => {
  return (
    <main className="flex min-h-dvh w-dvw">
      {side}
      {children}
    </main>
  )
}

export default Layout
