import EventIcon from '@/components/icons/eventIcon'
import Image from 'next/image'
import Badges from './badges'
import Socials from './socials'
import FavouriteNft from './favourite-nft'
import type { ProfileData } from '@/models/all.model'

export default function UserProfile({ profileData }: { profileData: ProfileData }) {
  return (
    <div className='col-span-1 flex flex-col px-4 pb-4 gap-11 border-r border-[#1A1A1A] bg-[#111115] h-full'>
      <Image
        src='/assets/images/profile/image1.png'
        alt='User Display Picture'
        width={131}
        height={131}
        className='rounded-full -mt-[75px]'
      />

      <div className='flex flex-col gap-9'>
        <div className='w-full h-fit flex flex-col gap-0.5'>
          <div className='flex items-center gap-[13px]'>
            <p className='text-[#F8F8FF] text-[22px] font-semibold'>The pancake chief</p>

            <Image
              src='/assets/images/profile/Rectangle1.png'
              alt='User Display Picture'
              width={21}
              height={21}
              className='bg-white rounded-full'
            />
          </div>

          <p className='flex items-center gap-1 text-base text-[#B3B3B3]'>@pancakeguy</p>
        </div>

        <div className='w-full h-fit px-5 py-[15px] rounded-[20px] bg-[#18181C] flex flex-col gap-5'>
          <p className='text-xs text-[#F8F8FF] font-semibold'>CEO @ Slack </p>
          <p className='font-normal text-[#E6E6E6] text-sm'>
            Web3 dude, focusing on getting more foes friends and collections, WAGMI, Web3
          </p>

          <div className='flex items-center gap-6'>
            <p className='flex items-center text-[#E6E6E6] text-sm font-semibold gap-2'>
              752 <span className='font-medium text-[#808080]'>Following</span>
            </p>

            <p className='flex items-center text-[#E6E6E6] text-sm font-semibold gap-[9px]'>
              11K <span className='font-medium text-[#808080] text-sm'>Followers</span>
            </p>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1.5'>
              <Image
                src='/assets/images/profile/medium.png'
                alt='User Display Picture'
                width={13}
                height={13}
                className='rounded-full'
              />
              <p className='text-xs text-[#B3B3B3]'>Department</p>
            </div>
            <div className='flex items-center gap-1.5'>
              <Image
                src='/assets/images/profile/location.png'
                alt='User Display Picture'
                width={13}
                height={13}
                className='rounded-full'
              />
              <p className='text-xs text-[#B3B3B3]'>Web3</p>
            </div>
            <div className='flex items-center gap-1.5'>
              <EventIcon className='w-[13px] h-[13px] stroke-[#B3B3B3]' />
              <p className='text-xs text-[#B3B3B3]'>Dec 2021</p>
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
