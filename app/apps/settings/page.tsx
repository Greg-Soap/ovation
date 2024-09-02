'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SearchInput from '../_components/_timeline/search-input'
import { z } from 'zod'
import ProfileForm from './profile-form'
import PasswordForm from './password-form'
import SocialForm from '../_sections/_settings/social-form'
import ExperienceForm from '../_sections/_settings/experience-form'
import WalletForm from '../_sections/_settings/wallet-form'
import { useState } from 'react'
import { ArrowLeft } from 'iconsax-react'

export default function page() {
  const [isHidden, setHidden] = useState(true)

  return (
    <section className="w-full h-full">
      <Tabs
        className="flex h-full w-full overflow-hidden"
        defaultValue={'Personal Info'}
      >
        <div
          className={`xl:border-r-[1px] border-[#1A1A1A] min-w-[414px] w-full xl:max-w-[505px] items-center ${isHidden ? 'flex' : 'hidden xl:flex'} flex-col pt-8 overflow-y-scroll`}
        >
          <h1 className="font-semibold text-[23px] text-[#F8F8FF] mr-auto ml-8 mb-5">
            Settings
          </h1>
          <SearchInput inpClass="w-[90%] md:w-[70%] mr-auto ml-6 lg:ml-0 lg:mr-0 lg:w-[90%] mb-10" />
          <TabsList
            aria-orientation="vertical"
            className="flex flex-col justify-none gap-[15px] w-full"
          >
            {tabHeading.map((item, index) => (
              <TabsTrigger
                value={item.heading ? item.heading : ''}
                key={index}
                onClick={() => setHidden(false)}
                className="flex items-center gap-3 data-[state=active]:bg-[#18181C] data-[state=active]:border-[#18181C] justify-start w-full px-[26px] py-4"
              >
                <img
                  src={`${item.imgSrc}`}
                  alt={item.heading}
                  className="w-6 h-6"
                />
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-sm text-[#F8F8FF]">{item.heading}</h3>
                  <p className="text-[#B3B3B3] text-xs">{item.subtitle}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div
          className={`${isHidden ? 'hidden xl:flex' : 'flex'} w-full h-full`}
        >
          <TabsContent
            value={'Personal Info'}
            className={`pt-8 w-full h-full overflow-y-scroll`}
          >
            <section className="flex flex-col gap-[42px] w-full">
              <div className="relative flex justify-center gap-3 px-4 sm:px-10 2xl:px-20">
                <ArrowLeft
                  color="white"
                  variant="Outline"
                  size={24}
                  onClick={() => setHidden(true)}
                  className="absolute left-10"
                />

                <div className="flex flex-col items-center xl:items-start gap-1">
                  <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                    {tabHeading[0].heading}
                  </h2>
                  <p className="text-[#B3B3B3]">{tabHeading[0].subtitle}</p>
                </div>
              </div>

              <ProfileForm />
            </section>
          </TabsContent>
          <TabsContent
            value={'Socials'}
            className={`pt-8 w-full h-full overflow-y-scroll`}
          >
            <section className="w-full h-full flex flex-col gap-[42px]">
              <div className="relative flex justify-center gap-3 px-4 sm:px-10 2xl:px-20">
                <ArrowLeft
                  color="white"
                  variant="Outline"
                  size={24}
                  onClick={() => setHidden(true)}
                  className="absolute left-10"
                />

                <div className="flex flex-col items-center xl:items-start gap-1">
                  <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                    {tabHeading[1].heading}
                  </h2>
                  <p className="text-[#B3B3B3]">{tabHeading[1].subtitle}</p>
                </div>
              </div>

              <SocialForm />
            </section>
          </TabsContent>
          <TabsContent
            value={'Experience'}
            className={`pt-8 w-full h-full overflow-y-scroll`}
          >
            <section className="flex flex-col gap-[42px]">
              <div className="relative flex justify-center gap-3 px-4 sm:px-10 2xl:px-20">
                <ArrowLeft
                  color="white"
                  variant="Outline"
                  size={24}
                  onClick={() => setHidden(true)}
                  className="absolute left-10"
                />

                <div className="flex flex-col items-center xl:items-start gap-1">
                  <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                    {tabHeading[2].heading}
                  </h2>
                  <p className="text-[#B3B3B3]">{tabHeading[2].subtitle}</p>
                </div>
              </div>

              <ExperienceForm />
            </section>
          </TabsContent>
          <TabsContent
            value={'Wallets'}
            className="pt-8 w-full h-full overflow-y-scroll"
          >
            <section className="flex flex-col px-10 2xl:px-20 gap-[42px]">
              <div className="relative flex justify-center gap-3 px-4 sm:px-10 2xl:px-20">
                <ArrowLeft
                  color="white"
                  variant="Outline"
                  size={24}
                  onClick={() => setHidden(true)}
                  className="absolute left-0"
                />

                <div className="flex flex-col items-center xl:items-start gap-1">
                  <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                    {tabHeading[3].heading}
                  </h2>
                  <p className="text-[#B3B3B3]">{tabHeading[3].subtitle}</p>
                </div>
              </div>

              <WalletForm />
            </section>
          </TabsContent>
          <TabsContent
            value={'Password'}
            className=" pt-8 w-full h-full overflow-y-scroll"
          >
            <section className="flex flex-col gap-[42px]">
              <div className="relative flex justify-center gap-3 px-4 sm:px-10 2xl:px-20">
                <ArrowLeft
                  color="white"
                  variant="Outline"
                  size={24}
                  onClick={() => setHidden(true)}
                  className="absolute left-10"
                />

                <div className="flex flex-col items-center xl:items-start gap-1">
                  <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                    {tabHeading[4].heading}
                  </h2>
                  <p className="text-[#B3B3B3]">{tabHeading[4].subtitle}</p>
                </div>
              </div>

              <PasswordForm />
            </section>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  )
}

interface TagHeading {
  imgSrc?: string
  heading?: string
  subtitle?: string
}

const tabHeading: TagHeading[] = [
  {
    imgSrc: '/assets/images/settings/tab-list/one.png',
    heading: 'Personal Info',
    subtitle: 'Update your information and details here',
  },
  {
    imgSrc: '/assets/images/settings/tab-list/two.png',
    heading: 'Socials',
    subtitle: 'Set your social profile to build trust and security',
  },
  {
    imgSrc: '/assets/images/settings/tab-list/three.png',
    heading: 'Experience',
    subtitle: 'Set your work profile to build trust and security',
  },
  {
    imgSrc: '/assets/images/settings/tab-list/four.png',
    heading: 'Wallets',
    subtitle: 'Update your wallet info and details here',
  },
  {
    imgSrc: '/assets/images/settings/tab-list/five.png',
    heading: 'Password',
    subtitle: 'Make your account secure',
  },
]
