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
import FeedbackModal from './feedback'

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
  const { storedValue, removeValue } = useLocalStorage<UserData | null>(
    'userData',
    null,
  )
  const user = storedValue

  const handleClick = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    ovationService.logout()
    removeValue()
    router.push('/')
  }

  return (
    <aside className="fixed z-50 lg:fixed py-3 lg:py-0 flex flex-col items-center justify-between lg:justify-start lg:gap-7 lg:pt-4 min-w-[310px] w-full lg:w-[310px] lg:border-r border-sectionBorder other-link overflow-scroll bg-popBg lg:bg-primaryBg bottom-0">
      <div className="hidden lg:flex w-[90%] items-center justify-between border border-white20 bg-secondaryBg p-3 rounded-[8px]">
        <div className="flex items-center gap-[7px]">
          <Image
            src="/assets/images/timeline/Shape.png"
            alt="User Display Picture"
            width={28}
            height={28}
          />
          <div className="flex flex-col">
            <p className="text-xs font-semibold leading-5 text-white100">
              {user?.displayName}
            </p>
            <p className="text-[10px] leading-5 font-medium text-white70">
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
            className="w-fit bg-popBg flex flex-col items-start border-none text-white100 text-base py-2"
          >
            <Button
              variant={'ghost'}
              onClick={handleLogout}
              className="py-[10px] w-full"
            >
              Logout {user?.username}
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full h-fit lg:h-[550px] lg:w-[85%] flex flex-row lg:flex-col justify-between lg:justify-start px-6 gap-2">
        {menuItems.map((item, index) => {
          const isActive = currentPath.includes(item.path)
          const Icon = item.icon

          return (
            <Button
              type="button"
              className={`w-fit lg:w-full ${isActive ? 'text-button lg:text-white70' : 'text-white70'}  items-center justify-start gap-2 p-3 lg:py-7 lg:px-[30px] rounded-[50px] hover:bg-secondaryBg focus:bg-popBg group transition-all duration-300 ${
                isActive ? 'bg-transparent lg:bg-popBg' : 'bg-transparent'
              }`}
              key={index}
              onClick={() => handleClick(item.path)}
            >
              <Icon size={24} variant={isActive ? 'Bold' : 'Outline'} />
              <p
                className={`hidden lg:flex items-center gap-2 text-lg group-hover:text-white100 group-focus:text-white80 ${isActive ? 'text-white100 font-medium' : 'text-white70'}`}
              >
                {item.text}
              </p>
            </Button>
          )
        })}
      </div>

      <FeedbackButton className="hidden lg:flex" />
    </aside>
  )
}

export function FeedbackButton({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center gap-4 w-[90%] sticky bottom-3 px-[5px] pt-5 pb-1.5 bg-secondaryBg border border-white15 rounded-[10px] mb-3 ${className}`}
    >
      <img
        src="/assets/images/aside-absolute.png"
        alt="Message"
        className="absolute -top-4 w-[33px] h-[33px]"
      />
      <div className="w-full flex flex-col items-center gap-0.5">
        <p className="text-white100 text-xs font-medium">Help us improve</p>
        <p className="text-white70 text-[9px] text-center">
          Your input will help us improve and create an even better experience
          for everyone. Thank you for being a part of this journey!
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={'default'}
            className="text-buttonTextColor text-xs font-semibold py-2 px-3 w-full h-[30px] bg-button rounded-[8px]"
          >
            Submit a feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center justify-center p-0 m-0 w-fit h-fit overflow-auto border-none">
          <FeedbackModal />
        </DialogContent>
      </Dialog>
    </div>
  )
}
