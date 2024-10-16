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
      <div className="relative md:w-[420px] w-full h-[53px]">
        <input
          type="text"
          className="bg-white text-black md:w-[420px] w-[90%] h-[53px] pl-[47px] placeholder:text-[13px] rounded-[8px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          placeholder="Search users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon
          size={20}
          color="black"
          className="absolute top-1/2 left-[40px] md:left-4 transform -translate-y-1/2 z-50"
        />
      </div>

      {debouncedQuery && (
        <div
          className="absolute w-[80%] md:w-[420px] rounded-[8px] top-[160px] left-1/2 transform -translate-x-1/2 mt-1 z-50"
          ref={divRef}
        >
          <div
            className={`${
              hasResults ? 'bg-black' : ''
            } rounded-[8px] p-[10px] md:w-[420px] w-full max-h-[400px] overflow-auto ${
              hasResults ? 'border border-[#FFFFFF14]' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex flex-wrap gap-4 py-4 px-4 bg-[#18181C] rounded-[8px] items-center justify-between border border-[#FFFFFF14]">
                <MiniLoader size="average" />
              </div>
            ) : !hasResults ? (
              <div className="flex flex-wrap gap-4 py-4 px-4 bg-[#18181C] rounded-[8px] items-center justify-between border border-[#FFFFFF14]">
                <p className="text-center font-bold">
                  No user found with the username
                </p>
              </div>
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
      <div className="flex flex-wrap gap-4 py-4 px-4 bg-[#18181C] rounded-[8px] items-center justify-between border border-[#FFFFFF14]">
        <div className="flex items-center gap-2">
          <CustomAvatar
            src={user?.profileImage}
            size="lg"
            className="object-cover object-center"
          />

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
