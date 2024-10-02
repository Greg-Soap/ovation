import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

interface FavouriteNft {
  id: string
  imageUrl: string
}

export default function FavouriteNft({ userId }: { userId: string }) {
  const { data: favouriteNfts, isLoading } = useQuery({
    queryKey: ['favouriteNft', userId],
    queryFn: () => ovationService.getFavouriteNft(userId),
  })

  return (
    <div className="flex flex-col bg-secondaryBg rounded-[20px] gap-4 px-5 py-[18px]">
      <p className="text-xs font-medium text-white50">Favourite NFT</p>
      {favouriteNfts && favouriteNfts?.data?.length > 0 ? (
        <div className="grid grid-cols-3 gap-[6px]">
          {favouriteNfts?.data
            ?.slice(0, 3)
            .map((nft: FavouriteNft) => (
              <Image
                key={nft.id}
                src={nft.imageUrl}
                alt="NFT"
                width={100}
                height={100}
                className="w-full h-auto object-cover rounded-md"
              />
            ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No favourite NFTs found</p>
      )}
    </div>
  )
}
