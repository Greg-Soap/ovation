import Badges from './sections/badges'
import Socials from './sections/socials'
import FavouriteNft from './sections/favourite-nft'
import type { ProfileData, UserExperience } from '@/models/all.model'
import MiniLoader from '@/components/mini-loader'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import ProfileInfo from './sections/profile-info'
import PathBadge from './ui/path-badge'

export default function UserProfile({
  profileData,
  isLoading,
  experienceData,
  isUser,
}: {
  profileData: ProfileData
  isLoading: boolean
  experienceData: UserExperience[]
  secondaryProfile?: boolean
  isUser: boolean
}) {
  const latestExperience = experienceData?.[0] ?? null

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="w-full  lg:max-w-[330px] flex flex-col px-4 pb-4 gap-11 border-r border-[#1A1A1A] bg-[#111115] h-full ">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <img
            src={
              profileData?.profile?.profileImage ||
              '/assets/images/default-user.svg'
            }
            alt="User Profile"
            className={`rounded-full h-[131px] w-[131px] object-cover -mt-[75px] ${!profileData?.profile?.profileImage ? 'bg-[#18181C]' : ''}`}
          />
        </ErrorBoundary>

        <div className="flex flex-col gap-9">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {isLoading ? (
              <MiniLoader />
            ) : (
              <div className="w-full h-fit flex flex-col gap-0.5">
                <div className="flex items-center gap-[13px]">
                  <p className="text-[22px] font-semibold">
                    {profileData?.profile?.displayName || 'No User found'}
                  </p>
                  {profileData?.pathName && (
                    <PathBadge pathName={profileData?.pathName} />
                  )}
                </div>

                <p className="flex items-center gap-1 text-base text-light">
                  {profileData?.username
                    ? `@${profileData.username.replace(/^@/, '')}`
                    : 'No username set'}
                </p>
              </div>
            )}
          </ErrorBoundary>

          {profileData && (
            <>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {isLoading ? (
                  <MiniLoader />
                ) : (
                  <ProfileInfo
                    profileData={profileData}
                    latestExperience={latestExperience}
                    isUser={isUser}
                  />
                )}
              </ErrorBoundary>

              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Badges userId={profileData?.userId as string} />
              </ErrorBoundary>

              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Socials socials={profileData?.socials || {}} />
              </ErrorBoundary>

              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <FavouriteNft userId={profileData?.userId as string} />
              </ErrorBoundary>
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}
