import { Input } from '@/components/ui/input'
import SearchIcon from '../../../../components/icons/searchIcon'
import type { CustomIconProps } from '@/app/types'

interface SearchInputProps {
  inpClass?: string
  iconClass?: CustomIconProps
  width?: string
}

export default function SearchInput({
  inpClass,
  iconClass,
  width = '450px',
}: SearchInputProps) {
  return (
    <div
      className={`h-[54px] w-[${width}] border-[1px] flex items-center rounded-full border-[#353538] pl-3 ${inpClass}`}
    >
      <SearchIcon className={iconClass?.className} fill={iconClass?.fill} />
      <Input
        type="text"
        placeholder="Search Ovation"
        className=" border-none focus:border-none  outline-none rounded-none ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0 "
      />
    </div>
  )
}
