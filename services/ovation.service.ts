import api from './http.service'
import type {
  Login,
  Register,
  ProfileMod,
  UserExperience,
  UserSocialsMod,
  Path,
  Wallet,
} from '../models/all.model'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class OvationService {
  static checkEmail(email: string) {
    return api.get(`/Auth/email/${email}`)
  }

  static checkUsername(username: string) {
    return api.get(`/Auth/username/${username}`)
  }

  static register(data: Register) {
    return api.post('/Auth/register', data)
  }

  static login(data: Login) {
    return api.post('/Auth/login', data)
  }

  static forgotPassword(email: string) {
    return api.get<{ userId: string; otp: string }>(`/Auth/forget-password/${email}`)
  }

  static changePassword(userId: string, password: string) {
    return api.patch('/Auth/change-password', { userId, password })
  }

  static getProfile() {
    return api.get('/Profile')
  }

  static getUserProfile(userId: string) {
    return api.get(`/Profile/${userId}`)
  }

  static updatePersonalInfo(data: ProfileMod) {
    return api.put('/Profile/personal-info', data)
  }

  static addExperience(data: UserExperience) {
    return api.post('/Profile/experience', data)
  }

  static updateExperience(id: string, data: UserExperience) {
    return api.put(`/Profile/experience/${id}`, data)
  }

  static updateSocials(data: UserSocialsMod) {
    return api.put('/Profile/socials', data)
  }

  static getPath() {
    return api.get<Path[]>('/Path')
  }

  static getWallets() {
    return api.get<Wallet[]>('/Wallet')
  }
}

const ovationService = OvationService

export default ovationService
