import { UserSocialsMod } from '@/models/all.model'
import Image from 'next/image'
import Link from 'next/link'

const socialIcons = {
  linkedIn: '/assets/images/settings/social/linked-in.png',
  lens: '/assets/images/settings/social/lens.png',
  forcaster: '/assets/images/settings/social/farcaster.png',
  blur: '/assets/images/settings/social/blur.png',
  foundation: '/assets/images/settings/social/foundation.png',
  magic: '/assets/images/settings/social/magic.png',
  ethico: '/assets/images/settings/social/eth-co.png',
  facebook: '/assets/images/profile/facebook.png',
  twitter: '/assets/images/profile/x.png',
  instagram: '/assets/images/profile/instagram.png',
  website: '/assets/images/profile/link.png',
}

export default function Socials({ socials }: { socials: UserSocialsMod }) {
  const availableSocials = Object.entries(socials).filter(([_, url]) => url)
  const hasSocials = availableSocials.length > 0

  return (
    <div className="flex flex-col bg-[#18181C] rounded-[20px] gap-4 px-5 py-[18px]">
      <p className="text-xs font-medium text-[#808080]">Socials</p>

      {hasSocials ? (
        <div className="flex w-full justify-between">
          {availableSocials.map(([platform, url]) => (
            <Link
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={
                  socialIcons[platform as keyof typeof socialIcons] ||
                  '/assets/images/profile/link.png'
                }
                alt={`${platform} Icon`}
                width={32}
                height={32}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No social links available</p>
      )}
    </div>
  )
}
