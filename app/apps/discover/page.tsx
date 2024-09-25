'use client'

import { Button } from '@/components/ui/button'
import VerifyIcon from '@/components/icons/verifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import type { FeaturedUser } from '@/app/types'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { DiscoverUserData } from '@/models/all.model'
import MiniLoader from '@/components/mini-loader'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'

export default function Page() {
  const mostViewedQuery = useQuery({
    queryKey: ['mostViewed'],
    queryFn: () => ovationService.getMostViewed(),
  })

  const mostViewed = mostViewedQuery.data || []
  const mostViewedLoading = mostViewedQuery.isLoading

  return (
    <div className="flex flex-col w-full bg-[#111115] h-fit items-center justify-center">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DiscoverHeader />
        <GetStarted />
        <div className="flex flex-col lg:grid lg:grid-cols-3 w-[95%] gap-5">
          <div className="col-span-2 mt-10 mb-[20px] flex flex-col gap-10">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <DiscoverHolders />
            </ErrorBoundary>
          </div>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {!mostViewedLoading ? (
              <DiscoverRight mostViewed={mostViewed} />
            ) : (
              <MiniLoader />
            )}
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </div>
  )
}

function DiscoverHeader() {
  return (
    <div
      className="h-[250px] w-full flex items-center justify-center bg-cover shadow px-7"
      style={{ backgroundImage: `url('/assets/images/discoverBack.svg')` }}
    />
  )
}

