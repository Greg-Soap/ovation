import { Header } from '@/app/(landing-page)/_sections/nav'
import React from 'react'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section
      className="w-[100vw] h-[100vh] bg-cover"
      style={{ backgroundImage: `url('/assets/images/ovationAuthBack.png')` }}
    >
      <Header />
      <div className="w-full h-full flex items-center lg:items-start lg:mt-32 justify-center">
        <div className=" rounded-lg border-1 w-[80vw] h-[80vh] md:w-[500px] md:h-fit p-0">
          {children}
        </div>
      </div>
    </section>
  )
}
