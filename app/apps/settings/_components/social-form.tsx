'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import SettingsChange from './settings-change'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

const formSchema = z.object({
  linkedIn: z.string().url().optional(),
  lens: z.string().url().optional(),
  forcaster: z.string().url().optional(),
  blur: z.string().url().optional(),
  foundation: z.string().url().optional(),
  magicEden: z.string().url().optional(),
  ethico: z.string().url().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface SocialPlatform {
  name: string
  imgSrc: string
}

const socialPlatforms: SocialPlatform[] = [
  { name: 'LinkedIn', imgSrc: '/assets/images/settings/social/linked-in.png' },
  { name: 'Lens', imgSrc: '/assets/images/settings/social/lens.png' },
  { name: 'Farcaster', imgSrc: '/assets/images/settings/social/farcaster.png' },
  { name: 'Blur', imgSrc: '/assets/images/settings/social/blur.png' },
  { name: 'Foundation', imgSrc: '/assets/images/settings/social/foundation.png' },
  { name: 'MagicEden', imgSrc: '/assets/images/settings/social/m-eden.png' },
  { name: 'EthCo', imgSrc: '/assets/images/settings/social/eth-co.png' },
]

export default function SocialForm({ userId }: { userId: string }) {
  const [isDisabled, setIsDisabled] = useState(true)
  const { data: socialLinks, isLoading } = useQuery({
    queryKey: ['socialLinks', userId],
    queryFn: () => ovationService.getSocialLinks(userId),
  })
  const socialLinksData = socialLinks?.data?.data

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkedIn: socialLinksData?.linkedIn || '',
      lens: socialLinksData?.lens || '',
      forcaster: socialLinksData?.forcaster || '',
      blur: socialLinksData?.blur || '',
      foundation: socialLinksData?.foundation || '',
      magicEden: socialLinksData?.magic || '',
      ethico: socialLinksData?.ethico || '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: (data: FormValues) => ovationService.updateSocials(data),
    onSuccess: () => {
      toast.success('Social links updated successfully')
      setIsDisabled(true)
    },
    onError: () => {
      toast.error('Failed to update social links')
    },
  })

  const onSubmit = (data: FormValues) => {
    mutate(data)
  }

  return (
    <section className='w-full h-full flex flex-col gap-[23px] pb-5'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => setIsDisabled(false)}
          className='space-y-[23px] min-h-full'>
          {socialPlatforms.map((platform, index) => (
            <FormField
              key={index}
              control={form.control}
              name={platform.name as keyof FormValues}
              render={({ field }) => (
                <FormItem className='w-full flex flex-col gap-2 px-10 2xl:pl-20'>
                  <FormLabel className='text-sm text-[#B3B3B3]'>{platform.name}</FormLabel>
                  <FormControl>
                    <div className='h-[47px] flex items-center border border-[#4D4D4D] rounded-full px-3 py-2 gap-2'>
                      <Image src={platform.imgSrc} alt={platform.name} width={25} height={25} />
                      <Input
                        placeholder={`Enter ${platform.name} link here`}
                        {...field}
                        className='h-fit px-0 py-2 text-sm text-[#F8F8FF]'
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          <SettingsChange disabled={isDisabled} isLoading={isLoading} />
        </form>
      </Form>
    </section>
  )
}
