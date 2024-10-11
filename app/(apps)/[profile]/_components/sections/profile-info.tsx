import EventIcon from '@/components/icons/eventIcon'
import { formatJoinedDate } from '@/lib/helper-func'
import { linkify } from '@/lib/use-link'
import type { ProfileData, UserExperience } from '@/models/all.model'
import LocationIcon from '@/public/assets/images/ovationLocationIcon'
import { Calendar2 } from 'iconsax-react'
import Image from 'next/image'

export default function ProfileInfo({
  profileData,
  latestExperience,
  isUser,
}: {
  profileData: ProfileData
  latestExperience: UserExperience
  isUser: boolean
}) {
  return (
    <div className="w-full h-fit px-5 py-[15px] rounded-[20px] bg-[#18181C] flex flex-col gap-5">
      {latestExperience && (
        <p className="text-xs  font-semibold">
          {latestExperience?.role && latestExperience?.company
            ? `${latestExperience?.role} @ ${latestExperience?.company}`
            : 'No current role'}
        </p>
      )}

      {profileData?.profile?.bio ? (
        <p className="font-normal text-foreground text-sm">
          {linkify(profileData?.profile?.bio)}
        </p>
      ) : (
        isUser && (
          <a
            href="/settings"
            className="font-normal text-primary text-sm hover:underline"
          >
            Add a bio
          </a>
        )
      )}

      {profileData?.createdDate && (
        <p className="font-normal text-lighter text-sm flex items-center gap-1">
          <Calendar2 className="w-[13px] h-[13px] stroke-lighter" />
          <span>{formatJoinedDate(profileData?.createdDate)}</span>
        </p>
      )}

      <div className="flex items-center gap-6">
        <a
          href={`/${profileData?.username}/following`}
          className="flex items-center text-foreground text-sm font-semibold gap-2 "
        >
          {profileData?.userStats?.following || 0}{' '}
          <span className="font-medium text-lighter text-sm hover:underline">
            Following
          </span>
        </a>
        <a
          href={`/${profileData?.username}/followers`}
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
            <p className="text-xs text-light">{latestExperience?.department}</p>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          {latestExperience?.startDate && (
            <div className="flex items-center gap-1.5">
              <EventIcon className="w-[13px] h-[13px] stroke-light" />
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
                    <EventIcon className="w-[13px] h-[13px] stroke-light" />
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
            <LocationIcon className="w-[13px] h-[13px] stroke-light" />
            <p className="text-xs text-light">
              {profileData?.profile?.location}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
