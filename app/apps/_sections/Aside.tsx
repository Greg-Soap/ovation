'use client'
import Image from 'next/image'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FeedbackModal } from './feedback'
import { LocationDiscover, Profile, Setting2, Message, NotificationBing } from 'iconsax-react'
import { MoreSquare } from 'iconsax-react'

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

  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <aside className='hidden xl:flex flex-col items-center gap-7 pt-4 min-w-[310px] w-[310px] border-r border-[#1A1A1A] sticky top-0 overflow-scroll bg-[#111115]'>
      <div className='w-[85%] flex flex-col h-fit gap-2'>
        {menuItems.map((item, index) => {
          const isActive = currentPath.includes(item.path)
          const Icon = item.icon

          return (
            <Button
              type='button'
              className={`w-[90%] flex items-center justify-stretch gap-2 py-7 px-[30px] rounded-[50px] hover:bg-[#18181C] focus:bg-[#232227] group transition-all duration-300 ${
                isActive ? 'bg-[#232227]' : 'bg-transparent'
              }`}
              key={index}
              onClick={() => handleClick(item.path)}>
              <Icon size={24} color='white' variant={isActive ? 'Bold' : 'Outline'} />
              <p
                className={`flex items-center gap-2 text-[18px] group-hover:text-white group-focus:text-[#CCCCCC] ${isActive ? 'text-white font-medium' : 'text-[#B3B3B3]'}`}>
                {item.text}
              </p>
            </Button>
          )
        })}
      </div>

      <div className='flex flex-col items-center gap-10 w-[90%] absolute bottom-0 p py-5 bg-[#111115]'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Image
              src='/assets/images/timeline/Shape.png'
              alt='User Display Picture'
              width={40}
              height={40}
            />
            <div className='flex flex-col'>
              <p className='text-base font-semibold leading-5 text-white'>0xrxc.....d67579</p>
              <p className='text-xs leading-5 font-medium text-[#B3B3B3]'>2,000 &OVA</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger className='p-1 rounded-full'>
              <MoreSquare size={24} color='white' variant='Outline' />
            </PopoverTrigger>
            <PopoverContent className='w-fit bg-[#232227] flex flex-col items-start border-none text-white text-base py-2'>
              <Button variant={'ghost'} className='py-[10px]'>
                Add an existing account
              </Button>
              <Button variant={'ghost'} className='py-[10px]'>
                Logout @pancake
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'default'}
              className='text-[#F8F8FF] text-xs font-semibold py-2 h-fit w-full bg-[#4865FC]'>
              Submit a feedback
            </Button>
          </DialogTrigger>
          <DialogContent className='flex flex-col items-center justify-center p-0 m-0 w-fit h-fit overflow-auto border-none'>
            <FeedbackModal />
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  )
}
