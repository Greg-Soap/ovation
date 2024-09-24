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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import SettingsChange from './settings-change'
import { useState } from 'react'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'

import type { ProfileData } from '@/models/all.model'
import { useLocalStorage } from '@/lib/use-local-storage'
import { useMutation } from '@tanstack/react-query'
import { formatDate } from '@/lib/helper-func'
import { uploadProfileImage } from '@/lib/firebaseStorageUtils'

const formSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  birthDate: z.string(),
  location: z.string(),
  bio: z.string(),
  profileImage: z.string(),
})

type ProfileFormValues = z.infer<typeof formSchema>

export default function ProfileForm({
  profileData,
}: {
  profileData: ProfileData
}) {
  const [disabled, setDisabled] = useState(true)

  const { storedValue, setValue } = useLocalStorage<ProfileFormValues>(
    'profileDraft',
    {
      displayName: '',
      username: '',
      email: '',
      birthDate: formatDate(new Date()),
      location: '',
      bio: '',
      profileImage: '',
    },
  )

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: profileData?.profile?.displayName || storedValue.displayName,
      username: profileData?.username || storedValue.username,
      email: profileData?.email || storedValue.email,
      birthDate: formatDate(
        new Date(profileData?.profile?.birthDate || storedValue.birthDate),
      ),
      location: profileData?.profile?.location || storedValue.location,
      bio: profileData?.profile?.bio || storedValue.bio,
      profileImage:
        profileData?.profile?.profileImage || storedValue.profileImage,
    },
  })

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: ProfileFormValues) =>
      ovationService.updatePersonalInfo(data),
    onSuccess: () => {
      toast.success('Profile updated successfully')
      setDisabled(true)
    },
    onError: (error) => {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    },
  })

  const getImageUrl = async () => {
    // return await uploadProfileImage('file blob')
  }

  const onSubmit = async (data: ProfileFormValues) => {
    updateProfile(data)
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        className="mt-[45px] flex flex-col gap-7 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => setDisabled(false)}
      >
        <div className="w-full flex gap-7 flex-col px-4 sm:px-10 2xl:px-20">
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-8 items-center mb-4">
                  <span className="w-[150px] h-[150px] rounded-full">
                    <Image
                      alt="user image"
                      src={field.value || '/assets/images/default-user.svg'}
                      width={150}
                      height={150}
                      className="rounded-full w-full h-full text-[#F8F8FF]"
                    />
                  </span>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#353538] rounded-3xl"
                      onClick={() => {
                        // Add logic to update profile image
                      }}
                    >
                      Upload image
                    </Button>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-[#B3B3B3] text-sm">
                  Display name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Pancakeguy"
                    className="text-[#F8F8FF] text-sm max-w-[940px] h-[47px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-[#B3B3B3] text-sm">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="@pancakeguy"
                    className="text-[#F8F8FF] text-sm max-w-[940px] h-[47px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-[#B3B3B3] text-sm">
                  Email address
                </FormLabel>
                <div className="max-w-[940px] h-[47px] flex border-[1px] border-[#353538] p-2 rounded-[500px] items-center pr-3">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="pancake78@email.com"
                      className="text-[#F8F8FF] text-sm max-w-[940px] h-full bg-transparent border-none focus:border-none rounded-full"
                      type="email"
                    />
                  </FormControl>
                  {/* <Button className='text-[#0B0A10] text-xs font-medium h-fit'>Verify Email</Button> */}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="max-w-[940px] flex flex-col gap-2">
                <FormLabel className="text-[#B3B3B3] text-sm">
                  Date of birth
                </FormLabel>
                <FormControl>
                  <DatePicker
                    disableDate={disabled}
                    onChange={(date) => {
                      if (date) {
                        field.onChange(formatDate(date))
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-[#B3B3B3] text-sm">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="ex: United States"
                    className="text-[#F8F8FF] text-sm max-w-[940px] h-[47px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-[#B3B3B3] text-sm">Bio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Tell us about yourself ....."
                    className="text-[#F8F8FF] text-sm max-w-[940px] h-[47px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <SettingsChange
          disabled={disabled}
          isLoading={form.formState.isSubmitting}
          saveDraft={() => setValue(form.getValues())}
        />
      </form>
    </Form>
  )
}
