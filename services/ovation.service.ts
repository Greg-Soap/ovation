import api from './http.service'
import type {
  Login,
  Register,
  ProfileMod,
  UserExperience,
  UserSocialsMod,
  Path,
  Wallet,
  ProfileData,
  UserData,
  Badge,
  DiscoverUserData,
  WalletAcct,
  FollowersFollowing,
} from '../models/all.model'
import { removeToken } from '@/lib/cookies'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class OvationService {
  // Authentication
  static checkEmail(email: string) {
    return api.get(`/Auth/email/${email}`)
  }

  static checkUsername(username: string) {
    return api.get(`/Auth/username/${username}`)
  }

  static register(data: Register) {
    return api.post<{ message: string; token: string; userData: UserData }>('/Auth/register', data)
  }

  static loginGoogle(email: string) {
    return api.post<{ message: string; token: string; userData: UserData }>(
      `/Auth/login/google/${email}`,
    )
  }

  static login(data: Login) {
    return api.post<{ message: string; token: string; userData: UserData }>('/Auth/login', data)
  }

  static verifyOtp(userId: string, otp: string) {
    return api.get(`/Auth/verify/otp/${userId}/${otp}`)
  }


  static verifyAccount(code: string, otp: string) {
    return api.get<{ message: string; token: string; userData: UserData }>(`/Auth/account/verify/${code}/${otp}`)
  }

  static logout() {
    removeToken()
  }

  static forgotPassword(email: string) {
    return api.get<{ data: string; message: string }>(`/Auth/forget-password/${email}`)
  }

  static changePassword(userId: string, password: string) {
    return api.patch('/Auth/change-password', { userId, password })
  }

  static getNotifications() {
    return api.get('/Notification')
  }

  // Profile Management
  static async getProfile() {
    const response = await api.get<{ data: ProfileData; message: string }>('/Profile')
    return response.data?.data
  }

  static async getUserProfile(username: string) {
    const response = await api.get<{ data: ProfileData; message: string }>(`/Profile/${username}`)
    return response.data?.data
  }

  static updatePersonalInfo(data: ProfileMod) {
    return api.patch('/Profile/personal-info', data)
  }

  static changeProfilePassword(oldPassword: string, password: string) {
    return api.patch('/Profile/change-password', { oldPassword, password })
  }

  static followUser(userId: string) {
    return api.post(`/Profile/follow/${userId}`)
  }

  static unfollowUser(userId: string) {
    return api.delete(`/Profile/follow/${userId}`)
  }

  static getFollowers(userId: string) {
    return api.get<{ data: FollowersFollowing[]; message: string }>(`/Profile/followers/${userId}`)
  }

  static getFollowing(userId: string) {
    return api.get<{ data: FollowersFollowing[]; message: string }>(`/Profile/followings/${userId}`)
  }

  static viewProfile(userId: string) {
    return api.post(`/Profile/view/${userId}`)
  }

  static hideNft(data: { nftId: string; public: boolean }) {
    return api.patch('/Profile/nft/privacy', data)
  }
  static addWallet(data: WalletAcct) {
    return api.post<{ message: string; data: WalletAcct[] }>('/Profile/wallet', data)
  }

  static getUserWallets(userId: string) {
    return api.get<{ data: WalletAcct[]; message: string }>(`/Profile/wallet/${userId}`)
  }

  static deleteWallet(walletId: string | number) {
    return api.delete(`/Profile/wallet/${walletId}`)
  }

  static search(query: string) {
    return api.get(`/Search/user?query=${query}`)
  }

  // Experience
  static addExperience(data: UserExperience) {
    return api.post('/Profile/experience', data)
  }

  static updateExperience(id: string, data: UserExperience) {
    return api.patch(`/Profile/experience/${id}`, data)
  }

  static getExperience(userId: string) {
    return api.get<{ data: UserExperience[]; message: string }>(`/Profile/experience/${userId}`)
  }

  static deleteExperience(id: string) {
    return api.delete(`/Profile/experience/${id}`)
  }

  // Badges and NFTs
  static getBadges(userId: string) {
    return api.get<{ data: Badge[]; message: string }>(`/Profile/badge/${userId}?page=1`)
  }

  static getFavouriteNft(userId: string) {
    return api.get<{
      data: {
        contractAddress: string
        description: string
        id: string
        imageUrl: string
        type: string
        name: string
        tokenId: string
      }[]
      message: string
    }>(`/Profile/fav-nft/${userId}`)
  }

  static setFavouriteNft(nftId: string) {
    return api.patch('/Profile/fav-nft', { id: nftId })
  }

  static removeFavouriteNft(nftId: string) {
    return api.delete(`/Profile/fav-nft/${nftId}`)
  }

  static getNfts(userId: string) {
    return api.get(`/Profile/nft/${userId}?page=1`)
  }

  // Social Links
  static updateSocials(data: UserSocialsMod) {
    return api.patch('/Profile/socials', data)
  }

  static getSocialLinks(userId: string) {
    return api.get<{ data: UserSocialsMod; message: string }>(`/Profile/social/${userId}`)
  }

  // Stats
  static getStats(userId: string) {
    return api.get(`/Profile/stat/${userId}`)
  }

  // Paths and Wallets
  static getPath() {
    return api.get<{ data: Path[]; message: string }>('/Path')
  }

  static getWallets() {
    return api.get<{ data: Wallet[]; message: string }>('/Wallet')
  }

  // Feedback and Newsletter
  static async sendFeedback(data: {
    userEmail: string
    satisfactory: string
    usefulFeature: string
    improvement: string
    confusion?: string
    likelyRecommend?: string
    addition?: string
    biggestPain?: string
  }) {
    return api.post('/Feedback', data)
  }

  static subscribeToNewsletter(email: string) {
    return api.post('/Newsletter', { subscriberEmail: email })
  }

  // Discover endpoints
  static async getTopNft() {
    const response = await api.get<{ data: DiscoverUserData[]; message: string }>(
      '/Discover/top-nft',
    )
    return response.data?.data
  }

  static async getBlueChipHolders() {
    const response = await api.get<{ data: any; message: string }>('/Discover/bluechip')
    return response.data?.data
  }

  static async getHighestNetWorth() {
    const response = await api.get<{ data: any; message: string }>('/Discover/networth')
    return response.data?.data
  }

  static async getContributors() {
    const response = await api.get<{ data: DiscoverUserData[]; message: string }>(
      '/Discover/contributors',
    )
    return response.data?.data
  }

  static async getCreators() {
    const response = await api.get<{ data: DiscoverUserData[]; message: string }>(
      '/Discover/creators',
    )
    return response.data?.data
  }

  static async getFounderHolders() {
    const response = await api.get<{ data: DiscoverUserData[]; message: string }>(
      '/Discover/founder-nft',
    )
    return response.data?.data
  }

  static async getMostViewed() {
    const response = await api.get<{ data: DiscoverUserData[]; message: string }>(
      '/Discover/most-viewed',
    )
    return response.data?.data
  }

  static async getMostFollowed() {
    const response = await api.get<{ data: DiscoverUserData[]; message: string }>(
      '/Discover/most-followed',
    )
    return response.data?.data
  }
}

const ovationService = OvationService

export default ovationService
