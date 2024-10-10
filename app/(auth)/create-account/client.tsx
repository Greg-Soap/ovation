'use client'
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
import { signUp } from '@/lib/firebaseAuthService'
import { useGoogleLogin } from '@react-oauth/google'
import RenderWalletAndConfirmation from './_components/manual-wallect'
import PersonalInfoForm from './_components/personal-form-section'
import PathSelection from './_components/path-selection'
import FormErrorSummary from './_components/form-error-summary'
import { Form } from '@/components/ui/form'
import { useAnchorNavigation } from '@/lib/use-navigation'
import { useAppStore } from '@/store/use-app-store'
import WalletConnectionChoice from './_components/wallet-connection-choice'

const formSchema = z.object({
  personalInfo: z.object({
    displayName: z.string().min(1, 'Please enter your display name'),
    email: z.string().email('Please enter a valid email address'),
    username: z
      .string()
      .min(1, 'Username is required')
      .regex(/^\S+$/, 'Username should be a single word without spaces'),
    password: z
      .string()
      .min(8, 'Password should be at least 8 characters long')
      .regex(/[A-Z]/, 'Password should contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password should contain at least one lowercase letter'),
  }),
  userPath: z.object({
    pathId: z.string().uuid('Please select a valid path'),
  }),
  userWallet: z
    .object({
      walletAddress: z.string().min(1, 'Wallet address is required'),
      walletTypeId: z
        .string()
        .uuid('Please select a valid wallet type')
        .nullable(),
      chain: z.string().min(1, 'Please specify the blockchain'),
      metadata: z.string().nullable(),
    })
    .nullable(),
  type: z.enum(['Normal', 'Google']),
})

interface Props {
  setOptionalLeft: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AccountForm({ setOptionalLeft }: Props) {
  const navigateTo = useAnchorNavigation()
  const [page, setPage] = useState(1)

  const [isManualWallet, setIsManualWallet] = useState(false)
  console.log({ isManualWallet })

  const { setUser } = useAppStore()

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
    mode: 'onBlur',
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
      setUser(data.data?.userData)

      toast.success('Profile created successfully')
      await signUp(data.data?.userData) // for firebase
      setDraft({}) // Clear the draft
      navigateTo('/apps/discover')
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

  const handleConnectWallet = () => {
    setPage(4)
  }

  const handleSkipWallet = () => {
    // Set wallet to null or a default value
    form.setValue('userWallet', null)
    handleFormSubmit(form.getValues())
  }

  function renderCurrentForm() {
    switch (page) {
      case 1:
        return <PersonalInfoForm setPage={setPage} />
      case 2:
        return <PathSelection setPage={setPage} />
      case 3:
        return (
          <WalletConnectionChoice
            onConnectWallet={handleConnectWallet}
            onSkipWallet={handleSkipWallet}
          />
        )
      case 4:
        return isManualWallet ? (
          <RenderWalletAndConfirmation
            form={form}
            handleFormSubmit={handleFormSubmit}
            isPending={isPending}
          />
        ) : (
          <WalletConnectComponent
            setIsManualWallet={setIsManualWallet}
            onWalletConnected={(account, chain) => {
              form.setValue('userWallet.walletAddress', account)
              form.setValue('userWallet.chain', chain)
              handleFormSubmit(form.getValues())
            }}
            onWalletDisconnected={() => {
              form.setValue('userWallet', null)
              handleFormSubmit(form.getValues())
            }}
            form={form}
            handleFormSubmit={handleFormSubmit}
            isPending={isPending}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold ">Create Account</h1>
        <nav
          aria-label="Account creation steps"
          className="flex flex-wrap items-center gap-2 text-sm md:text-base"
        >
          {[
            { label: 'Personal info', step: 1 },
            { label: 'Choose path', step: 2 },
            { label: 'Wallet options', step: 3 },
          ].map((item, index) => (
            <React.Fragment key={item.step}>
              <button
                type="button"
                onClick={() => setPage(item.step)}
                className={`transition-colors duration-200 ${
                  page >= item.step ? 'font-semibold' : 'text-gray-400'
                } hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded`}
              >
                {item.label}
              </button>
              {index < 2 && (
                <ChevronRight
                  className="text-primary h-4 w-4 flex-shrink-0"
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
