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

declare global {
  interface Window {
    keplr: any
    getOfflineSigner: (chainId: string) => any
    leap: LeapWallet
  }
}

interface LeapWallet {
  enable: (chainId: string) => Promise<void>
  getOfflineSigner: (chainId: string) => OfflineSigner
  suggestChain: (chainInfo: ChainInfo) => Promise<void>
}

interface OfflineSigner {
  getAccounts: () => Promise<Account[]>
  signAmino: (chainId: string, signer: string, signDoc: any) => Promise<{ signature: any }>
}

interface Account {
  address: string
  pubkey: Uint8Array
  algo: string
}

interface ChainInfo {
  chainId: string
  chainName: string
  rpc: string
  rest: string
  bip44: {
    coinType: number
  }
  bech32Config: {
    bech32PrefixAccAddr: string
    bech32PrefixAccPub: string
    bech32PrefixValAddr: string
    bech32PrefixValPub: string
    bech32PrefixConsAddr: string
    bech32PrefixConsPub: string
  }
  currencies: Currency[]
  feeCurrencies: Currency[]
  stakeCurrency: Currency
  coinType: number
  gasPriceStep: {
    low: number
    average: number
    high: number
  }
}

interface Currency {
  coinDenom: string
  coinMinimalDenom: string
  coinDecimals: number
}

export interface ServerErrorResponder {
  response: {
    status: number
  }
}
