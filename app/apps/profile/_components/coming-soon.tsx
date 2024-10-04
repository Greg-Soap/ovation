'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Image from 'next/image'
import React, { useState } from 'react'

const formSchema = z.object({
  email: z.string().email({
    message: 'Email must be correct.',
  }),
})

export default function ComingSoon() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitted(true)

    toast('Thank you for subscribing to our newsletter!')
  }

  return (
    <div className="w-full flex items-center justify-center mt-12">
      <div className="flex flex-col items-center justify-center px-11 py-7 rounded-[20px] gap-[52px]">
        <p className="text-lg text-white100 font-semibold">COMING SOON.....</p>

        <Image
          src="/assets/images/profile/soon.png"
          alt="Coming soon illustration"
          width={210}
          height={129}
        />

        <div className="flex flex-col gap-4 items-center">
          <p
            className={`${isSubmitted ? 'hidden' : 'flex'} text-center text-white90`}
          >
            Subscribe below to be notified of when it goes live
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`${isSubmitted ? 'hidden' : ''} space-y-4 w-full border border-[#FFFFFF33] rounded-[500px] bg-white05`}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <div className="relative flex flex-row items-center px-2">
                        <Input
                          placeholder="Your email address"
                          {...field}
                          className="text-sm h-fit p-4"
                        />
                        <Button
                          className="text-[10px] font-semibold text-primaryBg px-3 py-2 h-fit"
                          type="submit"
                        >
                          Subscribe
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <p className="text-xs text-white60 text-center">
            {isSubmitted
              ? 'Your response has been recorded, we will notify you when we go live'
              : 'Be among the special ones to get early notification when we launch'}
          </p>
        </div>
      </div>
    </div>
  )
}
