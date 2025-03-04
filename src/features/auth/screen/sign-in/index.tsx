'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Label from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { useLogin } from '@/requests/auth/hooks'
import { useRouter } from 'next/navigation'

// TODO: 논의 후 수정
const signInSchema = z.object({
  username: z.string().min(4, '아이디는 4글자 이상이어야 합니다').max(20, '아이디가 너무 깁니다'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .max(20, '비밀번호가 너무 깁니다'),
})

type SignInInput = z.infer<typeof signInSchema>

export default function SignInForm() {
  const router = useRouter()
  const { mutate: loginMutate } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = (data: SignInInput) => {
    try {
      const info = { name: data.username, password: data.password }
      loginMutate(info, {
        onSuccess: () => router.replace('/notification'),
      })
    } catch (error) {
      console.error('Signin error:', error)
    }
  }

  return (
    <div className="flex min-h-fit w-full items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div>
          <Text typography="title1" color="secondary" className="mt-6 text-center">
            운영진 로그인
          </Text>
        </div>
        <form className="mt-8 flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md">
            <div>
              <Input
                essential
                label={
                  <Label hasError={!!errors.username} htmlFor="username">
                    아이디
                  </Label>
                }
                hasError={!!errors.username}
                bottomText={errors.username && errors.username.message}
                id="username"
                {...register('username')}
                type="text"
              />
            </div>

            <div>
              <Input
                essential
                label={
                  <Label hasError={!!errors.password} htmlFor="password">
                    비밀번호
                  </Label>
                }
                hasError={!!errors.password}
                bottomText={errors.password && errors.password.message}
                id="password"
                type="password"
                {...register('password')}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? '처리중...' : '로그인'}
          </Button>
        </form>
      </div>
    </div>
  )
}
