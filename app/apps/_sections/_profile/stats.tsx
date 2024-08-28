import Image from 'next/image'

export default function Stats() {
  return (
    <div className="w-full py-10 flex flex-col items-center justify-center gap-10">
      <div className="w-[95%] px-7 py-6 rounded-[14px] border border-[#353538] flex flex-col gap-[34px]">
        <p className="text-white font-medium">Overview</p>

        <div className="grid grid-cols-3 gap-5">
          {overview.map((item, index) => (
            <div
              className="max-w-[245px] border border-[#FFFFFF0D] rounded-[10px] bg-[#18181C]  lg:px-[30px] px-2p py-2  lg:py-6 flex flex-col gap-5"
              key={index}
            >
              <p className="text-[#808080] text-xs font-medium">
                {item.cardName}
              </p>
              <p className="text-[#F8F8FF] font-semibold text-5xl">
                {item.itemCount}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 w-[95%]">
        <div
          className={`col-span-1 flex flex-col border border-[#FFFFFF14] bg-[#18181C] rounded-[20px] px-[18px] py-7 gap-10`}
        >
          <p className="text-xs text-[#808080]">{stats[0].name}</p>

          <div className="flex flex-col w-[84%] ml-[8%] gap-[26px] items-center">
            <Image
              src="/assets/images/profile/soon.png"
              alt="Coming soon illustration"
              width={149}
              height={88}
            />
            <div className="w-full flex flex-col gap-1.5">
              <p className="text-[#E6E6E6] text-lg font-medium text-center">
                COMING SOON
              </p>
              <p className="text-sm text-[#B3B3B3] text-center">
                {stats[0].description}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`col-span-1 flex flex-col border border-[#FFFFFF14] bg-[#18181C] rounded-[20px] px-[18px] py-7 gap-10`}
        >
          <p className="text-xs text-[#808080]">{stats[1].name}</p>

          <div className="flex flex-col w-[84%] ml-[8%] gap-[26px] items-center">
            <Image
              src="/assets/images/profile/soon.png"
              alt="Coming soon illustration"
              width={149}
              height={88}
            />
            <div className="w-full flex flex-col gap-1.5">
              <p className="text-[#E6E6E6] text-lg font-medium text-center">
                COMING SOON
              </p>
              <p className="text-sm text-[#B3B3B3] text-center">
                {stats[1].description}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`col-span-2 flex flex-col border border-[#FFFFFF14] bg-[#18181C] rounded-[20px] px-[18px] py-7 gap-10`}
        >
          <p className="text-xs text-[#808080]">{stats[2].name}</p>

          <div className="flex flex-col w-[84%] ml-[8%] gap-[26px] items-center">
            <Image
              src="/assets/images/profile/soon.png"
              alt="Coming soon illustration"
              width={149}
              height={88}
            />
            <div className="w-full flex flex-col gap-1.5">
              <p className="text-[#E6E6E6] text-lg font-medium text-center">
                COMING SOON
              </p>
              <p className="text-sm text-[#B3B3B3] text-center">
                {stats[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Overiew {
  cardName: string
  itemCount: number
}

interface Stats {
  name: string
  description: string
  isLast: boolean
}

const overview: Overiew[] = [
  { cardName: 'NFT CREATED', itemCount: 43 },
  { cardName: 'NFT COLLECTED', itemCount: 33 },
  { cardName: 'TOTAL NFT COUNT', itemCount: 23 },
]

const stats: Stats[] = [
  {
    name: 'NFT ASSETS',
    description: 'A breakdown of you assets by categories',
    isLast: false,
  },
  {
    name: 'PORTFOLIO VALUE',
    description: 'Your portfolio journey overtime',
    isLast: false,
  },
  {
    name: 'TRANSACTION HISTORY',
    description: 'A list of all transactions completed',
    isLast: true,
  },
]
