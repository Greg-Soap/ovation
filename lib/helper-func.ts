'use client'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useLocalStorage } from './use-local-storage'
import type { UserData } from '@/models/all.model'
import type { FriendProps } from '@/app/(apps)/messages/message-container'
import { format, parseISO } from 'date-fns'

function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
export { generateRandomString }

type UseResponsiveAnimation = (
  mobileXValues: number[],
  desktopXValues: number[],
  mobileDuration: number,
  desktopDuration: number,
) => {
  xValues: number[]
  duration: number
}

export const useResponsiveAnimation: UseResponsiveAnimation = (
  mobileXValues,
  desktopXValues,
  mobileDuration,
  desktopDuration,
) => {
  const [xValues, setXValues] = useState<number[]>(desktopXValues)
  const [duration, setDuration] = useState<number>(desktopDuration)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setXValues(mobileXValues)
        setDuration(mobileDuration)
      } else {
        setXValues(desktopXValues)
        setDuration(desktopDuration)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileXValues, desktopXValues, mobileDuration, desktopDuration])

  return { xValues, duration }
}

interface DecodedToken {
  sub: string
  name: string
  email: string
  picture: string
}

export const decodeIdToken = (idToken: string): DecodedToken => {
  return jwtDecode<DecodedToken>(idToken)
}

export const chainIdToChainName: { [key: number]: string } = {
  1: 'eth',               // Ethereum Mainnet
  137: 'polygon',         // Polygon Mainnet
  56: 'bsc',              // Binance Smart Chain
  43114: 'avalanche',     // Avalanche Mainnet
  250: 'fantom',          // Fantom Opera
  11297108109: 'palm',    // Palm Mainnet
  25: 'cronos',           // Cronos Mainnet
  42161: 'arbitrum',      // Arbitrum One Mainnet
  100: 'gnosis',          // Gnosis (xDai)
  901: 'chiliz',          // Chiliz Mainnet
  8453: 'base',           // Base Mainnet
  10: 'optimism',         // Optimism Mainnet
  59144: 'linea',         // Linea Mainnet
  1284: 'moonbeam',       // Moonbeam Mainnet
  1285: 'moonriver',      // Moonriver Mainnet
  1666600000: 'harmony',  // Harmony Mainnet
  42220: 'celo',          // Celo Mainnet
  122: 'fuse',            // Fuse Mainnet
  8217: 'klaytn',         // Klaytn Mainnet
  1313161554: 'aurora',   // Aurora Mainnet
  40: 'telos',            // Telos Mainnet
  128: 'heco',            // Huobi ECO Chain Mainnet
  4689: 'iotex',          // IoTeX Mainnet
};

export const optionValueToBlockchainName: { [optionValue: string]: string } = {
  eth: 'Ethereum',
  polygon: 'Polygon',
  bsc: 'Binance Smart Chain',
  avalanche: 'Avalanche',
  fantom: 'Fantom',
  palm: 'Palm',
  cronos: 'Cronos',
  arbitrum: 'Arbitrum One',
  gnosis: 'Gnosis',
  chiliz: 'Chiliz',
  base: 'Base',
  optimism: 'Optimism',
  linea: 'Linea',
  moonbeam: 'Moonbeam',
  moonriver: 'Moonriver',
  solana: 'Solana',
  archway: 'Archway',
  harmony: 'Harmony',
  celo: 'Celo',
  fuse: 'Fuse',
  klaytn: 'Klaytn',
  aurora: 'Aurora',
  telos: 'Telos',
  heco: 'HECO',
  iotex: 'IoTeX',
};
export interface NotificationMessage {
  reference: string
  referenceId: string
  title: string
  message: string
  initiatorId: string
}

export function startCase(str?: string): string {
  if (!str) {
    return ''
  }
  return str
    ?.replace(/([a-z])([A-Z])/g, '$1 $2') // add space between camelCase words
    .replace(/[_-]/g, ' ') // replace underscores and hyphens with spaces
    .replace(/\b\w/g, (match) => match.toUpperCase()) // capitalize first letter of each word
}

export function get<T>(obj: T, path: string, defaultValue?: any): Partial<T> {
  const keys = path.split('.')
  let result = obj
  for (const key of keys) {
    if (result == null) {
      return defaultValue
    }
    // @ts-ignore
    result = result[key]
  }
  return result ?? defaultValue
}

export function lowerCase(str: string): string {
  if (typeof str !== 'string') {
    console.warn('Input is not a string')
    return ''
  }
  return str.toLowerCase()
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return ''

  // Replace underscores and hyphens with spaces
  const modifiedStr = str.replace(/[_-]/g, ' ')

  // Capitalize the first letter
  const firstLetter = modifiedStr.charAt(0).toUpperCase()
  const restOfString = modifiedStr.slice(1)

  return firstLetter + restOfString
}

// snake_case, kebab-case, camelCase, PascalCase, chunk, debounce, range

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

export function formatDate(date: Date): string {
  const month = date.getMonth() + 1 // Months are zero-based
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function parseDate(dateString: string): Date | null {
  const [month, day, year] = dateString.split('/').map(Number)
  if (!month || !day || !year) {
    console.warn('Invalid date format')
    return null
  }
  return new Date(year, month - 1, day)
}

export function getReceiver(): FriendProps | null {
  if (typeof window !== 'undefined') {
    const receiver = window.localStorage.getItem('receiver')
    const receiverData = receiver ? (JSON.parse(receiver) as FriendProps) : null
    if (receiverData == null) return null
    return receiverData
  }
  return null
}

export function formatUsername(username?: string): string {
  if (!username) {
    return ''
  }
  return username.startsWith('@') ? username : `@${username}`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export function formatJoinedDate(dateString: string): string {
  try {
    const date = parseISO(dateString)
    return `Joined ${format(date, 'MMMM yyyy')}`
  } catch (error) {
    console.error('Error parsing date:', error)
    return 'Join date unavailable'
  }
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str
  }
  return `${str.slice(0, maxLength - 3)}...`
}

const isAppDev = (): boolean => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
}

export { isAppDev }
