import Link from 'next/link'
import Socials from '../_sections/socials'
import Image from 'next/image'
import TwitterIcon from '@/components/icons/twitter-icon'
import LinkedInIcon from '@/components/icons/linkedin-icon'

const team = [
  {
    image: '/assets/images/teams/team2.png',
    name: 'Jack Bliss',
    position: 'CEO',
    social: 'twitter',
    href: '',
  },
  {
    image: '/assets/images/teams/team2.png',
    name: 'Grant Weaver',
    position: 'CEO',
    social: 'twitter',
    href: '',
  },
  {
    image: '/assets/images/teams/team2.png',
    name: 'Malcolm Henzaga',
    position: 'CEO',
    social: 'twitter',
    href: '',
  },
  {
    image: '/assets/images/teams/team2.png',
    name: 'Maanav J. Porwal',
    position: 'CEO',
    social: 'linkedin',
    href: '',
  },
  {
    image: '/assets/images/teams/team2.png',
    name: 'Guy Garcia',
    position: 'CEO',
    social: 'linkedin',
    href: '',
  },
]

export default function Teams() {
  return (
    <main className="flex flex-col gap-[120px] pt-[120px] pb-[200px]">
      <div className="container w-full h-[400px] bg-team-banner bg-cover bg-center"></div>

      <section className="container flex flex-col mt-12">
        <div className="flex flex-col w-full h-fit gap-[80px]">
          <div className="flex flex-col items-center justify-center gap-2 w-full h-fit">
            <p className="text-5xl font-bold">Meet our team</p>
            <p className="text-[#999999] text-2xl font-medium w-[80%] text-center">
              Discover the dedicated professionals behind our success. Our team
              brings together a wealth of experience, creativity, and passion to
              deliver exceptional results.{' '}
            </p>
          </div>

          <div className="w-full flex flex-wrap items-center justify-center gap-y-[60px] gap-x-5">
            {team.map((item, index) => (
              <div
                className="flex flex-col gap-6 w-fit max-w-[396px]"
                key={index}
              >
                <div className="flex items-baseline justify-center bg-[#CFF073] rounded-[5px]">
                  <Image
                    src={`${item.image}`}
                    alt={`${item.name} + " " + "Picture"`}
                    width={306}
                    height={369}
                  />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center">
                  <div className="flex flex-col gap-[9px]">
                    <p className="text-2xl font-semibold">{item.name}</p>
                    <p className="text-[#999999] text-center">
                      {item.position}
                    </p>
                  </div>

                  <Link href={item.href}>
                    {item.name === 'twitter' ? (
                      <TwitterIcon className="w-[37px] h-[37px]" />
                    ) : (
                      <LinkedInIcon className="w-[37px] h-[37px]" />
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Socials />
    </main>
  )
}
