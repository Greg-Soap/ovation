import EventIcon from '@/components/icons/eventIcon'
import Image from 'next/image'
import Badges from './badges'
import Socials from './socials'
import FavouriteNft from './favourite-nft'

export default function UserProfile() {
  return (
    <div className="col-span-1 flex flex-col h-fit px-4 pb-4 gap-11 border-r border-[#1A1A1A] bg-[#111115] ">
      <Image
        src="/assets/images/profile/image1.png"
        alt="User Display Picture"
        width={160}
        height={160}
        className="rounded-full mt-[-85px]"
      />

      <div className="flex flex-col gap-9">
        <div className="w-full h-fit flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <p className="text-white text-[28px] font-semibold">
              The pancake chief
            </p>

            <Image
              src="/assets/images/profile/Rectangle1.png"
              alt="User Display Picture"
              width={26}
              height={26}
              className="bg-white rounded-full"
            />
          </div>

          <p className="flex items-center gap-1 text-xl text-[#B3B3B3]">
            @pancakeguy
            <span className="leading-[15px] py-1 px-2 bg-[#232227] border border-[#FFFFFF0D] text-[11px] text-white rounded-[44px]">
              OVA TOKEN: 10
            </span>
          </p>
        </div>

        <div className="w-full h-fit px-5 py-[15px] rounded-[20px] bg-[#18181C] flex flex-col gap-5">
          <p className="text-sm text-white font-semibold">CEO @ Slack </p>
          <p className="font-normal text-[#E6E6E6]">
            Web3 dude, focusing on getting more foes friends and collections,
            WAGMI, Web3
          </p>

          <div className="flex items-center gap-6">
            <p className="flex items-center text-[#E6E6E6] text-lg font-semibold gap-[9px]">
              752 <span className="font-medium text-[#808080]">Following</span>
            </p>

            <p className="flex items-center text-[#E6E6E6] text-lg font-semibold gap-[9px]">
              11K <span className="font-medium text-[#808080]">Followers</span>
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[7px]">
              <Image
                src="/assets/images/profile/medium.png"
                alt="User Display Picture"
                width={16}
                height={16}
                className="rounded-full"
              />
              <p className="text-sm text-[#B3B3B3]">Content creator</p>
            </div>
            <div className="flex items-center gap-[7px]">
              <Image
                src="/assets/images/profile/location.png"
                alt="User Display Picture"
                width={16}
                height={16}
                className="rounded-full"
              />
              <p className="text-sm text-[#B3B3B3]">Web3</p>
            </div>
            <div className="flex items-center gap-[7px]">
              <EventIcon className="w-4 h-4 stroke-[#B3B3B3]" />
              <p className="text-sm text-[#B3B3B3]">Dec 2021</p>
            </div>
          </div>
        </div>

        <Badges />

        <Socials />

        <FavouriteNft />
      </div>
    </div>
  )
}
