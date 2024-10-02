'use client'

import Image from 'next/image'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

interface NFT {
  type: 'eth' | 'Complete' | 'Domain' | 'Collectible' | 'Metaverse' | 'Art'
  imageUrl: string
  description?: string
  metaData?: {
    Amount: string
    BlockNumber: string
    BlockNumberMinted: string | null
    CollectionBannerImage: string
    CollectionLogo: string
    ContractType: string
    LastMetadataSync: string
    LastTokenUriSync: string
    Metadata: string
    MinterAddress: string
    Name: string | null
    OwnerOf: string
    PossibleSpam: boolean
    RarityLabel: string
    RarityPercentage: number
    RarityRank: number
    Symbol: string | null
    TokenAddress: string
    TokenHash: string
    TokenId: string
    TokenUri: string
    VerifiedCollection: boolean
  }
  name: string | null
  tokenAddress: string
  tokenId: string
}

function Portfolio({ nfts, isLoading }: { nfts: NFT[]; isLoading: boolean }) {
  return (
    <div className="w-full py-10 flex items-center justify-center">
      <div className="w-full max-w-7xl">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <NFTCardSkeleton key={index} />
            ))}
          </div>
        ) : !nfts || nfts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-white100 text-lg font-semibold">
              No NFTs Available
            </p>
            <p className="text-white60 text-sm mt-2">
              There are no NFTs in your collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {nfts.map((nft, index) => (
              <NFTCard key={index} {...nft} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function NFTCardSkeleton() {
  return (
    <div className="flex flex-col bg-secondaryBg border border-white08 rounded-[10px] overflow-hidden h-full">
      <Skeleton className="w-full pt-[100%]" />
      <div className="flex flex-col justify-between bg-primaryBg border-t border-white05 p-3 flex-grow">
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

function NFTCard({ imageUrl, name, metaData }: NFT) {
  const getImageSrc = (url: string) => {
    if (url.startsWith('ipfs://')) {
      return `https://gateway.pinata.cloud/ipfs/${url.slice(7)}`
    }
    return url
  }

  const getNFTName = () => {
    if (metaData?.Metadata) {
      const parsedMetadata = JSON.parse(metaData.Metadata)
      return parsedMetadata.name || name || 'Unnamed NFT'
    }
    return name || 'Unnamed NFT'
  }

  const getNFTDescription = () => {
    if (metaData?.Metadata) {
      const parsedMetadata = JSON.parse(metaData.Metadata)
      return parsedMetadata.description || 'No description available'
    }
    return 'No description available'
  }

  const truncateDescription = (description: string, maxLength = 50) => {
    if (description.length <= maxLength) return description
    return `${description.slice(0, maxLength)}...`
  }

  const description = getNFTDescription()
  const truncatedDescription = truncateDescription(description)
  const showReadMore = description.length > 100

  return (
    <div className="flex flex-col bg-secondaryBg border border-white08 rounded-[10px] overflow-hidden h-full">
      <div className="relative pt-[100%]">
        <Image
          src={getImageSrc(imageUrl)}
          alt="NFT Preview"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between bg-primaryBg border-t border-white05 p-3 flex-grow">
        <div className="flex items-start justify-between w-full mb-2">
          <div className="flex-grow mr-2">
            <p className="text-sm text-white100 font-semibold truncate">
              {getNFTName()}
            </p>
            <p className="text-white60 text-xs mt-1">
              {truncatedDescription}
              {showReadMore && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="text-button p-0 bg-transparent text-xs ml-1 hover:underline focus:outline-none">
                      Read more
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-secondaryBg text-white100">
                    <DialogHeader>
                      <DialogTitle>{getNFTName()}</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-white60">{description}</p>
                  </DialogContent>
                </Dialog>
              )}
            </p>
          </div>
          <Popover>
            <PopoverTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="text-white100 h-8 w-8 p-0"
              >
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-label="Icon for options menu"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="rounded-[7px] bg-popBg flex flex-col w-fit p-0 border-none">
              <Button
                variant="ghost"
                className="text-white100 text-xs justify-start font-medium px-3 py-[10px] w-full h-fit border-b border-white20 rounded-none"
              >
                Feature NFT
              </Button>
              <Button
                variant="ghost"
                className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full h-fit"
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

export default Portfolio
