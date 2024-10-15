import type { Metadata } from 'next'
import ovationService from '@/services/ovation.service'

export async function generateMetadata({
  profile,
}: {
  profile: string
}): Promise<Metadata> {
  try {
    const profileData = await ovationService.getUserProfile(profile)

    const title = profileData.profile?.displayName || profileData.username
    const description =
      profileData.profile?.bio || `Check out ${title}'s profile on our platform`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [`/${profile}/opengraph-image`],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`/${profile}/opengraph-image`],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {}
  }
}

export default function ProfileMetadata({ profile }: { profile: string }) {
  // This component doesn't render anything visible
  return null
}
