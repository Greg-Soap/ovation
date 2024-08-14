import Link from 'next/link'
import MoreIcon from '@/components/icons/moreIcon'

export default function LikeNftNotification({
  userProfilePicture,
  notificationTypeImg,
  userDisplayName,
  nftImage,
  nftName,
  className,
}: any) {
  return (
    <Link
      href={'#'}
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
        <div className="w-[90%] md:w-[500px]">
          <p className="text-sm md:text-lg text-white font-medium w-fit">
            {`${userDisplayName} liked your NFT`}
          </p>
          <div className="flex items-center gap-[3px]">
            <img src={nftImage} alt="NFT image" className="w-[14px] h-[14px]" />
            <p className="text-[#B3B3B3] text-xs">{nftName}</p>
          </div>
        </div>
      </div>

      <div className={`p-1`}>
        <MoreIcon />
      </div>
    </Link>
  )
}
