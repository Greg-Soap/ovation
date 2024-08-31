'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import pfp from '@/public/assets/images/pfp3.jpeg'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  displayname: z.string(),
  username: z.string(),
  email: z.string().email(),
  dob: z.date(),
  location: z.string(),
  profession: z.string(),
  bio: z.string(),
  userImg: z.string(),
})

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function formSUbmit() {
    console.log('submitted')
  }

  return (
    <Form {...form}>
      <form
        className='pt-[50px] flex flex-col gap-7 w-full'
        onSubmit={form.handleSubmit(formSUbmit)}>
        <div className='lg:pl-20 w-full flex gap-7 flex-col '>
          <FormField
            control={form.control}
            name='userImg'
            render={({ field }) => (
              <FormItem>
                <div className='flex gap-8 items-center mb-4'>
                  <span className='w-[150px] h-[150px] rounded-full'>
                    <Image alt='user image' src={pfp} className='rounded-full w-full h-full' />
                  </span>

                  <FormControl {...field}>
                    <Button variant={'outline'} className='border-[#353538] rounded-3xl'>
                      Update profile
                    </Button>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='displayname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder='Pancakeguy'
                    className=' max-w-[940px] h-[58px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='text'
                  />
                </FormControl>
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder='@pancakeguy'
                    className=' max-w-[940px] h-[58px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='text'
                  />
                </FormControl>
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enail address</FormLabel>
                <div className=' max-w-[940px]  h-[58px] flex border-[1px] border-[#353538] p-2 rounded-[500px] items-center pr-3'>
                  <FormControl {...field}>
                    <Input
                      placeholder='pancake78@email.com'
                      className=' max-w-[940px] h-full bg-transparent border-none   border-[1px]  focus:border-none rounded-full'
                      type='text'
                    />
                  </FormControl>
                  <Button className='h-8 w-[96] text-xs'>Verify Email</Button>
                </div>
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='max-w-[940px]'>
                <FormLabel>Date of birth</FormLabel>
                <FormControl {...field}>
                  <DatePicker />
                </FormControl>
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder='ex: United States'
                    className=' max-w-[940px] h-[58px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='text'
                  />
                </FormControl>
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='profession'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <FormControl {...field}>
                  <Input
                    placeholder='ex: Software Engineer'
                    className=' max-w-[940px] h-[58px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='text'
                  />
                </FormControl>
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl {...field}>
                  <Textarea
                    placeholder='Tell us about yourself .....'
                    className=' max-w-[940px] min-h-[150px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-xl'
                  />
                </FormControl>
              </FormItem>
            )}
          />{' '}
        </div>
        <div className=' flex  gap-4  items-center bg-[#18181C] sticky justify-end lg:pr-20  bottom-0  w-full h-[130px]   text-red-500'>
          <Button
            variant={'outline'}
            className='h-[56px] font-semibold text-white rounded-full   w-[150px] bg-[#18181C] border-[1px] border-[#353538]'>
            Cancel changes
          </Button>
          <Button className='  h-[56px] font-semibold  rounded-full w-[150px]'>Save changes</Button>
        </div>
      </form>
    </Form>
  )
}
