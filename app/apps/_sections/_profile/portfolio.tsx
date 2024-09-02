'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import LikeIcon from '@/components/icons/likeIcon'

export default function Portfolio({ data }: { data: CreatedNFTData }) {
  const [items, setItems] = useState<CreatedNFT[]>(data)

  const toggleLike = (index: number) => {
    const updatedList = items.map((item, i) =>
      i === index ? { ...item, isLiked: !item.isLiked } : item,
    )

    setItems(updatedList)
  }

  return (
    <div className="w-full h-fit pt-10 flex items-center justify-center">
      <Tabs
        defaultValue="All"
        className="w-[95%] max-h-fit flex flex-col gap-[34px]"
      >
        <TabsList className="flex justify-between items-center w-full overflow-x-scroll">
          <div className="flex items-center gap-1.5">
            {buttons.map((item, index) => (
              <TabsTrigger
                value={item.name}
                className="bg-[#232227] text-[#999999] p-2.5 rounded-[50px] max-h-fit text-[10px] border-none data-[state=active]:bg-white data-[state=active]:text-[#232227]"
                key={index}
              >
                {item.name + '(' + item.itemCount + ')'}
              </TabsTrigger>
            ))}
          </div>

          <Select>
            <SelectTrigger className="w-fit rounded-[7px] px-2 py-2.5 otline-none border border-[#333333] text-white text-xs bg-[#232227] h-fit">
              <SelectValue placeholder="Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </TabsList>
        <TabsContent value="All">
          <div className="flex flex-wrap gap-x-4 gap-y-[34px]">
            {items.map((item, index) => (
              <PortfolioCard
                key={index}
                isLiked={item.isLiked}
                imgSrc={item.imgSrc}
                artist={item.artist}
                price={item.price}
                className={`flex`}
                likeFunction={() => toggleLike(index)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Complete">
          <div className="flex h-fit flex-wrap gap-x-4 gap-y-[34px]">
            {items.map((item, index) => (
              <PortfolioCard
                key={index}
                isLiked={item.isLiked}
                imgSrc={item.imgSrc}
                artist={item.artist}
                price={item.price}
                className={`${item.type === 'isComplete' ? 'flex' : 'hidden'}`}
                likeFunction={() => toggleLike(index)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Domain">
          <div className="flex flex-wrap gap-x-4 gap-y-[34px]">
            {items.map((item, index) => (
              <PortfolioCard
                key={index}
                isLiked={item.isLiked}
                imgSrc={item.imgSrc}
                artist={item.artist}
                price={item.price}
                className={`${item.type === 'isDomain' ? 'flex' : 'hidden'}`}
                likeFunction={() => toggleLike(index)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Collectibles">
          <div className="flex flex-wrap gap-x-4 gap-y-[34px]">
            {items.map((item, index) => (
              <PortfolioCard
                key={index}
                isLiked={item.isLiked}
                imgSrc={item.imgSrc}
                artist={item.artist}
                price={item.price}
                className={`${item.type === 'isCollectible' ? 'flex' : 'hidden'}`}
                likeFunction={() => toggleLike(index)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Metaverse">
          <div className="flex flex-wrap gap-x-4 gap-y-[34px]">
            {items.map((item, index) => (
              <PortfolioCard
                key={index}
                isLiked={item.isLiked}
                imgSrc={item.imgSrc}
                artist={item.artist}
                price={item.price}
                className={`${item.type === 'isMetaverse' ? 'flex' : 'hidden'}`}
                likeFunction={() => toggleLike(index)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Art">
          <div className="flex flex-wrap gap-x-4 gap-y-[34px]">
            {items.map((item, index) => (
              <PortfolioCard
                key={index}
                isLiked={item.isLiked}
                imgSrc={item.imgSrc}
                artist={item.artist}
                price={item.price}
                className={`${item.type === 'isArt' ? 'flex' : 'hidden'}`}
                likeFunction={() => toggleLike(index)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CardProps {
  index?: number
  isLiked?: boolean
  imgSrc?: string
  artist?: string
  price?: number
  className?: string
  likeFunction?: () => void | undefined
}

function PortfolioCard({
  index,
  isLiked,
  imgSrc,
  artist,
  price,
  className,
  likeFunction,
}: CardProps) {
  return (
    <div
      className={`${className} w-full min-w-[261px] max-w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] relative m-0`}
      key={index}
    >
      <div className="flex items-center p-2 rounded-full bg-[#333726] absolute right-5 top-3">
        <LikeIcon
          className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-[#CFF073] fill-none'}`}
          onClick={() => likeFunction && likeFunction()}
        />
      </div>
      <Image
        src={`${imgSrc}`}
        alt="NFT Preview"
        width={500}
        height={217}
        className="rounded-t-[10px]"
      />

      <div className="flex flex-col items-center justify-between bg-[#111115] border border-[#FFFFFF0D] px-3 py-3 rounded-b-[10px] gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <p className="text-xs text-[#F8F8FF] font-semibold">{artist}</p>
            <p className="text-[#999999] text-[11px]">{price + ' ' + 'ETH'}</p>
          </div>

          <Popover>
            <PopoverTrigger>
              <Button
                variant="default"
                className="text-white gap-1 flex items-center bg-transparent h-fit p-1"
              >
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="rounded-[7px] bg-[#232227] flex flex-col w-fit p-0 border-none">
              <Button
                variant="default"
                className="text-white text-xs justify-start font-medium px-3 py-[10px] bg-transparent w-full h-fit border-b border-[#333333] rounded-none"
              >
                Feature NFT
              </Button>
              <Button
                variant="default"
                className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full bg-transparent h-fit"
              >
                Make NFT public
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

interface Button {
  name: string
  itemCount: number
}

interface CreatedNFT {
  type: 'isComplete' | 'isDomain' | 'isCollectible' | 'isMetaverse' | 'isArt'
  imgSrc: string
  artist: string
  price: number
  isLiked: boolean
}

type CreatedNFTData = CreatedNFT[]

const buttons: Button[] = [
  { name: 'All', itemCount: 20 },
  { name: 'Complete', itemCount: 4 },
  { name: 'Domain', itemCount: 4 },
  { name: 'Collectibles', itemCount: 4 },
  { name: 'Metaverse', itemCount: 4 },
  { name: 'Art', itemCount: 4 },
]

/*const createdNFT: CreatedNFT[] = [
  {
    type: 'isComplete',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Bored Ape',
    price: 14,
    isLiked: false,
  },
  {
    type: 'isDomain',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Micheal Marcagi',
    price: 14,
    isLiked: false,
  },
  {
    type: 'isCollectible',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Hozier',
    price: 14,
    isLiked: false,
  },
  {
    type: 'isMetaverse',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Royel Otis',
    price: 14,
    isLiked: false,
  },
  {
    type: 'isArt',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Matt Hansen',
    price: 14,
    isLiked: false,
  },
]
*/
