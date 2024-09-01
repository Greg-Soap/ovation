'use client'

import { FC } from 'react'
import Image from 'next/image'

interface NftCardProps {
  type: 'featured' | 'portfolio' | 'created'
  imgSrc: string
  artist: string
  price: number
  className?: string
}

const NftCard: FC<NftCardProps> = ({
  type,
  imgSrc,
  artist,
  price,
  className,
}: any) => {
  return (
    <div
      className={`w-full ${className} ${type === 'featured' ? 'lg:w-[248px]' : 'min-w-[261px] max-w-[296px]'} flex flex-col border border-[#FFFFFF14] rounded-[10px]`}
    >
      <Image
        src={imgSrc}
        alt="NFT Preview"
        width={500}
        height={217}
        className="rounded-t-[10px]"
      />

      <div
        className={`flex items-center justify-between ${type === 'featured' ? 'bg-[#18181C] py-2' : 'bg-[#111115] py-3'} border border-[#FFFFFF0D] px-3 rounded-b-[10px]`}
      >
        <div className="flex flex-col items-start">
          <p className="text-[11px] text-[#999999]">Artist</p>
          <p className="text-[#F8F8FF] text-xs font-semibold">{artist}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[11px] text-[#999999]">Price</p>
          <p className="text-[#F8F8FF] text-xs font-semibold">{`${price} ETH`}</p>
        </div>
      </div>
    </div>
  )
}

export default NftCard
