import VerifyIcon from '@/components/icons/verifyIcon'
import MiniLoader from '@/components/mini-loader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatUsername } from '@/lib/helper-func'
import type { DiscoverUserData } from '@/models/all.model'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'

export function Ranking() {
  const { data: creators, isLoading: creatorsLoading } = useQuery({
    queryKey: ['creators'],
    queryFn: () => ovationService.getCreators(),
  })

  const { data: nftHolders, isLoading: nftHoldersLoading } = useQuery({
    queryKey: ['nftHolders'],
    queryFn: () => ovationService.getTopNft(),
  })

  const { data: founderHolders, isLoading: founderHoldersLoading } = useQuery({
    queryKey: ['founderHolders'],
    queryFn: () => ovationService.getFounderHolders(),
  })

  const { data: mostFollowed, isLoading: mostFollowedLoading } = useQuery({
    queryKey: ['mostFollowed'],
    queryFn: () => ovationService.getMostFollowed(),
  })

  //TODO: Add the rest of the queries as requested
  // const contributorsQuery = useQuery({
  //   queryKey: ['contributors'],
  //   queryFn: () => ovationService.getContributors(),
  // })
  // const blueChipHoldersQuery = useQuery({
  //   queryKey: ['blueChipHolders'],
  //   queryFn: () => ovationService.getBlueChipHolders(),
  // })
  // const highestNetWorthQuery = useQuery({
  //   queryKey: ['highestNetWorth'],
  //   queryFn: () => ovationService.getHighestNetWorth(),
  // })

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-center text-base font-medium ">
        <p>TOP BADGE HOLDERS</p>
        {/* <Button className="bg-white">View all</Button> */}
      </div>
      <div className="p-4 items-center w-full rounded-lg flex flex-col gap-10 border-[#353538] border-[1px]">
        <Tabs defaultValue="nftHolders" className="w-full">
          <TabsList className="w-full flex gap-2 justify-start overflow-auto pb-1">
            <CTabTrigger value="nftHolders">Top NFT Holders</CTabTrigger>
            <CTabTrigger value="creators">Top Creators</CTabTrigger>
            <CTabTrigger value="founderHolders">Founder Holders</CTabTrigger>
            <CTabTrigger value="mostFollowed">Most Followed</CTabTrigger>
            {/* <CTabTrigger value="blueChipHolders">Blue Chip Holders</CTabTrigger> */}
            {/* <CTabTrigger value="contributors">Top Contributors</CTabTrigger> */}
            {/* <CTabTrigger value="highestNetWorth">Highest Net Worth</CTabTrigger> */}
          </TabsList>

          <TabsContent value="creators">
            {creatorsLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(creators || [], 'creators')
            )}
          </TabsContent>
          <TabsContent value="nftHolders">
            {nftHoldersLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(nftHolders || [], 'nftHolders')
            )}
          </TabsContent>
          <TabsContent value="founderHolders">
            {founderHoldersLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(founderHolders || [], 'founderHolders')
            )}
          </TabsContent>
          <TabsContent value="mostFollowed">
            {mostFollowedLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(mostFollowed || [], 'mostFollowed')
            )}
          </TabsContent>
          {/* <TabsContent value="blueChipHolders">
            {blueChipHoldersQuery.isLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(
                blueChipHoldersQuery.data || [],
                'blueChipHolders',
              )
            )}
          </TabsContent> */}
          {/* <TabsContent value="contributors">
            {contributorsQuery.isLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(contributorsQuery.data || [], 'contributors')
            )}
          </TabsContent> */}
          {/* <TabsContent value="highestNetWorth">
            {highestNetWorthQuery.isLoading ? (
              <MiniLoader />
            ) : (
              renderHoldersList(
                highestNetWorthQuery.data || [],
                'highestNetWorth',
              )
            )}
          </TabsContent> */}
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
      className="text-[10px] font-normal p-2 px-4 rounded-full border-none bg-[#232227]  text-lighter data-[state=active]:bg-[#F8F8FF] data-[state=active]:text-[#232227]"
    >
      {children}
    </TabsTrigger>
  )
}

const renderHoldersList = (
  data: DiscoverUserData[],
  type:
    | 'contributors'
    | 'creators'
    | 'nftHolders'
    | 'blueChipHolders'
    | 'founderHolders'
    | 'highestNetWorth'
    | 'mostFollowed',
) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <p className="text-lg font-semibold  mb-2">No rankings available</p>
        <p className="text-sm text-light">
          Check back later for updated rankings
        </p>
      </div>
    )
  }

  const typeDisplayMap = {
    nftHolders: (user: DiscoverUserData) => `${user.totalNft} NFTs`,
    founderHolders: (user: DiscoverUserData) =>
      `${user.founderNft} Founder NFTs`,
    contributors: (user: DiscoverUserData) => `${user.experiences} Experience`,
    mostFollowed: (user: DiscoverUserData) => `${user.followers} Followers`,
    // blueChipHolders: (user: DiscoverUserData) =>
    //   `${user.blueChipNft} Blue Chip NFTs`,
    // highestNetWorth: (user: DiscoverUserData) =>
    //   `$${user.netWorth.toLocaleString()} Net Worth`,
    default: (user: DiscoverUserData) => `${user.badgeEarned} Badges`,
  }

  return (
    <>
      <div id="top-3 section" className="w-full flex flex-col gap-10">
        {data.slice(0, 3).map((user, index) => (
          <div
            key={index}
            id={`no-${index + 1}-user`}
            className="rounded-lg border border-[#353538] h-[360px] bg-cover flex flex-col justify-end center items-center"
            style={{
              backgroundImage: `url(${
                user?.coverImage || '/assets/images/default-user.svg'
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="flex w-[90%]  py-5 px-4 bg-[#1A1A1A] rounded-[18px] mb-10 items-center justify-between border border-[#FFFFFF4D]">
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
                  <a
                    href={`/apps/profile/${user?.username}`}
                    className="2xl:text-xl text-sm font-semibold"
                  >
                    {user?.displayName}
                  </a>
                  <a
                    href={`/apps/profile/${user?.username}`}
                    className="flex gap-1 text-xs items-center text-foreground"
                  >
                    <span>{formatUsername(user?.username)} </span>
                    <VerifyIcon />
                  </a>
                </div>
              </div>
              <div className="bg-white text-primary-foreground px-[10px] text-[9px] py-[6px] rounded-3xl">
                {(
                  typeDisplayMap[type as keyof typeof typeDisplayMap] ||
                  typeDisplayMap.default
                )(user)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="top-4-10 section" className="flex flex-col gap-5 w-full mt-5">
        {data.slice(3).map((user, index) => (
          <div key={index} className="w-full">
            <div className="flex h-[90px]  pl-4 pr-4 bg-[#18181C] rounded-[20px] items-center justify-between border border-[#35353880]">
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
                  <a
                    href={`/apps/profile/${user?.username}`}
                    className="2xl:text-xl text-sm font-semibold"
                  >
                    {user?.displayName}
                  </a>
                  <a
                    href={`/apps/profile/${user?.username}`}
                    className="flex gap-2 text-xs items-center"
                  >
                    <span> {formatUsername(user?.username)} </span>
                    <VerifyIcon />
                  </a>
                </div>
              </div>
              <div className="bg-[#3C3B40] text-light px-[10px] py-[6px] text-[9px] rounded-3xl">
                {(
                  typeDisplayMap[type as keyof typeof typeDisplayMap] ||
                  typeDisplayMap.default
                )(user)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
