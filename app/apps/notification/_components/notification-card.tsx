import type React from 'react'
import Link from 'next/link'
import MoreIcon from '@/components/icons/moreIcon'
import { Button } from '@/components/ui/button'

interface NotificationCardProps {
  userProfilePicture: string
  notificationTypeImg?: string
  userDisplayName?: string
  userName?: string
  content?: string
  secondaryContent?: string
  actionLabel?: string
  onAction?: () => void
  href?: string
  className?: string
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  userProfilePicture,
  notificationTypeImg,
  userDisplayName,
  userName,
  content,
  secondaryContent,
  actionLabel,
  onAction,
  href,
  className,
}) => {
  const CardWrapper = href ? Link : 'div'

  return (
    <CardWrapper
      href={href || '#'}
      className={`${className} w-full flex items-center justify-between px-5 py-4 md:py-7 md:px-8 border-b border-sectionBorder`}
    >
      <div className="flex items-center gap-4 w-fit">
        <div className="flex h-fit relative">
          <img
            src={userProfilePicture}
            alt="User Display Img"
            className="w-[30px] h-[30px] md:w-[44px] md:h-[44px]"
          />
          {notificationTypeImg && (
            <img
              src={notificationTypeImg}
              alt="Notification Type"
              width={16}
              height={16}
              className="absolute bottom-0 right-[-3px] w-2 h-2 md:w-4 md:h-4"
            />
          )}
        </div>
        <div className="w-[90%] md:w-[500px]">
          <p className="text-sm md:text-lg text-white font-medium w-fit">
            {content}
          </p>
          {secondaryContent && (
            <p className="text-white70 text-xs">{secondaryContent}</p>
          )}
        </div>
      </div>

      {actionLabel ? (
        <Button
          variant="default"
          onClick={onAction}
          className="bg-white uppercase text-[10px] text-buttonTextColor px-2 py-[6px] border-none outline-none h-fit transition-all duration-300 hover:bg-white70"
        >
          {actionLabel}
        </Button>
      ) : (
        <div className="p-1">
          <MoreIcon />
        </div>
      )}
    </CardWrapper>
  )
}

export default NotificationCard
