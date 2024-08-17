'use client'
import Image from 'next/image'
import React, { type ReactElement } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import HomeIcon from '@/components/icons/homeIcon'
import DiscoverIcon from '@/components/icons/discoverIcon'
import ProfileIcon from '@/components/icons/profileIcon'
import SettingsIcon from '@/components/icons/settingsIcon'
import NotificationIcon from '@/components/icons/notificationIcon'
import MoreIcon from '@/components/icons/moreIcon'
import AsideMsgIcon from '@/components/icons/asideMsgIcon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FeedbackModal } from './feedback'

interface MenuItem {
  icon: ReactElement
  iconActive?: ReactElement
  text: string
  path: string
  isNotAvailable: boolean
}

const menuItems: MenuItem[] = [
  // {
  //   icon: <HomeIcon />,
  //   text: 'Home',
  //   path: '/apps/timeline',
  //   isNotAvailable: true,
  // },
  {
    icon: <DiscoverIcon />,
    iconActive: <DiscoverIcon fill="#ffffff" />,
    text: 'Discover',
    path: '/apps/discover',
    isNotAvailable: false,
  },
  {
    icon: <ProfileIcon />,
    text: 'Profile',
    path: '/apps/profile',
    isNotAvailable: false,
  },
  {
    icon: <SettingsIcon />,
    text: 'Settings',
    path: '/apps/settings',
    isNotAvailable: false,
  },
  {
    icon: <AsideMsgIcon className="w-6 h-6 group-hover:stroke-white" />,
    text: 'Messages',
    path: '/apps/messages',
    isNotAvailable: false,
  },
  {
    icon: <NotificationIcon />,
    text: 'Notification',
    path: '/apps/notification',
    isNotAvailable: false,
  },
]

export default function Aside() {
  const router = useRouter()
  const currentPath = usePathname()

  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <aside className="hidden xl:flex flex-col items-center gap-7 pt-4 min-w-[310px] w-[310px] border-r border-[#1A1A1A] sticky top-0 overflow-scroll bg-[#111115]">
      <div className="w-[85%] flex flex-col h-fit gap-2">
        {menuItems.map((item, index) => {
          const isActive = currentPath.includes(item.path)

          return (
            <Button
              type="button"
              className={`w-[90%] flex items-center justify-stretch gap-2 py-7 px-[30px] rounded-[50px] hover:bg-[#18181C] focus:bg-[#232227] disabled:opacity-20 group transition-all duration-300 ${
                isActive
                  ? 'bg-[#232227] fill-white stroke-white'
                  : 'fill-white stroke-white bg-transparent'
              }`}
              key={index}
              onClick={() => handleClick(item.path)}
            >
              {item.icon}

              <p
                className={`flex items-center gap-2 text-[18px] text-[#F8F8FF] group-hover:text-white group-focus:text-[#CCCCCC] ${isActive ? 'text-white font-medium' : 'text-[#B3B3B3]'}`}
              >
                {item.text}{' '}
                <span
                  className={`${item.isNotAvailable ? 'flex' : 'hidden'} h-fit text-[8px] text-[#CFF073] px-[5px] py-[3px] border border-[#CFF073] rounded-[7px] bg-[#CFF0731A]`}
                >
                  Coming soon
                </span>
              </p>
            </Button>
          )
        })}
      </div>

      <div className="flex flex-col items-center gap-10 w-[90%] absolute bottom-0 p py-5 bg-[#111115]">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/timeline/Shape.png"
              alt="User Display Picture"
              width={40}
              height={40}
            />

            <div className="flex flex-col">
              <p className="text-base font-semibold leading-5 text-white">
                0xrxc.....d67579
              </p>
              <p className="text-xs leading-5 font-medium text-[#B3B3B3]">
                2,000 &OVA
              </p>
            </div>
          </div>

          <Popover>
            <PopoverTrigger className="p-1 rounded-full">
              <MoreIcon />
            </PopoverTrigger>
            <PopoverContent className="w-fit bg-[#232227] flex flex-col items-start border-none text-white text-base py-2">
              <button className="py-[10px]">Add an existing account</button>
              <button className="py-[10px]">Logout @pancake</button>
            </PopoverContent>
          </Popover>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={`default`}
              className="text-[#F8F8FF] text-xs font-semibold py-2 h-fit w-full bg-[#4865FC]"
            >
              Submit a feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center justify-center p-0 m-0 w-fit h-fit overflow-auto border-none">
            <>
              <FeedbackModal />
            </>
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  )
}
