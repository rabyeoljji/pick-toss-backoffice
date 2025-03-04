'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { z } from 'zod'
import Label from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { useSignUp } from '@/requests/auth/hooks'
import { useRouter } from 'next/navigation'

// TODO: 논의 후 수정
const signUpSchema = z
  .object({
    username: z.string().min(4, '아이디는 4글자 이상이어야 합니다').max(20, '아이디가 너무 깁니다'),
    password: z
      .string()
      .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
      .max(20, '비밀번호가 너무 깁니다'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  })

type SignUpInput = z.infer<typeof signUpSchema>

export default function SignUpForm() {
  const router = useRouter()
  const { mutate: signUpMutate } = useSignUp()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data: SignUpInput) => {
    setIsLoading(true)
    try {
      const info = { name: data.username, password: data.password }
      // API 호출 로직
      signUpMutate(info, {
        onSuccess: () => router.replace('/'),
      })
    } catch (error) {
      console.error('Signup error:', error)
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div>
          <Text typography="title1" color="secondary" className="mt-6 text-center">
            운영진 회원가입
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

            <div>
              <Input
                essential
                label={
                  <Label hasError={!!errors.passwordConfirm} htmlFor="passwordConfirm">
                    비밀번호 확인
                  </Label>
                }
                hasError={!!errors.passwordConfirm}
                bottomText={errors.passwordConfirm && errors.passwordConfirm.message}
                id="passwordConfirm"
                type="password"
                {...register('passwordConfirm')}
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? '처리중...' : '회원가입'}
          </Button>
        </form>
      </div>
    </div>
  )
}
