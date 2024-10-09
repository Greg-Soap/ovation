// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['firebasestorage.googleapis.com', 'i.seadn.io'],
//   },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig