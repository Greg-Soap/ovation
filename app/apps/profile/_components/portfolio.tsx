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
import ovationService from '@/services/ovation.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getUserId } from '@/lib/helper-func'

interface NFT {
  type: 'eth' | 'Complete' | 'Domain' | 'Collectible' | 'Metaverse' | 'Art'
  isPrivate?: boolean
  id: string
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

function Portfolio({
  nfts,
  isLoading,
  secondaryProfile,
 
}: {
  nfts: NFT[]
  isLoading: boolean
  secondaryProfile?: boolean
 

}) {

  
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
            <p className="text-white text-lg font-semibold">
              No NFTs Available
            </p>
            <p className="text-[#999999] text-sm mt-2">
              There are no NFTs in your collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4">
            {secondaryProfile
              ? filteredNfts.map((nft, index) => (
                  <NFTCard
                    key={index}
                    {...nft}
                    secondaryProfile={secondaryProfile}
                    
                  />
                ))
              : nfts.map((nft, index) => (
                  <NFTCard
                    key={index}
                    {...nft}
                    secondaryProfile={secondaryProfile}
                   
                  />
                ))}
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

function NFTCard({
  imageUrl,
  name,
  description,
  metaData,
  id,
  isPrivate,
  secondaryProfile,
 
}: NFT & { secondaryProfile?: boolean, }) {
const queryClient = useQueryClient()
const userId = getUserId()

const {data: favouriteNfts} = useQuery({
  queryKey: ['favouriteNft', userId],
  queryFn: () => ovationService.getFavouriteNft(userId as string),
})
const isNftFavorite = favouriteNfts?.data?.data?.some((favNft: any) => favNft.id === id)


  const { mutate: hideNft } = useMutation({
    mutationFn: ({nftId, isPublic}:{nftId: string, isPublic: boolean}) =>
      ovationService.hideNft({ nftId, public: isPublic }),
    onSuccess: async (data) => {
    
    await queryClient.invalidateQueries({queryKey: ['nfts', userId]})
      toast.success('NFT ' + (isPrivate ? 'shown' : 'hidden') + ' successfully')
    },
  })

    const { mutate: toggleFavoriteNft } = useMutation({
    mutationFn: (nftId: string) => 
      isNftFavorite 
        ? ovationService.removeFavouriteNft(nftId)
        : ovationService.setFavouriteNft(nftId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['favouriteNft', userId] })
      toast.success(isNftFavorite 
        ? 'NFT removed from favorites successfully'
        : 'NFT added to favorites successfully'
      )
    },
    onError: (error) => {
      //@ts-ignore
      if (error.response?.data?.message === 'Only 3 NFTs can be stored') {
        toast.error('Only 3 NFTs can be made favorite')
      } else {
        toast.error(isNftFavorite
          ? 'Failed to remove NFT from favorites'
          : 'Failed to add NFT to favorites'
        )
      }
    }
  })

  const getImageSrc = () => {
    if (imageUrl) {
      if (imageUrl.startsWith('ipfs://')) {
        return `https://gateway.pinata.cloud/ipfs/${imageUrl.slice(7)}`
      }
      return imageUrl
    }

    if (metaData?.Metadata) {
      const parsedMetadata = JSON.parse(metaData.Metadata)
      const metadataImageUrl = parsedMetadata.image || parsedMetadata.image_url
      if (metadataImageUrl) {
        if (metadataImageUrl.startsWith('ipfs://')) {
          return `https://gateway.pinata.cloud/ipfs/${metadataImageUrl.slice(7)}`
        }
        return metadataImageUrl
      }
    }

    return ''
  }

  const getNFTName = () => {
    if (name) return name
    if (metaData?.Metadata) {
      const parsedMetadata = JSON.parse(metaData.Metadata)
      return parsedMetadata.name || 'Unnamed NFT'
    }
    return 'Unnamed NFT'
  }

  const getNFTDescription = () => {
    if (description) return description
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

  const tDescription = getNFTDescription()
  const truncatedDescription = truncateDescription(tDescription)
  const showReadMore = tDescription.length > 50

  return (
    <div className="flex flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] overflow-hidden h-full relative">
      {isPrivate && (
        <div className="absolute top-2 left-2 bg-[#232227] text-[#CFF073] text-xs font-medium py-1 px-2 rounded-full z-10">
          Private
        </div>
      )}
      <div className="relative pt-[100%]">
        <Image
          src={getImageSrc()}
          alt="NFT Preview"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between bg-[#111115] border-t border-[#FFFFFF0D] p-3 flex-grow">
        <div className="flex items-start justify-between w-full mb-2">
          <div className=" mr-2">
            <p className="text-sm text-[#F8F8FF] font-semibold">
              {getNFTName()}
            </p>
            <p className="text-[#999999] text-xs mt-1 text-wrap break-words">
              {truncatedDescription}
            </p>
            {showReadMore && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="text-[#CFF073] p-0 bg-transparent text-xs ml-1 hover:underline focus:outline-none">
                    Read more
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-[#18181C] text-white">
                  <DialogHeader>
                    <DialogTitle>{getNFTName()}</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-[#999999]">{tDescription}</p>
                </DialogContent>
              </Dialog>
            )}
          </div>
          {!secondaryProfile && (
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white h-8 w-8 p-0"
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
              <PopoverContent className="rounded-[7px] bg-[#232227] flex flex-col w-fit p-0 border-none">
                <Button
                  variant="ghost"
                  onClick={() => toggleFavoriteNft(id)}
                  className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full h-fit border-b border-[#333333] rounded-none"
                >
                {isNftFavorite ? 'Remove from Favorite NFTs' : 'Add to Favorite NFTs'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => hideNft({nftId: id, isPublic: isPrivate? true: false})}
                  className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full h-fit"
                >
                  {isPrivate ? 'Show NFT' : 'Hide NFT'}
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
