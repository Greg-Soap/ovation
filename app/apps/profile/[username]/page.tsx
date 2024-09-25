'use client'
import { Button } from '@/components/ui/button'
import AsideMsgIcon from '@/components/icons/asideMsgIcon'
import UserProfile from '../_components/user-profile'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import MainProfileSection from '../_components/main-profile-section'
import type { ProfileData } from '@/models/all.model'
import { Suspense } from 'react'
import MiniLoader from '@/components/mini-loader'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'

export default function SecondaryProfile() {
  const params = useParams()
  const username = params.username as string
  const secondaryProfile = true
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => ovationService.getUserProfile(username),
  })

  const { data: experienceData } = useQuery({
    queryKey: ['experience', username],
    queryFn: () => ovationService.getExperience(profileData?.userId as string),
    enabled: !!profileData?.userId,
  })

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="relative w-full h-[262px] bg-profile-banner bg-contain bg-center">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="hidden lg:flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10">
            <Button
              variant="default"
              className="bg-[#333726] p-[9px] border border-[#507100]"
            >
              <AsideMsgIcon className="w-5 h-5 stroke-black fill-[#CFF073]" />
            </Button>
            <Button
              variant="default"
              className="py-[9px] px-[13px] text-[#0B0A10] text-xs font-semibold border border-[#E6E6E64D]"
            >
              Follow
            </Button>
          </div>
        </ErrorBoundary>
      </div>

      <div className="flex flex-col lg:flex-row relative h-auto">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<MiniLoader />}>
            <UserProfile
              profileData={profileData as ProfileData}
              experienceData={experienceData?.data?.data || []}
              isLoading={isLoading}
            />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<MiniLoader />}>
            <MainProfileSection
              profileData={profileData as ProfileData}
              secondaryProfile={secondaryProfile}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}
