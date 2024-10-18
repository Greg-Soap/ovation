/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'iconsax-react'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomOTP } from '@/components/customs/custom-otp'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

type OtpFormProps = {
  onSubmit: (otp: string) => Promise<void>
  onResendOtp: () => Promise<void>
}

export default function OtpForm({ onSubmit, onResendOtp }: OtpFormProps) {
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data.otp)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    try {
      await onResendOtp()
    } finally {
      setIsResending(false)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'otp' && value.otp?.length === 6) {
        form.handleSubmit(handleSubmit)()
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

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
        className="flex flex-col items-center gap-7"
      >
        <FormField name="otp" label="One-Time Password" form={form}>
          {(field) => (
            <div className="flex items-center gap-2">
              <CustomOTP
                value={field.value}
                onChange={field.onChange}
                length={6}
                showSeparator
                separatorAfter={[2]}
                disabled={isSubmitting}
              />
              {isSubmitting && (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              )}
            </div>
          )}
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
