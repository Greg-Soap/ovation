'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import SettingsChange from './settings-change'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import SavingOverlay from '@/components/saving-overlay'
import { FormBase, FormField } from '@/components/customs/custom-form'

export default function SocialForm({ userId }: { userId: string }) {
  const { data: socialLinks, isLoading: isSocialLinksLoading } = useQuery({
    queryKey: ['socialLinks', userId],
    queryFn: () => ovationService.getSocialLinks(userId),
  })
  const socialLinksData = socialLinks?.data?.data

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkedIn: '',
      twitter: '',
      website: '',
      lens: '',
      forcaster: '',
      blur: '',
      foundation: '',
      magic: '',
      ethico: '',
    },
  })

  useEffect(() => {
    if (socialLinksData && !isSocialLinksLoading) {
      form.reset({
        linkedIn: socialLinksData.linkedIn || '',
        twitter: socialLinksData.twitter || '',
        website: socialLinksData.website || '',
        lens: socialLinksData.lens || '',
        forcaster: socialLinksData.forcaster || '',
        blur: socialLinksData.blur || '',
        foundation: socialLinksData.foundation || '',
        magic: socialLinksData.magic || '',
        ethico: socialLinksData.ethico || '',
      })
    }
  }, [socialLinksData, form, isSocialLinksLoading])

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) => ovationService.updateSocials(data),
    onSuccess: () => {
      toast.success('Social links updated successfully')
    },
    onError: () => {
      toast.error('Failed to update social links')
    },
  })

  const onSubmit = (data: FormValues) => {
    const formattedData = {
      blur: data.blur || '',
      foundation: data.foundation || '',
      twitter: data.twitter || '',
      website: data.website || '',
      linkedIn: data.linkedIn || '',
      lens: data.lens || '',
      forcaster: data.forcaster || '',
      ethico: data.ethico || '',
      magic: data.magic || '',
    }

    mutate(formattedData)
  }

  return (
    <section className="w-full h-full flex flex-col gap-[23px] pb-5">
      <SavingOverlay
        isLoading={isSocialLinksLoading}
        loadingText={'Loading your social links...'}
      />
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className="space-y-[23px] min-h-full px-4 sm:px-10 2xl:px-20"
      >
        {socialPlatforms.map((platform) => (
          <FormField
            key={platform.name}
            name={platform.name as keyof FormValues}
            form={form}
            showMessage
          >
            {(field) => (
              <div className="h-[47px] flex items-center border border-[#4D4D4D] rounded-full px-3 py-2 gap-2">
                <Image
                  src={platform.imgSrc}
                  alt={platform.label}
                  width={25}
                  height={25}
                />
                <Input
                  {...field}
                  placeholder={`Enter ${platform.label} link here`}
                  className="focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 border-none h-fit px-0 py-2 text-sm "
                />
              </div>
            )}
          </FormField>
        ))}
        <SettingsChange isLoading={isPending} />
      </FormBase>
    </section>
  )
}

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
  linkedIn: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid LinkedIn URL'), {
      message:
        "Please enter a valid LinkedIn URL (e.g., 'www.linkedin.com/in/username')",
    })
    .refine((val) => !val || val.includes('linkedin.com/in/'), {
      message: "LinkedIn URL should include 'linkedin.com/in/'",
    }),
  twitter: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Twitter URL'), {
      message: "Please enter a valid Twitter URL (e.g., 'x.com/username')",
    })
    .refine((val) => !val || val.includes('x.com/'), {
      message: "Twitter URL should include 'x.com/'",
    }),
  website: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Website URL'), {
      message: "Please enter a valid Website URL (e.g., 'www.example.com')",
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
  forcaster: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Forcaster URL'), {
      message: 'Please enter a valid URL for Forcaster',
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
      message:
        "Please enter a valid Foundation URL (e.g., 'foundation.app/@username')",
    })
    .refine((val) => !val || val.includes('foundation.app/@'), {
      message: "Foundation URL should include 'foundation.app/@'",
    }),
  magic: z
    .string()
    .optional()
    .refine((val) => urlRefinement(val, 'Invalid Magic Eden URL'), {
      message:
        "Please enter a valid Magic Eden URL (e.g., 'magiceden.io/u/username')",
    }),
  ethico: z
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
  label: string
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: 'linkedIn',
    imgSrc: '/assets/images/settings/social/linked-in.png',
    label: 'LinkedIn',
  },
  {
    name: 'twitter',
    imgSrc: '/assets/images/settings/social/x.png',
    label: 'Twitter',
  },
  {
    name: 'website',
    imgSrc: '/assets/images/profile/link.png',
    label: 'Website/Portfolio',
  },
  {
    name: 'lens',
    imgSrc: '/assets/images/settings/social/lens.png',
    label: 'Lens',
  },
  {
    name: 'forcaster',
    imgSrc: '/assets/images/settings/social/farcaster.png',
    label: 'Forcaster',
  },
  {
    name: 'blur',
    imgSrc: '/assets/images/settings/social/blur.png',
    label: 'Blur',
  },
  {
    name: 'foundation',
    imgSrc: '/assets/images/settings/social/foundation.png',
    label: 'Foundation',
  },
  {
    name: 'magic',
    imgSrc: '/assets/images/settings/social/m-eden.png',
    label: 'MagicEden',
  },
  {
    name: 'ethico',
    imgSrc: '/assets/images/settings/social/eth-co.png',
    label: 'EthCo',
  },
]
