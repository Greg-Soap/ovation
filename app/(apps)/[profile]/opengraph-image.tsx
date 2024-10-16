import { ImageResponse } from 'next/og'
import ovationService from '@/services/ovation.service'

export const runtime = 'edge'
export const alt = 'User Profile'
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image({
  params,
}: {
  params: { profile: string }
}) {
  const profileData = await getProfileData(params.profile)

  const backgroundImage =
    profileData?.profile?.coverImage || '/assets/images/profile/image8.png'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: 'sans-serif',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <img
            src={
              profileData?.profile?.profileImage ||
              'https://www.ovation.network/assets/images/default-avatar.png'
            }
            alt={profileData?.username}
            width={100}
            height={100}
            style={{
              borderRadius: '50%',
              marginBottom: '20px',
              border: '4px solid #507100',
            }}
          />
          <h1 style={{ color: 'white', fontSize: 48, margin: '0 0 10px 0' }}>
            {profileData?.profile?.displayName || profileData?.username}
          </h1>
          {profileData?.profile?.bio && (
            <p
              style={{
                color: '#E6E6E6',
                fontSize: 24,
                margin: '0 0 20px 0',
                maxWidth: '80%',
              }}
            >
              {profileData?.profile?.bio}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                backgroundColor: '#333726',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              Ovation Profile
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}

export async function getProfileData(username: string) {
  try {
    const profileData = await ovationService.getUserProfile(username)
    return profileData
  } catch (error) {
    console.error('Error fetching profile data:', error)
  }
}