function GetStarted() {
  const tasks = [
    {
      title: 'ADD BASIC PROFILE INFORMATION',
      description: '"Personal info" - Bio, Profile, Picture, Location, etc.',
      icon: '/assets/images/profile/task2.png',
      link: '/apps/settings?tab=Personal Info',
      buttonText: 'Add info',
    },
    {
      title: 'ADD A LINK',
      description:
        'Link to your LinkedIn, Twitter, etc. Make Ovation your web3 landing page.',
      icon: '/assets/images/profile/task3.png',
      link: '/apps/settings?tab=Socials',
      buttonText: 'Add Socials',
    },
    {
      title: 'ADD YOUR EXPERIENCE',
      description: "Show the world what you've contributed to!",
      icon: '/assets/images/profile/task1.png',
      link: '/apps/settings?tab=Experience',
      buttonText: 'Add Experience',
    },
  ]

  return (
    <div className="w-[95%] h-fit rounded-[14px] flex flex-col p-6 border border-[#353538] gap-[30px] mt-10">
      <div className="flex flex-col gap-1">
        <p className="text-white font-medium">GET STARTED</p>
        <p className="text-[#B3B3B3]">
          Complete your profile to earn the profile complete badge
        </p>
      </div>

      <div className="w-full h-fit flex flex-col gap-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-4 bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] items-start lg:items-center justify-between px-5 py-10"
          >
            <div className="flex items-start lg:items-center gap-4 flex-col lg:flex-row">
              <div className="flex items-center justify-center rounded-full min-w-11 min-h-11 bg-[#333726]">
                <img
                  src={task?.icon}
                  alt="task icon"
                  className="w-[22px] h-[22px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white font-semibold text-sm">
                  {task?.title}
                </p>
                <p className="text-xs text-[#999999]">{task?.description}</p>
              </div>
            </div>
            <Button
              asChild
              className="transition-all duration-300 mt-2 hover:opacity-80"
            >
              <Link
                href={task?.link}
                className="text-[10px] text-[#111115] font-medium"
              >
                {task?.buttonText}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function DiscoverFeature(user: FeaturedUser) {
  return (
    <div className="border border-[#FFFFFF14] rounded-[14px] p-6 gap-9 flex flex-col">
      <div className="flex items-center w-full justify-between">
        <p className="text-base font-medium text-white">FEATURED</p>
        {/* <Button className='bg-white text-[#0B0A10] font-semibold border-none outline-none px-4 py-[10px] rounded-[400px] w-fit h-fit text-xs transition-all duration-300 hover:opacity-80'>
          View all
        </Button> */}
      </div>
      <div
        id="featured-user"
        className="flex-col lg:flex-row flex gap-10 items-center w-full"
      >
        <img
          src={user.img}
          alt={`${user.userName}'s display`}
          className="w-full lg:w-[50%] h-auto rounded-2xl"
        />
        <div className="flex flex-col max-w-[372px] gap-4">
          <div className="flex items-center w-full justify-between pb-6 border-b border-[#FFFFFF0D]">
            <div className="flex items-center gap-2">
              <img
                src={user.img}
                alt={`${user.userName}'s display`}
                className="rounded-full w-12 h-12"
              />
              <div className="flex flex-col">
                <p className="flex gap-1 items-center text-base font-semibold leading-5 text-white">
                  {user.displayName}
                  <VerifyIcon />
                </p>
                <p className="text-xs leading-5 font-medium text-[#B3B3B3]">
                  @{user.userName}
                </p>
              </div>
            </div>
            <Button className="bg-[#CFF073] px-2 py-[6px] border-none outline-none font-medium w-fit h-fit text-[#0B0A10] text-[9.6px] transition-all duration-300 hover:opacity-80">
              Follow
            </Button>
          </div>
          <p className="text-sm text-[#B3B3B3] pb-6 border-b border-[#FFFFFF0D]">
            {user.desc}
          </p>
          <div className="flex w-full gap-2">
            {[
              { label: 'NFT count', value: user.nftCount },
              { label: 'Arch Tokens', value: user.archToken },
              { label: 'Badges', value: user.badges },
            ].map((item, index) => (
              <p
                key={index}
                className="rounded-full border-[1px] text-[10px] py-1 px-2 text-white bg-[#18181C] border-[#353538]"
              >
                {`${item.label}: ${item.value}`}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DiscoverHolders() {
  const contributorsQuery = useQuery({
    queryKey: ['contributors'],
    queryFn: () => ovationService.getContributors(),
  })

  const creatorsQuery = useQuery({
    queryKey: ['creators'],
    queryFn: () => ovationService.getCreators(),
  })

  const nftHoldersQuery = useQuery({
    queryKey: ['nftHolders'],
    queryFn: () => ovationService.getFounderHolders(),
  })

  const blueChipHoldersQuery = useQuery({
    queryKey: ['blueChipHolders'],
    queryFn: () => ovationService.getBlueChipHolders(),
  })

  const founderHoldersQuery = useQuery({
    queryKey: ['founderHolders'],
    queryFn: () => ovationService.getFounderHolders(),
  })

  const highestNetWorthQuery = useQuery({
    queryKey: ['highestNetWorth'],
    queryFn: () => ovationService.getHighestNetWorth(),
  })

  const renderHoldersList = (data: DiscoverUserData[]) => {
    if (data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <p className="text-lg font-semibold text-white mb-2">
            No rankings available
          </p>
          <p className="text-sm text-[#B3B3B3]">
            Check back later for updated rankings
          </p>
        </div>
      )
    }

    const sortedData = [...data].sort((a, b) => b.badgeEarned - a.badgeEarned)

    return (
      <>
        <div id="top-3 section" className="w-full flex flex-col gap-10">
          {sortedData.slice(0, 3).map((user, index) => (
            <div
              key={index}
              id={`no-${index + 1}-user`}
              className="rounded-lg h-[360px] bg-cover flex flex-col justify-end center items-center"
              style={{
                backgroundImage: `url(${
                  user?.coverImage || '/assets/images/default-user.svg'
                })`,
              }}
            >
              <div className="flex w-[90%] text-white py-5 px-4 bg-[#1A1A1A] rounded-[18px] mb-10 items-center justify-between border border-[#FFFFFF4D]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{index + 1}</span>
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white">
                    <img
                      alt={user?.displayName}
                      src={
                        user?.profileImage || '/assets/images/default-user.svg'
                      }
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="2xl:text-xl text-sm font-semibold">
                      {user?.displayName}
                    </p>
                    <p className="flex gap-1 text-xs items-center text-[#E6E6E6]">
                      <span>@{user?.username} </span>
                      <VerifyIcon />
                    </p>
                  </div>
                </div>
                <div className="bg-white text-[#0B0A10] px-[10px] text-[9px] py-[6px] rounded-3xl">
                  {user?.badgeEarned} Badges
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id="top-4-10 section" className="flex flex-col gap-5 w-full mt-5">
          {sortedData.slice(3, 10).map((user, index) => (
            <div key={index} className="w-full">
              <div className="flex h-[90px] text-white pl-4 pr-4 bg-[#18181C] rounded-[20px] items-center justify-between border border-[#35353880]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{index + 4}</span>
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white">
                    <img
                      alt={user?.displayName}
                      src={
                        user?.profileImage || '/assets/images/default-user.svg'
                      }
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="2xl:text-xl text-sm font-semibold">
                      {user?.displayName}
                    </p>
                    <p className="flex gap-2 text-xs items-center">
                      <span>@{user?.username} </span>
                      <VerifyIcon />
                    </p>
                  </div>
                </div>
                <div className="bg-[#3C3B40] text-[#B3B3B3] px-[10px] py-[6px] text-[9px] rounded-3xl">
                  {user?.badgeEarned} Badges
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-center text-base font-medium text-white">
        <p>TOP BADGE HOLDERS</p>
        {/* <Button className="bg-white">View all</Button> */}
      </div>
      <div className="p-4 items-center w-full rounded-lg flex flex-col gap-10 border-[#353538] border-[1px]">
        <Tabs defaultValue="contributors" className="w-full">
          <TabsList className="w-full flex gap-2 overflow-auto pb-1">
            <CTabTrigger value="contributors">Top Contributors</CTabTrigger>
            <CTabTrigger value="creators">Top Creators</CTabTrigger>
            <CTabTrigger value="nftHolders">Top NFT Holders</CTabTrigger>
            <CTabTrigger value="blueChipHolders">Blue Chip Holders</CTabTrigger>
            <CTabTrigger value="founderHolders">Founder Holders</CTabTrigger>
            <CTabTrigger value="highestNetWorth">Highest Net Worth</CTabTrigger>
          </TabsList>
          <TabsContent value="contributors">
            {contributorsQuery.isLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(contributorsQuery.data || [])
            )}
          </TabsContent>
          <TabsContent value="creators">
            {creatorsQuery.isLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(creatorsQuery.data || [])
            )}
          </TabsContent>
          <TabsContent value="nftHolders">
            {nftHoldersQuery.isLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(nftHoldersQuery.data || [])
            )}
          </TabsContent>
          <TabsContent value="blueChipHolders">
            {blueChipHoldersQuery.isLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(blueChipHoldersQuery.data || [])
            )}
          </TabsContent>
          <TabsContent value="founderHolders">
            {founderHoldersQuery.isLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(founderHoldersQuery.data || [])
            )}
          </TabsContent>
          <TabsContent value="highestNetWorth">
            {highestNetWorthQuery.isLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(highestNetWorthQuery.data || [])
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const CTabTrigger = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  return (
    <TabsTrigger
      value={value}
      className="text-[10px] font-normal p-2 px-4 rounded-full border-none bg-[#232227]  text-[#999999] data-[state=active]:bg-[#F8F8FF] data-[state=active]:text-[#232227]"
    >
      {children}
    </TabsTrigger>
  )
}

function DiscoverRight({ mostViewed }: { mostViewed: DiscoverUserData[] }) {
  return (
    <div className="h-[800px] overflow-scroll mt-10 p-6 mb-5 border border-[#FFFFFF14] rounded-[10px] flex flex-col gap-10 sticky top-1">
      <div className="flex items-center w-full justify-between">
        <p className="text-base font-medium text-white">MOST VIEWED</p>

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
          <div className="grid grid-cols-4 gap-[9px]">
            <img
              src="/assets/images/profile/bnnr1.png"
              alt="User alt"
              className="col-span-1 h-full rounded-[10px]"
            />

            <img
              src="/assets/images/profile/bnnr2.png"
              alt="User alt"
              className="col-span-2 h-full rounded-[10px]"
            />

            <img
              src="/assets/images/profile/bnnr3.png"
              alt="User alt"
              className="col-span-1 h-full rounded-[10px]"
            />
          </div>

          <Image
            src={
              mostViewed[0]?.profileImage || '/assets/images/default-user.svg'
            }
            alt="User Display"
            width={50}
            height={50}
            className={`${mostViewed[0]?.profileImage ? 'bg-[#0B0A10]' : 'bg-[#18181C]'} absolute bottom-[-25px] border-[3px] border-[#0B0A10] rounded-full`}
          />
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center w-full justify-between pb-6 border-b border-[#FFFFFF0D]">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <p className="flex gap-1 items-center text-base font-semibold leading-5 text-white">
                  {mostViewed[0]?.displayName}
                  <VerifyIcon />
                </p>
                <p className="text-xs leading-5 font-medium text-[#B3B3B3]">
                  @{mostViewed[0]?.username}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#B3B3B3]">
            {mostViewed[0]?.bio || 'No bio available'}
          </p>
        </div>
      </div>
      <div id="top-4-10 section" className="flex flex-col gap-4 w-full pt-4">
        {mostViewed.slice(3).map((user, index) => (
          <div key={index} className="w-full">
            <div className="flex  h-[80px] text-white pl-4 pr-4 bg-[#18181C] rounded-[20px] items-center justify-between border border-[#35353880]">
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
                  <p className="text-sm font-semibold">{user?.displayName}</p>
                  <p className="flex gap-1 text-xs text-[#858487] items-center">
                    <span>@{user?.username} </span>
                    <VerifyIcon />
                  </p>
                </div>
              </div>
              <div className="bg-[#CFF073] text-[10px] font-medium text-black px-[10px] py-2 rounded-3xl">
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
