import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import Text from './text'
import Label from './label'
import Icon from '../custom/icon'

const inputVariants = cva(
  'flex h-fit w-full border bg-background-base-01 px-[12px] py-[6px] !text-text1-medium text-text-primary ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-icon-disabled focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled',
  {
    variants: {
      variant: {
        default:
          'rounded-[8px] border-border-divider bg-background-base-01 focus:bg-background-base-01 focus:ring-1 focus:ring-border-focused',
      },
      colors: {
        white:
          'bg-background-base-01 focus:bg-background-base-01 focus:ring-1 focus:ring-border-focused',
        gray: 'border-none bg-background-base-02 focus:bg-background-base-01 focus:ring-1 focus:ring-border-focused',
      },
    },
    defaultVariants: {
      variant: 'default',
      colors: 'white',
    },
  },
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: React.ReactNode
  essential?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
  bottomText?: string | { text: string; type: 'info' }
  hasError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      colors,
      type = 'text',
      label,
      essential,
      left,
      right,
      bottomText,
      hasError = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={className}>
        {label && (
          <Label essential={essential} hasError={hasError} className="mb-[8px] text-text-sub">
            <Text typography="text2-medium">{label}</Text>
          </Label>
        )}

        <div className="relative w-full">
          {left && (
            <div className="absolute bottom-1/2 left-[12px] z-10 flex translate-y-1/2 items-center">
              {left}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, colors }),
              hasError && 'ring-1 ring-border-error placeholder:text-text-primary',
              left && 'pl-[40px]',
              right && 'pr-[58px]',
            )}
            ref={ref}
            aria-invalid={hasError}
            {...props}
          />

          {right && (
            <div className="absolute bottom-1/2 right-[12px] flex translate-y-1/2 items-center">
              {right}
            </div>
          )}
        </div>

        {bottomText && (
          <Text
            typography="text2-medium"
            className={cn('mt-[8px] flex items-center gap-[5px] text-text-caption', {
              'text-text-info': bottomText instanceof Object && bottomText.type === 'info',
              'text-text-critical': hasError,
            })}
          >
            {hasError ? (
              <Icon name="cancel-circle" className="size-[16px]" fill="#F4502C" stroke="#EBEFF3" />
            ) : null}
            {bottomText instanceof Object ? bottomText.text : bottomText}
          </Text>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
