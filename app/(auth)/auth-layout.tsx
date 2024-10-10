'use client'
import { Header } from '@/app/(landing-page)/_sections/nav'
import type React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Image from 'next/image'
import authAvatar from '@/public/assets/images/ovationAuthAvatar.svg'
import { GoogleOAuthProvider } from '@react-oauth/google'
import store from '@/store/store'
import { StoreProvider } from 'easy-peasy'

interface AuthLayoutProps {
  children: React.ReactNode
  showAuthLeftOptional?: boolean
}

const queryClient = new QueryClient()

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string

export default function AuthLayout({
  children,
  showAuthLeftOptional,
}: AuthLayoutProps) {
  return (
    <StoreProvider store={store}>
      <section
        className="w-[100vw] min-h-[100vh] h-full bg-cover pb-8"
        style={{ backgroundImage: `url('/assets/images/ovationAuthBack.png')` }}
      >
        <Header />
        <div className="w-full h-full flex items-center lg:items-center mt-8 lg:mt-32 gap-40 justify-center">
          {showAuthLeftOptional && (
            <div
              id="auth-left-optional"
              className=" hidden  text-5xl w-[525px] font-bold leading-[60px]  md:w-[500px] justify-center xl:flex flex-col gap-8 items-start"
            >
              Experience the Next-Generation NFT Social Platform
              <div className="flex gap-3 font-normal opacity-70 w-full  text-lg  ">
                <Image src={authAvatar} alt="profile avatars" />
                <p>
                  Experience the platform that’s revolutionizing the NFT
                  ecosystem
                </p>
              </div>
            </div>
          )}

          <div className=" rounded-lg border-1  w-[80vw] h-full  md:w-[500px] md:h-fit p-0 pb-10 lg:pb-0">
            <QueryClientProvider client={queryClient}>
              <GoogleOAuthProvider clientId={clientId}>
                {children}
              </GoogleOAuthProvider>
            </QueryClientProvider>
          </div>
        </div>
      </section>
    </StoreProvider>
  )
}
