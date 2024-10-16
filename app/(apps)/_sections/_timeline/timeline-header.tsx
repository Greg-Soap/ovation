import Image from 'next/image'
import { getGreeting } from '@/lib/helper-func'
import Hamburger from '../../_components/_timeline/hamburger'
import { Moon, Sun1 } from 'iconsax-react'
import { useAppStore } from '@/store/use-app-store'
import { getToken } from '@/lib/cookies'

export default function TimelineHeader() {
  const token = getToken()
  const { user } = useAppStore()

  return (
    <header className="w-full  flex items-center h-[90px] border-r border-b border-[#1A1A1A] bg-[#111115] sticky top-0  max1440px] z-50">
      <nav className="flex items-center justify-between  w-full pl-2 pr-2 lg:p-0">
        <div className="flex w-full">
          <a
            href="/login"
            className="min-w-[310px] lg:w-[310px] hidden xl:flex items-center h-[90px] border-r border-[#1A1A1A]"
          >
            <Image
              src="/assets/images/logo/logo.png"
              alt="Logo"
              width={220}
              height={100}
            />
          </a>
          <div className="w-full container px-0 flex items-center">
            <div className="flex items-center gap-3 p-2">
              {user && getGreeting() === 'Good Morning' ? (
                <Sun1 />
              ) : getGreeting() === 'Good Afternoon' ? (
                <Sun1 />
              ) : (
                <Moon />
              )}
              <p className="text-gray text-base lg:text-xl font-medium">
                {getGreeting()} {token && `, ${user?.displayName}`}
              </p>
            </div>
          </div>
        </div>
        {user && <Hamburger />}
      </nav>
    </header>
  )
}
