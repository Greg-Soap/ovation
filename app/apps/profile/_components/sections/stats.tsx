import MiniLoader from '@/components/mini-loader'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'

export default function Stats({ userId }: { userId: string }) {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['stats', userId],
    queryFn: () => ovationService.getStats(userId as string),
    enabled: !!userId,
  })

  if (isLoading) {
    return <MiniLoader />
  }

  const stats = statsData?.data?.data

  return (
    <div className="w-full py-10 flex items-center justify-center">
      <div className="w-[95%] flex flex-col gap-[34px]">
        <div className="px-7 py-6 rounded-[14px] border border-[#353538] flex flex-col gap-[34px]">
          <p className=" font-medium uppercase">Overview</p>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
            {[
              { label: 'NFT CREATED', value: stats?.nftCreated },
              { label: 'NFT COLLECTED', value: stats?.nftCollected },
              { label: 'TOTAL NFT COUNT', value: stats?.totalNft },
              { label: 'NFT COLLECTIONS', value: stats?.nftCollections },

              { label: 'VIEWS', value: stats?.views },
              { label: 'BADGES EARNED', value: stats?.badgeEarned },
            ].map((item, index) => (
              <div
                className="max-w-[245px] border border-[#FFFFFF0D] rounded-[10px] bg-[#18181C] lg:px-[30px] px-2 py-2 lg:py-6 flex flex-col gap-5"
                key={index}
              >
                <p className="text-[#808080] text-xs font-medium">
                  {item.label}
                </p>
                <p className=" font-semibold text-4xl">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface Stats {
  name: string
  description: string
  isLast: boolean
}
