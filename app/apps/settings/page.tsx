import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SearchInput from '../_components/_timeline/search-input'
import { z } from 'zod'
import ProfileForm from './profile-form'
import PasswordForm from './password-form'
import SocialForm from '../_sections/_settings/social-form'
import ExperienceForm from '../_sections/_settings/experience-form'
import WalletForm from '../_sections/_settings/wallet-form'

const tabHeading = [
  {
    heading: 'Personal Info',
    subtitle: 'Update your information and details here',
  },
  {
    heading: 'Socials',
    subtitle: 'Set your social profile to build trust and security',
  },
  {
    heading: 'Experience',
    subtitle: 'Set your work profile to build trust and security',
  },
  {
    heading: 'Wallets',
    subtitle: 'Update your wallet info and details here',
  },
  {
    heading: 'Password',
    subtitle: 'Make your account secure',
  },
]

export default function page() {
  return (
    <section className="w-full h-full">
      <Tabs
        className="flex h-full overflow-hidden w-full"
        defaultValue={'Personal Info'}
      >
        <div className="border-r-[1px] border-[#1A1A1A] min-w-[414px] lg:max-w-[505px] items-center flex flex-col pt-8 overflow-y-scroll">
          <h1 className="font-semibold text-[23px] text-[#F8F8FF] mr-auto ml-8 mb-5">
            Settings
          </h1>
          <SearchInput inpClass="lg:w-[90%] mb-10" />
          <TabsList
            aria-orientation="vertical"
            className="flex flex-col justify-none gap-[15px] w-full"
          >
            {tabHeading.map((item, index) => (
              <TabsTrigger
                value={item.heading}
                key={index}
                className="flex data-[state=active]:bg-[#18181C] data-[state=active]:border-[#18181C] flex-col justify-start items-start w-full px-[26px] py-4"
              >
                <h3 className="text-sm text-[#F8F8FF]">{item.heading}</h3>
                <p className="text-[#B3B3B3] text-xs">{item.subtitle}</p>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent
          value={'Personal Info'}
          className=" pt-8 w-full h-full overflow-y-scroll"
        >
          <div className="flex flex-col gap-[42px]">
            <div className="flex flex-col gap-1 lg:px-10 2xl:pl-20">
              <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                {tabHeading[0].heading}
              </h2>
              <p className="text-[#B3B3B3]">{tabHeading[0].subtitle}</p>
            </div>

            <ProfileForm />
          </div>
        </TabsContent>
        <TabsContent
          value={'Socials'}
          className="pt-8 w-full h-full overflow-y-scroll"
        >
          <div className="flex flex-col lg:px-10 2xl:pl-20 gap-[42px]">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                {tabHeading[1].heading}
              </h2>
              <p className="text-[#B3B3B3]">{tabHeading[1].subtitle}</p>
            </div>

            <SocialForm />
          </div>
        </TabsContent>
        <TabsContent
          value={'Experience'}
          className=" pt-8 w-full h-full overflow-y-scroll"
        >
          <section className="flex flex-col gap-[42px]">
            <div className="flex flex-col gap-1 lg:px-10 2xl:pl-20">
              <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                {tabHeading[2].heading}
              </h2>
              <p className="text-[#B3B3B3]">{tabHeading[2].subtitle}</p>
            </div>

            <ExperienceForm />
          </section>
        </TabsContent>
        <TabsContent
          value={'Wallets'}
          className="pt-8 w-full h-full overflow-y-scroll"
        >
          <section className="flex flex-col lg:px-10 2xl:pl-20 gap-[42px]">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                {tabHeading[3].heading}
              </h2>
              <p className="text-[#B3B3B3]">{tabHeading[3].subtitle}</p>
            </div>

            <WalletForm />
          </section>
        </TabsContent>
        <TabsContent
          value={'Password'}
          className=" pt-8 w-full  h-full overflow-y-scroll"
        >
          <section className="flex flex-col gap-[42px]">
            <div className="flex flex-col gap-1 lg:px-10 2xl:pl-20">
              <h2 className="font-semibold text-[22px] text-[#F8F8FF]">
                {tabHeading[4].heading}
              </h2>
              <p className="text-[#B3B3B3]">{tabHeading[4].subtitle}</p>
            </div>

            <PasswordForm />
          </section>
        </TabsContent>
      </Tabs>
    </section>
  )
}
