'use client'

import type { FC } from 'react'
import Image from 'next/image'

interface NftCardProps {
  type: 'featured' | 'created'
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
      className={`w-full ${className}  flex flex-col border border-white08 rounded-[10px]`}
    >
      <Image
        src={imgSrc}
        alt="NFT Preview"
        width={500}
        height={217}
        className="rounded-t-[10px]"
      />

      <div
        className={`flex items-center justify-between ${type === 'featured' ? 'bg-secondaryBg py-2' : 'bg-primaryBg py-3'} border border-white05 px-3 rounded-b-[10px]`}
      >
        <div className="flex flex-col items-start">
          <p className="text-[11px] text-white60">Artist</p>
          <p className="text-white100 text-xs font-semibold">{artist}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[11px] text-white60">Price</p>
          <p className="text-white100 text-xs font-semibold">{`${price} ETH`}</p>
        </div>
      </div>
    </div>
  )
}

export default NftCard
