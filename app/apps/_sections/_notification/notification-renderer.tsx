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
    post,
    comment,
    nftImage,
    nftName,
  } = props

  switch (type) {
    case 'follow':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userDisplayName} follows you`}
          secondaryContent={userName}
          actionLabel='Follow back'
          onAction={() => {
            /* Handle follow back */
          }}
        />
      )

    case 'likePost':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userDisplayName} liked your post`}
          secondaryContent={post}
          href='#'
        />
      )

    case 'reply':
    case 'comment':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userDisplayName} ${type === 'reply' ? 'replied to' : 'commented on'} your post`}
          secondaryContent={comment}
          href='#'
        />
      )

    case 'mention':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userDisplayName} mentioned you`}
          secondaryContent={`replying to ${userName}: ${comment}`}
          href='#'
        />
      )

    case 'retweet':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userDisplayName} reposted your post`}
          secondaryContent={post}
          href='#'
        />
      )

    case 'clap':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userDisplayName} clapped your post`}
          secondaryContent={post}
          href='#'
        />
      )

    case 'likeNft':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userDisplayName} liked your NFT`}
          //   secondaryContent={
          //     <div className='flex items-center gap-[3px]'>
          //       <img src={nftImage} alt='NFT img' className='w-[14px] h-[14px]' />
          //       <span className='text-[#B3B3B3] text-xs'>{nftName}</span>
          //     </div>
          //   }
          href='#'
        />
      )

    case 'personalNewBadge':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          content='New badge'
          secondaryContent='Congratulations - you just earned a new badge'
          actionLabel='Make a post'
          onAction={() => {
            /* Handle make a post */
          }}
        />
      )

    case 'followerNewBadge':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content={`${userName} - new badge`}
          secondaryContent={`${userName} just earned a new badge`}
          actionLabel='View post'
          onAction={() => {
            /* Handle view post */
          }}
        />
      )

    case 'personalNewExperience':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          content='New Experience'
          secondaryContent='Congratulations on your new role'
          actionLabel='Make a post'
          onAction={() => {
            /* Handle make a post */
          }}
        />
      )

    case 'followerExperience':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          notificationTypeImg={notificationTypeImg}
          content='New experience'
          secondaryContent={`${userName} just added a new experience`}
          actionLabel='Make a post'
          onAction={() => {
            /* Handle make a post */
          }}
        />
      )

    case 'featureReminder':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          content='Reminder: Feature a post'
          secondaryContent={`${userName} wants you to feature a post`}
          actionLabel='Go to portfolio'
          onAction={() => {
            /* Handle go to portfolio */
          }}
        />
      )

    case 'postReminder':
      return (
        <NotificationCard
          userProfilePicture={userProfilePicture}
          content='Reminder: Make a post'
          secondaryContent="It's been a while since your last post"
          actionLabel='Create post'
          onAction={() => {
            /* Handle create post */
          }}
        />
      )

    default:
      return null
  }
}
