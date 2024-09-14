'use client'
import { Button } from '@/components/ui/button'
import AsideMsgIcon from '@/components/icons/asideMsgIcon'
import UserProfile from '../../_sections/_profile/user-profile'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import MainProfileSection from '../../_sections/_profile/main-profile-section'
import type { ProfileData } from '@/models/all.model'
import { Suspense } from 'react'

export default function SecondaryProfile() {
  const params = useParams()
  const username = params.username as string
  const secondaryProfile = true
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => ovationService.getUserProfile(username),
  })
  console.log({ profileData })
  return (
    <>
      <div className='  relative w-full h-[262px] bg-profile-banner bg-contain bg-center'>
        <div className='hidden lg:flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10'>
          <Button variant='default' className='bg-[#333726] p-[9px] border border-[#507100]'>
            <AsideMsgIcon className='w-5 h-5 stroke-black fill-[#CFF073]' />
          </Button>
          <Button
            variant='default'
            className='py-[9px] px-[13px] text-[#0B0A10] text-xs font-semibold border border-[#E6E6E64D]'>
            Follow
          </Button>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row relative h-auto'>
        <Suspense fallback={<div>Loading user profile...</div>}>
          <UserProfile profileData={profileData as ProfileData} />
        </Suspense>
        <Suspense fallback={<div>Loading main profile section...</div>}>
          <MainProfileSection
            profileData={profileData as ProfileData}
            secondaryProfile={secondaryProfile}
          />
        </Suspense>
      </div>
    </>
  )
}
