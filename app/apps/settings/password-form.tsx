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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SettingsChange from '../_components/_settings/settings-change'
import { useState } from 'react'

const formSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
})

export default function PasswordForm() {
  const [disabled, setDisabled] = useState<boolean>(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form
        className="h-full flex flex-col w-full"
        onChange={() => setDisabled(false)}
      >
        <div className="pl-20 h-full flex gap-7 flex-col box-border pb-5 lg:px-10 2xl:pl-20">
          <FormField
            name="oldPassword"
            control={form.control}
            render={() => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-sm text-[#B3B3B3] max-w-[637px]">
                  Old Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input your old password"
                    className="h-[47px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="newPassword"
            control={form.control}
            render={() => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-sm text-[#B3B3B3] max-w-[637px]">
                  New password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input your old password"
                    className="h-[47px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={() => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-sm text-[#B3B3B3] max-w-[637px]">
                  Confirm new password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input your old password"
                    className="h-[47px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    type="password"
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
