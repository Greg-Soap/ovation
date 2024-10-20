'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import type { OTPInput } from 'input-otp'

type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput>

type CustomOTPProps = Partial<InputOTPProps> & {
  length?: number
  className?: string
  showSeparator?: boolean
  separatorAfter?: number[]
}

function CustomOTP({
  className,
  length = 6,
  showSeparator = false,
  separatorAfter = [],
  ...props
}: CustomOTPProps) {
  return (
    // @ts-ignore
    <InputOTP maxLength={length} {...props}>
      <InputOTPGroup className={cn('gap-2', className)}>
        {Array.from({ length }, (_, index) => (
          <React.Fragment key={index}>
            <InputOTPSlot index={index} />
            {showSeparator &&
              separatorAfter.includes(index) &&
              index !== length - 1 && <InputOTPSeparator />}
          </React.Fragment>
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}

export { CustomOTP }
