import TimelineHeader from './_sections/_timeline/timeline-header'
import Aside from './_sections/Aside'

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col w-full items-center">
        <TimelineHeader />
        <main className="flex w-full other-link overflow-y-scroll max-w-[1440px]">
          <Aside />
          {children}
        </main>
      </body>
    </html>
  )
}
