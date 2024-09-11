import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FeaturedSection from '../../_components/_profile/featured-section'
import Created from '../_profile/created'
import Stats from '../_profile/stats'
import Portfolio from '../_profile/portfolio'
import Experience from '../_profile/experience'
import ComingSoon from '../_profile/coming-soon'
import EmptyState from '../../_components/_secondary-profile/empty-state'
import { createdNFT } from './portfolio-data'
import { experienceData } from './experience-data'

export default function MainSecondaryProfile() {
  return (
    <div className="col-span-2 h-full flex flex-col items-center bg-[#111115]">
      {featured.length === 0 ? (
        <EmptyState
          name="FEATURED"
          username={'@username'}
          type="featured post"
        />
      ) : (
        <FeaturedSection featured={featured} showButtons={false} />
      )}

      <Tabs defaultValue="post" className="w-full my-16">
        <TabsList className="items-center rounded-none px-7 pt-5 pb-0 border-y gap-4 border-[#353538] w-full h-fit overflow-x-scroll justify-start">
          <TabsTrigger
            value="post"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Post
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Replies
          </TabsTrigger>
          <TabsTrigger
            value="portfolio"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Portfolio
          </TabsTrigger>
          <TabsTrigger
            value="created"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Created
          </TabsTrigger>
          <TabsTrigger
            value="stat"
            className="text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Stat
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="text-xs text-[#999999] px-5 py-[10px] m-0 bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300"
          >
            Experience
          </TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <ComingSoon />
        </TabsContent>
        <TabsContent value="replies">
          <ComingSoon />
        </TabsContent>
        <TabsContent value="portfolio">
          <Portfolio data={createdNFT} />
        </TabsContent>
        <TabsContent value="created">
          <Created data={createdNFT} />
        </TabsContent>
        <TabsContent value="stat">
          <Stats />
        </TabsContent>
        <TabsContent
          value="experience"
          className="flex items-center justify-center"
        >
          {experienceData.length === 0 ? (
            <EmptyState
              name="EXPERIENCE"
              username={'@username'}
              type="experience on their profile"
            />
          ) : (
            <Experience data={experienceData} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

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
