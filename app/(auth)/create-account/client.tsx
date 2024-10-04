'use client'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import React, { useEffect, useState } from 'react'
import WalletConnectComponent from './_components/wallet-connect-component'
import ovationService from '@/services/ovation.service'
import { useMutation } from '@tanstack/react-query'
import { setToken } from '@/lib/cookies'
import { useLocalStorage } from '@/lib/use-local-storage'
import type { UserData } from '@/models/all.model'
import { signUp } from '@/lib/firebaseAuthService'
import { useGoogleLogin } from '@react-oauth/google'
import RenderWalletAndConfirmation from './_components/manual-wallect'
import PersonalInfoForm from './_components/personal-form-section'
import PathSelection from './_components/path-selection'
import FormErrorSummary from './_components/form-error-summary'
import { Form } from '@/components/ui/form'

const formSchema = z.object({
  personalInfo: z.object({
    displayName: z.string(),
    email: z.string().email('Input a valid email address'),
    username: z
      .string()
      .regex(/^\S+$/, 'Username must be a single word without spaces'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
  userPath: z.object({
    pathId: z.string().uuid(),
  }),
  userWallet: z
    .object({
      walletAddress: z.string(),
      walletTypeId: z.string().uuid().nullable(),
      chain: z.string(),
      metadata: z.string().nullable(),
    })
    .nullable(),
  type: z.enum(['Normal', 'Google']),
})

interface Props {
  setOptionalLeft: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AccountForm({ setOptionalLeft }: Props) {
  const router = useRouter()
  const [page, setPage] = useState(1)

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

      toast.success('Profile created successfully')
      await signUp(data.data?.userData) // for firebase
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

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  })

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    createAccount(data)
  }

  function renderCurrentForm() {
    switch (page) {
      case 1:
        return <PersonalInfoForm setPage={setPage} />
      case 2:
        return <PathSelection form={form} setPage={setPage} />
      case 3:
        return isManualWallet ? (
          <RenderWalletAndConfirmation
            form={form}
            handleFormSubmit={handleFormSubmit}
            isPending={isPending}
          />
        ) : (
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
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Create Account</h1>
        <nav
          aria-label="Account creation steps"
          className="flex flex-wrap items-center gap-2 text-sm md:text-base"
        >
          {[
            { label: 'Personal info', step: 1 },
            { label: 'Choose path', step: 2 },
            { label: 'Connect wallet', step: 3 },
          ].map((item, index) => (
            <React.Fragment key={item.step}>
              <button
                type="button"
                onClick={() => setPage(item.step)}
                className={`transition-colors duration-200 ${
                  page >= item.step
                    ? 'text-white font-semibold'
                    : 'text-gray-400'
                } hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded`}
              >
                {item.label}
              </button>
              {index < 2 && (
                <ChevronRight
                  className="text-[#cff073] h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      <Form {...form}>
        <FormErrorSummary form={form} />
        {renderCurrentForm()}
      </Form>
    </div>
  )
}
