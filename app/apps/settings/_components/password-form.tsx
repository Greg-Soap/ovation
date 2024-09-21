'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import SettingsChange from './settings-change'
import { useState } from 'react'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner' // Import toast from sonner
import { useMutation } from '@tanstack/react-query'

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
  const [isDisabled, setIsDisabled] = useState<boolean>(true) // Updated variable name

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
      console.log(data)
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
    <Form {...form}>
      <form
        className='h-full flex flex-col w-full'
        onChange={() => setIsDisabled(false)} // Updated variable name
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
                <FormMessage className='text-red-500 text-sm' />
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
                <FormMessage className='text-red-500 text-sm' />
              </FormItem>
            )}
          />
        </div>
        <SettingsChange disabled={isDisabled} isLoading={isPending} />
      </form>
    </Form>
  )
}