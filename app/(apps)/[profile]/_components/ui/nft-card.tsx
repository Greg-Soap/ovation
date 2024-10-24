import CustomModal from '@/components/customs/custom-modal'
import CustomPopover from '@/components/customs/custom-popover'
import { Button } from '@/components/ui/button'
import type { NFT } from '@/models/all.model'
import ovationService from '@/services/ovation.service'
import { useAppStore } from '@/store/use-app-store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle, EllipsisVertical } from 'lucide-react'
import { toast } from 'sonner'

export function NFTCard({
  imageUrl,
  name,
  description,
  metaData,
  id,
  isPrivate,
  isVerified,
}: NFT) {
  const queryClient = useQueryClient()
  const { userId, notUser, isUser } = useAppStore()

  const { data: favouriteNfts } = useQuery({
    queryKey: ['favouriteNft', userId],
    queryFn: () => ovationService.getFavouriteNft(userId as string),
  })
  const isNftFavorite = favouriteNfts?.data?.data?.some(
    (favNft: any) => favNft.id === id,
  )

  const { mutate: hideNft } = useMutation({
    mutationFn: ({ nftId, isPublic }: { nftId: string; isPublic: boolean }) =>
      ovationService.hideNft({ nftId, public: isPublic }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['nfts', userId] })
      toast.success(`NFT ${isPrivate ? 'shown' : 'hidden'} successfully`)
    },
  })

  const { mutate: toggleFavoriteNft } = useMutation({
    mutationFn: (nftId: string) =>
      isNftFavorite
        ? ovationService.removeFavouriteNft(nftId)
        : ovationService.setFavouriteNft(nftId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['favouriteNft', userId],
      })
      toast.success(
        isNftFavorite
          ? 'NFT removed from favorites successfully'
          : 'NFT added to favorites successfully',
      )
    },
    onError: (error) => {
      //@ts-ignore
      if (error.response?.data?.message === 'Only 3 NFTs can be stored') {
        toast.error('Only 3 NFTs can be made favorite')
      } else {
        toast.error(
          isNftFavorite
            ? 'Failed to remove NFT from favorites'
            : 'Failed to add NFT to favorites',
        )
      }
    },
  })

  const getMediaSrc = () => {
    if (metaData?.Metadata) {
      const parsedMetadata = JSON.parse(metaData.Metadata)
      const animationUrl = parsedMetadata.animation_url
      if (animationUrl) {
        if (animationUrl.startsWith('ipfs://')) {
          return `https://gateway.pinata.cloud/ipfs/${animationUrl.slice(7)}`
        }
        return animationUrl
      }
    }

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

  const isVideo = () => {
    if (metaData?.Metadata) {
      const parsedMetadata = JSON.parse(metaData.Metadata)
      return !!parsedMetadata.animation_url
    }
    return false
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
        <div className="absolute top-2 left-2 bg-[#232227] text-primary text-xs font-medium py-1 px-2 rounded-full z-10">
          Private
        </div>
      )}
      {isVerified && (
        <div className="bg-[#232227] absolute top-2 right-2 z-10 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center  overflow-hidden group">
          <CheckCircle size={12} />
          <span className="ml-1 max-w-0 group-hover:max-w-[60px] transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden">
            Verified
          </span>
        </div>
      )}
      <div className="relative pt-[100%]">
        {isVideo() ? (
          <video
            src={getMediaSrc()}
            className="absolute top-0 left-0 w-full h-full object-cover"
            controls
            loop
            muted
            autoPlay
            playsInline
            controlsList="nodownload noremoteplayback nofullscreen"
          />
        ) : (
          <img
            src={getMediaSrc()}
            alt="NFT Preview"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col justify-between bg-[#111115] border-t border-[#FFFFFF0D] p-3 flex-grow">
        <div className="flex items-start justify-between w-full mb-2">
          <div className=" mr-2">
            <p className="text-sm  font-semibold">{getNFTName()}</p>
            <p className="text-lighter text-xs mt-1 text-wrap break-words">
              {truncatedDescription}
            </p>
            {showReadMore && (
              <CustomModal
                trigger={
                  <Button className="text-primary p-0 bg-transparent text-xs ml-1 hover:underline focus:outline-none">
                    Read more
                  </Button>
                }
                title={getNFTName()}
                className="sm:max-w-[425px] bg-[#18181C] "
              >
                <p className="text-sm text-lighter">{tDescription}</p>
              </CustomModal>
            )}
          </div>
          {!notUser && isUser && (
            <CustomPopover
              trigger={
                <Button variant="ghost" size="icon" className=" h-8 w-8 p-0">
                  <EllipsisVertical />
                </Button>
              }
              content={
                <div className="flex flex-col bg-[#232227]  p-0">
                  <Button
                    variant="ghost"
                    onClick={() => toggleFavoriteNft(id)}
                    className=" text-foreground text-xs justify-start font-medium px-3 py-[10px] w-full h-fit border-b border-[#FFFFFF14] rounded-none"
                  >
                    {isNftFavorite
                      ? 'Remove from Favorite NFTs'
                      : 'Add to Favorite NFTs'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      hideNft({ nftId: id, isPublic: !!isPrivate })
                    }
                    className=" text-foreground text-xs justify-start font-medium px-3 py-[10px] w-full h-fit border-b border-[#333333] rounded-none"
                  >
                    {isPrivate ? 'Show NFT' : 'Hide NFT'}
                  </Button>
                </div>
              }
              className=" bg-[#232227]  w-[150px] p-0 "
            />
          )}
        </div>
      </div>
    </div>
  )
}
