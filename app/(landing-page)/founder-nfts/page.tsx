import Image from 'next/image'
import Socials from '../_sections/socials'

const features = [
  {
    title: 'Earn more $OVA',
    description: 'In-Platform / Airdrops',
    icon: '/assets/images/icons/f1.png',
  },
  {
    title: 'Early Access',
    description: 'Build your community before late adopters',
    icon: '/assets/images/icons/f2.png',
  },
  {
    title: 'Unique Profile',
    description: 'User profiles have unique characteristics',
    icon: '/assets/images/icons/f3.png',
  },
  {
    title: 'Promote Collections',
    description: 'Sponsor personal/professional collections',
    icon: '/assets/images/icons/f3.png',
  },
]

export default function FounderNfts() {
  return (
    <main className="w-full flex flex-col gap-[120px] pt-[120px] pb-[200px]">
      <section className="container flex flex-col gap-7 items-center">
        <div className="w-fit flex items-center px-[17px] py-[7px] border border-[#828774] rounded-[30px] gap-[10px] bg-custom-gradient">
          <Image
            src={`/assets/images/founder-nft/OpenS.png`}
            alt="OpenSea Logo"
            width={25}
            height={25}
          />

          <p className="text-[17px] text-[#C1FE17] font-medium">
            AVAILABLE NOW ON
          </p>

          <Image
            src={`/assets/images/founder-nft/arrow-right.png`}
            alt="Arrow top-right"
            width={25}
            height={25}
          />
        </div>

        <div className="flex flex-col gap-3 items-center">
          <p className="text-[#F8F8FF] text-5xl font-bold">GENESIS NFTs</p>
          <p className="text-2xl text-[#B3B3B3] text-center">
            Owners experience unique in-platform benefits
          </p>
        </div>
      </section>

      <section className="container lg:p-0">
        <div className="flex flex-wrap bg-[#111115] p-10 rounded-[20px] gap-12 justify-center">
          {features.map((feature, index) => (
            <div
              className="flex flex-col py-3 items-center px-2 w-[282px]"
              key={index}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-9 h-9 md:w-14 md:h-14 mb-6"
              />
              <h6 className="text-lg md:text-2xl text-center font-bold font-heading">
                {feature.title}
              </h6>
              <p className="text-sm md:text-xl text-center font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-[120px] flex flex-col gap-[212px] container items-center">
        <div className="w-[95%] sm:w-fit sm:container flex flex-wrap-reverse lg:flex-nowrap items-center justify-center gap-[75px]">
          <div className="flex flex-col gap-1.5 max-w-[576px]">
            <p className="text-[#CFF073]">COLLECTION OF 200</p>
            <p className="text-[#F8F8FF] text-[40px] leading-[50px] font-bold">
              Ovation Founder NFTs
            </p>
            <p className="text-[#CCCCCC] text-[22px] font-medium">
              Geared towards NFT project founders or artists
            </p>
            <ul className="gap-2 list-disc">
              <li className="text-lg text-[#999999]">
                Receive 4 week of sponsored ads on Ovation yearly (Estimated
                Valuation ~2200 dollars).
              </li>
              <li className="text-lg text-[#999999]">
                Holders are airdropped 10% of the $OVA token supply.
              </li>
              <li className="text-lg text-[#999999]">
                Gain early (alpha/beta) access to start building your community
                on Ovation before late adopters.​
              </li>
              <li className="text-lg text-[#999999]">
                100% more $OVA earned through the platform.
              </li>
              <li className="text-lg text-[#999999]">
                Unique Founder badge on Ovation profile.
              </li>
            </ul>
          </div>

          <Image
            src={`/assets/images/founder-nft/phone-gif.gif`}
            alt="Illustration"
            width={400}
            height={400}
          />
        </div>

        <div className="w-[95%] sm:w-fit sm:container sm:px-0 flex flex-wrap lg:flex-nowrap items-center gap-[75px] justify-center">
          <div className="flex max-w-[400px] h-fit">
            <p
              className="text-[70px] md:text-[105px] 2xl:text-[135px] font-bold text-transparent font-heading"
              style={{ WebkitTextStroke: '3px #4D4D4D' }}
            >
              Coming Soon
            </p>
          </div>

          <div className="flex flex-col gap-1.5 max-w-[576px]">
            <p className="text-[#CFF073]">PFP COLLECTION OF 2000</p>
            <p className="text-[#F8F8FF] text-[40px] leading-[50px] font-bold">
              Ovation Enthusiast NFTs
            </p>
            <p className="text-[#CCCCCC] text-[22px] font-medium">
              Geared towards NFT enthusiasts.
            </p>
            <ul className="gap-2 list-disc">
              <li className="text-lg text-[#999999]">
                Holders are airdropped 5% of the $OVA token supply.​
              </li>
              <li className="text-lg text-[#999999]">
                Gain early beta access to start building your community on
                Ovation before late adopters.
              </li>
              <li className="text-lg text-[#999999]">
                50% more $OVA earned through the platform. Unique Enthusiast
                Ovation badge on profile
              </li>
              <li className="text-lg text-[#999999]">
                Unique Enthusiast Ovation badge on profile
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Socials />
    </main>
  )
}
