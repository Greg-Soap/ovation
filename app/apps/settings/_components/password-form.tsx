'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import SettingsChange from './settings-change'
import { useState } from 'react'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import PasswordInput from '@/components/password-input'
import { FormBase, FormField } from '@/components/customs/custom-form'

const formSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export default function PasswordForm() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      ovationService.changeProfilePassword(data.oldPassword, data.newPassword),
    onSuccess: (data) => {
      toast.success('Password changed successfully')

      form.reset()
      setIsDisabled(true)
    },
    onError: (error) => {
      console.error('Error changing password:', error)
      // @ts-ignore
      if (error.response.data.message === 'Password incorrect') {
        toast.error('Invalid old password')
      } else {
        toast.error('Failed to change password. Please try again.')
      }
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    changePassword(data)
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className="h-full flex flex-col w-full"
    >
      <div className="h-full w-full lg:max-w-[637px] flex gap-7 flex-col box-border pb-5 px-4 sm:px-10 2xl:px-20">
        <FormField name="oldPassword" form={form}>
          {(field) => (
            <PasswordInput
              placeholder="Input your old password"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormField>
        <FormField name="newPassword" form={form}>
          {(field) => (
            <PasswordInput
              placeholder="Input your new password"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormField>
        <FormField name="confirmPassword" form={form} showMessage>
          {(field) => (
            <PasswordInput
              placeholder="Confirm your new password"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormField>
      </div>
      <SettingsChange disabled={isDisabled} isLoading={isPending} />
    </FormBase>
  )
}
