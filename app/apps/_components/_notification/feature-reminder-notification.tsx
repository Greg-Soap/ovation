import { Button } from '@/components/ui/button'

export default function FeatureReminderNotification({
  userProfilePicture,
  userName,
  className,
}: any) {
  return (
    <div
      className={`${className} w-full items-center justify-between px-5 py-4 md:py-7 md:px-8 border-b border-[#1A1A1A]`}
    >
      <div className="flex items-center gap-4 w-fit">
        <div className="flex items-center justify-center relative bg-[#232227] rounded-full h-10 w-10">
          <img
            src={userProfilePicture}
            alt="User Display Picture"
            className="w-[19px] h-[19px]"
          />
        </div>
        <div className="w-[85%] md:w-[500px]">
          <p className="text-sm md:text-lg text-white font-medium w-fit">
            Reminder: Feature a post
          </p>
          <p className="text-[#B3B3B3] text-xs">
            {userName + ' ' + 'wants you to feature a post'}
          </p>
        </div>
      </div>

      <Button
        variant="default"
        className={`bg-white text-[10px] text-[#0B0A10] px-2 py-[6px] border-none outline-none h-fit transition-all duration-300 hover:bg-[#B3B3B3]`}
      >
        Go to portfolio
      </Button>
    </div>
  )
}
