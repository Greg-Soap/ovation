import TimelineHeader from './_sections/_timeline/timeline-header'
import Aside from './_sections/Aside'

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <TimelineHeader />
      <div className="flex flex-col lg:flex-row lg:flex-nowrap w-full other-link overflow-y-scroll max-w-[1400px]">
        <Aside />
        {children}
      </div>
    </div>
  )
}
