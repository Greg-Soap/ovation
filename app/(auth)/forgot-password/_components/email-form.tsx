'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

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
        <h1 className="font-semibold text-3xl text-white">Forgot password?</h1>
        <p className="text-sm">
          Enter your email to receive a verification pin
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
                <FormControl>
                  <Input
                    {...field}
                    className="h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    placeholder="btcoverfiat@degen.eth"
                    type="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
              className="text-sm text-white rounded-full font-semibold h-[52px] w-full"
            >
              Go back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
