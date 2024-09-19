'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { ArrowDown2 } from 'iconsax-react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SettingsChange from '../../_components/_settings/settings-change'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import type { ProfileData, UserSocialsMod } from '@/models/all.model'

const formSchema = z.object({
  LinkedIn: z.string().url().optional(),
  Lens: z.string().url().optional(),
  Farcaster: z.string().url().optional(),
  Blur: z.string().url().optional(),
  FoundationApp: z.string().url().optional(),
  MagicEden: z.string().url().optional(),
  EthCo: z.string().url().optional(),
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
  { name: 'FoundationApp', imgSrc: '/assets/images/settings/social/foundation.png' },
  { name: 'MagicEden', imgSrc: '/assets/images/settings/social/m-eden.png' },
  { name: 'EthCo', imgSrc: '/assets/images/settings/social/eth-co.png' },
]

export default function SocialForm({ userId }: { userId: string }) {
  const [disabled, setDisabled] = useState(true)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    defaultValues: socialPlatforms.reduce((acc, platform) => ({ ...acc, [platform.name]: '' }), {}),
  })

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await ovationService.getSocialLinks(userId)
        const socialLinks = response.data
        const values = socialLinks.reduce(
          // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
          (acc: any, link: { platform: any; url: any }) => ({ ...acc, [link.platform]: link.url }),
          {},
        )
        form.reset(values)
      } catch (error) {
        console.error('Error fetching social links:', error)
        toast.error('Failed to fetch social links')
      }
    }
    fetchSocialLinks()
  }, [userId, form])

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data)
      await ovationService.updateSocials(data as UserSocialsMod)
      toast.success('Social links updated successfully')
      setDisabled(true)
    } catch (error) {
      console.error('Error updating social links:', error)
      toast.error('Failed to update social links')
    }
  }

  return (
    <section className='w-full h-full flex flex-col gap-[23px] pb-5'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => setDisabled(false)}
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

          <SettingsChange disabled={disabled} />
        </form>
      </Form>
    </section>
  )
}
