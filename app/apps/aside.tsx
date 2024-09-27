'use client'
import Image from 'next/image'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  LocationDiscover,
  Profile,
  Setting2,
  Message,
  NotificationBing,
  More,
} from 'iconsax-react'
import { useLocalStorage } from '@/lib/use-local-storage'
import type { UserData } from '@/models/all.model'
import ovationService from '@/services/ovation.service'
// import FeedbackModal from './feedback'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import FeedbackModal from './_feedback/feedback'
import { getStoredUser } from '@/lib/helper-func'

const menuItems = [
  {
    icon: LocationDiscover,
    text: 'Discover',
    path: '/apps/discover',
  },
  {
    icon: Profile,
    text: 'Profile',
    path: '/apps/profile',
  },
  {
    icon: Setting2,
    text: 'Settings',
    path: '/apps/settings',
  },
  {
    icon: Message,
    text: 'Messages',
    path: '/apps/messages',
  },
  {
    icon: NotificationBing,
    text: 'Notification',
    path: '/apps/notification',
  },
]

export default function Aside() {
  const router = useRouter()
  const currentPath = usePathname()
  const { removeValue } = useLocalStorage<UserData | null>('userData', null)
  const user = getStoredUser()

  const handleClick = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    ovationService.logout()
    removeValue()

    // Remove all items with 'Draft' in the key
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.includes('Draft')) {
        localStorage.removeItem(key)
      }
    }
    router.push('/')
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <aside className="fixed z-50 lg:fixed py-3 lg:py-0 flex flex-col items-center justify-between lg:justify-start lg:gap-7 lg:pt-4 min-w-[310px] w-full lg:w-[310px] lg:border-r border-[#1A1A1A] other-link overflow-scroll bg-[#232227] lg:bg-[#111115] bottom-0">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="hidden lg:flex w-[90%] items-center justify-between border border-[#333333] bg-[#18181C] p-3 rounded-[8px]">
            <div className="flex items-center gap-[7px]">
              <Image
                src={user?.profileImage || '/assets/images/default-user.svg'}
                alt="User Display Picture"
                width={28}
                height={28}
                className="rounded-full object-cover w-[28px] h-[28px]"
              />
              <div className="flex flex-col">
                <p className="text-xs font-semibold leading-5 text-white">
                  {user?.displayName}
                </p>
                <p className="text-[10px] leading-5 font-medium text-[#B3B3B3]">
                  {user?.wallets[0]?.walletAddress?.replace(
                    /^(.{6})(.*)(.{4})$/,
                    '$1***$3',
                  )}
                </p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger className="p-1 rounded-full">
                <More size={24} color="white" variant="Outline" />
              </PopoverTrigger>
              <PopoverContent
                side="right"
                className="w-fit bg-[#232227] flex flex-col items-start border-none text-white text-base py-2"
              >
                <Button
                  variant={'ghost'}
                  onClick={handleLogout}
                  className="py-[10px] w-full text-red-500 hover:text-red-600 hover:bg-transparent"
                >
                  Logout {user?.username}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="w-full h-fit lg:h-[550px] lg:w-[85%] flex flex-row lg:flex-col justify-between lg:justify-start px-6 gap-2">
            {menuItems.map((item, index) => {
              const isActive = currentPath.includes(item.path)
              const Icon = item.icon

              return (
                <Button
                  type="button"
                  className={`w-fit lg:w-full ${isActive ? 'text-[#CFF073] lg:text-[#B3B3B3]' : 'text-[#B3B3B3]'}  items-center justify-start gap-2 p-3 lg:py-7 lg:px-[30px] rounded-[50px] hover:bg-[#18181C] focus:bg-[#232227] group transition-all duration-300 ${
                    isActive
                      ? 'bg-transparent lg:bg-[#232227]'
                      : 'bg-transparent'
                  }`}
                  key={index}
                  onClick={() => handleClick(item.path)}
                >
                  <Icon size={24} variant={isActive ? 'Bold' : 'Outline'} />
                  <p
                    className={`hidden lg:flex items-center gap-2 text-lg group-hover:text-white group-focus:text-[#CCCCCC] ${isActive ? 'text-white font-medium' : 'text-[#B3B3B3]'}`}
                  >
                    {item.text}
                  </p>
                </Button>
              )
            })}
          </div>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <FeedbackButton className="hidden lg:flex" />
        </ErrorBoundary>
      </aside>
    </ErrorBoundary>
  )
}

export function FeedbackButton({ className }: { className?: string }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        className={`flex flex-col items-center gap-4 w-[90%] sticky bottom-3 px-[5px] pt-5 pb-1.5 bg-[#18181C] border border-[#29292F] rounded-[10px] mb-3 ${className}`}
      >
        <img
          src="/assets/images/aside-absolute.png"
          alt="Message"
          className="absolute -top-4 w-[33px] h-[33px] "
        />
        <div className="w-full flex flex-col items-center gap-0.5">
          <p className="text-[#F8F8FF] text-xs font-medium">Help us improve</p>
          <p className="text-[#B3B3B3] text-[9px] text-center">
            Your input will help us improve and create an even better experience
            for everyone. Thank you for being a part of this journey!
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'default'}
              className="text-[#0B0A10] text-xs font-semibold py-2 px-3 w-full h-[30px] bg-[#CFF073] rounded-[8px]"
            >
              Submit a feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center justify-center p-0 m-0 w-fit h-fit overflow-auto border-none">
            {/* <FeedbackModal /> */}
            <FeedbackModal />
          </DialogContent>
        </Dialog>
      </div>
    </ErrorBoundary>
  )
}
