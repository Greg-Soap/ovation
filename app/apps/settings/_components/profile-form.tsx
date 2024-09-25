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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import SettingsChange from './settings-change'
import { useState } from 'react'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import { useRef } from 'react'

import type { ProfileData } from '@/models/all.model'
import { useLocalStorage } from '@/lib/use-local-storage'
import { useMutation } from '@tanstack/react-query'
import { formatDate } from '@/lib/helper-func'
import {
  uploadProfileImage,
  uploadCoverImage,
} from '@/lib/firebaseStorageUtils'

const formSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  birthDate: z.string(),
  location: z.string(),
  bio: z.string(),
  profileImage: z.string(),
  coverImage: z.string(),
})

type ProfileFormValues = z.infer<typeof formSchema>

export default function ProfileForm({
  profileData,
  refetch,
}: {
  profileData: ProfileData
  refetch: () => void
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
      coverImage: '',
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
      coverImage: profileData?.profile?.coverImage || storedValue.coverImage,
    },
  })

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: ProfileFormValues) =>
      ovationService.updatePersonalInfo(data),
    onSuccess: () => {
      toast.success('Profile updated successfully')
      refetch()
      setDisabled(true)
    },
    onError: (error) => {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    },
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverFileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const imageUrl = await uploadProfileImage(file)
      console.log('imageUrl: ', imageUrl)
      if (imageUrl) {
        form.setValue('profileImage', imageUrl)
        setDisabled(false)
        toast.success('Profile image uploaded successfully')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image. Please try again.')
    }
  }

  const handleCoverImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const imageUrl = await uploadCoverImage(file)
      if (imageUrl) {
        form.setValue('coverImage', imageUrl)
        setDisabled(false)
        toast.success('Cover image uploaded successfully')
      }
    } catch (error) {
      console.error('Error uploading cover image:', error)
      toast.error('Failed to upload cover image. Please try again.')
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    updateProfile(data)
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
                      className="rounded-full w-full h-full text-[#F8F8FF] object-cover"
                    />
                  </span>
                  <FormControl>
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#353538] rounded-3xl"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Upload image
                      </Button>
                    </>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#B3B3B3] text-sm">
                  Cover Image
                </FormLabel>
                <div className="flex flex-col gap-4">
                  <div className="w-full h-[200px] rounded-lg overflow-hidden">
                    <Image
                      alt="cover image"
                      src={field.value || '/assets/images/profile/image8.png'}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <FormControl>
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        ref={coverFileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleCoverImageUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#353538] rounded-3xl"
                        onClick={() => coverFileInputRef.current?.click()}
                      >
                        Upload cover image
                      </Button>
                    </>
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
