'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'iconsax-react'

const formSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

type OtpFormProps = {
  onSubmit: (otp: string) => Promise<void>
  onResendOtp: () => Promise<void>
}

export default function OtpForm({ onSubmit, onResendOtp }: OtpFormProps) {
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()
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
          <Button
            variant="ghost"
            onClick={() => router.push('/forgot-password')}
          >
            <ArrowLeft />
          </Button>
          <h1 className="font-semibold text-3xl text-white">Enter OTP</h1>
        </div>
        <p className="text-sm">We&apos;ve sent a 6-digit code to your email</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-7"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-sm">
                  One-Time Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    placeholder="Enter 6-digit OTP"
                    type="text"
                    maxLength={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="hover:bg-white text-sm font-semibold h-[52px] w-full"
          >
            Verify OTP
          </Button>
        </form>
      </Form>
      <Button
        type="button"
        variant="link"
        onClick={handleResendOtp}
        disabled={isResending}
        className="text-sm text-[#cff073] hover:underline"
      >
        {isResending ? 'Resending...' : 'Resend OTP'}
      </Button>
    </div>
  )
}