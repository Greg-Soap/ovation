import type { Metadata, ResolvingMetadata } from 'next'
import Profile from './client'
import ovationService from '@/services/ovation.service'

type Props = {
  params: { profile: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const username = params.profile

  // Fetch profile data
  const profileData = await ovationService.getUserProfile(username)

  const name = profileData?.profile?.displayName || profileData?.username
  const title = `${name} | Ovation`

  const description =
    profileData?.profile?.bio || `Check out ${name}'s profile on our platform`

  // Generate a default avatar URL based on the username
  const avatarUrl =
    profileData?.profile?.profileImage ||
    `https://api.dicebear.com/6.x/initials/svg?seed=${username}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [avatarUrl],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [avatarUrl],
    },
  }
}

export default function ProfilePage() {
  return <Profile />
}
