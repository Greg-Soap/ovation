import ClapNotification from '../../_components/_notification/clap-notification'
import CommentNotification from '../../_components/_notification/comment-notification'
import FeatureReminderNotification from '../../_components/_notification/feature-reminder-notification'
import FollowNotification from '../../_components/_notification/follow-notification'
import FollowerBadgeNotification from '../../_components/_notification/follower-new-badge-notification'
import FollowerExpNotification from '../../_components/_notification/follower-new-exp-notification'
import LikeNftNotification from '../../_components/_notification/like-nft-notification'
import LikePostNotification from '../../_components/_notification/like-post-notification'
import MentionNotification from '../../_components/_notification/mention-notification'
import PersonalBadgeNotification from '../../_components/_notification/personal-new-badge-notification'
import PersonalNewExpNotification from '../../_components/_notification/personal-new-exp'
import PostReminderNotification from '../../_components/_notification/post-reminder-notification'
import ReplyNotification from '../../_components/_notification/reply-notification'
import RetweetNotification from '../../_components/_notification/retweet-notification'

const notification = [
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/profile-add.png',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: 'Pancake guy',
    userName: '@pancakecake',
    comment: '',
    accountDisplayPicture: '',
    isFollow: true,
    isLike: false,
    isRepost: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/heart.png',
    nftImage: '',
    post: '“Passionate NFT holder exploring the future of digital ownership. Join me in discovering the limitless possibilities of the NFT ecosystem.”',
    nftName: '',
    userDisplayName: 'Pancake guy',
    userName: '@pancakecake',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: true,
    isRepost: false,
    isReply: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/message-text.png',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: 'Pancake guy',
    userName: '@pancakecake',
    comment: '“that’s nice dude”',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: true,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/message-text.png',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: 'Pancake guy',
    userName: '@pancakecake',
    comment: '“that’s nice dude”',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: false,
    isComment: true,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/@.png',
    notificationHeader: 'Pancake guy likes your NFT',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: 'Pancake guy',
    userName: '@pancakecake',
    comment: '“that’s nice dude”',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: false,
    isMention: true,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/repeat.png',
    nftImage: '',
    post: '“that’s nice dude”',
    nftName: '',
    userDisplayName: 'Pancake guy',
    userName: '@pancakecake',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: true,
    isReply: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/Vector.png',
    nftImage: '',
    post: '“Passionate NFT holder exploring the future of digital ownership. Join me in discovering the limitless possibilities of the NFT ecosystem.”',
    nftName: '',
    userDisplayName: 'Pancake guy',
    userName: '@pancakecake',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: false,
    isComment: false,
    isClap: true,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/heart.png',
    nftImage: '/assets/images/timeline/Oval.png',
    post: '',
    nftName: 'Bored Ape',
    userDisplayName: 'Pancake guy',
    userName: '@pancakecake',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: false,
    isComment: false,
    isClap: false,
    isLikeNft: true,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/info/card2/card2-2.png',
    notificationTypeImg: '',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: '',
    userName: '',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: true,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/info/card2/card2-2.png',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: '',
    userName: '@pancakeguy',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: true,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/notification/briefcase.png',
    notificationTypeImg: '',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: '',
    userName: '',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: true,
    followerExperience: false,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/briefcase.png',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: '',
    userName: '@username',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: true,
    featureReminder: false,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/notification/feature-reminder.png',
    notificationTypeImg: '',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: '',
    userName: '@username',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: true,
    postReminder: false,
  },
  {
    userProfilePicture: '/assets/images/notification/document.png',
    notificationTypeImg: '',
    nftImage: '',
    post: '',
    nftName: '',
    userDisplayName: '',
    userName: '@username',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
    isPersonalNewBadge: false,
    followerNewBadge: false,
    personalNewExperience: false,
    followerExperience: false,
    featureReminder: false,
    postReminder: true,
  },
]

export default function MainNotification() {
  return (
    <section className="col-span-3 lg:col-span-2 w-full h-[100vh] flex flex-col border border-[#1A1A1A] other-link overflow-auto">
      <p className="w-full py-7 px-8 text-[22px] text-[#F8F8FF] font-medium border-b border-[#1A1A1A]">
        Notifications
      </p>

      {notification.map((item, index) => (
        <>
          <FollowNotification
            userDisplayName={item.userDisplayName}
            userProfilePicture={item.userProfilePicture}
            userName={item.userName}
            notificationTypeImg={item.notificationTypeImg}
            className={`${item.isFollow ? 'flex' : 'hidden'}`}
            key={index}
          />

          <LikePostNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userDisplayName={item.userDisplayName}
            post={item.post}
            className={`${item.isLike ? 'flex' : 'hidden'}`}
            key={index}
          />

          <ReplyNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userDisplayName={item.userDisplayName}
            userName={item.userName}
            comment={item.comment}
            className={`${item.isReply ? 'flex' : 'hidden'}`}
            key={index}
          />

          <CommentNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userDisplayName={item.userDisplayName}
            comment={item.comment}
            className={`${item.isComment ? 'flex' : 'hidden'}`}
            key={index}
          />

          <MentionNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userDisplayName={item.userDisplayName}
            userName={item.userName}
            comment={item.comment}
            className={`${item.isMention ? 'flex' : 'hidden'}`}
            key={index}
          />

          <RetweetNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userDisplayName={item.userDisplayName}
            post={item.post}
            className={`${item.isRepost ? 'flex' : 'hidden'}`}
            key={index}
          />

          <ClapNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userDisplayName={item.userDisplayName}
            post={item.post}
            className={`${item.isClap ? 'flex' : 'hidden'}`}
            key={index}
          />

          <LikeNftNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userDisplayName={item.userDisplayName}
            nftImage={item.nftImage}
            nftName={item.nftName}
            className={`${item.isLikeNft ? 'flex' : 'hidden'}`}
            key={index}
          />

          <PersonalBadgeNotification
            userProfilePicture={item.userProfilePicture}
            className={`${item.isPersonalNewBadge ? 'flex' : 'hidden'}`}
            key={index}
          />

          <FollowerBadgeNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userName={item.userName}
            className={`${item.followerNewBadge ? 'flex' : 'hidden'}`}
            key={index}
          />

          <PersonalNewExpNotification
            userProfilePicture={item.userProfilePicture}
            className={`${item.personalNewExperience ? 'flex' : 'hidden'}`}
            key={index}
          />

          <FollowerExpNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userName={item.userName}
            className={`${item.followerExperience ? 'flex' : 'hidden'}`}
            key={index}
          />

          <FeatureReminderNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userName={item.userName}
            className={`${item.featureReminder ? 'flex' : 'hidden'}`}
            key={index}
          />

          <PostReminderNotification
            userProfilePicture={item.userProfilePicture}
            notificationTypeImg={item.notificationTypeImg}
            userName={item.userName}
            className={`${item.postReminder ? 'flex' : 'hidden'}`}
            key={index}
          />
        </>
      ))}
    </section>
  )
}
