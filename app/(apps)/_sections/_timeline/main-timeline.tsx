'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TimelineTab from '../../_components/_timeline/timeline-tab'

export default function MainTimeline() {
  return (
    <Tabs defaultValue="timeline" className="w-full px-0">
      <TabsList className="w-full border-b border-[#1A1A1A] px-0">
        <TabsTrigger
          value="timeline"
          className="text-light py-7 px-5 text-lg leading-5 hover: ml-3"
        >
          Timeline
        </TabsTrigger>
        <TabsTrigger
          value="community"
          className="text-light py-7 px-5 text-lg leading-5 hover:"
        >
          Community
        </TabsTrigger>
        <TabsTrigger
          value="contribute"
          className="text-light py-7 px-5 text-lg leading-5 hover: mr-3"
        >
          Contribute
        </TabsTrigger>
      </TabsList>
      <TabsContent value="timeline">
        <TimelineTab />
      </TabsContent>
      <TabsContent value="community">Change your password here.</TabsContent>
      <TabsContent value="contribute">Change your password here.</TabsContent>
    </Tabs>
  )
}
