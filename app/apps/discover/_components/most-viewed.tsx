import VerifyIcon from '@/components/icons/verifyIcon'
import MiniLoader from '@/components/mini-loader'
import { formatUsername } from '@/lib/helper-func'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

export function MostViewed() {
  const { data: mostViewedData, isLoading: mostViewedLoading } = useQuery({
    queryKey: ['mostViewed'],
    queryFn: () => ovationService.getMostViewed(),
  })

  if (mostViewedLoading) {
    return <MiniLoader />
  }

  const mostViewed = mostViewedData || []

  if (mostViewed.length === 0) {
    return (
      <div className="max-h-[800px] h-full mt-10 p-6 mb-5 border border-[#FFFFFF14] rounded-[10px] flex flex-col items-center justify-center sticky top-1 bg-[#18181C]">
        <p className="text-xl font-semibold  mb-2">No Most Viewed Users</p>
        <p className="text-sm text-light text-center">
          There are currently no most viewed users to display. Check back later
          for updates.
        </p>
      </div>
    )
  }

  return (
    <div className="h-[800px] overflow-scroll mt-10 p-6 mb-5 border border-[#FFFFFF14] rounded-[10px] flex flex-col gap-10 sticky top-1 ">
      <div className="flex items-center w-full justify-between ">
        <p className="text-base font-medium ">MOST VIEWED</p>

        {/* <Button className='bg-white text-[#0B0A10] font-semibold border-none outline-none px-4 py-[10px] rounded-[400px] w-fit h-fit text-xs transition-all duration-300 hover:opacity-80'>
          View all
        </Button> */}
      </div>

      <div
        className={
          'flex flex-col w-full border border-[#35353880] rounded-[14px] p-6 gap-9 bg-[#18181C]'
        }
      >
        <div className="flex flex-col items-center justify-center relative">
          <div className="w-full h-[150px] rounded-[10px] overflow-hidden">
            <img
              src={
                mostViewed[0]?.coverImage || '/assets/images/profile/image8.png'
              }
              alt="User alt"
              className=" h-full rounded-[10px] object-cover w-full"
            />
          </div>

          <Image
            src={
              mostViewed[0]?.profileImage || '/assets/images/default-user.svg'
            }
            alt="User Display"
            width={50}
            height={50}
            className={`${mostViewed[0]?.profileImage ? 'bg-[#0B0A10]' : 'bg-[#18181C]'} absolute bottom-[-25px] border-[3px] w-12 h-12 object-cover border-[#0B0A10] rounded-full`}
          />
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center w-full justify-between pb-6 border-b border-[#FFFFFF0D]">
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex flex-col">
                <Link
                  href={`/apps/profile/${mostViewed[0]?.username}`}
                  className="flex gap-1 items-center text-base font-semibold leading-5 "
                >
                  {mostViewed[0]?.displayName}
                  <VerifyIcon />
                </Link>
                <Link
                  href={`/apps/profile/${mostViewed[0]?.username}`}
                  className="text-xs leading-5 font-medium text-light"
                >
                  {formatUsername(mostViewed[0]?.username)}
                </Link>
              </div>
              <div className="bg-primary text-[10px] font-medium text-black px-[10px] py-2 w-fit rounded-3xl">
                {mostViewed[0]?.views > 1000
                  ? `${(mostViewed[0]?.views / 1000).toFixed(1)}k`
                  : mostViewed[0]?.views}{' '}
                Views
              </div>
            </div>
          </div>

          <p className="text-sm text-light">
            {mostViewed[0]?.bio || 'No bio available'}
          </p>
        </div>
      </div>
      <div id="top-4-10 section" className="flex flex-col gap-4 w-full pt-4">
        {mostViewed.slice(3).map((user, index) => (
          <div key={index} className="w-full">
            <div className="flex flex-wrap gap-4 py-4  pl-4 pr-4 bg-[#18181C] rounded-[20px] items-center justify-between border border-[#35353880]">
              <div className="flex items-center gap-2">
                <div className="w-[30px] h-[30px] rounded-full overflow-hidden border-2 border-white">
                  <img
                    alt="imag"
                    src={
                      user?.profileImage || '/assets/images/default-user.svg'
                    }
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <Link
                    href={`/apps/profile/${user?.username}`}
                    className="text-sm font-semibold"
                  >
                    {user?.displayName}
                  </Link>

                  <Link
                    href={`/apps/profile/${user?.username}`}
                    className="flex gap-1 text-xs text-light items-center"
                  >
                    <span>{formatUsername(user?.username)} </span>
                    <VerifyIcon />
                  </Link>
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
        ))}
      </div>
    </div>
  )
}
