
# Ovation - The NFT Social Platform

Ovation is a next-generation NFT social platform that combines features from Twitter, Discord, Coinbase NFT, and OpenSea. It allows users to share, discover, socialize, and trade NFTs all in one place.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Technologies Used](#technologies-used)
6. [Key Components](#key-components)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

Ovation aims to be the ultimate Web3 community platform, blending social media with NFT innovation. It empowers artists, collectors, projects, and enthusiasts by providing a dedicated space to showcase their NFT portfolios, interact with community members, and spot market trends.

## Features

- Personalized profiles and portfolios
- NFT discovery and trading
- Social interactions with fellow NFT enthusiasts
- Multi-chain support
- In-platform rewards (OVA points)
- Unique post creation and sharing
- Live blockchain data integration
- Customizable user experience

## Getting Started

To get started with the Ovation project:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

For more detailed setup instructions, refer to:


````3:21:README.md
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
````


## Project Structure

The project follows a Next.js App Router structure:

- `app/`: Contains the main application code
  - `(auth)/`: Authentication-related pages
  - `(landing-page)/`: Landing page components
  - `apps/`: Main application pages and components
- `components/`: Reusable UI components
- `lib/`: Utility functions and custom hooks
- `models/`: TypeScript interfaces and types
- `public/`: Static assets
- `services/`: API service functions

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- React Query
- Zod
- Ethers.js
- Firebase

For a complete list of dependencies, refer to:


```17:63:package.json
  "dependencies": {
    "@archwayhq/arch3.js": "^0.7.3",
    "@cosmjs/stargate": "^0.32.4",
    "@hookform/resolvers": "^3.6.0",
    "@microsoft/signalr": "^8.0.7",
    "@radix-ui/react-alert-dialog": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.3",
    "@react-oauth/google": "^0.12.1",
    "@tanstack/react-query": "^5.55.4",
    "@walletconnect/web3-provider": "^1.8.0",
    "axios": "^1.7.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "emoji-picker-react": "^4.11.1",
    "ethers": "^6.13.2",
    "firebase": "^10.13.0",
    "framer-motion": "^11.2.10",
    "iconsax-react": "^0.0.8",
    "input-otp": "^1.2.4",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^0.390.0",
    "next": "14.2.3",
    "next-themes": "^0.3.0",
    "react": "^18",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18",
    "react-error-boundary": "^4.0.13",
    "react-hook-form": "^7.51.5",
    "react-player": "^2.16.0",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.4",
    "web3modal": "^1.9.12",
    "zod": "^3.23.8"
```


## Key Components

### Authentication

The project uses a combination of traditional email/password authentication and Web3 wallet connections. Key components include:

- Login: `app/(auth)/login/client.tsx`
- Account Creation: `app/(auth)/create-account/client.tsx`
- Wallet Connection: `app/(auth)/create-account/_components/wallet-connect-component.tsx`

### Landing Page

The landing page showcases Ovation's features and benefits:


```15:40:app/(landing-page)/page.tsx
export default function Application() {
	return (
		<React.Fragment>
			<div className="mobile-gradient-container md:hero-gradient absolute top-[-40px] z-[-1] opacity-10 w-full h-[800px]" />
			<main className=" flex flex-col items-center justify-between pt-24">
				<Hero />
				<div className=" relative container flex items-center justify-center py-10 md:py-20 ">
					<img
						src={"assets/images/dashboard-demo.png"}
						alt="dashboard demo"
						className="w-full lg:w-[900px] h-full lg:h-[600px] shadow-[0px_4px_250px_0px_#AFC76B4D]"
					/>
					<Ripple />
				</div>
				<Partners />
				<Features />
				<InfoCards />
				<ExtendedPartners />
				<HowItWorks />
				<MoreFromOvation />
				<Socials />
				<Newsletter />
			</main>
		</React.Fragment>
	);
}
```


### Discover Page

The discover page allows users to explore trending NFTs and profiles:


```14:49:app/apps/discover/page.tsx
export default function Page() {
  const user = getStoredUser()

  const { data: experiences } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => ovationService.getExperience(user?.userId as string),
  })

  const { data: socials } = useQuery({
    queryKey: ['socials'],
    queryFn: () => ovationService.getSocialLinks(user?.userId as string),
  })

  return (
    <div className="flex flex-col w-full bg-[#111115] h-fit items-center justify-center">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <GetStarted
          user={user as UserData}
          socials={socials?.data?.data || {}}
          experiences={experiences?.data?.data || []}
        />
        <div className="flex flex-col lg:grid lg:grid-cols-3 w-[95%] gap-5">
          <div className="col-span-2 mt-10 mb-[20px] flex flex-col gap-10">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Ranking />
            </ErrorBoundary>
          </div>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MostViewed />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </div>
  )
}
```


### User Profile

Users can customize their profiles and showcase their NFT collections:


```8:99:app/apps/discover/_components/most-viewed.tsx
export function MostViewed() {
      ...
      </div>

      <div
        className={
          'flex flex-col w-full border border-[#35353880] rounded-[14px] p-6 gap-9 bg-[#18181C]'
        }
      >
        <div className="flex flex-col items-center justify-center relative">
          <div className="w-full h-[150px] rounded-[10px] overflow-hidden">
            <img
              src={
                mostViewed[0]?.coverImage || '/assets/images/profile/image8.png'
              }
              alt="User alt"
              className=" h-full rounded-[10px] object-cover w-full"
            />
          </div>

          <Image
            src={
              mostViewed[0]?.profileImage || '/assets/images/default-user.svg'
            }
            alt="User Display"
            width={50}
            height={50}
            className={`${mostViewed[0]?.profileImage ? 'bg-[#0B0A10]' : 'bg-[#18181C]'} absolute bottom-[-25px] border-[3px] w-12 h-12 object-cover border-[#0B0A10] rounded-full`}
          />
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center w-full justify-between pb-6 border-b border-[#FFFFFF0D]">
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex flex-col">
                <a
                  href={`/apps/profile/${mostViewed[0]?.username}`}
                  className="flex gap-1 items-center text-base font-semibold leading-5 "
                >
                  {mostViewed[0]?.displayName}
                  <VerifyIcon />
                </a>
                <a
                  href={`/apps/profile/${mostViewed[0]?.username}`}
                  className="text-xs leading-5 font-medium text-light"
                >
                  {formatUsername(mostViewed[0]?.username)}
                </a>
              </div>
              <div className="bg-primary text-[10px] font-medium text-black px-[10px] py-2 w-fit rounded-3xl">
                {mostViewed[0]?.views > 1000
                  ? `${(mostViewed[0]?.views / 1000).toFixed(1)}k`
                  : mostViewed[0]?.views}{' '}
                Views
              </div>
            </div>
          </div>

          <p className="text-sm text-light">
            {mostViewed[0]?.bio || 'No bio available'}
          </p>
        </div>
```


## Deployment

The easiest way to deploy the Ovation app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). For more details, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).



