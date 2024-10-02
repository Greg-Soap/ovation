'use client'
import OtherLinks from '@/app/apps/_sections/_timeline/other-link'
import MainNotification from './_components/main-notification'

export default function Page() {
  return (
    <section className="grid grid-cols-3 w-full bg-primaryBg other-link overflow-hidden">
      <MainNotification />
      <OtherLinks />
    </section>
  )
}
