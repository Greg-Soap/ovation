'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import SettingsChange from './settings-change'
import { useEffect, useState } from 'react'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import { useRef } from 'react'

import type { ProfileData, UserData } from '@/models/all.model'
import { useLocalStorage } from '@/lib/use-local-storage'
import { useMutation } from '@tanstack/react-query'
import { formatDate } from '@/lib/helper-func'
import {
  uploadProfileImage,
  uploadCoverImage,
} from '@/lib/firebaseStorageUtils'
import SavingOverlay from '@/components/saving-overlay'
import { Progress } from '@/components/ui/progress'
import { updateUserData } from '@/lib/firebaseAuthService'
import type { ParticipantMod } from '@/lib/firebaseChatService'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { useAppStore } from '@/store/use-app-store'

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
  isProfileLoading,
}: {
  profileData: ProfileData
  refetch: () => void
  isProfileLoading: boolean
}) {
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null,
  )
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null,
  )

  const [tempFormValues, setTempFormValues] = useState<ProfileFormValues>({
    displayName: '',
    username: '',
    email: '',
    birthDate: formatDate(new Date()),
    location: '',
    bio: '',
    profileImage: '',
    coverImage: '',
  })
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

  const { user: userData, setUser: setUserData } = useAppStore()

  const [uploadProgress, setUploadProgress] = useState<{
    profile: number
    cover: number
  }>({
    profile: 0,
    cover: 0,
  })

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

  useEffect(() => {
    if (profileData) {
      form.reset({
        displayName: profileData?.profile?.displayName || '',
        username: profileData?.username || '',
        email: profileData?.email || '',
        birthDate: profileData?.profile?.birthDate || '',
        location: profileData?.profile?.location || '',
        bio: profileData?.profile?.bio || '',
        profileImage: profileData?.profile?.profileImage || '',
        coverImage: profileData?.profile?.coverImage || '',
      })
    }
  }, [profileData, form])

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      // Upload images if selected
      if (selectedProfileImage) {
        const profileImageUrl = await uploadProfileImage(
          selectedProfileImage,
          (progress) => {
            setUploadProgress((prev) => ({ ...prev, profile: progress }))
          },
        )
        data.profileImage = profileImageUrl
      }
      if (selectedCoverImage) {
        const coverImageUrl = await uploadCoverImage(
          selectedCoverImage,
          (progress) => {
            setUploadProgress((prev) => ({ ...prev, cover: progress }))
          },
        )
        data.coverImage = coverImageUrl
      }
      // Update profile with new data
      return ovationService.updatePersonalInfo(data)
    },
    onSuccess: async () => {
      toast.success('Profile updated successfully')
      await updateUserData(
        {
          displayName: tempFormValues.displayName,
          email: tempFormValues.email,
          image: tempFormValues.profileImage,
          username: tempFormValues.username,
        } as ParticipantMod,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        userData?.userId!,
      )

      
      refetch()
      // TODO: FIX LATER
      setUserData({
        ...userData,
        ...tempFormValues,
        userId: userData?.userId!,
        badges: userData?.badges ?? [],
        nft: userData?.nft ?? [],
        paths: userData?.paths ?? [],
        featured: userData?.featured ?? [],
        socials: userData?.socials ?? null,
      } as UserData)

      // Reset selected images
      setSelectedProfileImage(null)
      setSelectedCoverImage(null)
      setUploadProgress({ profile: 0, cover: 0 })
    },
    onError: (error) => {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    },
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverFileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    isProfileImage: boolean,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (isProfileImage) {
      setSelectedProfileImage(file)
      // Update form value with a temporary local URL
      const localUrl = URL.createObjectURL(file)
      form.setValue('profileImage', localUrl)
    } else {
      setSelectedCoverImage(file)
      // Update form value with a temporary local URL
      const localUrl = URL.createObjectURL(file)
      form.setValue('coverImage', localUrl)
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    updateProfile(data)

    setTempFormValues(data)
  }

  return (
    <>
      <SavingOverlay
        isLoading={isPending}
        loadingText="Saving your information..."
      />
      <SavingOverlay
        isLoading={isProfileLoading}
        loadingText={'Loading your profile...'}
      />
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className="mt-[45px] flex flex-col gap-7 w-full"
      >
        <div className="w-full flex gap-7 flex-col px-4 sm:px-10 2xl:px-20">
          <FormField name="profileImage" form={form}>
            {(field) => (
              <>
                <div className="flex gap-8 items-center mb-4">
                  <span className="w-[150px] h-[150px] rounded-full">
                    <Image
                      alt="user image"
                      src={field.value || '/assets/images/default-user.svg'}
                      width={150}
                      height={150}
                      className="rounded-full w-full h-full  object-cover"
                    />
                  </span>

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageSelection(e, true)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#353538] rounded-3xl"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload image
                    </Button>
                  </div>
                </div>
                {uploadProgress.profile > 0 && uploadProgress.profile < 100 && (
                  <div className="mt-2">
                    <Progress
                      value={uploadProgress.profile}
                      className="w-[200px]"
                    />
                    <p className="text-sm text-light mt-1">
                      Uploading: {uploadProgress.profile.toFixed(0)}%
                    </p>
                  </div>
                )}
              </>
            )}
          </FormField>
          <FormField name="coverImage" form={form} label="Cover image">
            {(field) => (
              <>
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

                  <>
                    <input
                      type="file"
                      accept="image/*"
                      ref={coverFileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageSelection(e, false)}
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
                </div>
                {uploadProgress.cover > 0 && uploadProgress.cover < 100 && (
                  <div className="mt-2">
                    <Progress
                      value={uploadProgress.cover}
                      className="w-[200px]"
                    />
                    <p className="text-sm text-light mt-1">
                      Uploading: {uploadProgress.cover.toFixed(0)}%
                    </p>
                  </div>
                )}
              </>
            )}
          </FormField>
          <FormField name="displayName" form={form} label="Display name">
            <Input
              placeholder="@pancakeguy"
              className=" text-sm max-w-[940px] h-[47px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
            />
          </FormField>
          <FormField name="username" form={form} label="Username">
            <Input
              placeholder="@pancakeguy"
              className=" text-sm max-w-[940px] h-[47px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
            />
          </FormField>
          <FormField name="email" form={form} label="Email">
            <Input
              placeholder="pancake78@email.com"
              className=" text-sm max-w-[940px] h-[47px] bg-transparent  rounded-full"
              type="email"
            />
          </FormField>
          <FormField name="birthDate" form={form} label="Birth date">
            {(field) => (
              <DatePicker
                value={field.value}
                onChange={(date) => {
                  if (date) {
                    field.onChange(formatDate(date))
                  }
                }}
              />
            )}
          </FormField>
          <FormField name="location" form={form} label="Location">
            <Input
              placeholder="ex: United States"
              className=" text-sm max-w-[940px] h-[47px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
            />
          </FormField>
          <FormField name="bio" form={form} label="Bio">
            <Input
              placeholder="Tell us about yourself ....."
              className=" text-sm max-w-[940px] h-[47px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
            />
          </FormField>
        </div>
        <SettingsChange
          isLoading={isPending}
          saveDraft={() => setValue(form.getValues())}
        />
      </FormBase>
    </>
  )
}
