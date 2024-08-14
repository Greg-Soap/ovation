import NftIcon from '@/components/icons/nftIcon'
import { Button } from '@/components/ui/button'
import AsideMsgIcon from '@/components/icons/asideMsgIcon'
import StatusUpIcon from '@/components/icons/statusUpIcon'
import UserProfile from '../_sections/_profile/user-profile'
import MainProfileSection from '../_sections/_profile/main-profile-section'

export default function page() {
  return (
    <section className="w-full h-fit flex flex-col">
      <div className="relative w-full h-[262px] flex items-end justify-end pr-10 pb-10 gap-3 bg-profile-banner bg-contain bg-center">
        <Button
          variant="default"
          className="bg-[#333333] p-[11px] border border-[#E6E6E64D]"
        >
          <NftIcon className="w-5 h-5 stroke-white fill-white" />
        </Button>
        <Button
          variant="default"
          className="bg-[#333333] p-[11px] border border-[#E6E6E64D]"
        >
          <StatusUpIcon className="w-5 h-5 stroke-[#E6E6E64D] fill-white" />
        </Button>
        <Button
          variant="default"
          className="bg-[#333333] p-[11px] border border-[#E6E6E64D]"
        >
          <AsideMsgIcon className="w-6 h-6 stroke-black fill-white" />
        </Button>
        <Button
          variant="default"
          className="bg-[#333333] py-[11px] px-4 border border-[#E6E6E64D] text-white text-xs"
        >
          Edit Profile
        </Button>
      </div>

      <div className="xl:grid xl:grid-cols-3 flex flex-col relative">
        <UserProfile />

        <MainProfileSection />
      </div>
    </section>
  )
}
