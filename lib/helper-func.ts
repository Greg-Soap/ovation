'use client'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';

function generateRandomString(length = 10) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
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
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export const decodeIdToken = (idToken: string): DecodedToken => {
  return jwtDecode<DecodedToken>(idToken);
};

export const chainIdToChainName: { [key: number]: string } = {
  1: "eth",
  56: "bsc",
  137: "polygon",
  43114: "avalanche",
  250: "fantom",
  25: "cronos",
  42161: "arbitrum",
  10: "optimism",
};

export interface NotificationMessage {
  reference: string;
  referenceId: string;
  title: string;
  message: string;
  initiatorId: string;
}
