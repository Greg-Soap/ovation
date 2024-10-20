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
import { useEffect, useState, useCallback, useRef } from 'react'
import { useAnchorNavigation } from '@/lib/use-navigation'
import { toast } from 'sonner'
import { setToken } from '@/lib/cookies'
import { useAppStore } from '@/store/use-app-store'
import MiniLoader from '@/components/mini-loader'

const formSchema = z.object({
  code: z.string().length(6, 'OTP must be 6 digits'),
})

export default function VerifyAccountPage() {
  const searchParams = useSearchParams()
  const navigateTo = useAnchorNavigation()
  const email = searchParams.get('email')
  const code = searchParams.get('code')
  const [isVerified, setIsVerified] = useState(false)
  const otpVerified = useRef(false)

  const { setUser } = useAppStore()

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: () =>
      ovationService.verifyAccount(email as string, code as string),
    onSuccess: async (data) => {
      setToken(data?.data?.token)
      setUser(data?.data?.userData)

      toast.success('Verification successful, welcome!')
      setIsVerified(true)
      setTimeout(() => {
        navigateTo('/discover')
      }, 3000)
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          'An error occurred while verifying your account!',
      )
    },
  })

  useEffect(() => {
    if (code && email && !otpVerified.current) {
      verifyOtp()
      otpVerified.current = true
    }
  }, [])

  return (
    <div
      className="flex justify-center items-center"
      style={{ flexDirection: 'column' }}
    >
      <div>
        <div className="flex gap-2 items-center justify-center">
          {/* <Button variant="ghost" asChild>
            <a href="/signup">
              <ArrowLeft />
            </a>
          </Button> */}
          <h1 className="font-semibold text-3xl mb-[30px]">
            Verify Your Account
          </h1>
        </div>

        <p className="text-sm text-light text-center mb-[5px]">
          Please wait while we try to verify your account
        </p>

        <p className="mb-10">
          You will be redirected shortly immediately after verification.
        </p>
      </div>
      {false && (
        <div className="text-center">
          <a
            href="/login"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Click here to login if not redirected automatically
          </a>
        </div>
      )}

      {!isVerifying && !isVerified ? (
        <Button onClick={() => verifyOtp} disabled={isVerifying}>
          Retry Verification
        </Button>
      ) : null}
      {isVerifying && <MiniLoader size="average" />}
    </div>
  )
}
