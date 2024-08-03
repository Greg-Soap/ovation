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
import arrow from '@/public/assets/images/arrow-right.png'
import Image from 'next/image'
const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export default function LoginForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function formSubmit() {
    console.log('submitted')
    toast.success('Successful!')
    router.push('/apps/timeline')
  }

  return (
    <div className="flex flex-col gap-11">
      <div id="login__header">
        <h1 className="text-3xl font-semibold text-white">Login</h1>
        <p className="text-sm"> Hi, Welcome back ✋</p>
      </div>
      <div id="login__connect-wallet" className="flex flex-col gap-4">
        <Button className="bg-white w-full hover:scale-105">
          Connect your wallet
        </Button>
        <span className="flex gap-2 items-center justify-center">
          <span className="w-1/3 h-[1px] border-[#C1C0C6] border-b-0 border-[1px]  text-[#C1C0C6]" />
          <p className="text-[10px] font-medium text-[#C1C0C6]">
            OR LOGIN WITH USERNAME
          </p>
          <span className="w-1/3 h-[1px] border-[#C1C0C6] border-b-0 border-[1px]" />
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder="Username101"
                    className=" h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col end-0">
                <FormLabel>Password</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder="Enter your password"
                    className=" h-[46px]  border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    type="password"
                  />
                </FormControl>
                <FormMessage className=" ml-auto w-fit">
                  <Link href="/forgot-password" className="text-[#CFF073]">
                    Forgot Password
                  </Link>
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            className="w-full hover:scale-105 h-[52px] text-sm font-semibold"
            variant={'default'}
          >
            Login
          </Button>
        </form>

        <div className="flex items-center justify-center w-full text-xs">
          <p>
            {' '}
            Not registered yet?{' '}
            <Link href="/create-account" className=" text-[#CFF073]">
              Create Account
            </Link>{' '}
          </p>
          <Image alt="arrow" src={arrow} />
        </div>
      </Form>
    </div>
  )
}
