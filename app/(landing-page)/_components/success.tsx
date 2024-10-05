import PulseButton from '@/components/animations/pulse-btn'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SuccessMail() {
  return (
    <div className="flex flex-col gap-5 items-center my-[60px] w-full lg:w-[45%]">
      <h1 className="text-[#E6E6E6] text-2xl text-center">Thank you!</h1>
      <p className="text-lighter text-center">
        Your response has been recorded, we will notify you when we go live, in
        the mean time follow us on our socials below
      </p>
      <div className="flex lg:flex-row flex-col items-center gap-5 w-fit">
        <Link
          href="https://x.com/Ovation_Network"
          className="flex items-center gap-2"
          target="_blank"
        >
          <Button
            asChild
            className="bg-primary text-sm text-[#0B0A10] h-fit gap-2"
          >
            <PulseButton pulseColor="#CFF073">
              <img
                src="/assets/images/twitter-LP.png"
                alt="Twitter Logo"
                className="w-4 h-3"
              />
              Follow us on twitter
            </PulseButton>
          </Button>
        </Link>
        <Link
          href=" https://www.linkedin.com/company/ovationnetwork/posts/?feedView=all"
          className="flex items-center gap-2"
          target="_blank"
        >
          <Button
            asChild
            className="bg-primary text-sm text-[#0B0A10] h-fit gap-2"
          >
            <PulseButton pulseColor="#CFF073">
              <img
                src="/assets/images/linkedIn-LP.png"
                alt="LinkedIn Logo"
                className="w-4 h-4"
              />
              Follow us on LinkedIn
            </PulseButton>
          </Button>
        </Link>
      </div>
    </div>
  )
}
