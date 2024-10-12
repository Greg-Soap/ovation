import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Stats from './sections/stats'
import Portfolio from './sections/portfolio'
import Experience from './sections/experience'
import type { ProfileData } from '@/models/all.model'
import { useTabUrlSync } from '@/lib/use-tab'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import FeaturedSection from './sections/featured-section'

interface TabData {
  value: string
  label: string
  content: (nfts: any) => React.ReactNode
}

export default function MainProfileSection({
  profileData,
}: {
  profileData: ProfileData
}) {
  const { currentTab, setTab } = useTabUrlSync('portfolio')

  const { data: nfts, isLoading: isNftsLoading } = useQuery({
    queryKey: ['nfts', profileData?.userId],
    queryFn: () => ovationService.getNfts(profileData?.userId as string),
    enabled: !!profileData?.userId,
  })

  const { data: experienceData } = useQuery({
    queryKey: ['experience', profileData?.userId],
    queryFn: () => ovationService.getExperience(profileData?.userId as string),
    enabled: !!profileData?.userId,
  })

  const profileTabsData: TabData[] = [
    {
      value: 'portfolio',
      label: 'Portfolio',
      content: (nfts) => (
        <Portfolio nfts={nfts?.data?.data || []} isLoading={isNftsLoading} />
      ),
    },
    {
      value: 'stat',
      label: 'Stat',
      content: () => <Stats userId={profileData?.userId as string} />,
    },
    {
      value: 'experience',
      label: 'Experience',
      content: () => <Experience data={experienceData?.data?.data || []} />,
    },
  ]

  return (
    <div className="max-w-[853px] w-full h-full flex flex-col items-center bg-[#111115]">
      {/* <FeaturedSection featured={[]} showButtons={true} secondaryProfile={secondaryProfile} /> */}

      <Tabs
        defaultValue={currentTab}
        value={currentTab}
        onValueChange={setTab}
        className="w-full my-16 mt-0"
      >
        <TabsList className="items-center rounded-none px-7 pt-5 pb-0 border-y gap-4 border-[#353538] w-full h-fit overflow-x-scroll justify-start">
          {profileTabsData.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="text-xs text-lighter px-5 py-[10px] bg-transparent border-b-2 border-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]: transition-all duration-300"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {profileTabsData.map(({ value, content }) => (
          <TabsContent key={value} value={value} className="w-full px-3 h-full">
            {content(nfts)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
