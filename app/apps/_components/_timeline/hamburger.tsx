'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'
import { X } from 'lucide-react'
import {
  LocationDiscover,
  Profile,
  Setting2,
  Message,
  NotificationBing,
} from 'iconsax-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import FeedbackModal from '../../feedback'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import Image from 'next/image'
import { ProfileData, UserData } from '@/models/all.model'
import MiniLoader from '@/components/mini-loader'
import { useLocalStorage } from '@/lib/use-local-storage'

export default function Hamburger() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { storedValue, removeValue } = useLocalStorage<UserData | null>(
    'userData',
    null,
  )
  const user = storedValue

  const handleLogout = () => {
    ovationService.logout()
    removeValue()
    router.push('/')
  }

  const handleLinkClick = () => {
    setOpen(false)
  }

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => ovationService.getProfile(),
  })

  const profileData = profile?.data as ProfileData

  const navLinks = [
    { href: '/apps/discover', icon: LocationDiscover, label: 'Discover' },
    { href: '/apps/profile', icon: Profile, label: 'Profile' },
    { href: '/apps/settings', icon: Setting2, label: 'Settings' },
    { href: '/apps/messages', icon: Message, label: 'Messages' },
    {
      href: '/apps/notification',
      icon: NotificationBing,
      label: 'Notification',
    },
  ]

  return (
    <div className="lg:hidden">
      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerTrigger asChild>
          <Button className="" variant={'link'} onClick={() => setOpen(!open)}>
            {!open && (
              <HamburgerMenuIcon color={'#cff073'} width={24} height={24} />
            )}
            {open && <X color={'#cff073'} width={24} height={24} />}
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className="p-0 border-0 w-[80vw] max-w-[400px] h-screen fixed top-0 left-0 rounded-none bg-[#111115] border-r-[0.5px] border-solid border-gray-500 transform transition-transform duration-300 ease-in-out"
          style={{}}
        >
          <div className="bg-[#111115] flex flex-col p-5 h-full justify-between">
            <div>
              <div className="flex flex-col gap-5 justify-between">
                <Image
                  src={
                    profileData?.profile?.profileImage ||
                    '/assets/images/profile/image1.png'
                  }
                  alt="User Display Picture"
                  width={131}
                  height={131}
                  className="rounded-full "
                />

                <div className="flex flex-col gap-9">
                  {isLoading ? (
                    <MiniLoader />
                  ) : (
                    <div className="w-full h-fit flex flex-col gap-0.5">
                      <div className="flex items-center gap-[13px]">
                        <p className="text-[#F8F8FF] text-[22px] font-semibold">
                          {profileData?.profile?.displayName ||
                            'Anonymous User'}
                        </p>
                      </div>

                      <p className="flex items-center gap-1 text-base text-[#B3B3B3]">
                        {profileData?.username
                          ? `@${profileData.username.replace(/^@/, '')}`
                          : 'No username set'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <ul className="gap-8 pt-10 font-bold flex text-white flex-col text-lg">
                {navLinks.map(({ href, icon: Icon, label }) => {
                  const isActive = pathname === href
                  return (
                    <Link
                      key={href}
                      onClick={handleLinkClick}
                      href={href}
                      className="w-full items-center justify-start flex gap-2"
                    >
                      <Icon
                        size={24}
                        color="#cff073"
                        variant={isActive ? 'Bold' : 'Outline'}
                      />
                      {label}
                    </Link>
                  )
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <FeedbackButton className="w-full mb-4" />
              <Button
                variant={'ghost'}
                onClick={handleLogout}
                className="py-[10px] w-full text-red-500"
              >
                Logout {user?.username}
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export function FeedbackButton({ className }: { className?: string }) {
  return (
    <div
      className={`flex self-end flex-col items-center gap-4 w-[90%] sticky bottom-10 px-[5px] pt-5 pb-1.5 bg-[#18181C] border border-[#29292F] rounded-[10px] mb-3 ${className}`}
    >
      <img
        src="/assets/images/aside-absolute.png"
        alt="Message"
        className="absolute -top-4 w-[33px] h-[33px]"
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
        <DialogContent className="flex flex-col items-center justify-center p-0 m-0  overflow-y-scroll border-none">
          <FeedbackModal />
        </DialogContent>
      </Dialog>
    </div>
  )
}
