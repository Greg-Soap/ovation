'use client'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Link from 'next/link'
import { useState } from 'react'
import { X } from 'lucide-react'
import { LocationDiscover, Profile, Setting2, Message, NotificationBing } from 'iconsax-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import FeedbackModal from '../../feedback'


export default function Hamburger() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleLinkClick = () => {
    setOpen(false)
  }

  const navLinks = [
    { href: '/apps/discover', icon: LocationDiscover, label: 'Discover' },
    { href: '/apps/profile', icon: Profile, label: 'Profile' },
    { href: '/apps/settings', icon: Setting2, label: 'Settings' },
    { href: '/apps/messages', icon: Message, label: 'Messages' },
    { href: '/apps/notification', icon: NotificationBing, label: 'Notification' },
  ]

  return (
    <div className='xl:hidden'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className='' variant={'link'} onClick={() => setOpen(!open)}>
            {!open && <HamburgerMenuIcon color={'#cff073'} width={24} height={24} />}
            {open && <X color={'#cff073'} width={24} height={24} />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='mt-4 p-0 border-0 w-[100vw] z-9999 h-[100vh] md:h-full  rounded-none md:border-[0.5px] bg-[#111115] border-t-[0.5px] border-solid border-gray-500'>
          <div className='bg-[#111115]  flex flex-col p-5 h-[90%] justify-between'>
            <ul className='gap-8 pt-10 font-bold flex text-white flex-col text-lg'>
              {navLinks.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    onClick={handleLinkClick}
                    href={href}
                    className='w-full items-center justify-start flex gap-2'>
                    <Icon size={24} color='#cff073' variant={isActive ? 'Bold' : 'Outline'} />
                    {label}
                  </Link>
                )
              })}
            </ul>
           <FeedbackButton className='w-full mb-16' />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function FeedbackButton({className}: {className?: string}) {
  return (
     <div className={`flex flex-col items-center gap-4 w-[90%] sticky bottom-3 px-[5px] pt-5 pb-1.5 bg-[#18181C] border border-[#29292F] rounded-[10px] mb-3 ${className}`}>
        <img
          src='/assets/images/aside-absolute.png'
          alt='Message'
          className='absolute -top-4 w-[33px] h-[33px]'
        />
        <div className='w-full flex flex-col items-center gap-0.5'>
          <p className='text-[#F8F8FF] text-xs font-medium'>Help us improve</p>
          <p className='text-[#B3B3B3] text-[9px] text-center'>
            Your input will help us improve and create an even better experience for everyone. Thank
            you for being a part of this journey!
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'default'}
              className='text-[#0B0A10] text-xs font-semibold py-2 px-3 w-full h-[30px] bg-[#CFF073] rounded-[8px]'>
              Submit a feedback
            </Button>
          </DialogTrigger>
          <DialogContent className='flex flex-col items-center justify-center p-0 m-0  overflow-y-scroll border-none'>
            <FeedbackModal />
          </DialogContent>
        </Dialog>
      </div>
  )
}