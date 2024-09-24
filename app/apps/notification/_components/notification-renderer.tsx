import type React from 'react'
import type { NotificationItem } from './types'
import NotificationCard from './notification-card'

export const NotificationFactory: React.FC<NotificationItem> = (props) => {
  const {
    type,
    userProfilePicture,
    notificationTypeImg,
    userDisplayName,
    userName,
  } = props

  switch (type) {
    case 'Follow':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userDisplayName} follows you`}
          secondaryContent={userName}
          actionLabel="Follow back"
          onAction={() => {
            /* Handle follow back */
          }}
        />
      )

    case 'Badge':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userDisplayName} follows you`}
          secondaryContent={userName}
          actionLabel="Follow back"
          onAction={() => {
            /* Handle follow back */
          }}
        />
      )

    default:
      return null
  }
}
