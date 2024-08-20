import { Header } from '@/app/(landing-page)/_sections/nav'
import React from 'react'
import Image from 'next/image'
import authAvatar from '@/public/assets/images/ovationAuthAvatar.svg'

interface AuthLayoutProps {
  children: React.ReactNode
  showAuthLeftOptional?: boolean
}
export default function AuthLayout({
  children,
  showAuthLeftOptional,
}: AuthLayoutProps) {
  return (
    <section
      className="w-[100vw] h-[100vh] bg-cover"
      style={{ backgroundImage: `url('/assets/images/ovationAuthBack.png')` }}
    >
      <Header />
      <div className="w-full h-full flex items-center lg:items-start lg:mt-32 gap-40 justify-center">
        {showAuthLeftOptional && (
          <div
            id="auth-left-optional"
            className="text-white text-5xl w-[525px] font-bold leading-[60px]  h-[600px] md:w-[500px] justify-center flex flex-col gap-8 items-center "
          >
            Experience the Next-Generation NFT Social Platform
            <div className="flex gap-3 font-normal opacity-70 w-full  text-lg  ">
              <Image src={authAvatar} alt="profile avatars" />
              <p>Join over 40,000 users</p>
            </div>
          </div>
        )}

        <div className=" rounded-lg border-1 w-[80vw] h-[80vh] md:w-[500px] md:h-fit p-0">
          {children}
        </div>
      </div>
    </section>
  )
}
