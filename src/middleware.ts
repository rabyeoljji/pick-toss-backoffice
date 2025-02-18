import { NextRequest, NextResponse } from 'next/server'

interface Routes {
  [key: string]: boolean
}

const publicUrls: Routes = {
  '/notification': true,
  '/collections': true,
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/sign-up': true,
}

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublicFile = PUBLIC_FILE.test(pathname)
  const isPublicUrl = publicUrls[pathname]
  const isPublicOnlyUrl = publicOnlyUrls[pathname]

  // 1. Public files는 처리하지 않음
  if (isPublicFile) {
    return
  }

  // todo: 로그인 상태에 따라 경로 처리
  // 1. 쿠키에서 accessToken 확인
  const accessToken = request.cookies.get('accessToken')?.value
  const isLoggedIn = Boolean(accessToken)

  // 2. 로그인한 경우
  if (isLoggedIn) {
    // 허용된 경로가 아니라면 /notification으로 리디렉션
    if (!isPublicUrl) {
      return NextResponse.redirect(new URL('/notification', request.url))
    }
  } else {
    // 3. 비로그인 상태에서 허용된 경로가 아니라면 /로 리디렉션
    if (!isPublicOnlyUrl) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // default
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
