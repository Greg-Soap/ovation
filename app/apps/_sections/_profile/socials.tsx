import Image from 'next/image'
import Link from 'next/link'

export default function Socials() {
  return (
    <div className="flex flex-col bg-[#18181C] rounded-[20px] gap-4 px-5 py-[18px]">
      <p className="text-xs font-medium text-[#808080]">Socials</p>

      <div className="flex w-full justify-between">
        <Link href="/">
          <Image
            src="/assets/images/profile/linkedIn.png"
            alt="LinkedIn Icon"
            width={32}
            height={32}
          />
        </Link>

        <Link href="/">
          <Image
            src="/assets/images/profile/facebook.png"
            alt="LinkedIn Icon"
            width={32}
            height={32}
          />
        </Link>

        <Link href="/">
          <Image
            src="/assets/images/profile/x.png"
            alt="LinkedIn Icon"
            width={32}
            height={32}
          />
        </Link>

        <Link href="/">
          <Image
            src="/assets/images/profile/instagram.png"
            alt="LinkedIn Icon"
            width={32}
            height={32}
          />
        </Link>

        <Link href="/">
          <Image
            src="/assets/images/profile/link.png"
            alt="LinkedIn Icon"
            width={32}
            height={32}
          />
        </Link>
      </div>
    </div>
  )
}
