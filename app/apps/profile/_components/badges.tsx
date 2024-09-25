import CircleProgress from './circular-progress'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { startCase } from '@/lib/helper-func'
import MiniLoader from '@/components/mini-loader'

interface Badge {
  progress: number
  name: string
  imgSrc: string
}

export default function Badges({ userId }: { userId: string }) {
  const { data: badgesData, isLoading } = useQuery({
    queryKey: ['badges', userId],
    queryFn: () => ovationService.getBadges(userId),
  })

  const hasBadges = badgesData && badgesData?.data?.data?.length > 0

  if (isLoading) {
    return <MiniLoader />
  }

  return (
    <div className="flex flex-col bg-[#18181C] rounded-[20px] gap-4 px-5 py-[18px]">
      <p className="text-xs font-medium text-[#808080]">Badges</p>

      {hasBadges ? (
        <div className="flex justify-between">
          {badgesData?.data?.data?.map((badge, index) => (
            <div
              className="flex flex-col gap-2 justify-center items-center"
              key={index}
            >
              {/* <CircleProgress value={badge.progress} imgSrc={badge.imgSrc} /> */}
              <p className="text-[11px] text-[#B3B3B3]">
                {startCase(badge.badgeName)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#B3B3B3]">No badges earned yet.</p>
      )}
    </div>
  )
}
