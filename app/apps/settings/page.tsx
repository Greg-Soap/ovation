import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SearchInput from '../_components/_timeline/search-input'
import { z } from 'zod'
import ProfileForm from './profile-form'
import PasswordForm from './password-form'

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
    <section className=' w-full h-full'>
      <Tabs className='flex h-full overflow-hidden w-full' defaultValue={'Personal Info'}>
        <div className='border-r-[1px] border-[#1A1A1A] lg:w-[505px] items-center flex flex-col pt-8'>
          <h1 className='font-semibold text-[28px] text-[#F8F8FF] mr-auto ml-8 mb-5'>Settings</h1>
          <SearchInput inpClass='lg:w-[90%] mb-10' />
          <TabsList aria-orientation='vertical' className='flex flex-col justify-none gap-5 w-full'>
            {tabHeading.map((item, index) => (
              <TabsTrigger
                value={item.heading}
                key={index}
                className='flex data-[state=active]:bg-[#18181C]  data-[state=active]:border-[#18181C] flex-col justify-start items-start w-full pl-8 pr-8 p-5'>
                <h3 className='text-lg font-medium text-white'>{item.heading}</h3>
                <p className='text-[#B3B3B3] text-sm'>{item.subtitle}</p>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={'Personal Info'} className=' pt-8 w-full  h-full overflow-y-scroll'>
          <div className='pl-20'>
            <h2 className='font-semibold text-[28px] text-[#F8F8FF]'>{tabHeading[0].heading}</h2>
            <p> {tabHeading[0].subtitle}</p>
          </div>

          <ProfileForm />
        </TabsContent>
        <TabsContent value={'Password'} className=' pt-8 w-full  h-full overflow-y-scroll'>
          <div className='pl-20'>
            <h2 className='font-semibold text-[28px] text-[#F8F8FF]'>{tabHeading[4].heading}</h2>
            <p> {tabHeading[4].subtitle}</p>
          </div>

          <PasswordForm />
        </TabsContent>
      </Tabs>
    </section>
  )
}
