'use client'
/* eslint-disable @next/next/no-img-element */
import Partners from './_sections/partners'
import Features from './_sections/features'
import Hero from './_sections/hero'
import MoreFromOvation from './_sections/more'
import InfoCards from './_sections/info-cards'
import HowItWorks from './_sections/how-it-works'
import React, { useEffect, useState } from 'react'
import { Newsletter } from './_sections/newsletter'
import ExtendedPartners from './_sections/extended-partners'
import Ripple from '@/components/animations/ripple'
import Socials from './_sections/socials'

export default function Application() {
  return (
    <React.Fragment>
      <div className="mobile-gradient-container md:hero-gradient absolute top-[-40px] z-[-1] opacity-10 w-full h-[800px]" />
      <main className=" flex flex-col items-center justify-between pt-24">
        <Hero />
        <div className=" relative container flex items-center justify-center py-10 md:py-20 ">
          <img
            src={'assets/images/dashboard-demo.png'}
            alt="dashboard demo"
            className="w-full lg:w-[900px] h-full lg:h-[600px] shadow-[0px_4px_250px_0px_#AFC76B4D]"
          />
          <Ripple />
        </div>
        <Partners />
        <Features />
        <InfoCards />
        <ExtendedPartners />
        <HowItWorks />
        <MoreFromOvation />
        <Socials />
        <Newsletter />
      </main>
    </React.Fragment>
  )
}
