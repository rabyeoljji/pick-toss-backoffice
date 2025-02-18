import SignInForm from '@/features/auth/screen/sign-in'
import Link from 'next/link'

const Login = () => {
  return (
    <div className="flex-center h-dvh flex-col">
      <SignInForm />
      <Link href={'/sign-up'}>운영진 회원가입</Link>
    </div>
  )
}

export default Login
