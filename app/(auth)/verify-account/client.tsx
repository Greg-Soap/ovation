'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomOTP } from '@/components/customs/custom-otp'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useCallback } from 'react'
import { useAnchorNavigation } from '@/lib/use-navigation'

const formSchema = z.object({
  code: z.string().length(6, 'OTP must be 6 digits'),
})

export default function VerifyAccountPage() {
  const searchParams = useSearchParams()
  const navigateTo = useAnchorNavigation()
  const email = searchParams.get('email')
  const code = searchParams.get('code')
  const [isVerified, setIsVerified] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  })

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: (code: string) =>
      ovationService.verifyOtp(email as string, code),
    onSuccess: () => {
      setIsVerified(true)
      setTimeout(() => {
        navigateTo('/login')
      }, 3000)
    },
  })

  const handleSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      await verifyOtp(data.code)
    },
    [verifyOtp],
  )

  const handleOtpChange = useCallback(
    (value: string) => {
      form.setValue('code', value)
      if (value.length === 6) {
        handleSubmit({ code: value })
      }
    },
    [form, handleSubmit],
  )

  useEffect(() => {
    if (code) {
      form.setValue('code', code)
      handleSubmit({ code })
    }
  }, [code, form, handleSubmit])

  return (
    <div className="flex flex-col gap-7">
      <div>
        <div className="flex gap-2 items-center">
          <Button variant="ghost" asChild>
            <a href="/signup">
              <ArrowLeft />
            </a>
          </Button>
          <h1 className="font-semibold text-3xl ">Verify Your Account</h1>
        </div>
        <p className="text-sm text-light">
          {email
            ? `We've sent a 6-digit code to ${email}`
            : 'Please enter the 6-digit code sent to your email'}
        </p>
      </div>
      {isVerified ? (
        <div className="text-center">
          <p className="text-green-600 font-semibold mb-4">
            Your account has been successfully verified!
          </p>
          <p>You will be redirected to the login page shortly.</p>
          <a
            href="/login"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Click here to login if not redirected automatically
          </a>
        </div>
      ) : (
        <FormBase
          form={form}
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-7"
        >
          <FormField name="code" label="One-Time Password" form={form}>
            {(field) => (
              <div className="flex items-center gap-2">
                <CustomOTP
                  value={field.value}
                  onChange={handleOtpChange}
                  length={6}
                  showSeparator
                  separatorAfter={[2]}
                  disabled={isVerifying}
                />
                {isVerifying && (
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                )}
              </div>
            )}
          </FormField>
          <Button type="submit" disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Verify Account'}
          </Button>
        </FormBase>
      )}
    </div>
  )
}
