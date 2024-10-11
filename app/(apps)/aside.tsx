'use client'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
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
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import FeedbackModal from './_feedback/feedback'
import { useAnchorNavigation } from '@/lib/use-navigation'
import CustomModal from '@/components/customs/custom-modal'
import colors from '@/lib/colors'
import { useAppStore } from '@/store/use-app-store'
import CustomPopover from '@/components/customs/custom-popover'
import CustomDialog from '@/components/customs/custom-dialog'
import CustomAvatar from '@/components/customs/custom-avatar'
import { getToken } from '@/lib/cookies'

export default function Aside() {
  const navigateTo = useAnchorNavigation()
  const currentPath = usePathname()
  const { removeValue } = useLocalStorage<UserData | null>('userData', null)
  const token = getToken()

  const { user } = useAppStore()

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
    navigateTo('/')
  }

  const menuItems = token
    ? [
        {
          icon: LocationDiscover,
          text: 'Discover',
          path: '/discover',
        },
        {
          icon: Profile,
          text: 'Profile',
          path: '/profile',
        },
        {
          icon: Setting2,
          text: 'Settings',
          path: '/settings',
        },
        {
          icon: Message,
          text: 'Messages',
          path: '/messages',
        },
        {
          icon: NotificationBing,
          text: 'Notification',
          path: '/notification',
        },
      ]
    : [
        {
          icon: LocationDiscover,
          text: 'Discover',
          path: '/discover',
        },
        {
          icon: Profile,
          text: 'Profile',
          path: '/profile',
        },
      ]

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {user && (
        <aside className="fixed z-50 lg:fixed py-3 lg:py-0 flex flex-col items-center justify-between lg:justify-start lg:gap-7 lg:pt-4 min-w-[310px] w-full lg:w-[310px] lg:border-r border-[#1A1A1A] other-link overflow-scroll bg-[#232227] lg:bg-[#111115] bottom-0">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {token && (
              <div className="hidden lg:flex w-[90%] items-center justify-between border border-[#333333] bg-[#18181C] p-3 rounded-[8px]">
                <div className="flex items-center gap-[7px]">
                  <CustomAvatar
                    src={user?.profileImage}
                    alt="User Display Picture"
                    size="sm"
                  />
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold leading-5 ">
                      {user?.displayName}
                    </p>
                    <p className="text-[10px] leading-5 font-medium text-light">
                      {user?.wallets[0]?.walletAddress?.replace(
                        /^(.{6})(.*)(.{4})$/,
                        '$1***$3',
                      )}
                    </p>
                  </div>
                </div>
                <CustomPopover
                  trigger={
                    <button className="p-1 rounded-full" type="button">
                      <More size={24} color="white" variant="Outline" />
                    </button>
                  }
                  content={
                    <CustomDialog
                      trigger={
                        <Button
                          variant={'ghost'}
                          className="py-[10px] w-full text-red-500 hover:text-red-600 hover:bg-transparent"
                        >
                          Logout {user?.username}
                        </Button>
                      }
                      title="Confirm Logout"
                      description="Are you sure you want to log out?"
                      confirmText="Logout"
                      cancelText="Cancel"
                      onConfirm={handleLogout}
                    />
                  }
                  side="bottom"
                  className="w-fit bg-[#232227] flex flex-col items-start border-none text-base py-2"
                />
              </div>
            )}
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="w-full h-fit lg:h-[550px] lg:w-[85%] flex flex-row lg:flex-col justify-between lg:justify-start px-6 gap-2">
              {menuItems.map((item, index) => {
                const isActive = currentPath.includes(item.path)
                const Icon = item.icon

                return (
                  <Button
                    type="button"
                    className={`w-fit lg:w-full ${isActive ? 'text-primary lg:text-light' : 'text-light'}  items-center justify-start gap-2 p-3 lg:py-7 lg:px-[30px] rounded-[50px] hover:bg-[#18181C] focus:bg-[#232227] group transition-all duration-300 ${
                      isActive
                        ? 'bg-transparent lg:bg-[#232227]'
                        : 'bg-transparent'
                    }`}
                    key={index}
                    asChild
                  >
                    <a href={item.path}>
                      <Icon
                        size={24}
                        variant={isActive ? 'Bold' : 'Outline'}
                        color={isActive ? colors.primary.DEFAULT : colors.light}
                      />
                      <p
                        className={`hidden lg:flex items-center gap-2 text-lg group-hover: group-focus:text-gray ${isActive ? ' font-medium' : 'text-light'}`}
                      >
                        {item.text}
                      </p>
                    </a>
                  </Button>
                )
              })}
            </div>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FeedbackButton className="hidden lg:flex" />
          </ErrorBoundary>
        </aside>
      )}
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
          <p className=" text-xs font-medium">Help us improve</p>
          <p className="text-light text-[9px] text-center">
            Your input will help us improve and create an even better experience
            for everyone. Thank you for being a part of this journey!
          </p>
        </div>
        <CustomModal
          trigger={
            <Button
              variant={'default'}
              className=" text-xs font-semibold py-2 px-3 w-full h-[30px]  rounded-[8px]"
            >
              Submit a feedback
            </Button>
          }
          className="flex flex-col items-center justify-center p-0 m-0 w-fit h-fit overflow-auto border-none"
        >
          <FeedbackModal />
        </CustomModal>
      </div>
    </ErrorBoundary>
  )
}
