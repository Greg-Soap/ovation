import { Button } from '@/components/ui/button'
import AsideMsgIcon from '@/components/icons/asideMsgIcon'
import UserProfile from '../_sections/_profile/user-profile'
import MainProfileSection from '../_sections/_profile/main-profile-section'
import MainSecondaryProfile from '../_sections/_secondary-profile/main-secondary'
import EmptyState from '../_components/_secondary-profile/empty-state'

export default function SecondaryProfile() {
  return (
    <>
      <div className="  relative w-full h-[262px] bg-profile-banner bg-contain bg-center">
        <div className="hidden lg:flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10">
          <Button
            variant="default"
            className="bg-[#333726] p-[9px] border border-[#507100]"
          >
            <AsideMsgIcon className="w-5 h-5 stroke-black fill-[#CFF073]" />
          </Button>
          <Button
            variant="default"
            className="py-[9px] px-[13px] text-[#0B0A10] text-xs font-semibold border border-[#E6E6E64D]"
          >
            Follow
          </Button>
        </div>
      </div>

      <div className="flex flex-col xl:grid grid-cols-3 relative">
        <UserProfile />

        <MainSecondaryProfile />
      </div>
    </>
  )
}
