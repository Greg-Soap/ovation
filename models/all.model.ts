export interface ChangePassword {
  userId: string
  password: string
}

export interface Login {
  username: string
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
  userWallet: WalletAcct
}

export interface UserExperience {
  company: string
  role: string
  department: string
  startDate: string
  endDate?: string | null
  description: string
  skill: string
}

export interface UserExperienceMod extends UserExperience {}

export interface UserSocialsMod {
  linkedIn?: string
  lens?: string
  forcaster?: string
  blur?: string
  foundation?: string
  magic?: string
  ethico?: string
}

export interface WalletAcct {
  walletAddress: string
  walletTypeId: string
  chain: string
  metadata?: string
}

export interface Wallet {
  name: string
  logoUrl: string
  walletId: string
}

export interface ProfileData {
  userId: string
  username: string
  email: string
  profile: {
    displayName: string
    birthDate: string | null
    location: string | null
    bio: string | null
    coverImage: string | null
    profileImage: string | null
  } | null
  socials: {
    ethico: string | null
    lens: string | null
    magic: string | null
    linkedIn: string | null
    forcaster: string | null
    foundation: string | null
    blur: string | null
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
}

export interface FeaturedItem {
  imgSrc: string
  artist: string
  price: number
}
