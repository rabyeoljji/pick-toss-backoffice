'use client'

import { ReactNode, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
