import CustomAvatar from '@/components/customs/custom-avatar'
import MiniLoader from '@/components/mini-loader'
import { debounce, formatUsername } from '@/lib/helper-func'
import type { UserData } from '@/models/all.model'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import { SearchIcon } from 'lucide-react'
import { useEffect, useRef, useState, useCallback } from 'react'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const divRef = useRef<HTMLDivElement>(null)

  const debouncedSetQuery = useCallback(
    debounce((value: string) => setDebouncedQuery(value), 300),
    [],
  )

  useEffect(() => {
    debouncedSetQuery(searchQuery)
  }, [searchQuery, debouncedSetQuery])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setSearchQuery('')
        setDebouncedQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const { data: searchResult, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => ovationService.search(debouncedQuery),
    enabled: !!debouncedQuery,
  })

  const hasResults = searchResult?.data?.data?.length > 0

  return (
    <div
      className="h-[250px] relative w-full flex items-center justify-center bg-cover shadow px-7"
      style={{
        backgroundImage: 'url("/assets/images/profile/image8.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <input
        type="text"
        className="bg-white text-black md:w-[720px] w-[90%] h-[53.36px] pl-[47.54px] placeholder:text-[13.14px] rounded-[8.21px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        placeholder="Search assets"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* <SearchIcon size={20} color="black" className="absolute  top-1/2  z-50" /> */}

      {debouncedQuery && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50"
          ref={divRef}
        >
          <div
            className={`${
              hasResults ? 'bg-black' : ''
            } rounded-[20px] p-[20px] md:w-[720px] w-[90%] max-h-[400px] overflow-auto ${
              hasResults ? 'border border-grey' : ''
            }`}
          >
            {isLoading ? (
              <MiniLoader size="average" />
            ) : !hasResults ? (
              <p className="text-center font-bold">
                No User found with the username
              </p>
            ) : (
              searchResult?.data?.data?.map((user: UserData) => (
                <UserSearchResult key={user.userId} user={user} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function UserSearchResult({ user }: { user: UserData }) {
  return (
    <div className="w-full mb-[20px]">
      <div className="flex flex-wrap gap-4 py-4 px-4 bg-[#18181C] rounded-[20px] items-center justify-between border border-[#35353880]">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden border-2 border-white">
            <CustomAvatar src={user?.profileImage} size="sm" />
          </div>
          <div className="flex flex-col">
            <a href={`/${user?.username}`} className="text-sm font-semibold">
              {user?.displayName}
            </a>
            <a
              href={`/${user?.username}`}
              className="flex gap-1 text-xs text-light items-center"
            >
              <span>{formatUsername(user?.username)} </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
