'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { object, z } from 'zod'
import PathICon from '@/components/icons/pathIcon'
import { ChevronRight, AlertCircle } from 'lucide-react'
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
import { useEffect, useState } from 'react'
import WalletConnectComponent from './WalletConnectComponent'
import ovationService from '@/services/ovation.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import arrow from '@/public/assets/images/arrow-right.png'
import { setToken } from '@/lib/cookies'
import { useLocalStorage } from '@/lib/use-local-storage'
import type { UserData } from '@/models/all.model'
import { signUp } from '@/lib/firebaseAuthService'
import Link from 'next/link'
import Image from 'next/image'
import Google from '@/public/assets/images/ovationAuthGoogle'
import { useGoogleLogin } from '@react-oauth/google'
import RenderWalletAndConfirmation from './manual-wallect'
import PasswordInput from '@/components/password-input'

const formSchema = z.object({
  personalInfo: z.object({
    displayName: z.string(),
    email: z.string().email('Input a valid email address'),
    username: z
      .string()
      .regex(/^\S+$/, 'Username must be a single word without spaces'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
  }),
  userPath: z.object({
    pathId: z.string().uuid(),
  }),
  userWallet: z.object({
    walletAddress: z.string(),
    walletTypeId: z.string().uuid().nullable(),
    chain: z.string(),
    metadata: z.string().nullable(),
  }),
  type: z.enum(['Normal', 'Google']),
})

interface Props {
  setOptionalLeft: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AccountForm({ setOptionalLeft }: Props) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [active, setActive] = useState('')
  const [isManualWallet, setIsManualWallet] = useState(true)

  const { setValue } = useLocalStorage<UserData | null>('userData', null)

  const { storedValue: draft, setValue: setDraft } = useLocalStorage<
    Partial<z.infer<typeof formSchema>>
  >('accountDraft', {})

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        displayName: draft.personalInfo?.displayName || '',
        email: draft.personalInfo?.email || '',
        username: draft.personalInfo?.username || '',
        password: draft.personalInfo?.password || '',
      },
      userPath: {
        pathId: draft.userPath?.pathId || '',
      },
      userWallet: {
        walletAddress: draft.userWallet?.walletAddress || '',
        walletTypeId: draft.userWallet?.walletTypeId || null,
        chain: draft.userWallet?.chain || '',
        metadata: draft.userWallet?.metadata || null,
      },
      type: draft.type || 'Normal',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      setDraft(value as Partial<z.infer<typeof formSchema>>)
    })
    return () => subscription.unsubscribe()
  }, [form, setDraft])

  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: ovationService.register,
    onSuccess: async (data) => {
      setToken(data.data?.token)
      setValue(data.data?.userData)

      await signUp(data.data?.userData) // for firebase

      toast.success('Profile created successfully')
      setDraft({}) // Clear the draft
      router.push('/apps/discover')
    },
    onError: (error) => {
      console.log(error)
      // @ts-ignore
      toast.error(error.response.data.message)
    },
  })

  useEffect(() => {
    if (page === 1) {
      setOptionalLeft(true)
    } else {
      setOptionalLeft(false)
    }
  }, [page, setOptionalLeft])

  const { data: pathOptions } = useQuery({
    queryKey: ['path'],
    queryFn: () => ovationService.getPath(),
  })

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  })

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    createAccount(data)
  }

  const formErrors = form.formState.errors

  function startCase(str: string): string {
    return str
      .split('.')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  function renderErrorSummary() {
    const errorCount = Object.keys(form.formState.errors).length
    if (errorCount === 0) return null

    function getNestedErrors(
      errors: any,
      prefix = '',
    ): Array<[string, string]> {
      return Object.entries(errors).flatMap(([key, value]) => {
        if (value && typeof value === 'object' && 'message' in value) {
          return [[`${prefix}${key}`, value.message as string]]
        }
        if (value && typeof value === 'object') {
          return getNestedErrors(value, `${prefix}${key}.`)
        }
        return []
      })
    }

    const allErrors = getNestedErrors(form.formState.errors)

    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="font-bold">
            {errorCount} error{errorCount > 1 ? 's' : ''} in the form
          </span>
        </div>
        <ul className="list-disc list-inside mt-2">
          {allErrors.map(([field, message]) => (
            <li key={field}>
              {startCase(field)}: {message}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  function renderPersonalInfoForm() {
    return (
      <form
        onSubmit={form.handleSubmit(() => {
          setPage(2)
        })}
        className="flex flex-col gap-7"
      >
        {/* <div className="  flex justify-between mb-4">
          <Button
            onClick={loginGoogle}
            className="p-4 text-[10px] font-semibold md:text-base w-full bg-white flex gap-4"
          >
            <Google />
            <p>Login with Google</p>
          </Button>
        </div> */}
        {/* <div className="flex items-center justify-between mb-5">
          <span className="w-[46%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]  text-[#C1C0C6]" />
          <p className="text-[10px] font-medium text-[#C1C0C6]">OR</p>
          <span className="w-[46%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]" />
        </div> */}
        <FormField
          control={form.control}
          name="personalInfo.displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                  placeholder="kvngCZ"
                  type="text"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personalInfo.username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                  placeholder="chang_zhao"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personalInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                  placeholder="cz@blockchain.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personalInfo.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-[#B3B3B3] mt-2">
                Password must be at least 8 characters long and contain at least
                one uppercase letter, one lowercase letter, one number, and one
                special character.
              </p>
            </FormItem>
          )}
        />
        <Button
          onClick={() => setPage(2)}
          className="w-full h-[52px] hover:scale-95 text-sm font-semibold"
        >
          Continue
        </Button>
        <div className="flex items-center justify-center w-full text-xs">
          <p>
            {' '}
            Already have an account?{' '}
            <Link href="/login" className=" text-[#CFF073]">
              Login
            </Link>{' '}
          </p>
          <Image alt="arrow" src={arrow} />
        </div>
      </form>
    )
  }

  function renderPathSelection() {
    const pathColors = ['#cff073', '#EF91FF', '#FF9B02', '#0094FF']
    const pathBackgrounds = ['#283502', '#42044C', '#2F2009', '#0B293F']

    function handleButtonClick(pathId: string) {
      form.setValue('userPath.pathId', pathId)
      setActive(pathId)
    }

    return (
      <form
        onSubmit={form.handleSubmit(() => setPage(3))}
        className="flex flex-col gap-7"
      >
        <FormField
          control={form.control}
          name="userPath.pathId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col md:flex-row items-center flex-wrap w-full gap-4">
                  {pathOptions?.data?.data?.length === 0 && (
                    <p>No path options available</p>
                  )}
                  {pathOptions?.data?.data?.map((option, index) => (
                    <Button
                      key={option.pathId}
                      onClick={() => handleButtonClick(option.pathId)}
                      type="button"
                      className={`${
                        active === option.pathId
                          ? `border-[${pathColors[index % 4]}] scale-95 shadow-lg`
                          : 'border-[#353538]'
                      } h-[234px] hover:scale-95 max-w-[242px] bg-transparent border-[1px] flex flex-col gap-2 rounded-lg`}
                    >
                      <span
                        className={`rounded-full mb-5 w-9 h-9 bg-[${pathBackgrounds[index % 4]}] items-center flex justify-center`}
                      >
                        <PathICon strokeLine={pathColors[index % 4]} />
                      </span>
                      <h3 className="font-semibold text-sm text-white">
                        {option.name.toUpperCase()}
                      </h3>
                      <p className="text-[11px] text-wrap text-[#B3B3B3]">
                        {option.description}
                      </p>
                    </Button>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="hover:scale-95 w-full h-[52px] text-sm font-semibold"
        >
          Continue
        </Button>
      </form>
    )
  }

  function renderWalletSelection() {
    return (
      <WalletConnectComponent
        setIsManualWallet={setIsManualWallet}
        onWalletConnected={(account) => {
          form.setValue('userWallet.walletAddress', account)
          setPage(4)
        }}
        onWalletDisconnected={() => {
          /* Handle disconnection */
        }}
      />
    )
  }

  function renderCurrentForm() {
    switch (page) {
      case 1:
        return renderPersonalInfoForm()
      case 2:
        return renderPathSelection()
      case 3:
        return (
          isManualWallet && (
            <RenderWalletAndConfirmation
              form={form}
              handleFormSubmit={handleFormSubmit}
              isPending={isPending}
            />
          )
        )
      // : renderWalletSelection()
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-11">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-white items-center justify-between  flex">
            <span> Create Account</span>
          </h1>
          <div className="flex gap-1 items-center justify-start">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`${page >= 1 ? 'text-[#E6E6E6] font-semibold' : ''} text-xs md:text-base  text-center flex gap-0 w-fit cursor-pointer`}
            >
              Personal info
            </button>
            <ChevronRight color="#cff073" height={'14px'} width={'14px'} />
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`${page >= 2 ? 'text-[#E6E6E6] font-semibold' : ''} text-xs md:text-base  cursor-pointer`}
            >
              Choose path
            </button>
            <ChevronRight color="#cff073" height={'14px'} width={'14px'} />
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`${page >= 3 ? 'text-[#E6E6E6] font-semibold' : ''} text-xs md:text-base  cursor-pointer`}
            >
              Connect wallet
            </button>
            <ChevronRight color="#cff073" height={'14px'} width={'14px'} />
          </div>
        </div>
      </div>
      <Form {...form}>
        {renderErrorSummary()}
        {renderCurrentForm()}
      </Form>
    </div>
  )
}
