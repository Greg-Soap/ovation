'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'
import arrow from '@/public/assets/images/arrow-right.svg'
import Image from 'next/image'
import { useState } from 'react'
import completeIcon from '@/public/assets/images/ovationAuthCompleteIcon.svg'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'

const formSchema = z.object({
  email: z.string().email('Input a valid email address'),
  otp: z.number(),
  password: z.string(),
  passwordConfirm: z.string(),
})

export default function ResetForm() {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function formSubmit() {
    console.log('submitted')
    toast.success('successful!')
  }

  function renderForm1() {
    return (
      <div className="flex flex-col gap-7">
        <div>
          <h1 className="font-semibold text-3xl text-white">
            Forgot password?
          </h1>
          <p className="text-sm">
            Enter your email to recieve a verification pin
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(formSubmit)}
          className="flex flex-col gap-7"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-sm">
                  Email address
                </FormLabel>
                <FormControl {...field}>
                  <Input
                    className="h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    placeholder="btcoverfiat@degen.eth"
                    type="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            onClick={() => {
              setPage(2)
            }}
            type="submit"
            className=" hover:bg-white text-sm font-semibold h-[52px] w-full"
          >
            Send confirmation pin
          </Button>
        </form>
      </div>
    )
  }

  function renderForm2() {
    return (
      <div className="flex flex-col gap-11">
        <div>
          <h1 className="font-semibold text-3xl text-white">Enter Pin</h1>
          <p className="text-sm">
            Enter the 6-digit verification pin sent to your email address to
            recieve a password
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(formSubmit)}
          className="flex flex-col gap-7"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-white">Input OTP</FormLabel>
                <FormControl {...field}>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup className="flex gap-4">
                      <InputOTPSlot
                        className="border-[1px] border-[#353538] rounded-lg w-16 h-16"
                        index={0}
                      />

                      <InputOTPSlot
                        className="border-[1px] border-[#353538] rounded-lg w-16 h-16"
                        index={1}
                      />

                      <InputOTPSlot
                        className="border-[1px] border-[#353538] rounded-lg w-16 h-16"
                        index={2}
                      />
                      <InputOTPSeparator />

                      <InputOTPSlot
                        className="border-[1px] border-[#353538] rounded-lg w-16 h-16"
                        index={3}
                      />

                      <InputOTPSlot
                        className="border-[1px] border-[#353538] rounded-lg w-16 h-16"
                        index={4}
                      />

                      <InputOTPSlot
                        className="border-[1px] border-[#353538] rounded-lg w-16 h-16"
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            onClick={() => {
              setPage(3)
            }}
            type="submit"
            className=" hover:bg-white text-sm font-semibold h-[52px] w-full"
          >
            Continue
          </Button>
        </form>
      </div>
    )
  }

  function renderForm3() {
    return (
      <div className="flex flex-col gap-7">
        <div>
          <h1 className="font-semibold text-3xl text-white">
            Enter new password?
          </h1>
          <p className="text-sm">Choose a new password for your account</p>
        </div>
        <form
          onSubmit={form.handleSubmit(formSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder="Enter your new password"
                    className="h-[46px]  bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem className="flex flex-col end-0">
                <FormLabel>Retype Password</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder="Re-type your password"
                    className="h-[46px]   border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            onClick={() => {
              setPage(4)
            }}
            type="submit"
            className=" hover:bg-white text-sm font-semibold h-[52px] w-full"
          >
            Continue
          </Button>
        </form>
      </div>
    )
  }

  function renderSuccess() {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#333726] flex items-center justify-center">
          <Image src={completeIcon} alt="success icon" />
        </div>
        <div className="w-full text-white flex flex-col items-center justify-center ">
          <h1 className="font-semibold text-3xl">Success</h1>
          <p className="text-[#B3B3B3] text-sm">
            Your password has been updated you can now login again
          </p>
        </div>
        <Button className="w-full h-[53px] font-semibold text-sm">
          <Link className="w-full" href={'/login'}>
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

  return <Form {...form}>{renderCurrentForm()}</Form>
}
