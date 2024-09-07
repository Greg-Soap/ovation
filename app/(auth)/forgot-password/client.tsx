'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import CompleteIcon from '@/public/assets/images/ovationAuthCompleteIcon'
import ovationService from '@/services/ovation.service'

const formSchema = z
  .object({
    email: z.string().email('Input a valid email address'),
    otp: z.string().length(6, 'OTP must be 6 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })

export default function ResetForm() {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const [userId, setUserId] = useState<string>('')
  const [serverOtp, setServerOtp] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const emailMutation = useMutation({
    mutationFn: (email: string) => ovationService.forgotPassword(email),
    onSuccess: (data) => {
      toast.success('OTP sent successfully!')
      setUserId(data.data.userId)
      setServerOtp(data.data.otp)
      setPage(2)
    },
    onError: () => {
      toast.error('Failed to send OTP. Please try again.')
    },
  })

  const passwordMutation = useMutation({
    mutationFn: (data: { userId: string; password: string }) =>
      ovationService.changePassword(data.userId, data.password),
    onSuccess: () => {
      toast.success('Password changed successfully!')
      setPage(4)
    },
    onError: () => {
      toast.error('Failed to change password. Please try again.')
    },
  })

  function handleEmailSubmit(data: z.infer<typeof formSchema>) {
    emailMutation.mutate(data.email)
  }

  function handleOtpSubmit(data: z.infer<typeof formSchema>) {
    if (data.otp === serverOtp) {
      setPage(3)
    } else {
      toast.error('Invalid OTP. Please try again.')
    }
  }

  function handlePasswordSubmit(data: z.infer<typeof formSchema>) {
    passwordMutation.mutate({ userId, password: data.password })
  }

  function renderForm1() {
    return (
      <div className='flex flex-col gap-7'>
        <div>
          <h1 className='font-semibold text-3xl text-white'>Forgot password?</h1>
          <p className='text-sm'>Enter your email to receive a verification pin</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEmailSubmit)} className='flex flex-col gap-7'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white text-sm'>Email address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                      placeholder='btcoverfiat@degen.eth'
                      type='email'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit' className='hover:bg-white text-sm font-semibold h-[52px] w-full'>
              Send confirmation pin
            </Button>
          </form>
        </Form>
      </div>
    )
  }

  function renderForm2() {
    return (
      <div className='flex flex-col gap-11'>
        <div>
          <h1 className='font-semibold text-3xl text-white'>Enter Pin</h1>
          <p className='text-sm'>Enter the 6-digit verification pin sent to your email address</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOtpSubmit)} className='flex flex-col gap-7'>
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm text-white'>Input OTP</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup className='w-full flex md:gap-4 gap-2'>
                          {slots.map((slot, index) => (
                            <InputOTPSlot
                              index={index}
                              key={index}
                              {...slot}
                              className='border-[1px] border-[#353538] rounded-lg w-16 h-16'
                            />
                          ))}
                        </InputOTPGroup>
                      )}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit' className='hover:bg-white text-sm font-semibold h-[52px] w-full'>
              Continue
            </Button>
          </form>
        </Form>
      </div>
    )
  }

  function renderForm3() {
    return (
      <div className='flex flex-col gap-7'>
        <div>
          <h1 className='font-semibold text-3xl text-white'>Enter new password</h1>
          <p className='text-sm'>Choose a new password for your account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePasswordSubmit)} className='flex flex-col gap-6'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter your new password'
                      className='h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                      type='password'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordConfirm'
              render={({ field }) => (
                <FormItem className='flex flex-col end-0'>
                  <FormLabel>Retype Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Re-type your password'
                      className='h-[46px] border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                      type='password'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit' className='hover:bg-white text-sm font-semibold h-[52px] w-full'>
              Continue
            </Button>
          </form>
        </Form>
      </div>
    )
  }

  function renderSuccess() {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-6'>
        <div className='w-16 h-16 rounded-full bg-[#333726] flex items-center justify-center'>
          <CompleteIcon />
        </div>
        <div className='w-full text-white flex flex-col items-center justify-center'>
          <h1 className='font-semibold text-3xl'>Success</h1>
          <p className='text-[#B3B3B3] text-sm'>
            Your password has been updated you can now login again
          </p>
        </div>
        <Button className='w-full h-[53px] font-semibold text-sm'>
          <Link className='w-full' href={'/login'}>
            Back to Login
          </Link>
        </Button>
      </div>
    )
  }

  function renderCurrentForm() {
    switch (page) {
      case 1:
        return renderForm1()
      case 2:
        return renderForm2()
      case 3:
        return renderForm3()
      case 4:
        return renderSuccess()
      default:
        return renderForm1()
    }
  }

  return <>{renderCurrentForm()}</>
}
