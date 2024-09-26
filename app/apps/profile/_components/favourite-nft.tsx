import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

interface FavouriteNft {
  id: string
  imageUrl: string
  name: string
}

export default function FavouriteNft({ userId }: { userId: string }) {
  const { data: favouriteNfts, isLoading } = useQuery({
    queryKey: ['favouriteNft', userId],
    queryFn: () => ovationService.getFavouriteNft(userId),
  })


  return (
    <div className="flex flex-col bg-[#18181C] rounded-[20px] gap-4 px-5 py-[18px]">
      <p className="text-xs font-medium text-[#808080]">Favorite NFT</p>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-[6px]">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full aspect-square bg-gray-700 animate-pulse rounded-md"
            />
          ))}
        </div>
      ) : favouriteNfts && favouriteNfts?.data?.data?.length > 0 ? (
        <div className="grid grid-cols-3 gap-[6px]">
          {favouriteNfts?.data?.data?.slice(0, 3).map((nft: FavouriteNft) => (
            <div key={nft.id} className="relative group">
              <Image
                src={getImageSrc(nft.imageUrl)}
                alt={nft.name}
                width={100}
                height={100}
                className="w-full h-auto object-cover rounded-md"
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {getNFTName(nft.name)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No favorite NFTs found</p>
      )}
    </div>
  )
}

const getNFTName = (name: string) => {
  if (name) return name

  return 'Unnamed NFT'
}

const getImageSrc = (imageUrl: string) => {
  if (imageUrl) {
    if (imageUrl.startsWith('ipfs://')) {
      return `https://gateway.pinata.cloud/ipfs/${imageUrl.slice(7)}`
    }
    return imageUrl
  }

  return ''
}
