import { Metadata } from 'next'

// url 변경되면 수정 부탁드립니다
export const Metadatas = {
  root(): Metadata {
    const baseUrl = 'https://pick-toss-backoffice.vercel.app/'

    return {
      metadataBase: new URL(baseUrl),
      title: '픽토스 백오피스',
      description: 'picktoss BackOffice',
      icons: {
        icon: '/favicons/favicon-96x96.png',
        apple: '/favicons/apple-touch-icon.png',
      },
    }
  },
}
