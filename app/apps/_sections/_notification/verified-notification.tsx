import MoreIcon from '@/components/icons/moreIcon'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const notifications = [
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/profile-add.png',
    notificationHeader: 'Pancake guy follows you',
    nftImage: '',
    post: '',
    displayName: '',
    userName: '@pancakecake',
    comment: '',
    accountDisplayPicture: '',
    isFollow: true,
    isLike: false,
    isRepost: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/heart.png',
    notificationHeader: 'Pancake guy likes your post',
    nftImage: '',
    post: '“Passionate NFT holder exploring the future of digital ownership. Join me in discovering the limitless possibilities of the NFT ecosystem.”',
    displayName: '',
    userName: '',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: true,
    isRepost: false,
    isReply: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/message-text.png',
    notificationHeader: 'Pancake guy replied to your comment',
    nftImage: '',
    post: '',
    displayName: '',
    userName: '@pancakeguy',
    comment: '“that’s nice dude”',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: true,
    isComment: false,
    isClap: false,
    isLikeNft: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/message-text.png',
    notificationHeader: 'Pancake guy commented on your post',
    nftImage: '',
    post: '',
    displayName: '',
    userName: '',
    comment: '“that’s nice dude”',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: false,
    isComment: true,
    isClap: false,
    isLikeNft: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/@.png',
    notificationHeader: 'Pancake guy mentioned you',
    nftImage: '',
    post: '',
    displayName: '',
    userName: '@pancakeguy',
    comment: '“that’s nice dude”',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: true,
    isComment: false,
    isClap: false,
    isLikeNft: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/repeat.png',
    notificationHeader: 'Pancake guy retweet your post',
    nftImage: '',
    post: '“that’s nice dude”',
    displayName: '',
    userName: '',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: true,
    isReply: false,
    isComment: false,
    isClap: false,
    isLikeNft: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/Vector.png',
    notificationHeader: 'Pancake guy clap your post',
    nftImage: '',
    post: '“Passionate NFT holder exploring the future of digital ownership. Join me in discovering the limitless possibilities of the NFT ecosystem.”',
    displayName: 'Bored Ape',
    userName: '',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: false,
    isComment: false,
    isClap: true,
    isLikeNft: false,
  },
  {
    userProfilePicture: '/assets/images/timeline/Shape.png',
    notificationTypeImg: '/assets/images/notification/heart.png',
    notificationHeader: 'Pancake guy likes your NFT',
    nftImage: '/assets/images/timeline/Oval.png',
    post: '',
    displayName: 'Bored Ape',
    userName: '',
    comment: '',
    accountDisplayPicture: '',
    isFollow: false,
    isLike: false,
    isRepost: false,
    isReply: false,
    isComment: false,
    isClap: false,
    isLikeNft: true,
  },
]

export default function VerifiedNotification() {
  return (
    <div className="col-span-2 w-full flex flex-col border border-[#1A1A1A] other-link overflow-auto">
      {notifications.map((notification, index) => (
        <div
          className="w-full flex items-center justify-between py-7 px-8 border-b border-[#1A1A1A]"
          key={index}
        >
          <div className="flex items-center gap-4 w-fit">
            <div className="flex h-fit relative">
              <img
                src={notification.userProfilePicture}
                alt="User Display Picture"
                className="w-[44px] h-[44px]"
              />

              <Image
                src={notification.notificationTypeImg}
                alt="User Display Picture"
                width={16}
                height={16}
                className="absolute bottom-0 right-[-3px]"
              />
            </div>
            <div className="w-[500px]">
              <p className="text-lg text-white font-medium w-fit">
                {notification.notificationHeader}
              </p>
              <p
                className={`text-sm text-[#B3B3B3] w-[85%] items-center ${notification.isReply ? 'hidden' : 'flex'}`}
              >
                {notification.post}
              </p>
              <p
                className={`${notification.isReply ? '' : 'hidden'} text-sm text-[#B3B3B3]`}
              >
                replying to{' '}
                <span className="text-white"> {notification.userName} </span>{' '}
                {notification.comment}
              </p>

              <p
                className={`${notification.isComment ? '' : 'hidden'} text-sm text-[#B3B3B3]`}
              >
                {notification.comment}
              </p>
              <p
                className={`text-sm text-[#B3B3B3] items-center gap-2 ${notification.isLikeNft ? 'flex' : 'hidden'}`}
              >
                <Image
                  src={notification.nftImage}
                  alt="NFT Image"
                  width={16}
                  height={16}
                  className={`${notification.isLikeNft ? 'flex' : 'hidden'}`}
                />
                {notification.displayName}
              </p>
            </div>
          </div>

          <Button
            variant="default"
            className={`${notification.isFollow ? 'flex' : 'hidden'} bg-white text-[10px] text-[#0B0A10] px-2 py-[6px] border-none outline-none h-fit transition-all duration-300 hover:bg-[#B3B3B3]`}
          >
            Follow back
          </Button>

          <div className={`p-1  ${notification.isFollow ? 'hidden' : 'flex'}`}>
            <MoreIcon />
          </div>
        </div>
      ))}
    </div>
  )
}
