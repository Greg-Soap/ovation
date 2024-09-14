import React from 'react'
import Link from 'next/link'
import NftCard from './nft-card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import Editicon from '@/components/icons/edit-icon'
import PlusIcon from '@/components/icons/plus-icon'
import type { FeaturedItem } from '@/models/all.model'

interface FeaturedSectionProps {
  featured: FeaturedItem[]
  showButtons: boolean
}

export default function FeaturedSection({ featured, showButtons }: FeaturedSectionProps) {
  return (
    <div className='flex flex-col mt-5 w-[95%] h-fit border border-[#353538] rounded-[14px] px-5 py-[15px] gap-[30px]'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-[#F8F8FF] font-medium uppercase'>Featured</p>
        {showButtons && <ActionButtons />}
      </div>
      {featured?.length > 0 ? <FeaturedGrid items={featured} /> : <EmptyFeaturedState />}
    </div>
  )
}

function ActionButtons() {
  return (
    <div className='flex items-center gap-2.5'>
      <Popover>
        <PopoverTrigger>
          <PlusIcon className='stroke-[#CFF073] w-4 h-4' />
        </PopoverTrigger>
        <PopoverContent className='max-w-[104px] flex flex-col rounded-[6px] bg-[#232227] p-0 border-none'>
          {['Event', 'NFT', 'Article'].map((item, index) => (
            <Button
              key={item}
              className={`bg-[#232227] px-2 py-2.5 text-[11px] text-[#F8F8FF] rounded-none w-full h-fit ${
                index !== 0 ? 'border-t border-[#333333]' : ''
              } ${index === 2 ? 'rounded-b-[6px]' : ''} flex justify-start`}>
              {item}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <Button asChild className='p-1 h-fit rounded-none bg-transparent'>
        <Link href='/apps/profile/edit-featured'>
          <Editicon className='fill-[#CFF073] w-4 h-4' />
        </Link>
      </Button>
    </div>
  )
}

function FeaturedGrid({ items }: { items: FeaturedItem[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      {items.map((item, index) => (
        <NftCard
          key={index}
          type='featured'
          imgSrc={item.imgSrc}
          artist={item.artist}
          price={item.price}
        />
      ))}
    </div>
  )
}

function EmptyFeaturedState() {
  return (
    <div className='bg-[#111115] border border-[#353538] rounded-lg p-8 text-center'>
      <h2 className='text-white text-2xl font-semibold mb-2'>Nothing Here Yet...</h2>
      <p className='text-gray-400 mb-6'>
        Feature some of your NFTs by going to &quot;portfolio&quot; to add a featured NFT
      </p>
      <Link href='/portfolio' passHref>
        <Button className='bg-[#CFF073] text-black font-medium py-2 px-4 rounded-full hover:bg-[#BFE063] transition-colors'>
          Go to portfolio
        </Button>
      </Link>
    </div>
  )
}
