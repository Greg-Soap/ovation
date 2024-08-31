'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Google from '@/public/assets/images/ovationAuthGoogle'
import Ether from '@/public/assets/images/ovationAuthEthereum'
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
import { useGoogleLogin } from '@react-oauth/google'
import { decodeIdToken } from '@/lib/helper-func'

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
    router.push('/apps/discover')
  }

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  })

  const handleSuccess = async (response: any) => {
    const { credential } = response
    if (!credential) {
      return
    }

    try {
      const userInfo = decodeIdToken(credential)
      console.log('User Info:', userInfo)
    } catch (error) {
      console.error('Error decoding ID token:', error)
    }
  }

  const handleError = (error: any) => {
    console.error('Login Failed:', error)
  }

  return (
    <div className='flex flex-col gap-11'>
      <div id='login__header'>
        <h1 className='text-3xl font-semibold text-white'>Login</h1>
        <p className='text-sm'> Hi, Welcome back ✋</p>
      </div>
      <div className='  flex justify-between mb-4'>
        <Button className='text-[10px] font-semibold p-4 md:text-base w-[48%] bg-white flex gap-4'>
          <Ether />
          <p>Login with Wallet</p>
        </Button>

        <Button
          onClick={loginGoogle}
          className='p-4 text-[10px] font-semibold md:text-base w-[48%] bg-white flex gap-4'>
          <Google />
          <p>Login with Google</p>
        </Button>
      </div>
      <div id='login__connect-wallet' className='flex flex-col gap-4'>
        <span className='flex gap-2 items-center justify-center'>
          <span className='w-[47%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]  text-[#C1C0C6]' />
          <p className='text-[10px] font-medium text-[#C1C0C6] text-center'>OR</p>
          <span className='w-[47%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]' />
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className='flex flex-col gap-6'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder='Username101'
                    className=' h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='text'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='flex flex-col end-0'>
                <FormLabel>Password</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder='Enter your password'
                    className=' h-[46px]  border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='password'
                  />
                </FormControl>
                <FormMessage className=' ml-auto w-fit'>
                  <Link href='/forgot-password' className='text-[#CFF073]'>
                    Forgot Password
                  </Link>
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            className='w-full hover:scale-105 h-[52px] text-sm font-semibold'
            variant={'default'}>
            Login
          </Button>
        </form>

        <div className='flex items-center justify-center w-full text-xs'>
          <p>
            {' '}
            Not registered yet?{' '}
            <Link href='/create-account' className=' text-[#CFF073]'>
              Create Account
            </Link>{' '}
          </p>
          <Image alt='arrow' src={arrow} />
        </div>
      </Form>
    </div>
  )
}

// {
//   "iss": "https://accounts.google.com",
//   "azp": "200915400648-d5tpcs81rgjoqgac6idku39bi1dd5ga6.apps.googleusercontent.com",
//   "aud": "200915400648-d5tpcs81rgjoqgac6idku39bi1dd5ga6.apps.googleusercontent.com",
//   "sub": "116548347670545315155",
//   "hd": "ovation.network",
//   "email": "no-reply@ovation.network",
//   "email_verified": true,
//   "nbf": 1724760237,
//   "name": "No Reply",
//   "picture": "https://lh3.googleusercontent.com/a/ACg8ocJA5hRpUGFRgfus3B7eYUPZGh7tmP50LHlnzyCVLPYJAAlsOd8=s96-c",
//   "given_name": "No",
//   "family_name": "Reply",
//   "iat": 1724760537,
//   "exp": 1724764137,
//   "jti": "4d4c4a63cca179a117ae930be1ad0e5cfd96f542"
// }
