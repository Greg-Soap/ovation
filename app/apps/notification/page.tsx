import OtherLinks from '@/app/apps/_sections/_timeline/other-link'
import MainNotification from '../_sections/_notification/main-notification'

export default function Notifications() {
  return (
    <section className="grid grid-cols-3 w-full bg-[#111115] other-link overflow-hidden">
      <MainNotification />
      <OtherLinks />
    </section>
  )
}
