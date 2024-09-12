import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { NotificationService } from '@/lib/notificationService';
import { NotificationMessage } from '@/lib/helper-func';
import { useState, useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Ovation: Explore and Earn NFTs with Personalized Portfolios',
  description:
    'Discover a unique NFT marketplace where you can explore and earn NFTs through personalized portfolios. Experience the future of digital collectibles with Ovation.',
  authors: [{ name: 'Emmanuel Greg' }],
  openGraph: {
    title: 'Ovation: Explore and Earn NFTs with Personalized Portfolios',
    description:
      'Discover a unique NFT marketplace where you can explore and earn NFTs through personalized portfolios. Experience the future of digital collectibles with Ovation.',
    images: [
      'https://www.ovation.network/assets/images/dashboard-demo.png',
    ],
    siteName: 'Ovation',
    url: 'https://www.ovation.network',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ovation: Explore and Earn NFTs with Personalized Portfolios',
    description:
      'Discover a unique NFT marketplace where you can explore and earn NFTs through personalized portfolios. Experience the future of digital collectibles with Ovation.',
    creator: '@EmmanuelGreg',
    images: [
      'https://www.ovation.network/assets/images/dashboard-demo.png',
    ],
  },
  icons: { shortcut: ['/favicon.ico'] },
  keywords:
    'nft marketplace, digital collectibles, personalized portfolios, explore nfts, earn nfts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  useEffect(() => {
    const notificationService = new NotificationService(); // Initialize SignalR service

    var baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
    const connectSignalR = async () => {
      await notificationService.startConnection(`${baseUrl}/notification`, 'user_access_token_here');

      // Listen for incoming notifications
      notificationService.onMessage("ReceiveNotification", (notification: NotificationMessage) => {
        console.log("New notification received:", notification.title);

        // Update notifications state
        setNotifications((prev) => [...prev, notification]);
      });
    };

    connectSignalR();

    // Cleanup function to stop the SignalR connection when component unmounts
    return () => {
      notificationService.stopConnection();
    };
  }, []);

  return (
    <html lang="en">
      <body
        className='overflow-x-hidden'
      >

        {children}</body>
      <Toaster />
    </html>
  )
}
