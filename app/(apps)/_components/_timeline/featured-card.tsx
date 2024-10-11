import { Button } from '@/components/ui/button'
import Image from 'next/image'
import VerifyIcon from '../../../../components/icons/verifyIcon'

interface FeaturedCardProps {
  className?: string
}
export default function FeaturedCard({ className }: FeaturedCardProps) {
  return (
    <div
      className={`flex flex-col w-full border border-[#FFFFFF14] rounded-[14px] p-6 gap-9 ${className}`}
    >
      <div className="flex items-center w-full justify-between">
        <p className="text-base font-medium ">FEATURED</p>

        <Button className="bg-transparent border-none outline-none rounded-none px-0 py-3 w-fit h-fit text-primary text-xs transition-all duration-300 hover:opacity-80">
          View all
        </Button>
      </div>

      <img
        src="/assets/images/timeline/_other-section/featured.png"
        alt="User alt picture"
        className="w-full h-auto rounded-2xl"
      />

      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center w-full justify-between pb-6 border-b border-[#FFFFFF0D]">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/timeline/Oval.png"
              alt="User Display Picture"
              width={40}
              height={40}
            />

            <div className="flex flex-col">
              <p className="flex gap-1 items-center text-base font-semibold leading-5 ">
                displayname
                <VerifyIcon />
              </p>
              <p className="text-xs leading-5 font-medium text-light">
                @username
              </p>
            </div>
          </div>

          <Button className="bg-primary border-none outline-none font-medium w-fit h-fit text-[#0B0A10] text-[9.6px] transition-all duration-300 hover:opacity-80">
            Follow
          </Button>
        </div>

        <p className="text-sm text-light">
          Passionate NFT holder exploring the future of digital ownership. Join
          me in discovering the limitless possibilities of the NFT ecosystem.
          #NFTCommunity
        </p>
      </div>
    </div>
  )
}
