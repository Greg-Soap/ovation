import NftCard from './nft-card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import Editicon from '@/components/icons/edit-icon'
import PlusIcon from '@/components/icons/plus-icon'
import Link from 'next/link'

export default function FeaturedSection({ featured, showButtons }: any) {
  return (
    <div className="flex flex-col mt-5 w-[95%] h-fit border border-[#353538] rounded-[14px] px-5 py-[15px] gap-[30px]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#F8F8FF] font-medium">Featured</p>

        <div
          className={`${showButtons ? 'flex' : 'hidden'} items-center gap-2.5`}
        >
          <Popover>
            <PopoverTrigger>
              <PlusIcon className="stroke-[#CFF073] w-4 h-4" />
            </PopoverTrigger>
            <PopoverContent className="max-w-[104px] flex flex-col rounded-[6px] bg-[#232227] p-0 border-none">
              <Button className="bg-[#232227] px-2 py-2.5 text-[11px] text-[#F8F8FF] rounded-none w-full h-fit rounded-t-[6px] flex justify-start">
                Event
              </Button>
              <Button className="bg-[#232227] px-2 py-2.5 text-[11px] text-[#F8F8FF] rounded-none w-full h-fit border-t border-[#333333] flex justify-start">
                NFT
              </Button>
              <Button className="bg-[#232227] px-2 py-2.5 text-[11px] text-[#F8F8FF] rounded-none w-full h-fit border-t border-[#333333] rounded-b-[6px] flex justify-start">
                Article
              </Button>
            </PopoverContent>
          </Popover>

          <Button asChild className="p-1 h-fit rounded-none bg-transparent">
            <Link href={`/apps/profile/edit-featured`}>
              <Editicon className="fill-[#CFF073] w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {featured.map((item: any, index: number) => (
          <NftCard
            key={index}
            type="featured"
            imgSrc={item.imgSrc}
            artist={item.artist}
            price={item.price}
            className="lg:w-[248px] bg-[#18181C]"
          />
        ))}
      </div>
    </div>
  )
}
