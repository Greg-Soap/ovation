'use client'
import { Skeleton } from '@/components/ui/skeleton'
import type { NFT } from '@/models/all.model'
import { NFTCard } from '../ui/nft-card'
import { useAppStore } from '@/store/use-app-store'

export default function Portfolio({
  nfts,
  isLoading,
}: {
  nfts: NFT[]
  isLoading: boolean
}) {
  const { isUser } = useAppStore()

  const filteredNfts = nfts.filter((nft) => !nft.isPrivate)

  return (
    <div className="w-full py-10 flex items-center justify-center">
      <div className="w-full max-w-7xl">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <NFTCardSkeleton key={index} />
            ))}
          </div>
        ) : !nfts || nfts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className=" text-lg font-semibold">No NFTs Available</p>
            <p className="text-lighter text-sm mt-2">
              There are no NFTs in your collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4">
            {!isUser
              ? filteredNfts.map((nft, index) => (
                  <NFTCard key={index} {...nft} />
                ))
              : nfts.map((nft, index) => <NFTCard key={index} {...nft} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function NFTCardSkeleton() {
  return (
    <div className="flex flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] overflow-hidden h-full">
      <Skeleton className="w-full pt-[100%]" />
      <div className="flex flex-col justify-between bg-[#111115] border-t border-[#FFFFFF0D] p-3 flex-grow">
        <div className="flex items-start justify-between w-full mb-2">
          <div className="flex-grow mr-2">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-full" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}
