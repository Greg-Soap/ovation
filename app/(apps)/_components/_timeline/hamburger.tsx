'use client'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
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
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import MiniLoader from '@/components/mini-loader'
import FeedbackModal from '../../_feedback/feedback'
import { useAnchorNavigation } from '@/lib/use-navigation'
import colors from '@/lib/colors'
import CustomAvatar from '@/components/customs/custom-avatar'
import { useAppStore } from '@/store/use-app-store'
import CustomDialog from '@/components/customs/custom-dialog'

export default function Hamburger() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navigateTo = useAnchorNavigation()
  const { user, clearUser } = useAppStore()

  const handleLogout = () => {
    ovationService.logout()
    clearUser()
    navigateTo('/')
  }

  const handleLinkClick = () => {
    setOpen(false)
  }

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => ovationService.getProfile(),
  })

  const navLinks = [
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

  return (
    <div className="lg:hidden">
      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerTrigger asChild>
          <Button className="" variant={'link'} onClick={() => setOpen(!open)}>
            {!open && (
              <HamburgerMenuIcon
                color={colors.primary.DEFAULT}
                width={24}
                height={24}
              />
            )}
            {open && (
              <X color={colors.primary.DEFAULT} width={24} height={24} />
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className="p-0 border-0 w-[80vw] max-w-[400px] h-screen fixed top-0 left-0 rounded-none bg-[#111115] border-r-[0.5px] border-solid border-gray-500 transform transition-transform duration-300 ease-in-out"
          style={{}}
        >
          <div className="bg-[#111115] flex flex-col p-5 h-full overflow-y-scroll justify-between">
            <div>
              <div className="flex flex-col gap-5 justify-between">
                <CustomAvatar
                  src={profileData?.profile?.profileImage}
                  alt="User Display Picture"
                  size="huge"
                />

                <div className="flex flex-col gap-9">
                  {isLoading ? (
                    <MiniLoader />
                  ) : (
                    <div className="w-full h-fit flex flex-col gap-0.5">
                      <div className="flex items-center gap-[13px]">
                        <p className=" text-[22px] font-semibold">
                          {profileData?.profile?.displayName ||
                            'Anonymous User'}
                        </p>
                      </div>

                      <p className="flex items-center gap-1 text-base text-light">
                        {profileData?.username
                          ? `@${profileData.username.replace(/^@/, '')}`
                          : 'No username set'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <ul className="gap-8 pt-10 font-bold flex  flex-col text-lg">
                {navLinks.map(({ path, icon: Icon, text }) => {
                  const isActive = pathname === path
                  return (
                    <a
                      key={path}
                      onClick={handleLinkClick}
                      href={path}
                      className="w-full items-center justify-start flex gap-2"
                    >
                      <Icon
                        size={24}
                        color={colors.primary.DEFAULT}
                        variant={isActive ? 'Bold' : 'Outline'}
                      />
                      {text}
                    </a>
                  )
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <FeedbackButton className="w-full mb-4" />
              <CustomDialog
                trigger={
                  <Button
                    variant={'ghost'}
                    className="py-[10px] w-full text-red-500"
                  >
                    Logout {user?.username}
                  </Button>
                }
                onConfirm={handleLogout}
                confirmText="Logout"
                title="Confirm logout?"
                description="Are you sure you want to log out?"
              />
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
        <p className=" text-xs font-medium">Help us improve</p>
        <p className="text-light text-[9px] text-center">
          Your input will help us improve and create an even better experience
          for everyone. Thank you for being a part of this journey!
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={'default'}
            className="text-[#0B0A10] text-xs font-semibold py-2 px-3 w-full h-[30px] bg-primary rounded-[8px]"
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
