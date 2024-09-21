'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import SettingsChange from './settings-change'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

const urlRefinement = (val: string | undefined, errorMessage: string) => {
  if (!val) return true // Allow empty strings (optional fields)
  let url = val
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const formSchema = z.object({
  linkedin: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid LinkedIn URL'), {
      message: "Please enter a valid LinkedIn URL (e.g., 'www.linkedin.com/in/username')",
    })
    .refine((val) => !val || val.includes('linkedin.com/in/'), {
      message: "LinkedIn URL should include 'linkedin.com/in/'",
    }),
  lens: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Lens URL'), {
      message: "Please enter a valid Lens URL (e.g., 'lenster.xyz/u/username')",
    })
    .refine((val) => !val || val.includes('lenster.xyz/u/'), {
      message: "Lens URL should include 'lenster.xyz/u/'",
    }),
  farcaster: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Farcaster URL'), {
      message: 'Please enter a valid URL for Farcaster',
    }),
  blur: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Blur URL'), {
      message: "Please enter a valid Blur URL (e.g., 'blur.io/user/username')",
    })
    .refine((val) => !val || val.includes('blur.io/user/'), {
      message: "Blur URL should include 'blur.io/user/'",
    }),
  foundation: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Foundation URL'), {
      message: "Please enter a valid Foundation URL (e.g., 'foundation.app/@username')",
    })
    .refine((val) => !val || val.includes('foundation.app/@'), {
      message: "Foundation URL should include 'foundation.app/@'",
    }),
  magiceden: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Magic Eden URL'), {
      message: "Please enter a valid Magic Eden URL (e.g., 'magiceden.io/u/username')",
    })
    .refine((val) => !val || val.includes('magiceden.io/u/'), {
      message: "Magic Eden URL should include 'magiceden.io/u/'",
    }),
  ethco: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Ethco URL'), {
      message: 'Please enter a valid URL for Ethco',
    }),
})
type FormValues = z.infer<typeof formSchema>

interface SocialPlatform {
  name: string
  imgSrc: string
}

const socialPlatforms: SocialPlatform[] = [
  { name: 'LinkedIn', imgSrc: '/assets/images/settings/social/linked-in.png' },
  { name: 'Lens', imgSrc: '/assets/images/settings/social/lens.png' },
  { name: 'Farcaster', imgSrc: '/assets/images/settings/social/farcaster.png' }, // Changed from 'Forcaster' to 'Farcaster'
  { name: 'Blur', imgSrc: '/assets/images/settings/social/blur.png' },
  { name: 'Foundation', imgSrc: '/assets/images/settings/social/foundation.png' },
  { name: 'MagicEden', imgSrc: '/assets/images/settings/social/m-eden.png' },
  { name: 'EthCo', imgSrc: '/assets/images/settings/social/eth-co.png' }, // Changed from 'EthCo' to 'EthCo'
]

export default function SocialForm({ userId }: { userId: string }) {
  const [isDisabled, setIsDisabled] = useState(true)
  const { data: socialLinks } = useQuery({
    queryKey: ['socialLinks', userId],
    queryFn: () => ovationService.getSocialLinks(userId),
  })
  const socialLinksData = socialLinks?.data?.data

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkedin: socialLinksData?.linkedIn || '',
      lens: socialLinksData?.lens || '',
      farcaster: socialLinksData?.forcaster || '',
      blur: socialLinksData?.blur || '',
      foundation: socialLinksData?.foundation || '',
      magiceden: socialLinksData?.magic || '',
      ethco: socialLinksData?.ethico || '',
    },
  })

  const { mutate, isPending } = useMutation({
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
    const formattedData = {
      blur: data.blur || '',
      foundation: data.foundation || '',
      linkedIn: data.linkedin || '',
      lens: data.lens || '',
      forcaster: data.farcaster || '',
      ethico: data.ethco || '',
      magic: data.magiceden || '',
    }

    mutate(formattedData)
  }

  console.log(form.formState.errors)
  console.log(form.getValues())

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
              name={platform.name.toLowerCase() as keyof FormValues}
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
                  <FormMessage className='text-xs text-red-500' />
                </FormItem>
              )}
            />
          ))}

          <SettingsChange disabled={isDisabled} isLoading={isPending} />
        </form>
      </Form>
    </section>
  )
}