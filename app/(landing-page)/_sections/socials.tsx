import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Socials() {
  return (
    <section className="container w-full h-fit relative">
      <div className="w-full h-fit bg-[#275102] rounded-[40px] pt-8 lg:pt-[0px] lg:pb-[100px] pb-[50px] flex flex-col items-center justify-center relative">
        <div className="bg-vector-one bg-top bg-cover bg-no-repeat w-full lg:h-[150px] h-[50px] flex rounded-[40px]"></div>
        <img
          src="/assets/images/social-LP1.png"
          alt=""
          className="absolute left-[25%] top-[35px] lg:w-[50px] lg:h-[50px] w-9 h-9"
        />

        <img
          src="/assets/images/social-LP2.png"
          alt=""
          className="absolute right-[25%] top-[35px] lg:w-[50px] lg:h-[50px] w-9 h-9"
        />

        <img
          src="/assets/images/social-LP3.png"
          alt=""
          className="absolute lg:left-20 left-[8%] lg:bottom-[90px] bottom-[83%] lg:w-[50px] lg:h-[50px] w-9 h-9"
        />

        <img
          src="/assets/images/social-LP4.png"
          alt=""
          className="absolute lg:right-20 right-[8%] lg:bottom-[90px] bottom-[83%] lg:w-[50px] lg:h-[50px] w-9 h-9"
        />

        <div className="flex flex-col items-center gap-10 mb-10">
          <p className="text-[Explore Next-Gen NFT Socials]"></p>
          <p className="text-white text-5xl font-bold text-center">
            Explore Next-Gen NFT Socials
          </p>
          <p className="text-[22px] text-[#CCCCCC] w-[75%] text-center">
            The only Web3 platform with intelligent profiles, personalized
            portfolios, and a blockchain UI for a unified NFT experience.
          </p>
        </div>

        <div className="flex lg:flex-row flex-col items-center gap-5 w-fit">
          <Button className="bg-[#CFF073] text-sm text-[#0B0A10] h-fit gap-2">
            <img
              src="/assets/images/twitter-LP.png"
              alt="Twitter Logo"
              className="w-4 h-3"
            />
            <Link href="/">Follow us on twitter</Link>
          </Button>

          <Button className="bg-[#CFF073] text-sm text-[#0B0A10] h-fit gap-2">
            <img
              src="/assets/images/linkedIn-LP.png"
              alt="LinkedIn Logo"
              className="w-4 h-3"
            />
            <Link href="/">Follow us on LinkenIn</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
