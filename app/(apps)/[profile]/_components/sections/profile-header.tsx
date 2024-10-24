import { ErrorFallback } from '@/components/error-boundary'
import AsideMsgIcon from '@/components/icons/asideMsgIcon'
import { Button } from '@/components/ui/button'
import type { ProfileData } from '@/models/all.model'
import { ErrorBoundary } from 'react-error-boundary'

export default function ProfileHeader({
  profileData,
  isUser,
  isFollowingPending,
  isUnfollowingPending,
  followUser,
  unfollowUser,
  copyProfileLinkToClipboard,
  isCopying,
  openDM,
  navigateTo,
  token,
}: {
  profileData: ProfileData
  isUser: boolean
  isFollowingPending: boolean
  isUnfollowingPending: boolean
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void
  copyProfileLinkToClipboard: () => void
  isCopying: boolean
  openDM: () => void
  navigateTo: (path: string) => void
  token: string
}) {
  return (
    <div
      className="relative w-full h-[262px]"
      style={{
        backgroundImage: profileData?.profile?.coverImage
          ? `url('${profileData?.profile?.coverImage}')`
          : 'url("/assets/images/profile/image8.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {!token ? (
        <div className="flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10">
          <Button
            variant={'default'}
            className={`
                py-[9px] px-[13px] text-xs font-semibold border
                ${
                  profileData?.isFollowing
                    ? 'bg-[#333726]  border-[#E6E6E64D] hover:bg-red-900 hover:text-red-200 hover:border-red-700'
                    : ' text-[#0B0A10] border-[#E6E6E64D]'
                }
                transition-colors duration-200
                ${profileData?.isFollowing ? 'group' : ''}
              `}
            onClick={() => navigateTo('/create-account')}
          >
            <span className={profileData?.isFollowing ? 'group relative' : ''}>
              Create an account
            </span>
          </Button>
        </div>
      ) : isUser ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="flex flex-col-reverse sm:flex-row items-end justify-start sm:justify-end gap-3 h-[inherit] w-full pb-4 pr-4 md:pr-10 md:pb-10">
            <Button
              variant="secondary"
              onClick={copyProfileLinkToClipboard}
              disabled={isCopying}
              className=" rounded-full py-[11px] px-4 border border-[#E6E6E64D] text-[#333333] text-xs"
            >
              {isCopying ? 'Copying...' : 'Copy Profile Link'}
            </Button>
            <Button
              variant="default"
              className="py-[11px] px-4 border border-[#E6E6E64D]  text-xs"
            >
              <a href="/settings">Edit Profile</a>
            </Button>
          </div>
        </ErrorBoundary>
      ) : (
        profileData && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10">
              <Button
                variant="default"
                className="bg-[#333726] p-[9px] border border-[#507100]"
                onClick={openDM}
              >
                <AsideMsgIcon className="w-5 h-5 stroke-black fill-primary" />
              </Button>
              <Button
                variant={'default'}
                disabled={isFollowingPending || isUnfollowingPending}
                isLoading={isFollowingPending || isUnfollowingPending}
                loadingText={
                  isFollowingPending ? 'Following...' : 'Unfollowing...'
                }
                className={`
                py-[9px] px-[13px] text-xs font-semibold border
                ${
                  profileData?.isFollowing
                    ? 'bg-primary-bright  border-foreground hover:bg-red-900 hover:text-red-200 hover:border-red-700'
                    : ' text-primary-foreground border-[#E6E6E64D]'
                }
                transition-colors duration-200
                ${profileData?.isFollowing ? 'group' : ''}
              `}
                onClick={() => {
                  if (profileData?.isFollowing) {
                    unfollowUser(profileData?.userId as string)
                  } else {
                    followUser(profileData?.userId as string)
                  }
                }}
              >
                <span
                  className={profileData?.isFollowing ? 'group relative' : ''}
                >
                  {profileData?.isFollowing ? (
                    <>
                      <span className="group-hover:hidden">Following</span>
                      <span className="hidden group-hover:inline">
                        Unfollow
                      </span>
                    </>
                  ) : (
                    'Follow'
                  )}
                </span>
              </Button>
            </div>
          </ErrorBoundary>
        )
      )}
    </div>
  )
}
