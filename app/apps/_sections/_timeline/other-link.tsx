import FeaturedCard from '@/app/apps/_components/_timeline/featured-card'
import SearchInput from '../../_components/_timeline/search-input'
import Topics from '../../_components/_timeline/Topic'

export default function OtherLinks() {
  return (
    <div className="h-[100vh] p-4 bg-[#111115] overflow-x-hidden overflow-y-scroll hidden lg:flex flex-col gap-[3rem]  pb-[10rem]">
      <SearchInput />
      <FeaturedCard className={''} />
      <Topics />
    </div>
  )
}
