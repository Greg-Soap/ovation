'use client'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import arrow from '@/public/assets/images/arrow-right.png'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { setToken } from '@/lib/cookies'
import PasswordInput from '@/components/password-input'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { useAnchorNavigation } from '@/lib/use-navigation'
import { signInOrSignUp } from '@/lib/firebaseAuthService'
import { useAppStore } from '@/store/use-app-store'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { decodeIdToken } from '@/lib/helper-func'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
})

export default function LoginForm() {
  const navigateTo = useAnchorNavigation()
  const { setUser } = useAppStore()
  const [googleLoginInfo, setGoogleLoginInfo] = useState(null as any)
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

        // await signInOrSignUp(data?.data?.userData)
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
    mutationFn: (email: string) => ovationService.loginGoogle(email),
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
    onError: (error: any) => {
      console.error('Google login error:', error)
      toast.error(
        error?.response?.data?.message == 'Authentication failed!'
          ? "Email doesn't exist, please sign up!"
          : error?.response?.data?.message,
      )
    },
  })

  // const loginGoogle = useGoogleLogin({
  //   onSuccess: async (codeResponse) => {
  //     try {
  //       // console.log(codeResponse.code)
  //       loginG(codeResponse.code)
  //     } catch (error) {
  //       console.error('Google login failed:', error)
  //       toast.error('Google login failed. Please try again.')
  //     }
  //   },
  //   onError: (error) => {
  //     console.error('Google login error:', error)
  //     toast.error('Google login failed. Please try again.')
  //   },
  //   flow: 'auth-code',
  // })

  const handleSuccess = async (response: any) => {
    // Extract access token from response
    const { credential } = response
    if (!credential) {
      //handle no credentials
      return
    }

    try {
      const userInfo = decodeIdToken(credential)
      window.localStorage.setItem(
        'google_info',
        JSON.stringify({
          email: userInfo.email,
          name: userInfo.name,
          profile: userInfo.picture,
        }) as string,
      )
      console.log(userInfo.email)
      loginG(userInfo.email)
      // Handle user info and perform authentication to check if user already exist in the api
    } catch (error) {
      console.error('Error decoding ID token:', error)
    }
  }

  useEffect(() => {
    const getInfo = () => {
      const googleInfo = window.localStorage.getItem('google_info')
      if (googleInfo) {
        setGoogleLoginInfo(JSON.parse(googleInfo))
      }
    }
    getInfo()
  }, [])

  const handleError = (error: any) => {
    console.error('Login Failed:', error)
  }

  return (
    <div className="flex flex-col">
      <div id="login__header ">
        <h1 className="text-3xl font-semibold ">Login</h1>
        <p className="text-sm text-light mt-1 mb-[45px]">
          {' '}
          Hi, Welcome back ✋
        </p>
      </div>
      <div className="  flex justify-between mb-4">
        <div
          className="px-4 h-[51.31px] text-[10px] md:text-base w-full bg-white  flex gap-4 w-[262px] flex justify-center items-center cursor-pointer"
          style={{
            borderRadius: '500px',
            justifyContent: !googleLoginInfo ? 'center' : 'flex-start',
            display: 'flex',
          }}
        >
          <div style={{ position: 'absolute', opacity: '0' }}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              size="large"
            />
          </div>
          {googleLoginInfo ? (
            <div className="flex">
              <img
                src={googleLoginInfo?.profile}
                alt="profile"
                className="w-[30px] h-[30px] mr-[10px]"
                style={{ borderRadius: '50%' }}
              />
              <div>
                <p className="text-xs text-black">
                  sign in as {googleLoginInfo?.name?.slice(0, 20)}.
                </p>
                <p className="text-xs text-black">{googleLoginInfo?.email}</p>
              </div>
            </div>
          ) : (
            <>
              <img
                src={
                  'https://s3-alpha-sig.figma.com/img/8f71/8a60/1dbc390743f14ffcef03171fdfb2b6a9?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QEDsaHq86w8cJI4Ngk6tIa~Q5Fm-gXDEoEy~Z7EZ1fL3S2t7t8lQxfaI5zJBhpzWp0~AXii~qooMwex0CSA6IpfjwHqzfr-AK~DJ~C5NIn4nX86z814KHI9mrUZteozyB~xMNyo9ZBG~UT1tVggZeUu8OKhM9IN-jDb4svXISdBxcMdedKjlen75nMsColgktPY-gLV3w80xO0YIu6DFZw8aG8nnNgRPRqNytUjFINH~R8AVK~KZLBruA~jg~8xiZ31TyrtaRlx0JuWz-suw1BxJz0h0HDbYLn-7XJz~6ExhYe8ubidm0BhY9SeaIiHCNbhZdkAmulHAtCZNAYycQA__'
                }
                alt=""
                className="w-[21px] h-[20px]"
              />
              <p className="text-xs text-black">Login with Google</p>
            </>
          )}
        </div>
      </div>
      <div id="login__connect-wallet" className="flex flex-col gap-4 mb-[45px]">
        <span className="flex gap-2 items-center justify-center">
          <span className="w-[45%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]  text-[#C1C0C6]" />
          <p className="text-[10px] font-medium text-[#C1C0C6] text-center">
            OR
          </p>
          <span className="w-[47%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]" />
        </span>
      </div>
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
