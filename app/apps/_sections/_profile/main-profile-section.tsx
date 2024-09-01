import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Created from './created'
import Stats from './stats'
import Portfolio from './portfolio'
import Experience from './experience'
import ComingSoon from './coming-soon'
import Editicon from '@/components/icons/edit-icon'
import PlusIcon from '@/components/icons/plus-icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import NftCard from '../../_components/_profile/nft-card'

export default function MainProfileSection() {
  return (
    <div className="col-span-2 h-full flex flex-col items-center bg-[#111115]">
      <div className="flex flex-col mt-5 w-[95%] h-fit border border-[#353538] rounded-[14px] px-5 py-[15px] gap-[30px]">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#F8F8FF] font-medium">Featured</p>

          <div className="flex items-center gap-2.5">
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
          {featured.map((item, index) => (
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

      <Tabs defaultValue="post" className="w-full my-16">
        <TabsList className="items-center rounded-none px-7 pt-5 pb-0 border-y gap-4 border-[#353538] w-full h-fit overflow-x-scroll justify-start">
          <TabsTrigger
            value="post"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Post
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Replies
          </TabsTrigger>
          <TabsTrigger
            value="portfolio"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Portfolio
          </TabsTrigger>
          <TabsTrigger
            value="created"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Created
          </TabsTrigger>
          <TabsTrigger
            value="stat"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Stat
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="text-xs text-[#999999] px-5 py-[10px] m-0 bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Experience
          </TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <ComingSoon />
        </TabsContent>
        <TabsContent value="replies">
          <ComingSoon />
        </TabsContent>
        <TabsContent value="portfolio">
          <Portfolio />
        </TabsContent>
        <TabsContent value="created">
          <Created />
        </TabsContent>
        <TabsContent value="stat">
          <Stats />
        </TabsContent>
        <TabsContent value="experience">
          <Experience />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Featured {
  imgSrc: string
  artist: string
  price: number
}

const featured: Featured[] = [
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Bored Ape',
    price: 14,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Bored Ape',
    price: 14,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Bored Ape',
    price: 14,
  },
]
