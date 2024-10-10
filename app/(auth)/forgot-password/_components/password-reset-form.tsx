'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormBase, FormField } from '@/components/customs/custom-form'
import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'

const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })

type PasswordResetFormProps = {
  onSubmit: (password: string) => Promise<void>
  isSubmitting: boolean
}

export default function PasswordResetForm({
  onSubmit,
  isSubmitting,
}: PasswordResetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await onSubmit(data.password)
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="font-semibold text-3xl ">Enter new password</h1>
        <p className="text-sm text-light">
          Choose a new password for your account
        </p>
      </div>
      <FormBase
        form={form}
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <FormField name="password" label="Password" form={form} showMessage>
          {(field) => (
            <PasswordInput
              value={field.value}
              placeholder="Enter your new password"
              onChange={field.onChange}
            />
          )}
        </FormField>
        <FormField
          name="passwordConfirm"
          label="Confirm Password"
          form={form}
          showMessage
        >
          {(field) => (
            <PasswordInput
              value={field.value}
              placeholder="Enter your new password"
              onChange={field.onChange}
            />
          )}
        </FormField>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="hover:bg-white text-sm font-semibold h-[52px] w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </FormBase>
    </div>
  )
}
