'use client'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import UserProfile from './_components/user-profile'
import MainProfileSection from './_components/main-profile-section'
import ovationService from '@/services/ovation.service'
import type { ProfileData, UserExperience } from '@/models/all.model'
import { useRouter } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'

export default function Page() {
  const router = useRouter()
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => ovationService.getProfile(),
  })

  const { data: experienceData } = useQuery({
    queryKey: ['experience'],
    queryFn: () =>
      ovationService.getExperience(profileData?.data?.userId as string),
  })

  console.log({ profileData })

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        className="relative w-full h-[262px]"
        style={{
          backgroundImage: profileData?.data?.profile?.coverImage
            ? `url('${profileData?.data?.profile?.coverImage}')`
            : 'url("/assets/images/profile/image8.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10">
            <Button
              variant="default"
              onClick={() => {
                router.push('/apps/settings')
              }}
              className="bg-[#333333] py-[11px] px-4 border border-[#E6E6E64D] text-white text-xs"
            >
              Edit Profile
            </Button>
          </div>
        </ErrorBoundary>
      </div>

      <div className="flex flex-col lg:flex-row relative h-auto">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <UserProfile
            profileData={profileData?.data as ProfileData}
            experienceData={experienceData?.data?.data as UserExperience[]}
            isLoading={isLoading}
          />
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MainProfileSection profileData={profileData?.data as ProfileData} />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}
