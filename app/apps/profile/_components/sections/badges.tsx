import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { startCase } from '@/lib/helper-func'
import MiniLoader from '@/components/mini-loader'
import CustomTooltip from '@/components/customs/custom-tooltip'

export default function Badges({ userId }: { userId: string }) {
  const { data: badgesData, isLoading } = useQuery({
    queryKey: ['badges', userId],
    queryFn: () => ovationService.getBadges(userId),
    enabled: !!userId,
  })

  const hasBadges = badgesData && badgesData?.data?.data?.length > 0

  if (isLoading) {
    return <MiniLoader />
  }

  const fallbackBadge = (badgeName: string) => (
    <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#18181C] border border-[#262626] p-1">
      <h3 className=" text-center font-bold text-[8px] break-words">
        {startCase(badgeName)}
      </h3>
    </div>
  )

  return (
    <div className="flex flex-col bg-[#18181C] rounded-[20px] gap-4 px-5 py-[18px]">
      <p className="text-xs font-medium text-lighter">Badges</p>

      {hasBadges ? (
        <div className="flex flex-wrap gap-2">
          {badgesData?.data?.data?.map((badge, index) => (
            <CustomTooltip
              key={index}
              content={startCase(badge.badgeName)}
              side="top"
              align="center"
            >
              <div className="flex flex-col gap-2 justify-center items-center">
                {badge.imageUrl ? (
                  <div className="w-[50px] h-[50px] relative">
                    <img
                      src={badge.imageUrl}
                      alt={startCase(badge.badgeName)}
                      className="rounded-md object-cover w-full h-full absolute inset-0"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const fallbackDiv = document.createElement('div')
                        fallbackDiv.className =
                          'w-[50px] h-[50px] rounded-md flex items-center justify-center bg-red-500 p-1'
                        fallbackDiv.innerHTML = `<h3 class=" text-center font-bold text-[10px] break-words">${startCase(badge.badgeName)}</h3>`
                        e.currentTarget.parentElement?.appendChild(fallbackDiv)
                      }}
                    />
                  </div>
                ) : (
                  fallbackBadge(badge.badgeName)
                )}
              </div>
            </CustomTooltip>
          ))}
        </div>
      ) : (
        <p className="text-sm text-light">No badges earned yet.</p>
      )}
    </div>
  )
}
