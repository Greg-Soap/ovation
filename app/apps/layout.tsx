import TimelineHeader from './_sections/_timeline/timeline-header'
import Aside from './_sections/Aside'

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center relative">
        <TimelineHeader />
        <main className="flex w-full other-link overflow-y-scroll max-[1440px]">
          <Aside />
          {children}
        </main>
      </body>
    </html>
  )
}
