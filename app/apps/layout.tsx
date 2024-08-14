import TimelineHeader from './_sections/_timeline/timeline-header'
import Aside from './_sections/Aside'
import { FeedbackModal } from './_sections/feedback'

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center relative">
        <FeedbackModal />

        <TimelineHeader />
        <main className="flex w-full other-link overflow-y-scroll max-[1440px]">
          <Aside />
          {children}
        </main>
      </body>
    </html>
  )
}
