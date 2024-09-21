'use client'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Link from 'next/link'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FeedbackModal } from '../../feedback'
import { LocationDiscover, Profile, Setting2, Message, NotificationBing } from 'iconsax-react'

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
                    <Icon size={24} color='white' variant={isActive ? 'Bold' : 'Outline'} />
                    {label}
                  </Link>
                )
              })}
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={'default'}
                  className='text-[#F8F8FF] text-xs font-semibold py-3 h-fit w-full bg-[#4865FC] '>
                  Submit a feedback
                </Button>
              </DialogTrigger>
              <DialogContent className='flex flex-col items-center justify-center p-0 m-0 w-fit h-fit overflow-auto border-none'>
                <>
                  <FeedbackModal />
                </>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
