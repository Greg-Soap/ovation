import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Created from './created'
import Stats from './stats'
import Portfolio from './portfolio'
import Experience from './experience'
import ComingSoon from './coming-soon'
import FeaturedSection from '../../_components/_profile/featured-section'
import { createdNFT } from '../_secondary-profile/portfolio-data'
import { experienceData } from '../_secondary-profile/experience-data'
import type { ProfileData } from '@/models/all.model'

const tabsData = [
  // { value: 'post', label: 'Post', content: <ComingSoon /> },
  // { value: 'replies', label: 'Replies', content: <ComingSoon /> },
  { value: 'portfolio', label: 'Portfolio', content: <Portfolio data={createdNFT} /> },
  // { value: 'created', label: 'Created', content: <Created data={createdNFT} /> },
  { value: 'stat', label: 'Stat', content: <Stats /> },
  { value: 'experience', label: 'Experience', content: <Experience data={experienceData} /> },
]

export default function MainProfileSection({ profileData }: { profileData: ProfileData }) {
  return (
    <div className='max-w-[853px] h-full flex flex-col items-center bg-[#111115]'>
      <FeaturedSection featured={featured} showButtons={true} />

      <Tabs defaultValue='portfolio' className='w-full my-16'>
        <TabsList className='items-center rounded-none px-7 pt-5 pb-0 border-y gap-4 border-[#353538] w-full h-fit overflow-x-scroll justify-start'>
          {tabsData.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300'>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsData.map(({ value, content }) => (
          <TabsContent key={value} value={value}>
            {content}
          </TabsContent>
        ))}
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
