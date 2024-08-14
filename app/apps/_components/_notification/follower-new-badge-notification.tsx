import { Button } from '@/components/ui/button'

export default function FollowerBadgeNotification({
  userProfilePicture,
  notificationTypeImg,
  userName,
  className,
}: any) {
  return (
    <div
      className={`${className} w-full items-center justify-between px-5 py-4 md:py-7 md:px-8 border-b border-[#1A1A1A]`}
    >
      <div className="flex items-center gap-4 w-fit">
        <div className="flex h-fit relative">
          <img
            src={userProfilePicture}
            alt="User Display Picture"
            className="w-[30px] h-[30px] md:w-[44px] md:h-[44px]"
          />

          <img
            src={notificationTypeImg}
            alt="User Display Picture"
            width={16}
            height={16}
            className="absolute bottom-0 right-[-3px] w-2 h-2 md:w-4 md:h-4"
          />
        </div>
        <div className="w-[85%] md:w-[500px]">
          <p className="text-sm md:text-lg text-white font-medium w-fit">
            {userName + ' ' + '- new badge'}
          </p>
          <p className="text-[#B3B3B3] text-xs">
            {userName + ' ' + '- just earned a new badge'}
          </p>
        </div>
      </div>

      <Button
        variant="default"
        className={`bg-white text-[10px] text-[#0B0A10] px-2 py-[6px] border-none outline-none h-fit transition-all duration-300 hover:bg-[#B3B3B3]`}
      >
        View post
      </Button>
    </div>
  )
}
