'use client'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Google from '@/public/assets/images/ovationAuthGoogle'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import arrow from '@/public/assets/images/arrow-right.png'
import Image from 'next/image'
import { useGoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { setToken } from '@/lib/cookies'
import PasswordInput from '@/components/password-input'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { useAnchorNavigation } from '@/lib/use-navigation'
import { signInOrSignUp } from '@/lib/firebaseAuthService'
import { useAppStore } from '@/store/use-app-store'

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
})

export default function LoginForm() {
  const navigateTo = useAnchorNavigation()
  const { setUser } = useAppStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: ovationService.login,
    onSuccess: async (data) => {
      if (data?.data?.token) {
        setToken(data?.data?.token)
        setUser(data?.data?.userData)

        toast.success('Login successful!')
        await signInOrSignUp(data?.data?.userData)

        // Check for stored destination
        const intendedDestination = localStorage.getItem('intendedDestination')
        if (intendedDestination) {
          localStorage.removeItem('intendedDestination')
          navigateTo(intendedDestination)
        } else {
          navigateTo('/discover')
        }
      } else {
        toast.error('Login failed: No token received')
      }
    },
    onError: (error) => {
      //@ts-ignore
      toast.error(`Login failed: ${error.response?.data?.message}`)
    },
  })

  function formSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values)
  }

  const { mutate: loginG } = useMutation({
    mutationFn: (code: string) => ovationService.loginGoogle(code),
    onSuccess: (data) => {
      if (data?.data?.token) {
        setToken(data?.data?.token)
        setUser(data?.data?.userData)

        toast.success('Login successful!')
        navigateTo('/discover')
      } else {
        toast.error('Login failed: No token received')
      }
    },
    onError: (error) => {
      console.error('Google login error:', error)
      toast.error('Google login failed. Please try again.')
    },
  })

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        // console.log(codeResponse.code)
        loginG(codeResponse.code)
      } catch (error) {
        console.error('Google login failed:', error)
        toast.error('Google login failed. Please try again.')
      }
    },
    onError: (error) => {
      console.error('Google login error:', error)
      toast.error('Google login failed. Please try again.')
    },
    flow: 'auth-code',
  })

  return (
    <div className="flex flex-col gap-11">
      <div id="login__header">
        <h1 className="text-3xl font-semibold ">Login</h1>
        <p className="text-sm text-light mt-1"> Hi, Welcome back ✋</p>
      </div>
      {/* TODO: Add Google Login */}
      {/* <div className="  flex justify-between mb-4">
        <Button
          onClick={loginGoogle}
          className="p-4 text-[10px] font-semibold md:text-base w-full bg-white flex gap-4"
        >
          <Google />
          <p>Login with Google</p>
        </Button>
      </div> */}
      {/* <div id="login__connect-wallet" className="flex flex-col gap-4">
        <span className="flex gap-2 items-center justify-center">
          <span className="w-[47%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]  text-[#C1C0C6]" />
          <p className="text-[10px] font-medium text-[#C1C0C6] text-center">
            OR
          </p>
          <span className="w-[47%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]" />
        </span>
      </div> */}
      <FormBase form={form} onSubmit={formSubmit}>
        <FormField name="userId" form={form} label="Username">
          {(field) => (
            <Input
              placeholder="Username101"
              type="text"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormField>
        <FormField name="password" form={form} label="Password" showMessage>
          {(field) => (
            <div className="flex flex-col gap-1">
              <PasswordInput
                placeholder="Enter your password"
                value={field.value}
                onChange={field.onChange}
              />
              <a
                href="/forgot-password"
                className="text-primary self-end  text-xs"
              >
                Forgot Password
              </a>
            </div>
          )}
        </FormField>

        <Button
          className="w-full hover:scale-105 h-[52px] text-sm font-semibold"
          variant={'default'}
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </Button>

        <div className="flex items-center justify-center w-full text-xs">
          <p className="flex items-center gap-1">
            Not registered yet?
            <a href="/create-account" className=" text-primary">
              Create Account
            </a>
          </p>
          <Image alt="arrow" src={arrow} />
        </div>
      </FormBase>
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
