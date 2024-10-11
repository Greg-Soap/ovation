import type { FeaturedUser } from '@/app/types'
import { formatUsername } from '@/lib/helper-func'
import VerifyIcon from '@/components/icons/verifyIcon'
import { Button } from '@/components/ui/button'

export function Featured(user: FeaturedUser) {
  return (
    <div className="border border-[#FFFFFF14] rounded-[14px] p-6 gap-9 flex flex-col">
      <div className="flex items-center w-full justify-between">
        <p className="text-base font-medium ">FEATURED</p>
        {/* <Button className='bg-white text-[#0B0A10] font-semibold border-none outline-none px-4 py-[10px] rounded-[400px] w-fit h-fit text-xs transition-all duration-300 hover:opacity-80'>
          View all
        </Button> */}
      </div>
      <div
        id="featured-user"
        className="flex-col lg:flex-row flex gap-10 items-center w-full"
      >
        <img
          src={user.img}
          alt={`${user.userName}'s display`}
          className="w-full lg:w-[50%] h-auto rounded-2xl"
        />
        <div className="flex flex-col max-w-[372px] gap-4">
          <div className="flex items-center w-full justify-between pb-6 border-b border-[#FFFFFF0D]">
            <div className="flex items-center gap-2">
              <img
                src={user.img}
                alt={`${user.userName}'s display`}
                className="rounded-full w-12 h-12"
              />
              <div className="flex flex-col">
                <p className="flex gap-1 items-center text-base font-semibold leading-5 ">
                  {user.displayName}
                  <VerifyIcon />
                </p>
                <p className="text-xs leading-5 font-medium text-light">
                  {formatUsername(user.userName)}
                </p>
              </div>
            </div>
            <Button className="bg-primary px-2 py-[6px] border-none outline-none font-medium w-fit h-fit text-[#0B0A10] text-[9.6px] transition-all duration-300 hover:opacity-80">
              Follow
            </Button>
          </div>
          <p className="text-sm text-light pb-6 border-b border-[#FFFFFF0D]">
            {user.desc}
          </p>
          <div className="flex w-full gap-2">
            {[
              { label: 'NFT count', value: user.nftCount },
              { label: 'Arch Tokens', value: user.archToken },
              { label: 'Badges', value: user.badges },
            ].map((item, index) => (
              <p
                key={index}
                className="rounded-full border-[1px] text-[10px] py-1 px-2  bg-[#18181C] border-[#353538]"
              >
                {`${item.label}: ${item.value}`}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
