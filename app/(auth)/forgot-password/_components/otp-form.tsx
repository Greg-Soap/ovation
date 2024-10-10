'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'iconsax-react'
import { FormBase, FormField } from '@/components/customs/custom-form'

const formSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

type OtpFormProps = {
  onSubmit: (otp: string) => Promise<void>
  onResendOtp: () => Promise<void>
}

export default function OtpForm({ onSubmit, onResendOtp }: OtpFormProps) {
  const [isResending, setIsResending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await onSubmit(data.otp)
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    try {
      await onResendOtp()
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <div className="flex gap-2 items-center">
          <Button variant="ghost" asChild>
            <a href="/forgot-password">
              <ArrowLeft />
            </a>
          </Button>
          <h1 className="font-semibold text-3xl ">Enter OTP</h1>
        </div>
        <p className="text-sm text-light">
          We&apos;ve sent a 6-digit code to your email
        </p>
      </div>
      <FormBase
        form={form}
        onSubmit={handleSubmit}
        className="flex flex-col gap-7"
      >
        <FormField name="otp" label="One-Time Password" form={form}>
          <Input
            className="h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
            placeholder="Enter 6-digit OTP"
            type="text"
            maxLength={6}
          />
        </FormField>
      </FormBase>

      <Button
        type="button"
        variant="link"
        onClick={handleResendOtp}
        disabled={isResending}
        className="text-sm text-primary hover:underline"
      >
        {isResending ? 'Resending...' : 'Resend OTP'}
      </Button>
    </div>
  )
}
