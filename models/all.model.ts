import type { ModelObject } from '@/lib/cookies'

export interface ChangePassword {
  userId: string
  password: string
}

export interface Login {
  userId: string
  password: string
}

export interface Newsletter {
  subscriberEmail?: string
}

export interface Path {
  name: string
  description: string
  pathId: string
}

export interface Paths {
  pathId?: string
}

export interface PersonalInfo {
  displayName: string
  email: string
  username: string
  password: string
}

export interface ProfileMod {
  displayName: string
  email: string
  username: string
  birthDate?: string
  location?: string
  bio?: string
  profileImage?: string
}

export interface Register {
  personalInfo: PersonalInfo
  userPath?: Paths
  userWallet: WalletAcct | null
  type: 'Normal' | 'Google'
}

export interface UserExperience {
  company: string
  role: string
  department: string
  startDate: string
  endDate?: string | null
  description: string
  skill: string
  id?: string
}

export interface UserExperienceMod extends UserExperience {}

export interface UserSocialsMod {
  linkedIn?: string | null
  lens?: string | null
  forcaster?: string | null
  blur?: string | null
  foundation?: string | null
  magic?: string | null
  ethico?: string | null
  twitter?: string | null
  website?: string | null
}

export interface WalletAcct {
  walletAddress?: string
  walletTypeId: string | null
  chain: string
  metadata?: string | null
  id?: string | number
}

export interface NFT {
  isPrivate?: boolean
  id: string
  imageUrl: string
  description?: string
  metaData?: {
    Amount: string
    BlockNumber: string
    BlockNumberMinted: string | null
    CollectionBannerImage: string
    CollectionLogo: string
    ContractType: string
    LastMetadataSync: string
    LastTokenUriSync: string
    Metadata: string
    MinterAddress: string
    Name: string | null
    OwnerOf: string
    PossibleSpam: boolean
    RarityLabel: string
    RarityPercentage: number
    RarityRank: number
    Symbol: string | null
    TokenAddress: string
    TokenHash: string
    TokenId: string
    TokenUri: string
    VerifiedCollection: boolean
  }
  name: string | null
  tokenAddress: string
  tokenId: string
}

export interface Wallet {
  name: string
  logoUrl: string
  walletId: string
}
export interface ProfileData {
  createdDate: string
  email: string
  profile: {
    displayName: string | null
    username: string
    birthDate: string | null
    location: string | null
    bio: string | null
    profileImage: string | null
    coverImage: string | null
  }
  userStats: {
    nftCreated: number
    badgeEarned: number
    followers: number
    following: number
    networth: number
    nftCollected: number
  } | null
  socials: {
    ethico: string | null
    lens: string | null
    magic: string | null
    linkedIn: string | null
    forcaster: string | null
    foundation: string | null
    blur: string | null
    twitter: string | null
  } | null
  username: string
  userId: string
  isFollowing: boolean
}
export interface UserData {
  userId: string
  username: string
  email: string
  displayName: string | null
  birthDate: string | null
  location: string | null
  bio: string | null
  coverImage: string | null
  profileImage: string | null
  badges: Badge[]
  nft: []
  paths: []
  socials: {
    ethico: string | null
    lens: string | null
    magic: string | null
    linkedIn: string | null
    forcaster: string | null
    foundation: string | null
    blur: string | null
    twitter: string | null
  } | null
  userStats: {
    nftCreated: number
    badgeEarned: number
    followers: number
    following: number
    networth: number
    nftCollected: number
  } | null
  featured: FeaturedItem[]
  wallets: {
    id: string
    walletAddress: string | null
    name: string
    metadata: ModelObject
    logoUrl: string
  }[]
}

export interface FeaturedItem {
  imgSrc: string
  artist: string
  price: number
}

export interface Badge {
  badgeId: string
  badgeName: string
  description: string
  earnedAt: string
  imageUrl: string
}

export interface DiscoverUserData {
  userId: string
  username: string
  email: string
  displayName: string
  profileImage: string | null
  views: number
  badgeEarned: number
  location?: string | null
  bio: string | null
  coverImage: string | null
  totalNft?: number
  founderNft?: number
  experiences?: number
  followers?: number
}

export interface FollowersFollowing {
displayName: string
isUserFollowing: boolean
isFollowing: boolean
profileImage: string
userId: string
  username: string
  bio: string
}
