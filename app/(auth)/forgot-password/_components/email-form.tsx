'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { FormBase, FormField } from '@/components/customs/custom-form'

const formSchema = z.object({
  email: z.string().email('Input a valid email address'),
})

type EmailFormProps = {
  onSubmit: (email: string) => Promise<void>
  isSendingEmail: boolean
}

export default function EmailForm({
  onSubmit,
  isSendingEmail,
}: EmailFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await onSubmit(data.email)
  }
  function handleGoBack() {
    router.back()
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="font-semibold text-3xl ">Forgot password?</h1>
        <p className="text-sm">
          Enter your email to receive a verification pin
        </p>
      </div>
      <FormBase
        form={form}
        onSubmit={handleSubmit}
        className="flex flex-col gap-7"
      >
        <FormField name="email" label="Email address" form={form}>
          <Input
            className="h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
            placeholder="btcoverfiat@degen.eth"
            type="email"
          />
        </FormField>
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            disabled={isSendingEmail}
            isLoading={isSendingEmail}
            loadingText="Sending..."
            className="hover:bg-white text-sm font-semibold h-[52px] w-full"
          >
            Send confirmation pin
          </Button>
          <Button
            type="button"
            onClick={handleGoBack}
            variant="outline"
            className="text-sm  rounded-full font-semibold h-[52px] w-full"
          >
            Go back
          </Button>
        </div>
      </FormBase>
    </div>
  )
}
