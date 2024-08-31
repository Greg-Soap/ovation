'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ArrowDown2 } from 'iconsax-react'

const formSchema = z.object({
  LinkedIn: z.string(),
  Lens: z.string(),
  Farcaster: z.string().email(),
  Blur: z.date(),
  FoundationApp: z.string(),
  MagicEden: z.string(),
  EthCo: z.string(),
})

export default function SocialForm() {
  const [isHidden, setIsHidden] = useState(true)
  const [currentForm, setCurrentForm] = useState(formList)
  const [otherForm, setOtherForm] = useState(addList)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit() {
    console.log('submitted')
  }

  function addToForm(index: number) {
    const newForm = otherForm[index]

    setCurrentForm((s) => [...s, newForm])
    setOtherForm((o) => o.filter((_, i) => i !== index))
  }

  return (
    <section className="w-full flex flex-col gap-[23px] pb-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[23px]">
          {currentForm.map((item, index) => (
            <FormField
              key={index}
              control={form.control}
              name={item.schemaName as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">
                    {item.name}
                  </FormLabel>
                  <FormControl>
                    <div className="h-[47px] flex items-center border border-[#4D4D4D] rounded-full px-3 py-2 gap-2">
                      <Image
                        src={`${item.imgSrc}`}
                        alt={`${item.name}`}
                        width={25}
                        height={25}
                      />
                      <Input
                        placeholder="Enter LinkedIn link here"
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split('T')[0]
                            : field.value
                        }
                        className="h-fit px-0 py-2 text-sm text-[#F8F8FF]"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>

      {otherForm.map((item, index) => (
        <div
          className={`${isHidden ? 'hidden' : 'flex '} flex-col gap-2`}
          key={index}
        >
          <p className="text-sm text-[#B3B3B3]">{item.name}</p>

          <div className="h-[47px] flex items-center justify-between border border-[#4D4D4D] rounded-full px-3 py-2">
            <div className="flex items-center gap-2">
              <Image
                src={`${item.imgSrc}`}
                alt={`${item.name}`}
                width={25}
                height={25}
              />

              <p className="text-sm text-[#F8F8FF]">{item.name}</p>
            </div>

            <Button
              className="px-3.5 py-[7px] rounded-full h-fit text-[#0B0A10] text-[10px] font-medium"
              onClick={() => addToForm(index)}
            >
              Add Link
            </Button>
          </div>
        </div>
      ))}

      <Button
        className="flex items-center gap-[7px] text-sm text-[#CCCCCC] p-1 h-fit rounded-none bg-transparent"
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? 'View more' : 'View Less'}
        <ArrowDown2
          color="white"
          type="Outline"
          size={15}
          className={`${isHidden ? 'rotate-0' : 'rotate-180'} transition-all duration-300`}
        />
      </Button>
    </section>
  )
}

interface FormList {
  schemaName?: keyof z.infer<typeof formSchema>
  name?: string
  imgSrc?: string
}

const formList: FormList[] = [
  {
    schemaName: 'LinkedIn',
    name: 'LinkedIn',
    imgSrc: '/assets/images/settings/social/linked-in.png',
  },
]

interface AddList {
  schemaName?: keyof z.infer<typeof formSchema>
  name?: string
  imgSrc?: string
}

const addList: AddList[] = [
  {
    schemaName: 'Lens',
    name: 'Lens',
    imgSrc: '/assets/images/settings/social/lens.png',
  },
  {
    schemaName: 'Farcaster',
    name: 'Farcaster',
    imgSrc: '/assets/images/settings/social/farcaster.png',
  },
  {
    schemaName: 'Blur',
    name: 'Blur',
    imgSrc: '/assets/images/settings/social/blur.png',
  },
  {
    schemaName: 'FoundationApp',
    name: 'Foundation.app',
    imgSrc: '/assets/images/settings/social/foundation.png',
  },
  {
    schemaName: 'MagicEden',
    name: 'Magic Eden',
    imgSrc: '/assets/images/settings/social/m-eden.png',
  },
  {
    schemaName: 'EthCo',
    name: 'Eth.co',
    imgSrc: '/assets/images/settings/social/eth-co.png',
  },
]
