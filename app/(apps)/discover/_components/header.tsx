import CustomAvatar from '@/components/customs/custom-avatar'
import VerifyIcon from '@/components/icons/verifyIcon'
import MiniLoader from '@/components/mini-loader'
import { formatUsername } from '@/lib/helper-func'
import ovationService from '@/services/ovation.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export function Header() {
  const [query, setsearchQuery] = useState('')
  const divRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setsearchQuery('')
      } else {
        // setIsOutside(false) // User clicked inside the div
      }
    }

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [divRef])

  const {
    data: searchResult,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['query', query],
    queryFn: () => ovationService.search(query as string),
    enabled: query ? true : false,
  })

  useEffect(() => {
    if (query !== '') {
      refetch()
    }
  }, [query])

  console.log(query, searchResult)
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
        className="bg-[#fff] color-[black] md:w-[720px] w-[90%] h-[53.36px] pl-[47.54px] placeholder:text-[13.14px]"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: ' translate(-50%, -50%)',
          borderRadius: '8.21px',
          color: 'black',
        }}
        placeholder="Search assets"
        onChange={(e) => setsearchQuery(e.target.value)}
      />
      <img
        src={
          '../../../public/assets/images/search/vuesax/outline/vuesax/outline/search-normal.png'
        }
        alt=""
        className=""
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: ' translate(-50%, -50%)',
          // zIndex: 22,
        }}
      />
      <div
        className={` ${searchResult?.data?.data?.length == 0 ? 'mt-[180px]' : 'mt-[480px]'}`}
        style={{ zIndex: 2222 }}
        ref={divRef}
      >
        {query !== '' && (
          <div
            className={`${searchResult?.data?.data.length == 0 ? '' : 'bg-[black] '} rounded-[20px] p-[20px] md:w-[720px] w-[90%] ${searchResult?.data?.data.length == 0 ? 'h-[100px]' : 'h-[400px]'} `}
            style={{
              overflow: 'scroll',
              border:
                searchResult?.data?.data.length == 0 ? '' : '1px solid grey',
            }}
          >
            {isLoading ? (
              <MiniLoader size="average" />
            ) : searchResult?.data?.data.length == 0 ? (
              <div>
                <p className="text-center font-bold">
                  No User found with the username
                </p>
              </div>
            ) : (
              searchResult?.data?.data?.map((user: any, index: any) => (
                <div key={index} className="w-full mb-[20px]">
                  <div className="flex flex-wrap gap-4 py-4  pl-4 pr-4 bg-[#18181C] rounded-[20px] items-center justify-between border border-[#35353880]">
                    <div className="flex items-center gap-2">
                      <div className="w-[30px] h-[30px] rounded-full overflow-hidden border-2 border-white">
                        <CustomAvatar src={user?.profileImage} size="sm" />
                      </div>

                      <div className="flex flex-col">
                        <a
                          href={`/${user?.username}`}
                          className="text-sm font-semibold"
                        >
                          {user?.displayName}
                        </a>

                        <a
                          href={`/${user?.username}`}
                          className="flex gap-1 text-xs text-light items-center"
                        >
                          <span>{formatUsername(user?.username)} </span>
                          <VerifyIcon />
                        </a>
                      </div>
                    </div>
                    <div className="bg-primary ml-auto text-[10px] font-medium text-black px-[10px] py-2 rounded-3xl">
                      {user?.views > 1000
                        ? `${(user?.views / 1000).toFixed(1)}k`
                        : user?.views}{' '}
                      Views
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
