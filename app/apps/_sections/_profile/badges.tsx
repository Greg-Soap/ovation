import Circle from '@/components/icons/circle'
import CircleProgress from '../../_components/_profile/circular-progress'

const badges = [
  {
    progress: 75,
    name: 'Portfolio',
    imgSrc: '/assets/images/profile/badge1.png',
  },
  {
    progress: 75,
    name: 'Portfolio',
    imgSrc: '/assets/images/profile/badge2.png',
  },
  {
    progress: 75,
    name: 'Portfolio',
    imgSrc: '/assets/images/profile/badge3.png',
  },
  {
    progress: 75,
    name: 'Portfolio',
    imgSrc: '/assets/images/profile/badge4.png',
  },
]

export default function Badges() {
  return (
    <div className="flex flex-col bg-[#18181C] rounded-[20px] gap-4 px-5 py-[18px]">
      <p className="text-xs font-medium text-[#808080]">Badges</p>

      <div className="flex justify-between">
        {badges.map((item, index) => (
          <div
            className="flex flex-col gap-2 justify-center items-center"
            key={index}
          >
            <CircleProgress value={item.progress} imgSrc={item.imgSrc} />
            <p className="text-[11px] text-[#B3B3B3]">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
