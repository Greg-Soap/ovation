import EventIcon from '@/components/icons/eventIcon'
import Image from 'next/image'
import Badges from './sections/badges'
import Socials from './sections/socials'
import FavouriteNft from './sections/favourite-nft'
import type { ProfileData, UserExperience } from '@/models/all.model'
import MiniLoader from '@/components/mini-loader'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import LocationIcon from '@/public/assets/images/ovationLocationIcon'
import { Calendar2 } from 'iconsax-react'
import { formatJoinedDate } from '@/lib/helper-func'
import { linkify } from '@/lib/use-link'

export default function UserProfile({
  profileData,
  isLoading,
  experienceData,
  secondaryProfile,
  isUser,
}: {
  profileData: ProfileData
  isLoading: boolean
  experienceData: UserExperience[]
  secondaryProfile?: boolean
  isUser?: boolean
}) {
  const latestExperience = experienceData?.[0] ?? null

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="w-full  lg:max-w-[330px] flex flex-col px-4 pb-4 gap-11 border-r border-[#1A1A1A] bg-[#111115] h-full ">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Image
            src={
              profileData?.profile?.profileImage ||
              '/assets/images/default-user.svg'
            }
            alt="User Display Picture"
            width={131}
            height={131}
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
                    {profileData?.profile?.displayName}
                  </p>
                </div>

                <p className="flex items-center gap-1 text-base text-light">
                  {profileData?.username
                    ? `@${profileData.username.replace(/^@/, '')}`
                    : 'No username set'}
                </p>
              </div>
            )}
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {isLoading ? (
              <MiniLoader />
            ) : (
              <div className="w-full h-fit px-5 py-[15px] rounded-[20px] bg-[#18181C] flex flex-col gap-5">
                {latestExperience && (
                  <p className="text-xs  font-semibold">
                    {latestExperience?.role && latestExperience?.company
                      ? `${latestExperience?.role} @ ${latestExperience?.company}`
                      : 'No current role'}
                  </p>
                )}

                {isUser &&
                  (profileData?.profile?.bio ? (
                    <p className="font-normal text-foreground text-sm">
                      {linkify(profileData?.profile?.bio)}
                    </p>
                  ) : (
                    <a
                      href="/settings"
                      className="font-normal text-primary text-sm hover:underline"
                    >
                      Add a bio
                    </a>
                  ))}

                {profileData?.createdDate && (
                  <p className="font-normal text-lighter text-sm flex items-center gap-1">
                    <Calendar2 className="w-[13px] h-[13px] stroke-lighter" />
                    <span>{formatJoinedDate(profileData?.createdDate)}</span>
                  </p>
                )}

                <div className="flex items-center gap-6">
                  <a
                    href={
                      secondaryProfile
                        ? `/${profileData?.username}/following`
                        : '/following'
                    }
                    className="flex items-center text-foreground text-sm font-semibold gap-2 "
                  >
                    {profileData?.userStats?.following || 0}{' '}
                    <span className="font-medium text-lighter text-sm hover:underline">
                      Following
                    </span>
                  </a>
                  <a
                    href={
                      secondaryProfile
                        ? `/${profileData?.username}/followers`
                        : '/followers'
                    }
                    className="flex items-center text-foreground text-sm font-semibold gap-[9px]"
                  >
                    {profileData?.userStats?.followers || 0}{' '}
                    <span className="font-medium text-lighter text-sm hover:underline">
                      Followers
                    </span>
                  </a>
                </div>

                <div className="flex flex-col gap-3  justify-between">
                  {latestExperience?.skill && (
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs text-light">
                        <strong>Skills: </strong> {latestExperience.skill}
                      </p>
                    </div>
                  )}
                  {latestExperience?.department && (
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="/assets/images/profile/medium.png"
                        alt="Department Icon"
                        width={13}
                        height={13}
                        className="rounded-full"
                      />
                      <p className="text-xs text-light">
                        {latestExperience?.department}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    {latestExperience?.startDate && (
                      <div className="flex items-center gap-1.5">
                        <EventIcon className="w-[13px] h-[13px] stroke-[#B3B3B3]" />
                        <p className="text-xs text-light">
                          {latestExperience?.startDate}
                        </p>
                      </div>
                    )}
                    {latestExperience?.startDate && (
                      <>
                        <p className="text-xs text-light">-</p>
                        <div className="flex items-center gap-1.5">
                          {latestExperience?.endDate ? (
                            <>
                              <EventIcon className="w-[13px] h-[13px] stroke-[#B3B3B3]" />
                              <p className="text-xs text-light">
                                {latestExperience?.endDate}
                              </p>
                            </>
                          ) : (
                            <p className="text-xs text-light">Present</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  {profileData?.profile?.location && (
                    <div className="flex items-center gap-1.5">
                      <LocationIcon className="w-[13px] h-[13px] stroke-[#B3B3B3]" />
                      <p className="text-xs text-light">
                        {profileData?.profile?.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
        </div>
      </div>
    </ErrorBoundary>
  )
}
