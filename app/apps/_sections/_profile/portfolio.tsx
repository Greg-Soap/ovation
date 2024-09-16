'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import LikeIcon from '@/components/icons/likeIcon'

interface NFTCategory {
  name: string
  itemCount: number
}

interface NFT {
  type: 'isComplete' | 'isDomain' | 'isCollectible' | 'isMetaverse' | 'isArt'
  imageUrl: string
  artistName: string
  priceInEth: number
  isLiked: boolean
}

export type NFTCollection = NFT[]

const nftCategories: NFTCategory[] = [
  { name: 'All', itemCount: 20 },
  { name: 'Complete', itemCount: 4 },
  { name: 'Domain', itemCount: 4 },
  { name: 'Collectibles', itemCount: 4 },
  { name: 'Metaverse', itemCount: 4 },
  { name: 'Art', itemCount: 4 },
]

export default function Portfolio({ initialNFTs }: { initialNFTs: NFTCollection }) {
  const [nfts, setNFTs] = useState<NFTCollection>(initialNFTs)

  function toggleNFTLike(index: number) {
    setNFTs((prevNFTs) =>
      prevNFTs.map((nft, i) => (i === index ? { ...nft, isLiked: !nft.isLiked } : nft)),
    )
  }

  return (
    <div className='w-full py-10 flex items-center justify-center'>
      <Tabs defaultValue='All' className='w-[95%] max-h-fit flex flex-col gap-[34px]'>
        <TabsList className='flex justify-between items-center w-full overflow-x-scroll'>
          <div className='flex items-center gap-1.5'>
            {nftCategories.map(({ name, itemCount }) => (
              <TabsTrigger
                key={name}
                value={name}
                className='bg-[#232227] text-[#999999] p-2.5 rounded-[50px] max-h-fit text-[10px] border-none data-[state=active]:bg-white data-[state=active]:text-[#232227]'>
                {`${name}(${itemCount})`}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        {nftCategories.map(({ name }) => (
          <TabsContent key={name} value={name}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {nfts
                .filter((nft) => name === 'All' || nft.type === `is${name}`)
                .map((nft, index) => (
                  <NFTCard
                    key={index}
                    {...nft}
                    className='flex'
                    onLike={() => toggleNFTLike(index)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface NFTCardProps extends NFT {
  className?: string
  onLike?: () => void
}

function NFTCard({ isLiked, imageUrl, artistName, priceInEth, className, onLike }: NFTCardProps) {
  return (
    <div
      className={`${className} flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] relative m-0`}>
      <Button
        variant='default'
        className='flex items-center p-2 rounded-full bg-[#333726] absolute right-5 top-3'
        onClick={onLike}>
        <LikeIcon
          className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-[#CFF073] fill-none'}`}
        />
      </Button>
      <Image
        src={imageUrl}
        alt='NFT Preview'
        width={500}
        height={217}
        className='rounded-t-[10px]'
      />

      <div className='flex flex-col items-center justify-between bg-[#111115] border border-[#FFFFFF0D] px-3 py-3 rounded-b-[10px] gap-3'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-xs text-[#F8F8FF] font-semibold'>{artistName}</p>
            <p className='text-[#999999] text-[11px]'>{`${priceInEth} ETH`}</p>
          </div>

          <Popover>
            <PopoverTrigger>
              <Button
                variant='default'
                className='text-white gap-1 flex items-center bg-transparent h-fit p-1'>
                <div className='w-1 h-1 bg-white rounded-full' />
                <div className='w-1 h-1 bg-white rounded-full' />
                <div className='w-1 h-1 bg-white rounded-full' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='rounded-[7px] bg-[#232227] flex flex-col w-fit p-0 border-none'>
              <Button
                variant='default'
                className='text-white text-xs justify-start font-medium px-3 py-[10px] bg-transparent w-full h-fit border-b border-[#333333] rounded-none'>
                Feature NFT
              </Button>
              <Button
                variant='default'
                className='text-white text-xs justify-start font-medium px-3 py-[10px] w-full bg-transparent h-fit'>
                Make NFT public
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
