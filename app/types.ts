export interface CustomIconProps {
  className?: string
  fill?: string
  strokeLine?: string
}

export type CustomIcon = React.SVGProps<SVGSVGElement> & {
  iconFill?: string
}
export interface BadgedHolders {
  id: string
  displayName: string
  userName: string
  displayImg: string
  contributorAmount: number
  collectorAmount: number
  creatorAmount: number
  topHoldersAmount: number
  founderNftAMount: number
  netWorth: number
  blueAmount: number
}

export interface FeaturedUser {
  displayName: string
  userName: string
  nftCount: number
  ovaToken: number
  archToken: number
  badges: number
  img: string
  desc: string
  bio?: string
  role?: string
  organization?: string
}

export enum DiscoverFilter {
  Contributors = 'contributors',
  Creators = 'creators',
  NftHolders = 'nftholders',
  BlueChipHolders = 'bluechipholders',
  FounderHolders = 'founderholders',
  HighestNetWorth = 'highest net worth',
}

export interface DiscoverHoldersProps {
  setFilter: React.Dispatch<React.SetStateAction<DiscoverFilter>>
  Filter: DiscoverFilter
  data: BadgedHolders[]
}
