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
} from '../models/all.model'
import { removeToken } from '@/lib/cookies'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class OvationService {
  static checkEmail(email: string) {
    return api.get(`/Auth/email/${email}`)
  }

  static subscribeToNewsletter(email: string) {
    return api.post('/Newsletter', { subscriberEmail: email })
  }

  static checkUsername(username: string) {
    return api.get(`/Auth/username/${username}`)
  }

  static register(data: Register) {
    return api.post<{ message: string; token: string; userData: UserData }>('/Auth/register', data)
  }

  static login(data: Login) {
    return api.post<{ message: string; token: string; userData: UserData }>('/Auth/login', data)
  }

  static logout() {
    removeToken()
  }

  static forgotPassword(email: string) {
    return api.get<{ userId: string; otp: string }>(`/Auth/forget-password/${email}`)
  }

  static changePassword(userId: string, password: string) {
    return api.patch('/Auth/change-password', { userId, password })
  }

  static changeProfilePassword(oldPassword: string, password: string) {
    return api.patch('/Profile/change-password', { oldPassword, password })
  }

  static async getProfile() {
    const response = await api.get<{ data: ProfileData; message: string }>('/Profile')
    return response.data
  }

  static async getUserProfile(username: string) {
    const response = await api.get(`/Profile/${username}`)
    return response.data
  }

  static async sendFeedback(data: {
    userEmail: string
    satisfactory: string
    usefulFeature: string[]
    improvement: string
    confusion?: string
    likelyRecommend?: string
    addition?: string
    biggestPain?: string
  }) {
    return api.post('/Feedback', data)
  }

  static updatePersonalInfo(data: ProfileMod) {
    return api.patch('/Profile/personal-info', data)
  }

  static addExperience(data: UserExperience) {
    return api.post('/Profile/experience', data)
  }

  static updateExperience(id: string, data: UserExperience) {
    return api.put(`/Profile/experience/${id}`, data)
  }

  static getExperience(userId: string) {
    return api.get<{ data: UserExperience[]; message: string }>(`/Profile/experience/${userId}`)
  }

  static getBadges(userId: string) {
    return api.get<{ data: Badge[]; message: string }>(`/Profile/badge/${userId}?page=1`)
  }

  static getFavouriteNft(userId: string) {
    return api.get(`/Profile/fav-nft/${userId}`)
  }

  static getNfts(userId: string) {
    return api.get(`/Profile/nft/${userId}?page=1`)
  }

  static getStats(userId: string) {
    return api.get(`/Profile/stat/${userId}`)
  }

  static updateSocials(data: UserSocialsMod) {
    return api.put('/Profile/socials', data)
  }

  static getSocialLinks(userId: string) {
    return api.get<{ data: UserSocialsMod; message: string }>(`/Profile/social/${userId}`)
  }

  static getPath() {
    return api.get<{ data: Path[]; message: string }>('/Path')
  }

  static getWallets() {
    return api.get<{ data: Wallet[]; message: string }>('/Wallet')
  }
}

const ovationService = OvationService

export default ovationService
