import EventIcon from '@/components/icons/eventIcon'
import Image from 'next/image'
import Badges from './badges'
import Socials from './socials'
import FavouriteNft from './favourite-nft'
import type { ProfileData, UserExperience } from '@/models/all.model'
import MiniLoader from '@/components/mini-loader'

export default function UserProfile({
  profileData,
  isLoading,
  experienceData,
}: {
  profileData: ProfileData
  isLoading: boolean
  experienceData: UserExperience[]
}) {
  const latestExperience = experienceData?.[0] ?? null

  return (
    <div className="w-full  lg:max-w-[330px] flex flex-col px-4 pb-4 gap-11 border-r border-sectionBorder bg-primaryBg h-full ">
      <Image
        src={
          profileData?.profile?.profileImage ||
          '/assets/images/profile/image1.png'
        }
        alt="User Display Picture"
        width={131}
        height={131}
        className="rounded-full -mt-[75px]"
      />

      <div className="flex flex-col gap-9">
        {isLoading ? (
          <MiniLoader />
        ) : (
          <div className="w-full h-fit flex flex-col gap-0.5">
            <div className="flex items-center gap-[13px]">
              <p className="text-white100 text-[22px] font-semibold">
                {profileData?.profile?.displayName || 'Anonymous User'}
              </p>
              {/* {profileData?.profile?.isVerified && (
              <Image
                src='/assets/images/profile/Rectangle1.png'
                alt='Verified User'
                width={21}
                height={21}
                className='bg-white rounded-full'
              />
            )} */}
            </div>

            <p className="flex items-center gap-1 text-base text-white70">
              {profileData?.username
                ? `@${profileData.username.replace(/^@/, '')}`
                : 'No username set'}
            </p>
          </div>
        )}

        {isLoading ? (
          <MiniLoader />
        ) : (
          <div className="w-full h-fit px-5 py-[15px] rounded-[20px] bg-secondaryBg flex flex-col gap-5">
            {latestExperience && (
              <p className="text-xs text-white100 font-semibold">
                {latestExperience?.role && latestExperience?.company
                  ? `${latestExperience?.role} @ ${latestExperience?.company}`
                  : 'No current role'}
              </p>
            )}

            {profileData?.profile?.bio ? (
              <p className="font-normal text-white90 text-sm">
                {profileData?.profile?.bio}
              </p>
            ) : (
              <a
                href="/apps/settings"
                className="font-normal text-[#cff073d7] text-sm hover:underline"
              >
                Add a bio
              </a>
            )}

            <div className="flex items-center gap-6">
              <p className="flex items-center text-white90 text-sm font-semibold gap-2">
                {profileData?.userStats?.following || 0}{' '}
                <span className="font-medium text-[#808080]">Following</span>
              </p>

              <p className="flex items-center text-white90 text-sm font-semibold gap-[9px]">
                {profileData?.userStats?.followers || 0}{' '}
                <span className="font-medium text-white50 text-sm">
                  Followers
                </span>
              </p>
            </div>

            <div className="flex flex-col  justify-between">
              {latestExperience?.department && (
                <div className="flex items-center gap-1.5">
                  <Image
                    src="/assets/images/profile/medium.png"
                    alt="Department Icon"
                    width={13}
                    height={13}
                    className="rounded-full"
                  />
                  <p className="text-xs text-white70">
                    {latestExperience.department}
                  </p>
                </div>
              )}
              {latestExperience?.skill && (
                <div className="flex items-center gap-1.5">
                  <Image
                    src="/assets/images/profile/location.png"
                    alt="Skill Icon"
                    width={13}
                    height={13}
                    className="rounded-full"
                  />
                  <p className="text-xs text-white70">
                    {latestExperience.skill}
                  </p>
                </div>
              )}
              {latestExperience?.startDate && (
                <div className="flex items-center gap-1.5">
                  <EventIcon className="w-[13px] h-[13px] stroke-white70" />
                  <p className="text-xs text-white70">
                    {latestExperience.startDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <Badges userId={profileData?.userId as string} />

        <Socials socials={profileData?.socials || {}} />

        <FavouriteNft userId={profileData?.userId as string} />
      </div>
    </div>
  )
}
