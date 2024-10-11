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
  - `app/`: Main application pages and components
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

## Deployment

The easiest way to deploy the Ovation app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). For more details, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
