import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Ovation: All your NFTs – One Powerful Platform',
  description:
    'Next-generation NFT social platform – Ovation is an all-in-one hub where artists, collectors, projects, and enthusiasts can discover, buy, sell, and socialize in one place designed specifically for them. Be part of the platform that is revolutionizing the future of NFTs, digital collectibles, and how we interact with them.',
  authors: [{ name: 'Emmanuel Greg' }],
  openGraph: {
    title: 'Ovation: All your NFTs – One Powerful Platform',
    description:
      'Next-generation NFT social platform – Ovation is an all-in-one hub where artists, collectors, projects, and enthusiasts can discover, buy, sell, and socialize in one place designed specifically for them. Be part of the platform that is revolutionizing the future of NFTs, digital collectibles, and how we interact with them.',
    images: ['https://www.ovation.network/assets/images/dashboard-demo.png'],
    siteName: 'Ovation',
    url: 'https://www.ovation.network',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ovation: All your NFTs – One Powerful Platform',
    description:
      'Next-generation NFT social platform – Ovation is an all-in-one hub where artists, collectors, projects, and enthusiasts can discover, buy, sell, and socialize in one place designed specifically for them. Be part of the platform that is revolutionizing the future of NFTs, digital collectibles, and how we interact with them.',
    creator: '@EmmanuelGreg',
    images: ['https://www.ovation.network/assets/images/dashboard-demo.png'],
  },
  icons: { shortcut: ['/favicon.ico'] },
  keywords:
    '‘nft social platform, web3 social platform, nft marketplace, most expensive nft, digital collectibles, explore nfts, nft collector, nft collection, nft app, nft value, nfts for sale',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
      <Toaster />
    </html>
  )
}
