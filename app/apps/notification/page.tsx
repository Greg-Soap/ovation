import OtherLinks from '@/app/apps/_sections/_timeline/other-link'
import VerifiedNotification from '../_sections/_notification/verified-notification'

export default function Notifications() {
  return (
    <section className="grid grid-cols-3 w-full bg-[#111115] other-link overflow-hidden">
      <VerifiedNotification />
      <OtherLinks />
    </section>
  )
}
