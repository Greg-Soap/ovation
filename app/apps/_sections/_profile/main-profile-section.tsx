import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Stats from './stats'
import Portfolio from './portfolio'
import Experience from './experience'
import FeaturedSection from '../../_components/_profile/featured-section'
import { createdNFT } from '../_secondary-profile/portfolio-data'
import { experienceData } from '../_secondary-profile/experience-data'
import type { ProfileData } from '@/models/all.model'
import { useTabUrlSync } from '@/lib/use-tab'

interface TabData {
  value: string
  label: string
  content: React.ReactNode
}
const profileTabsData: TabData[] = [
  { value: 'portfolio', label: 'Portfolio', content: <Portfolio initialNFTs={createdNFT} /> },
  { value: 'stat', label: 'Stat', content: <Stats /> },
  { value: 'experience', label: 'Experience', content: <Experience data={experienceData} /> },
]

export default function MainProfileSection({
  profileData,
  secondaryProfile = false,
}: {
  profileData: ProfileData
  secondaryProfile?: boolean
}) {
  const { currentTab, setTab } = useTabUrlSync('portfolio')

  return (
    <div className='max-w-[853px] w-full h-full flex flex-col items-center bg-[#111115]'>
      <FeaturedSection
        featured={profileData?.featured || []}
        showButtons={true}
        secondaryProfile={secondaryProfile}
      />

      <Tabs
        defaultValue={currentTab}
        value={currentTab}
        onValueChange={setTab}
        className='w-full my-16'>
        <TabsList className='items-center rounded-none px-7 pt-5 pb-0 border-y gap-4 border-[#353538] w-full h-fit overflow-x-scroll justify-start'>
          {profileTabsData.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='text-xs text-[#999999] px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-[#CFF073] data-[state=active]:text-[#F8F8FF] transition-all duration-300'>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {profileTabsData.map(({ value, content }) => (
          <TabsContent key={value} value={value} className='w-full'>
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
