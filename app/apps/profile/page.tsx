'use client'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'

import UserProfile from '../_sections/_profile/user-profile'
import MainProfileSection from '../_sections/_profile/main-profile-section'
import ovationService from '@/services/ovation.service'
import type { ProfileData, UserExperience } from '@/models/all.model'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const {
    data: profileData,
    isLoading
  
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => ovationService.getProfile(),
  })

  const { data: experienceData } = useQuery({
    queryKey: ['experience'],
    queryFn: () => ovationService.getExperience(profileData?.data?.userId as string),
  })

 
 
 

  return (
    <>
      <div className='relative w-full h-[262px] bg-profile-banner bg-contain bg-center'>
        <div className='hidden lg:flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10'>
          
         
          {/* <Button variant='default' className='bg-[#333333] p-[11px] border border-[#E6E6E64D]'>
            <AsideMsgIcon className='w-6 h-6 stroke-black fill-white' />
          </Button> */}
          <Button
            variant='default'
            onClick={() => {
              router.push('/apps/settings')
            }}
            className='bg-[#333333] py-[11px] px-4 border border-[#E6E6E64D] text-white text-xs'>
            Edit Profile
          </Button>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row relative h-auto'>
        <UserProfile profileData={profileData?.data as ProfileData} experienceData={experienceData?.data?.data as UserExperience[]} isLoading={isLoading} />

        <MainProfileSection profileData={profileData?.data as ProfileData} />
      </div>
    </>
  )
}
