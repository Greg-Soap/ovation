import React from 'react'
import Link from 'next/link'
import NftCard from './nft-card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import Editicon from '@/components/icons/edit-icon'
import PlusIcon from '@/components/icons/plus-icon'
import type { FeaturedItem } from '@/models/all.model'
import ExternalEmptyState from '../_secondary-profile/empty-state'

interface FeaturedSectionProps {
  featured: FeaturedItem[]
  showButtons: boolean
  secondaryProfile?: boolean
}

export default function FeaturedSection({
  featured,
  showButtons,
  secondaryProfile,
}: FeaturedSectionProps) {
  const emptyState = secondaryProfile ? (
    <ExternalEmptyState name='FEATURED' username={'@username'} type='featured post' />
  ) : (
    <EmptyFeaturedState />
  )

  if (featured.length === 0) {
    return emptyState
  }

  return (
    <div className='flex flex-col mt-5 w-[95%] h-fit border border-[#353538] rounded-[14px] px-5 py-[15px] gap-[30px]'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-[#F8F8FF] font-medium uppercase'>Featured</p>
        {showButtons && <ActionButtons />}
      </div>
      <FeaturedGrid items={featured} />
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
    <div className='flex flex-col items-center mt-5 w-[95%] h-fit border border-[#353538] rounded-[14px] px-5 pt-[15px] pb-10 gap-[30px]'>
      <p className='text-sm text-[#F8F8FF] font-medium w-full'>FEATURED</p>

      <div className='flex flex-col items-center max-w-[274px] gap-[23px]'>
        <div className='flex flex-col gap-1 items-center'>
          <p className='text-lg text-[#E6E6E6] font-medium text-center'>Nothing here yet</p>
          <p className='text-gray-400 text-xs text-center '>
            Feature some of your NFTs by going to &quot;portfolio&quot; to add a featured NFT
          </p>
        </div>
        <Link href='/apps/profile?tab=portfolio' passHref className='w-full'>
          <Button className='w-full bg-[#CFF073] text-black font-medium py-2 px-4 rounded-full hover:bg-[#BFE063] transition-colors'>
            Go to portfolio
          </Button>
        </Link>
      </div>
    </div>
  )
}
