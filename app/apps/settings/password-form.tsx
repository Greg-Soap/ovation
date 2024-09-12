'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SettingsChange from '../_components/_settings/settings-change'
import { useState } from 'react'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner' // Import toast from sonner

const formSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export default function PasswordForm() {
  const [disabled, setDisabled] = useState<boolean>(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', data)
    try {
      await ovationService.changeProfilePassword(data.oldPassword, data.newPassword)
      toast.success('Password changed successfully')
      form.reset() // Reset form after successful submission
      setDisabled(true) // Disable the submit button again
    } catch (error) {
      console.error('Error changing password:', error)
      toast.error('Failed to change password. Please try again.')
    }
  }

  return (
    <Form {...form}>
      <form
        className='h-full flex flex-col w-full'
        onChange={() => setDisabled(false)}
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className='h-full w-full lg:max-w-[637px] flex gap-7 flex-col box-border pb-5 px-4 sm:px-10 2xl:px-20'>
          <FormField
            name='oldPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-sm text-[#B3B3B3]'>Old Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Input your old password'
                    className='h-[47px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='password'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name='newPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-sm text-[#B3B3B3] max-w-[637px]'>New password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Input your new password'
                    className='h-[47px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='password'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name='confirmPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-sm text-[#B3B3B3] max-w-[637px]'>
                  Confirm new password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Confirm your new password'
                    className='h-[47px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='password'
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <SettingsChange disabled={disabled} />
      </form>
    </Form>
  )
}
