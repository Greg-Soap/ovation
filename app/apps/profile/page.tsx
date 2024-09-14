'use client'
import { useQuery } from '@tanstack/react-query'
import NftIcon from '@/components/icons/nftIcon'
import { Button } from '@/components/ui/button'
import AsideMsgIcon from '@/components/icons/asideMsgIcon'
import StatusUpIcon from '@/components/icons/statusUpIcon'
import UserProfile from '../_sections/_profile/user-profile'
import MainProfileSection from '../_sections/_profile/main-profile-section'
import ovationService from '@/services/ovation.service'
import type { ProfileData } from '@/models/all.model'

export default function Page() {
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => ovationService.getProfile(),
  })
  console.log({ profileData })
  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (error) {
  //   return <div>Error loading profile data</div>
  // }

  // if (!profileData) {
  //   return <div>No profile data available</div>
  // }

  return (
    <>
      <div className='relative w-full h-[262px] bg-profile-banner bg-contain bg-center'>
        <div className='hidden lg:flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10'>
          <Button variant='default' className='bg-[#333333] p-[11px] border border-[#E6E6E64D]'>
            <NftIcon className='w-5 h-5 stroke-white fill-white' />
          </Button>
          <Button variant='default' className='bg-[#333333] p-[11px] border border-[#E6E6E64D]'>
            <StatusUpIcon className='w-5 h-5 stroke-[#E6E6E64D] fill-white' />
          </Button>
          <Button variant='default' className='bg-[#333333] p-[11px] border border-[#E6E6E64D]'>
            <AsideMsgIcon className='w-6 h-6 stroke-black fill-white' />
          </Button>
          <Button
            variant='default'
            className='bg-[#333333] py-[11px] px-4 border border-[#E6E6E64D] text-white text-xs'>
            Edit Profile
          </Button>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row relative h-auto'>
        <UserProfile profileData={profileData as ProfileData} />

        <MainProfileSection profileData={profileData as ProfileData} />
      </div>
    </>
  )
}
