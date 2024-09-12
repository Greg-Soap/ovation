import TimelineHeader from './_sections/_timeline/timeline-header'
import Aside from './_sections/Aside'

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='container flex flex-col items-center justify-center relative'>
      <TimelineHeader />
      <div className='flex flex-col lg:flex-row lg:flex-nowrap w-full other-link overflow-y-scroll'>
        <Aside />
        <div id='empty space' className='min-w-[310px]' />
        <div className=' px-0 pb-[65px] lg:pb-0'>{children}</div>
      </div>
    </div>
  )
}
