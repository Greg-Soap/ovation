import { getCookie, getToken } from '@/lib/cookies'
import axios from 'axios'

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL)

export const multipartHeaders = {
  headers: { 'Content-Type': 'multipart/form-data' },
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'X-Device-Type': 'web',
    tokenId: process.env.NEXT_PUBLIC_TOKEN_ID,
  },
})

api.interceptors.request.use(
  (req) => {
    if (req.url?.includes('login')) return req

    const token = getToken()
    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  },
  (err) => {
    Promise.reject(err)
  },
)

export default api