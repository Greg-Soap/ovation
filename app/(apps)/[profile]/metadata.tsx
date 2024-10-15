import type { Metadata } from 'next'
import ovationService from '@/services/ovation.service'

export async function generateMetadata({
  params,
}: {
  params: { profile: string }
}): Promise<Metadata> {
  const username = params.profile
  console.log('username', username)
  const profileData = await ovationService.getUserProfile(username)

  const title = profileData.profile?.displayName || profileData.username
  const description =
    profileData.profile?.bio || `Check out ${title}'s profile on our platform`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/${username}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/${username}/opengraph-image`],
    },
  }
}
