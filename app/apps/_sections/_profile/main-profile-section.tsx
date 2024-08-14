import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Created from './created'
import Stats from './stats'
import Portfolio from './portfolio'
import Experience from './experience'
import ComingSoon from './coming-soon'

interface Featured {
  imgSrc: string
  artist: string
  price: number
}

const featured: Featured[] = [
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Bored Ape',
    price: 14,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Bored Ape',
    price: 14,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Bored Ape',
    price: 14,
  },
]

export default function MainProfileSection() {
  return (
    <div className="col-span-2 h-full  flex flex-col items-center bg-[#111115]">
      <div className="flex flex-col mt-5 w-[95%] h-fit border border-[#353538] rounded-[14px] px-5 py-[15px] gap-[30px]">
        <p className="text-white font-medium">Featured</p>

        <div className="flex flex-wrap gap-4">
          {featured.map((item, index) => (
            <div
              className="w-[303px] flex flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px]"
              key={index}
            >
              <Image
                src={item.imgSrc}
                alt="NFT Preview"
                width={317}
                height={217}
                className="rounded-t-[10px]"
              />

              <div className="flex items-center justify-between bg-[#111115] border border-[#FFFFFF0D] px-3 py-2 rounded-b-[10px]">
                <div className="flex flex-col items-start">
                  <p className="text-[11px] text-[#999999]">Artist</p>
                  <p className="text-white text-sm font-semibold">
                    {item.artist}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[11px] text-[#999999]">Price</p>
                  <p className="text-white text-sm font-semibold">
                    {item.price + ' ' + 'ETH'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="post" className="w-full  my-16">
        <TabsList className="items-center rounded-none px-7 py-5 border-y gap-4 border-[#353538] w-full overflow-x-scroll justify-start">
          <TabsTrigger
            value="post"
            className="text-xs text-[#999999] px-5 py-[10px] rounded-[603px] bg-[#232227] border-none font-normal data-[state=active]:bg-white data-[state=active]:text-[#232227]"
          >
            Post
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="text-xs text-[#999999] px-5 py-[10px] rounded-[603px] bg-[#232227] border-none font-normal data-[state=active]:bg-white data-[state=active]:text-[#232227]"
          >
            Replies
          </TabsTrigger>
          <TabsTrigger
            value="portfolio"
            className="text-xs text-[#999999] px-5 py-[10px] rounded-[603px] bg-[#232227] border-none font-normal data-[state=active]:bg-white data-[state=active]:text-[#232227]"
          >
            Portfolio
          </TabsTrigger>
          <TabsTrigger
            value="created"
            className="text-xs text-[#999999] px-5 py-[10px] rounded-[603px] bg-[#232227] border-none font-normal data-[state=active]:bg-white data-[state=active]:text-[#232227]"
          >
            Created
          </TabsTrigger>
          <TabsTrigger
            value="stat"
            className="text-xs text-[#999999] px-5 py-[10px] rounded-[603px] bg-[#232227] border-none font-normal data-[state=active]:bg-white data-[state=active]:text-[#232227]"
          >
            Stat
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="text-xs text-[#999999] px-5 py-[10px] rounded-[603px] bg-[#232227] border-none font-normal data-[state=active]:bg-white data-[state=active]:text-[#232227]"
          >
            Experience
          </TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <ComingSoon />
        </TabsContent>
        <TabsContent value="replies">Change your password here.</TabsContent>
        <TabsContent value="portfolio">
          <Portfolio />
        </TabsContent>
        <TabsContent value="created">
          <Created />
        </TabsContent>
        <TabsContent value="stat">
          <Stats />
        </TabsContent>
        <TabsContent value="experience">
          <Experience />
        </TabsContent>
      </Tabs>
    </div>
  )
}
