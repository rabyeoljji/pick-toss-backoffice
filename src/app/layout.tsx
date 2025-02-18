import type { Metadata } from 'next'
import './globals.css'
import { Metadatas } from '@/features/common/metadata'
import { Providers } from '@/providers'

export const metadata: Metadata = Metadatas.root()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
